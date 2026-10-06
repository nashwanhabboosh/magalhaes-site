// Dialog.js
//
// The one small pop-up used throughout the blog admin: to confirm
// something ("Delete this post?") or to ask for a single line of text
// (a link address, a photo description).
//
// Props:
//   title         - heading
//   message       - optional explanation under the heading
//   input         - optional { label, placeholder, initialValue } to ask for text
//   confirmLabel  - text of the main button
//   cancelLabel   - text of the other button (default: "Cancel")
//   danger        - true to colour the main button as destructive
//   onConfirm     - called with the entered text (or '' when there is no input)
//   onCancel      - called on Cancel, Escape, or a click outside the box
import React, { useState, useEffect } from 'react';

const Dialog = ({
  title,
  message,
  input,
  confirmLabel,
  cancelLabel = 'Cancel',
  danger = false,
  onConfirm,
  onCancel
}) => {
  const [value, setValue] = useState(input?.initialValue || '');

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onConfirm(value.trim());
  };

  return (
    <div
      className="admin-dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <form
        className="admin-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-dialog-title"
        onSubmit={handleSubmit}
      >
        <h2 id="admin-dialog-title" className="admin-dialog-title">{title}</h2>
        {message && <p className="admin-dialog-message">{message}</p>}
        {input && (
          <label className="admin-dialog-field">
            <span className="admin-dialog-label">{input.label}</span>
            <input
              className="admin-input"
              type="text"
              value={value}
              placeholder={input.placeholder}
              onChange={(event) => setValue(event.target.value)}
              autoFocus
            />
          </label>
        )}
        <div className="admin-dialog-actions">
          <button type="button" className="admin-btn secondary" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            type="submit"
            className={`admin-btn ${danger ? 'danger' : 'primary'}`}
            autoFocus={!input}
          >
            {confirmLabel}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Dialog;
