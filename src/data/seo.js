// src/data/seo.js
//
// Single source of truth for per-page SEO metadata (titles, meta
// descriptions, canonical URLs). Consumed by:
//   - functions/_middleware.js  (Cloudflare Pages middleware that injects
//     this into the initial HTML response at the edge, so crawlers see
//     the correct head content without executing JavaScript)
//   - components/Seo.js         (keeps document.title / meta description
//     in sync during client-side SPA navigation)
//
// Titles and descriptions supplied by the practice's SEO consultant
// (see "From Mark/" worksheets). Casing is preserved as delivered.
//
// Keys are route paths WITHOUT a trailing slash (except "/"). Use
// getSeoForPath() to look up, which normalizes trailing slashes.
// `canonicalPath` (with trailing slash where applicable) is derived in
// getCanonicalUrl() to match the URL forms used in the SEO worksheets.

export const CANONICAL_ORIGIN = 'https://www.lenscraftersdoctor.com';

export const DEFAULT_TITLE =
  'Dr. Magalhaes and Associates | Optometry in Southeastern MA';

export const DEFAULT_DESCRIPTION =
  "Dr. Magalhaes and Associates — Southeastern Massachusetts' leading optometry practice specializing in contact lenses, LASIK co-management, and medical eye care. Schedule your appointment today.";

// Routes whose canonical URL should NOT end with a trailing slash
// (doctor profile pages, matching the SEO worksheet's URL forms).
const NO_TRAILING_SLASH_PREFIXES = ['/doctors/'];

export const seoByPath = {
  '/': {
    title:
      'OPTOMETRIST NORTH ATTLEBORO MA - EYE DOCTOR NORTH DARTMOUTH - EXAMS - EYEGLASSES - CONTACT LENSES',
    description:
      'Optometrist in North Attleboro & Dartmouth MA. Get expert eye care: exams, contact lenses, eyeglasses, LASIK, glaucoma treatment, cataract treatment, diabetic retinopathy, macular degeneration treatment and more.'
  },
  '/services': {
    title:
      'COMPREHENSIVE EYE CARE SERVICES | DR. MAGALHAES & ASSOCIATES | NORTH ATTLEBORO & DARTMOUTH MA OPHTHALMOLOGIST REFERRAL',
    description:
      'Expert comprehensive eye care services including eye exams, vision testing, disease treatment, and optical services. Our experienced optometrists provide personalized care using advanced technology to protect and enhance your vision health in Massachusetts.'
  },
  '/services/latisse': {
    title:
      'LATISSE NORTH ATTLEBORO & DARTMOUTH MA - EYELASH ENHANCEMENT /TREATMENT',
    description:
      'LATISSE eyelash enhancement treatment in North Attleboro & Dartmouth MA. FDA-approved prescription solution for longer, thicker, darker lashes. Professional consultation, application guidance, and follow-up care for safe, effective eyelash growth results.'
  },
  '/services/eye-care': {
    title:
      'EYE DISEASE TREATMENT SERVICES - NORTH ATTLEBORO & DARTMOUTH MA | ALLERGIES - CONJUNCTIVITIS',
    description:
      'Comprehensive eye disease treatment in North Attleboro & Dartmouth MA. Expert care for allergies, conjunctivitis, glaucoma, macular degeneration, diabetic retinopathy, and more. Advanced diagnostics and personalized treatment plans for optimal eye health.'
  },
  '/services/eye-diseases/diabetic-eye-disease': {
    title:
      'DIABETIC EYE DISEASE TREATMENT | RETINOPATHY CARE IN NORTH ATTLEBORO & DARTMOUTH MA',
    description:
      'Expert diabetic eye disease and retinopathy treatment in North Attleboro & Dartmouth MA. Comprehensive diabetic eye exams, early detection, and specialized care to prevent vision loss. Advanced monitoring and treatment for diabetes-related eye complications.'
  },
  // "Ophthalmologists" in the delivered copy corrected to "optometrists" —
  // the practice is an optometry practice (confirmed with site owner).
  '/services/comprehensive-eye-exam': {
    title:
      'COMPREHENSIVE EYE EXAM NORTH ATTLEBORO & NORTH DARTMOUTH MA - VISION TESTING - OPTOMETRISTS',
    description:
      'Comprehensive eye exams and vision testing in North Attleboro & North Dartmouth MA. Advanced diagnostic technology for complete eye health evaluation, disease detection, prescription updates, and personalized vision care for all ages by optometrists.'
  },
  '/services/optical-shop': {
    title:
      'OPTICAL SHOP NORTH ATTLEBORO & NORTH DARTMOUTH MA | EYEWEAR, GLASSES, CONTACT LENSES',
    description:
      'Premium optical shop in North Attleboro & North Dartmouth MA. Wide selection of designer eyewear, prescription glasses, sunglasses, and contact lenses. Expert fitting services, lens customization, and professional optical care for perfect vision solutions.'
  },
  '/services/eye-diseases/macular-degeneration': {
    title:
      'MACULAR DEGENERATION TREATMENT | EYE DISEASE CARE | NORTH ATTLEBORO & DARTMOUTH MA',
    description:
      'Expert macular degeneration treatment and eye disease care in North Attleboro & Dartmouth MA. Advanced diagnostic testing, early detection, and specialized treatment plans to slow progression and preserve central vision for AMD patients.'
  },
  '/doctors/patricia-garcia': {
    title:
      'Dr. Patricia Garcia, Eye Doctor | Expert Vision Care & Eye Exams | In LensCrafters',
    description:
      'Dr. Patricia Garcia, experienced eye doctor providing expert vision care and comprehensive eye exams at LensCrafters. Specialized in eye disease diagnosis, vision correction, and personalized patient care using advanced optometric technology.'
  },
  '/doctors/domenic-covello': {
    title:
      'Optometrist In MA | Vision Specialist In MA | Domenic Covello, OD | LensCrafters',
    description:
      'Dr. Domenic Covello, O.D., a highly experienced optometrist in MA, provides expert comprehensive eye care, vision exams, and eye disease treatment. Professional optometric services with advanced technology in North Attleboro & Dartmouth MA.'
  },
  '/locations': {
    title:
      'Locations - Dr. Magalhaes and Associates, Inc | Lenscrafters - North Attleboro & Dartmouth MA',
    description:
      'Visit Dr. Magalhaes and Associates locations in North Attleboro & Dartmouth MA at LensCrafters. Convenient eye care centers offering comprehensive eye exams, vision services, and optical healthcare. Find directions and schedule appointments at our locations.'
  },
  '/contact': {
    title:
      'Schedule Eye Exam - Optometry Consultation | 508-717-0425 | Dartmouth & North Attleboro MA',
    description:
      'To schedule an Optometry consultation or eye exam with Dr Magalhaes and Associates, please call 508-717-0425. Our practices serve North Dartmouth MA, North Attleboro MA and surrounding areas.'
  },
  // Description was misfiled under /patient-info/ in the delivered sheet;
  // reunited with its LASIK title here.
  '/services/laser-vision-correction': {
    title:
      'LASER VISION CORRECTION (LASIK) - VISION SURGERY CONSULTATION | NORTH ATTLEBORO & DARTMOUTH MA',
    description:
      'Laser vision correction (LASIK) consultations and vision surgery evaluations in North Attleboro & Dartmouth MA. Expert candidacy assessment, pre and post-operative care, and referrals to trusted surgeons for life-changing vision correction.'
  },
  // Description written in-house (the sheet's row carried the LASIK copy).
  '/patient-info': {
    title:
      'Dr Magalhaes and Associates | Patient Information | North Attleboro & Dartmouth MA',
    description:
      'Patient information for Dr. Magalhaes and Associates in North Attleboro & Dartmouth MA. Find insurance and payment details, new patient resources, and everything you need to prepare for your eye exam or optometry visit.'
  },
  '/services/eye-diseases/cataracts-treatment': {
    title:
      'CATARACT TREATMENT & SURGERY - NORTH ATTLEBORO & DARTMOUTH | EYE DISEASE DOCTORS IN MA',
    description:
      'Expert cataract treatment and surgery in North Attleboro & Dartmouth with experienced eye disease doctors in MA. Comprehensive evaluation, surgical coordination, pre and post-operative care to restore clear vision and improve quality of life.'
  },
  '/doctors': {
    title:
      'Optometrists In North Attleboro & Dartmouth MA - Our Expert Eye Doctors',
    description:
      'Meet our expert optometrists and eye doctors in North Attleboro & Dartmouth MA. Experienced team providing comprehensive eye care, vision exams, eye disease treatment, and personalized optometric services using advanced technology and compassionate care.'
  },
  '/location/north-dartmouth': {
    title:
      'Optometrist North Dartmouth MA | Eye Doctor For Exams - Eyeglasses - Contact Lenses',
    description:
      'Optometrists in North Dartmouth providing comprehensive eye exams, eyeglasses, and contact lenses. Expert eye doctor services including vision testing, prescription updates, designer frames, and professional optical care at our MA locations.'
  },
  '/doctors/nicole-patricio': {
    title:
      'Nicole Patricio, O.D. - Expert Eye Doctor & Vision Care Services | North Attleboro & Dartmouth MA',
    description:
      'Dr. Nicole Patricio, O.D., expert eye doctor providing comprehensive vision healthcare services in North Attleboro & Dartmouth MA. Specialized in eye exams, vision correction, eye disease diagnosis, using the latest advanced technology.'
  },
  '/careers': {
    title:
      'Careers - Dr. Magalhaes and Associates, Inc | Healthcare Jobs In North Attleboro & Dartmouth MA',
    description:
      'Join Dr. Magalhaes and Associates healthcare careers in North Attleboro & Dartmouth MA. Explore optometry, optical technician, and administrative job positions. Be part of our mission to provide exceptional eye care with competitive benefits and growth opportunities.'
  },
  '/services/eye-diseases/glaucoma': {
    title:
      'GLAUCOMA DOCTORS IN NORTH ATTLEBORO DARTMOUTH MA | EYE DISEASE TREATMENT & TESTING',
    description:
      'Expert glaucoma doctors in North Attleboro & Dartmouth MA providing comprehensive eye disease treatment and testing. Advanced glaucoma screening, pressure monitoring, early detection, and specialized care to preserve vision and prevent progression.'
  },
  // Copy written in-house (the sheet's row carried testimonial-page copy
  // that doesn't match this page's content).
  '/services/new-eyecare-meds': {
    title:
      'NEW EYECARE MEDICATIONS | TYRVAYA - MIEBO - XDEMVY | NORTH ATTLEBORO & DARTMOUTH MA',
    description:
      'Latest FDA-approved eyecare medications in North Attleboro & Dartmouth MA. Tyrvaya nasal spray and Miebo drops for dry eye, and Xdemvy for Demodex blepharitis. Expert guidance on innovative eye disease treatments from our optometrists.'
  },
  '/doctors/tina-parker': {
    title:
      'Tina Parker, O.D. - Expert Eye Doctor & Vision Care Services | North Attleboro & Dartmouth MA',
    description:
      'Dr. Tina Parker, O.D., expert eye doctor providing comprehensive vision care services in North Attleboro & Dartmouth MA. Specialized in eye exams, vision correction, eye disease treatment, and personalized patient care using advanced optometric technology.'
  },
  '/services/vision-problems': {
    title:
      'VISION PROBLEMS NORTH ATTLEBORO & DARTMOUTH MA | VISION CORRECTION TREATMENT SOLUTIONS',
    description:
      'Expert vision problems treatment in North Attleboro & Dartmouth MA. Comprehensive vision correction solutions for refractive errors, focusing issues, blurred vision, and visual disturbances. Personalized treatment plans for improved sight and quality of life.'
  },
  '/services/eye-diseases/dry-eye': {
    title:
      'DRY EYE SYNDROME TREATMENT SERVICES | NORTH ATTLEBORO & DARTMOUTH EYE DOCTORS',
    description:
      'Expert dry eye syndrome treatment services with North Attleboro & Dartmouth eye doctors. Comprehensive diagnosis, advanced testing, prescription treatments, artificial tears, and personalized management plans for lasting dry eye relief and comfort.'
  },
  '/services/eye-diseases': {
    title:
      'EYE DISEASE TREATMENT | NORTH ATTLEBORO & NORTH DARTMOUTH MA EYE DOCTORS',
    description:
      'Comprehensive eye disease treatment with North Attleboro & North Dartmouth MA eye doctors. Expert diagnosis and care for glaucoma, macular degeneration, diabetic retinopathy, cataracts, dry eye, and more using advanced diagnostic technology.'
  },
  '/services/contact-lenses': {
    title:
      'CONTACT LENSES | EXPERT FITTING (MISIGHT) & PREMIUM LENS SELECTION | NORTH ATTLEBORO & DARTMOUTH MA',
    description:
      'Expert contact lens fitting including MiSight and premium lens selection in North Attleboro & Dartmouth MA. Professional fitting services for daily, weekly, monthly, toric, multifocal, and specialty lenses with ongoing support and care instruction.'
  },
  '/doctors/michelle-vining': {
    title:
      'Michelle Vining, O.D. - Expert Eye Doctor & Vision Care Services | North Attleboro & Dartmouth MA',
    description:
      'Dr. Michelle Vining, O.D., expert eye doctor providing comprehensive vision care services in North Attleboro & Dartmouth MA. Specialized in eye exams, vision correction, eye disease diagnosis, and personalized patient care using advanced optometric technology.'
  },
  '/doctors/john-magalhaes': {
    title:
      'Dr. John Magalhaes, O.D., F.A.A.O. | Optometrist | Eye Doctor | North Attleboro & Dartmouth MA',
    description:
      'Dr. John Magalhaes, O.D., F.A.A.O., fellowship-trained optometrist and eye doctor in North Attleboro & Dartmouth MA. Providing expert comprehensive eye care, advanced vision services, eye disease treatment, and specialized optometric care using cutting-edge technology.'
  },
  '/location/north-attleboro-fashion-crossing': {
    title:
      'North Attleboro MA Eye Doctor | Fashion Crossing Eye Care | LensCrafters Doctor',
    description:
      'North Attleboro MA eye doctor at Fashion Crossing providing comprehensive eye care at LensCrafters Doctor. Convenient shopping center location offering eye exams, vision testing, eyeglasses, contact lenses, and professional optical services for the community.'
  },
  '/services/eye-diseases/conjunctivitis-pink-eye': {
    title:
      'CONJUNCTIVITIS (PINK EYE) TREATMENT SERVICES | NORTH ATTLEBORO & DARTMOUTH MA EYE DOCTORS',
    description:
      'Expert conjunctivitis (pink eye) treatment services with North Attleboro & Dartmouth MA eye doctors. Quick diagnosis and relief for bacterial, viral, and allergic pink eye with appropriate medications, care instructions, and follow-up care.'
  },
  '/about': {
    title:
      'About Us | Magalhaes and Associates, Inc | Optometrists - Eye Doctors In Massachusetts',
    description:
      "About Magalhaes and Associates, Inc optometrists and eye doctors in Massachusetts. Our experienced team's mission is to provide exceptional comprehensive eye care using the latest advanced technology with personalized patient healthcare services, while committed to our community since our founding."
  },
  '/doctors/evan-hosney': {
    title:
      'Evan Hosney, O.D. - Expert Eye Doctor & Vision Care Services | North Attleboro & Dartmouth MA',
    description:
      'Dr. Evan Hosney, O.D., expert eye doctor providing comprehensive vision care services in North Attleboro & Dartmouth MA. Specialized in eye exams, vision correction, eye disease diagnosis, and personalized patient care using advanced optometric technology.'
  },
  '/doctors/jacqueline-klombers': {
    title:
      'Jacqueline Klombers, O.D. - Expert Eye Doctor & Vision Care Services | North Attleboro & Dartmouth MA',
    description:
      'Dr. Jacqueline Klombers, O.D., expert eye doctor providing comprehensive vision care services in North Attleboro & Dartmouth MA. Specialized in eye exams, vision correction, eye disease diagnosis, and personalized patient care using advanced optometric technology.'
  },
  // Blog index. Not from the SEO worksheets — written when the blog was
  // added. Individual posts are not listed here; see getPostSeo() below.
  '/blog': {
    title:
      'Eye Care Blog | Dr. Magalhaes and Associates | North Attleboro & Dartmouth MA',
    description:
      'Eye health articles from the optometrists at Dr. Magalhaes and Associates in North Attleboro & Dartmouth MA. Practical advice on eye exams, contact lenses, eye disease, and everyday vision care.'
  }
};

// Strips a trailing slash (except for the root path) so lookups work
// for both "/contact" and "/contact/".
export const normalizePath = (pathname) => {
  if (!pathname) return '/';
  let path = pathname;
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  return path || '/';
};

export const getSeoForPath = (pathname) => seoByPath[normalizePath(pathname)] || null;

// Canonical URL for a path, matching the URL forms in the SEO worksheets:
// trailing slash everywhere except doctor profile pages.
export const getCanonicalUrl = (pathname) => {
  const path = normalizePath(pathname);
  if (path === '/') return `${CANONICAL_ORIGIN}/`;
  const noSlash = NO_TRAILING_SLASH_PREFIXES.some(
    (prefix) => path.startsWith(prefix) && path !== prefix
  );
  return `${CANONICAL_ORIGIN}${path}${noSlash ? '' : '/'}`;
};

// --- Blog posts ----------------------------------------------------------
//
// Posts live in a database rather than in seoByPath, so their metadata is
// built from the post itself. The middleware and pages/Blog/BlogPost.js
// both use these helpers, so the served HTML and the running app agree.

// Returns the post slug for a path like "/blog/my-post/", otherwise null.
export const getBlogPostSlug = (pathname) => {
  const match = normalizePath(pathname).match(/^\/blog\/([a-z0-9-]+)$/);
  return match ? match[1] : null;
};

export const getPostSeo = (post) => ({
  title: `${post.title} | Dr. Magalhaes and Associates`,
  description: post.summary || DEFAULT_DESCRIPTION
});

// id of the <script type="application/json"> element in which the
// middleware embeds the post, so the app can render it without a second
// request.
export const PRELOADED_POST_ELEMENT_ID = 'blog-post-data';
