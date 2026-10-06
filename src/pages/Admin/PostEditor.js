// PostEditor.js
//
// The screen where a post is written: title, summary, cover photo and
// body, with Save draft / Preview / Publish for a draft and
// Update / Preview / Unpublish for a post that is already live.
//
// The body editor is TipTap. What it produces is its JSON document, which
// is what gets saved; the public HTML is built from that on the server
// (server/renderBody.js). The editor is limited to the elements that
// renderer supports, so nothing can be typed here that would silently
// vanish from the published post.
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEditor, useEditorState, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageExtension from '@tiptap/extension-image';
import Dialog from './Dialog';
import { useAdmin } from './adminContext';
import { resizeImage, ImageError } from './resizeImage';
import {
  getPost,
  createPost,
  updatePost,
  publishPost,
  unpublishPost,
  deletePost,
  previewPost,
  uploadImage,
  SignedOutError,
  ApiError
} from './api';
import { PostHero, PostArticle } from '../Blog/PostView';
import { formatPostDate } from '../Blog/Blog';

// Same limits the server enforces (server/posts.js).
const MAX_TITLE_LENGTH = 200;
const MAX_SUMMARY_LENGTH = 300;

const PHOTO_TYPES = 'image/jpeg,image/png,image/webp';

const BUSY_LABELS = {
  save: 'Saving…',
  publish: 'Publishing…',
  unpublish: 'Unpublishing…',
  delete: 'Deleting…',
  preview: 'Preparing preview…',
  photo: 'Uploading photo…'
};

// "aoa.org" -> "https://aoa.org", "info@x.com" -> "mailto:info@x.com".
// Addresses that already say what they are, and links to pages on this
// site ("/contact/"), are left alone.
const normalizeHref = (value) => {
  if (/^(https?:\/\/|mailto:|tel:|\/)/i.test(value)) return value;
  if (value.includes('@') && !value.includes('/')) return `mailto:${value}`;
  return `https://${value}`;
};

const firstImageFile = (dataTransfer) =>
  Array.from(dataTransfer?.files || []).find((file) => file.type.startsWith('image/')) || null;

const Toolbar = ({ editor, onLink, onPhoto }) => {
  // Re-renders the toolbar as the cursor moves, so the buttons show what
  // applies to the text the cursor is in.
  const active = useEditorState({
    editor,
    selector: ({ editor: current }) => ({
      heading: current.isActive('heading', { level: 2 }),
      subheading: current.isActive('heading', { level: 3 }),
      bold: current.isActive('bold'),
      italic: current.isActive('italic'),
      bulletList: current.isActive('bulletList'),
      orderedList: current.isActive('orderedList'),
      blockquote: current.isActive('blockquote'),
      link: current.isActive('link'),
      canUndo: current.can().undo(),
      canRedo: current.can().redo()
    })
  });

  const tool = (label, onClick, { isActive = false, disabled = false, title } = {}) => (
    <button
      type="button"
      className={`admin-tool ${isActive ? 'active' : ''}`}
      aria-pressed={isActive}
      title={title}
      disabled={disabled}
      // Keeps the cursor and selection in the text when a button is clicked.
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
    >
      {label}
    </button>
  );

  const chain = () => editor.chain().focus();

  return (
    <div className="admin-toolbar" role="toolbar" aria-label="Text formatting">
      <div className="admin-tool-group">
        {tool('Heading', () => chain().toggleHeading({ level: 2 }).run(), { isActive: active.heading })}
        {tool('Subheading', () => chain().toggleHeading({ level: 3 }).run(), { isActive: active.subheading })}
      </div>
      <div className="admin-tool-group">
        {tool(<strong>Bold</strong>, () => chain().toggleBold().run(), { isActive: active.bold })}
        {tool(<em>Italic</em>, () => chain().toggleItalic().run(), { isActive: active.italic })}
      </div>
      <div className="admin-tool-group">
        {tool('Bulleted list', () => chain().toggleBulletList().run(), { isActive: active.bulletList })}
        {tool('Numbered list', () => chain().toggleOrderedList().run(), { isActive: active.orderedList })}
        {tool('Quote', () => chain().toggleBlockquote().run(), { isActive: active.blockquote })}
      </div>
      <div className="admin-tool-group">
        {tool('Link', onLink, { isActive: active.link })}
        {tool('Photo', onPhoto)}
      </div>
      <div className="admin-tool-group">
        {tool('Undo', () => chain().undo().run(), { disabled: !active.canUndo })}
        {tool('Redo', () => chain().redo().run(), { disabled: !active.canRedo })}
      </div>
    </div>
  );
};

// The form itself. `post` is the saved post, or null for one that has not
// been saved yet. `onSaved` is called with the post every time the server
// returns a new version of it.
const PostForm = ({ post, onSaved }) => {
  const navigate = useNavigate();
  const { reportSignedOut } = useAdmin();

  const [title, setTitle] = useState(post?.title || '');
  const [summary, setSummary] = useState(post?.summary || '');
  // { key, url } or null
  const [cover, setCover] = useState(
    post?.coverImage ? { key: post.coverImage, url: post.coverImageUrl } : null
  );
  const [dirty, setDirty] = useState(false);
  // Which action is in progress (a key of BUSY_LABELS), or null.
  const [busy, setBusy] = useState(null);
  // { type: 'success' | 'error' | 'info', text, link? }
  const [notice, setNotice] = useState(null);
  // { kind: 'link' | 'photo' | 'delete' | 'leave', ... }
  const [dialog, setDialog] = useState(null);
  const [preview, setPreview] = useState(null);

  const coverInputRef = useRef(null);
  const photoInputRef = useRef(null);
  // The editor is configured once, but its paste and drop handlers need
  // the current addBodyPhoto, which is recreated on every render.
  const addBodyPhotoRef = useRef(null);

  const isPublished = post?.status === 'published';

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        // Not offered in the toolbar and not rendered on the public page.
        code: false,
        codeBlock: false,
        strike: false,
        link: { openOnClick: false, defaultProtocol: 'https' }
      }),
      ImageExtension
    ],
    content: post?.body || '',
    editorProps: {
      attributes: { 'aria-label': 'Post text' },
      // Text copied from a web page or Word can bring pictures that live
      // somewhere else. Only photos uploaded here are published, so those
      // are dropped rather than shown and then silently lost.
      transformPastedHTML: (html) => html.replace(/<img\b[^>]*>/gi, ''),
      handlePaste: (view, event) => {
        const file = firstImageFile(event.clipboardData);
        if (!file) return false;
        addBodyPhotoRef.current(file);
        return true;
      },
      handleDrop: (view, event) => {
        const file = firstImageFile(event.dataTransfer);
        if (!file) return false;
        event.preventDefault();
        addBodyPhotoRef.current(file);
        return true;
      }
    },
    onUpdate: () => setDirty(true)
  });

  // Ask before closing or reloading the tab with unsaved work.
  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const fields = () => ({
    title,
    summary,
    coverImage: cover?.key || null,
    body: editor.isEmpty ? null : editor.getJSON()
  });

  // Runs one action with the buttons disabled, and turns any failure into
  // a message on screen.
  const run = async (action, task) => {
    setBusy(action);
    setNotice(null);
    try {
      await task();
    } catch (err) {
      if (err instanceof SignedOutError) {
        reportSignedOut();
      } else {
        const known = err instanceof ApiError || err instanceof ImageError;
        setNotice({
          type: 'error',
          text: known ? err.message : 'Something went wrong. Please try again.'
        });
      }
    } finally {
      setBusy(null);
    }
  };

  // Saves the form and resolves with the saved post.
  const save = async () => {
    const saved = post ? await updatePost(post.id, fields()) : await createPost(fields());
    setDirty(false);
    onSaved(saved);
    return saved;
  };

  const handleSave = () =>
    run('save', async () => {
      await save();
      setNotice(
        isPublished
          ? { type: 'success', text: 'Updated. Your changes are live.' }
          : { type: 'success', text: 'Draft saved. Only you can see it.' }
      );
    });

  const handlePublish = () => {
    if (!title.trim()) {
      setNotice({ type: 'error', text: 'Add a title before publishing.' });
      return;
    }
    run('publish', async () => {
      const saved = await save();
      const published = await publishPost(saved.id);
      onSaved(published);
      setNotice({
        type: 'success',
        text: 'Published. Your post is now live.',
        link: { href: `/blog/${published.slug}/`, label: 'View post' }
      });
    });
  };

  const handleUnpublish = () =>
    run('unpublish', async () => {
      onSaved(await unpublishPost(post.id));
      setNotice({
        type: 'success',
        text: 'Unpublished. This post is a private draft again.'
      });
    });

  const handleDelete = () => {
    setDialog(null);
    run('delete', async () => {
      await deletePost(post.id);
      navigate('/admin/');
    });
  };

  const handlePreview = () =>
    run('preview', async () => {
      setPreview(await previewPost(fields()));
    });

  const handleCoverChosen = (event) => {
    const file = event.target.files[0];
    // Lets the same file be chosen again later.
    event.target.value = '';
    if (!file) return;
    run('photo', async () => {
      const uploaded = await uploadImage(await resizeImage(file));
      setCover(uploaded);
      setDirty(true);
    });
  };

  // Uploads a photo for the body, then asks for its description before
  // placing it at the cursor.
  const addBodyPhoto = (file) =>
    run('photo', async () => {
      const uploaded = await uploadImage(await resizeImage(file));
      setDialog({ kind: 'photo', url: uploaded.url });
    });
  addBodyPhotoRef.current = addBodyPhoto;

  const handleBodyPhotoChosen = (event) => {
    const file = event.target.files[0];
    event.target.value = '';
    if (file) addBodyPhoto(file);
  };

  const insertBodyPhoto = (alt) => {
    editor.chain().focus().setImage({ src: dialog.url, alt }).run();
    setDialog(null);
  };

  const openLinkDialog = () => {
    const existing = editor.getAttributes('link').href || '';
    if (!existing && editor.state.selection.empty) {
      setNotice({
        type: 'info',
        text: 'To add a link, first select the words you want to turn into a link, then click Link.'
      });
      return;
    }
    setNotice(null);
    setDialog({ kind: 'link', existing });
  };

  const applyLink = (value) => {
    const chain = editor.chain().focus().extendMarkRange('link');
    if (value) {
      chain.setLink({ href: normalizeHref(value) }).run();
    } else {
      chain.unsetLink().run();
    }
    setDialog(null);
  };

  const handleBack = () => {
    if (dirty) {
      setDialog({ kind: 'leave' });
    } else {
      navigate('/admin/');
    }
  };

  const closeDialog = () => setDialog(null);

  let saveState = '';
  if (busy) saveState = BUSY_LABELS[busy];
  else if (dirty) saveState = 'Unsaved changes';
  else if (post) saveState = 'All changes saved';

  return (
    <div className="admin-container admin-editor-screen">
      <button type="button" className="admin-back" onClick={handleBack}>
        <span aria-hidden="true">←</span> All posts
      </button>

      <div className="admin-heading-row">
        <h1 className="admin-heading">{post ? 'Edit post' : 'New post'}</h1>
      </div>

      <p className="admin-post-status">
        <span className={`admin-status ${isPublished ? 'published' : 'draft'}`}>
          {isPublished ? 'Published' : 'Draft'}
        </span>
        {isPublished ? (
          <span>
            Live at{' '}
            <a href={`/blog/${post.slug}/`} target="_blank" rel="noopener noreferrer">
              lenscraftersdoctor.com/blog/{post.slug}/
            </a>
          </span>
        ) : (
          <span>Only you can see this post until you publish it.</span>
        )}
      </p>

      <div className="admin-card">
        <label className="admin-field">
          <span className="admin-label">Title</span>
          <span className="admin-hint">The headline readers and Google will see.</span>
          <input
            className="admin-input admin-input-title"
            type="text"
            value={title}
            maxLength={MAX_TITLE_LENGTH}
            onChange={(event) => {
              setTitle(event.target.value);
              setDirty(true);
            }}
          />
        </label>

        <label className="admin-field">
          <span className="admin-label">Summary</span>
          <span className="admin-hint">
            One or two sentences. Shown under the title on the blog page and in Google results.
          </span>
          <textarea
            className="admin-input"
            rows={3}
            value={summary}
            maxLength={MAX_SUMMARY_LENGTH}
            onChange={(event) => {
              setSummary(event.target.value);
              setDirty(true);
            }}
          />
          <span className="admin-count">
            {summary.length} / {MAX_SUMMARY_LENGTH}
          </span>
        </label>

        <div className="admin-field">
          <span className="admin-label">Cover photo</span>
          <span className="admin-hint">The picture at the top of the post. Optional.</span>
          {cover && <img className="admin-cover-preview" src={cover.url} alt="Cover" />}
          <div className="admin-cover-actions">
            <button
              type="button"
              className="admin-btn secondary"
              disabled={Boolean(busy)}
              onClick={() => coverInputRef.current.click()}
            >
              {cover ? 'Change cover photo' : 'Add cover photo'}
            </button>
            {cover && (
              <button
                type="button"
                className="admin-btn text"
                disabled={Boolean(busy)}
                onClick={() => {
                  setCover(null);
                  setDirty(true);
                }}
              >
                Remove
              </button>
            )}
          </div>
          <input
            ref={coverInputRef}
            type="file"
            accept={PHOTO_TYPES}
            hidden
            onChange={handleCoverChosen}
          />
        </div>

        <div className="admin-field">
          <span className="admin-label">Post</span>
          <span className="admin-hint">
            Type or paste your text below. Use the buttons to add headings, lists, links and photos.
          </span>
          <div className="admin-editor">
            <Toolbar
              editor={editor}
              onLink={openLinkDialog}
              onPhoto={() => photoInputRef.current.click()}
            />
            <EditorContent editor={editor} className="admin-editor-content blog-body" />
          </div>
          <input
            ref={photoInputRef}
            type="file"
            accept={PHOTO_TYPES}
            hidden
            onChange={handleBodyPhotoChosen}
          />
        </div>
      </div>

      {/* Stays at the bottom of the window, so the buttons and any message
          are visible however long the post is. */}
      <div className="admin-actions">
        {notice && (
          <p className={`admin-notice ${notice.type}`} role={notice.type === 'error' ? 'alert' : 'status'}>
            {notice.text}
            {notice.link && (
              <>
                {' '}
                <a href={notice.link.href} target="_blank" rel="noopener noreferrer">
                  {notice.link.label}
                </a>
              </>
            )}
          </p>
        )}
        <div className="admin-actions-row">
          <span className="admin-save-state" aria-live="polite">{saveState}</span>
          {post && (
            <button
              type="button"
              className="admin-btn text danger-text"
              disabled={Boolean(busy)}
              onClick={() => setDialog({ kind: 'delete' })}
            >
              Delete
            </button>
          )}
          <button type="button" className="admin-btn secondary" disabled={Boolean(busy)} onClick={handlePreview}>
            Preview
          </button>
          {isPublished ? (
            <>
              <button type="button" className="admin-btn secondary" disabled={Boolean(busy)} onClick={handleUnpublish}>
                Unpublish
              </button>
              <button type="button" className="admin-btn primary" disabled={Boolean(busy)} onClick={handleSave}>
                Update
              </button>
            </>
          ) : (
            <>
              <button type="button" className="admin-btn secondary" disabled={Boolean(busy)} onClick={handleSave}>
                Save draft
              </button>
              <button type="button" className="admin-btn primary" disabled={Boolean(busy)} onClick={handlePublish}>
                Publish
              </button>
            </>
          )}
        </div>
      </div>

      {dialog?.kind === 'link' && (
        <Dialog
          title={dialog.existing ? 'Edit link' : 'Add a link'}
          message="Paste or type the web address the selected words should lead to. Leave it empty to remove the link."
          input={{
            label: 'Web address',
            placeholder: 'https://www.example.com',
            initialValue: dialog.existing
          }}
          confirmLabel="Save link"
          onConfirm={applyLink}
          onCancel={closeDialog}
        />
      )}

      {dialog?.kind === 'photo' && (
        <Dialog
          title="Describe this photo"
          message="A few words about what the photo shows. It is read aloud to people who can't see the picture, and helps Google understand it. You can leave it blank."
          input={{ label: 'Description', placeholder: 'For example: Dr. Magalhães examining a patient' }}
          confirmLabel="Add photo"
          cancelLabel="Skip"
          onConfirm={insertBodyPhoto}
          onCancel={() => insertBodyPhoto('')}
        />
      )}

      {dialog?.kind === 'delete' && (
        <Dialog
          title="Delete this post?"
          message={
            isPublished
              ? 'It will be removed from the website straight away. This cannot be undone.'
              : 'This cannot be undone.'
          }
          confirmLabel="Delete post"
          danger
          onConfirm={handleDelete}
          onCancel={closeDialog}
        />
      )}

      {dialog?.kind === 'leave' && (
        <Dialog
          title="Leave without saving?"
          message="You have changes that haven't been saved. If you leave now, they will be lost."
          confirmLabel="Leave without saving"
          cancelLabel="Keep editing"
          danger
          onConfirm={() => navigate('/admin/')}
          onCancel={closeDialog}
        />
      )}

      {preview && (
        <div className="admin-preview" role="dialog" aria-modal="true" aria-label="Post preview">
          <div className="admin-preview-bar">
            <span>
              <strong>Preview.</strong> This is how your post will look to visitors.
            </span>
            <button type="button" className="admin-btn primary" onClick={() => setPreview(null)}>
              Back to editing
            </button>
          </div>
          <div className="blog-page">
            <PostHero
              title={preview.title || 'Untitled'}
              dateLabel={formatPostDate(post?.publishedAt || new Date().toISOString())}
            />
            <div className="blog-content">
              <PostArticle post={preview} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Loads the post named in the address, then shows the form.
const PostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { reportSignedOut } = useAdmin();
  // { key, post }; post is null for a new post that has not been saved.
  const [loaded, setLoaded] = useState(null);
  const [error, setError] = useState(null);
  // id of the post currently in the form, or null for an unsaved one.
  const formPostIdRef = useRef(null);

  useEffect(() => {
    if (id === 'new') {
      formPostIdRef.current = null;
      setError(null);
      setLoaded({ key: `new-${Date.now()}`, post: null });
      return undefined;
    }

    // Already in the form: this is the post that was just saved for the
    // first time, and the address has only now caught up with it.
    // Loading it again would throw away the editor the author is using.
    if (String(formPostIdRef.current) === id) return undefined;

    let cancelled = false;
    setLoaded(null);
    setError(null);

    getPost(id)
      .then((post) => {
        if (cancelled) return;
        formPostIdRef.current = post.id;
        setLoaded({ key: `post-${post.id}`, post });
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof SignedOutError) reportSignedOut();
        setError(
          err instanceof SignedOutError
            ? 'Sign in again, then reload this page to open the post.'
            : err.message
        );
      });

    return () => {
      cancelled = true;
    };
  }, [id, reportSignedOut]);

  const handleSaved = (post) => {
    const isFirstSave = formPostIdRef.current === null;
    formPostIdRef.current = post.id;
    setLoaded((current) => ({ ...current, post }));
    // Give the new post its own address, so reloading the page reopens it.
    if (isFirstSave) navigate(`/admin/posts/${post.id}`, { replace: true });
  };

  if (error) {
    return (
      <div className="admin-container">
        <button type="button" className="admin-back" onClick={() => navigate('/admin/')}>
          <span aria-hidden="true">←</span> All posts
        </button>
        <p className="admin-notice error" role="alert">{error}</p>
      </div>
    );
  }

  if (!loaded) {
    return (
      <div className="admin-container">
        <p className="admin-empty">Opening the post…</p>
      </div>
    );
  }

  return <PostForm key={loaded.key} post={loaded.post} onSaved={handleSaved} />;
};

export default PostEditor;
