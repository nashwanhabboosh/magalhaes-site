// src/data/schema.js
//
// JSON-LD structured data for the four pages specified in the SEO
// consultant's handoff ("From Mark/lenscraftersdoctor-schema-handoff"):
//
//   1. Homepage                                  -> MedicalOrganization
//   2. /location/north-attleboro-fashion-crossing -> MedicalClinic + Optician
//   3. /location/north-dartmouth                  -> MedicalClinic + Optician
//   4. /doctors/john-magalhaes                    -> Person
//
// The blocks are cross-linked by @id (organization <-> clinics <-> person),
// so all four must stay deployed together — removing one leaves dangling
// references that schema validators flag.
//
// Injected into the initial HTML by functions/_middleware.js. Opening hours
// are derived from locations.js so the markup always matches the hours
// rendered on the page (a handoff hard requirement).

import { locations } from './locations';
import { CANONICAL_ORIGIN, getCanonicalUrl } from './seo';

const ORG_ID = `${CANONICAL_ORIGIN}/#organization`;
const PERSON_ID = `${CANONICAL_ORIGIN}/doctors/john-magalhaes#person`;
const NA_CLINIC_ID = `${CANONICAL_ORIGIN}/location/north-attleboro-fashion-crossing/#clinic`;
const ND_CLINIC_ID = `${CANONICAL_ORIGIN}/location/north-dartmouth/#clinic`;

const PHONE = '+1-508-717-0425';
const FAX = '+1-508-992-3239';
const EMAIL = 'info@lenscraftersdoctor.com';
const LOGO_URL = `${CANONICAL_ORIGIN}/logo_transparent.png`;
const HEADSHOT_URL = `${CANONICAL_ORIGIN}/images/dr-john-magalhaes.jpg`;
const FACEBOOK_URL = 'https://www.facebook.com/LenscraftersDoctor/';

// Converts "9:00 AM - 6:30 PM" into { opens: "09:00", closes: "18:30" }.
const to24h = (t) => {
  const [, h, m, ap] = t.trim().match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  let hour = parseInt(h, 10) % 12;
  if (ap.toUpperCase() === 'PM') hour += 12;
  return `${String(hour).padStart(2, '0')}:${m}`;
};

// Builds openingHoursSpecification from the per-day array in locations.js,
// grouping consecutive days that share the same hours.
const buildOpeningHours = (hours) => {
  const groups = [];
  for (const { day, hours: range, isOpen } of hours) {
    if (!isOpen) continue;
    const [opens, closes] = range.split('-').map(to24h);
    const prev = groups[groups.length - 1];
    if (prev && prev.opens === opens && prev.closes === closes) {
      prev.dayOfWeek.push(day);
    } else {
      groups.push({ dayOfWeek: [day], opens, closes });
    }
  }
  return groups.map(({ dayOfWeek, opens, closes }) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: dayOfWeek.length === 1 ? dayOfWeek[0] : dayOfWeek,
    opens,
    closes
  }));
};

const AVAILABLE_SERVICES = [
  { '@type': 'MedicalTest', name: 'Comprehensive Eye Exam' },
  { '@type': 'MedicalProcedure', name: 'Contact Lens Fitting and Evaluation' },
  { '@type': 'MedicalProcedure', name: 'LASIK Co-Management' },
  { '@type': 'MedicalProcedure', name: 'Glaucoma Diagnosis and Management' },
  { '@type': 'MedicalProcedure', name: 'Dry Eye Treatment' },
  { '@type': 'MedicalProcedure', name: 'Diabetic Eye Exam' },
  { '@type': 'MedicalProcedure', name: 'Cataract Evaluation and Co-Management' },
  { '@type': 'MedicalProcedure', name: 'Macular Degeneration Monitoring' }
];

const city = (name) => ({ '@type': 'City', name });

const reserveAction = (bookingUrl) => ({
  '@type': 'ReserveAction',
  name: 'Make Appointment',
  target: {
    '@type': 'EntryPoint',
    urlTemplate: bookingUrl,
    actionPlatform: [
      'http://schema.org/DesktopWebPlatform',
      'http://schema.org/MobileWebPlatform'
    ]
  }
});

const getLocation = (slug) => locations.find((loc) => loc.slug === slug);

const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  '@id': ORG_ID,
  name: 'Dr. Magalhaes and Associates, Inc.',
  alternateName: 'John Magalhaes and Associates',
  url: `${CANONICAL_ORIGIN}/`,
  logo: { '@type': 'ImageObject', url: LOGO_URL },
  description:
    'Southeastern Massachusetts optometry practice specializing in contact lenses, LASIK co-management, and medical eye care, with locations in North Attleborough and North Dartmouth.',
  foundingDate: '1998',
  medicalSpecialty: 'Optometric',
  telephone: PHONE,
  faxNumber: FAX,
  email: EMAIL,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: PHONE,
    contactType: 'customer service',
    availableLanguage: ['English', 'Portuguese', 'Spanish'],
    areaServed: 'US'
  },
  founder: { '@id': PERSON_ID },
  subOrganization: [{ '@id': NA_CLINIC_ID }, { '@id': ND_CLINIC_ID }],
  sameAs: [FACEBOOK_URL]
});

const northAttleboroSchema = () => ({
  '@context': 'https://schema.org',
  '@type': ['MedicalClinic', 'Optician'],
  '@id': NA_CLINIC_ID,
  name: 'Dr. Magalhaes and Associates - North Attleboro',
  alternateName: 'North Attleboro Fashion Crossing',
  description:
    'Optometry practice inside LensCrafters at Fashion Crossing in North Attleborough, MA. Comprehensive eye exams, contact lens fittings, LASIK co-management, and medical treatment of glaucoma, cataracts, dry eye, diabetic eye disease, and macular degeneration.',
  url: `${CANONICAL_ORIGIN}/location/north-attleboro-fashion-crossing/`,
  telephone: PHONE,
  faxNumber: FAX,
  email: EMAIL,
  logo: LOGO_URL,
  priceRange: '$$',
  currenciesAccepted: 'USD',
  paymentAccepted: 'Cash, Credit Card, Insurance',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1250 South Washington Street',
    addressLocality: 'North Attleborough',
    addressRegion: 'MA',
    postalCode: '02760',
    addressCountry: 'US'
  },
  // Geo verified against Google Places by the SEO consultant — do not edit.
  geo: { '@type': 'GeoCoordinates', latitude: 41.939585, longitude: -71.348031 },
  hasMap:
    'https://www.google.com/maps/place/?q=place_id:ChIJn9kHQWNd5IkRjtm6SPSFRKg',
  openingHoursSpecification: buildOpeningHours(getLocation('north-attleboro').hours),
  medicalSpecialty: 'Optometric',
  availableService: AVAILABLE_SERVICES,
  areaServed: [
    'North Attleborough',
    'Attleboro',
    'Plainville',
    'Mansfield',
    'Foxborough',
    'Wrentham'
  ].map(city),
  knowsLanguage: ['en', 'pt', 'es'],
  publicAccess: true,
  parentOrganization: { '@id': ORG_ID },
  employee: { '@id': PERSON_ID },
  potentialAction: reserveAction(getLocation('north-attleboro').scheduleUrl),
  sameAs: [
    FACEBOOK_URL,
    'https://local.lenscrafters.com/ma/north-attleboro/1250-s-washington-st.html'
  ]
});

const northDartmouthSchema = () => ({
  '@context': 'https://schema.org',
  '@type': ['MedicalClinic', 'Optician'],
  '@id': ND_CLINIC_ID,
  name: 'Dr. Magalhaes and Associates - North Dartmouth',
  alternateName: 'Dartmouth Towne Center',
  description:
    'Optometry practice inside LensCrafters at Dartmouth Towne Center in North Dartmouth, MA. Serving the South Coast with comprehensive eye exams, specialty contact lens fittings, LASIK co-management, and medical eye care.',
  url: `${CANONICAL_ORIGIN}/location/north-dartmouth/`,
  telephone: PHONE,
  faxNumber: FAX,
  email: EMAIL,
  logo: LOGO_URL,
  priceRange: '$$',
  currenciesAccepted: 'USD',
  paymentAccepted: 'Cash, Credit Card, Insurance',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '382 State Road',
    addressLocality: 'North Dartmouth',
    addressRegion: 'MA',
    postalCode: '02747',
    addressCountry: 'US'
  },
  // Geo verified against Google Places by the SEO consultant — do not edit.
  geo: { '@type': 'GeoCoordinates', latitude: 41.6409495, longitude: -70.994875 },
  hasMap:
    'https://www.google.com/maps/place/?q=place_id:ChIJTU5XMMz85IkRd87YMlTvIFg',
  openingHoursSpecification: buildOpeningHours(getLocation('north-dartmouth').hours),
  medicalSpecialty: 'Optometric',
  availableService: AVAILABLE_SERVICES,
  areaServed: [
    'Dartmouth',
    'New Bedford',
    'Fairhaven',
    'Westport',
    'Fall River',
    'Mattapoisett'
  ].map(city),
  knowsLanguage: ['en', 'pt', 'es'],
  publicAccess: true,
  parentOrganization: { '@id': ORG_ID },
  employee: { '@id': PERSON_ID },
  potentialAction: reserveAction(getLocation('north-dartmouth').scheduleUrl),
  sameAs: [
    FACEBOOK_URL,
    'https://local.lenscrafters.com/ma/north-dartmouth/382-state-rd.html'
  ]
});

const johnMagalhaesSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'John Magalhaes, O.D., F.A.A.O.',
  givenName: 'John',
  familyName: 'Magalhaes',
  honorificPrefix: 'Dr.',
  honorificSuffix: 'O.D., F.A.A.O.',
  jobTitle: 'Optometrist and Managing Doctor',
  description:
    "Dr. John Magalhaes, O.D., F.A.A.O., is the managing doctor of Dr. Magalhaes and Associates, with more than 25 years of clinical experience in medical eye care. He earned his Bachelor's degree and Doctor of Optometry from the New England College of Optometry and completed a residency at a Veterans Administration hospital. A past president of the Massachusetts Society of Optometrists, he practices in North Attleborough and North Dartmouth, Massachusetts.",
  url: `${CANONICAL_ORIGIN}/doctors/john-magalhaes`,
  image: HEADSHOT_URL,
  gender: 'Male',
  telephone: PHONE,
  email: EMAIL,
  knowsLanguage: ['en', 'pt', 'es'],
  occupation: {
    '@type': 'Occupation',
    name: 'Optometrist',
    occupationalCategory: '29-1041.00'
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'New England College of Optometry',
    url: 'https://www.neco.edu/',
    sameAs: 'https://en.wikipedia.org/wiki/New_England_College_of_Optometry'
  },
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'degree',
      educationalLevel: 'Doctorate',
      name: 'Doctor of Optometry (O.D.)',
      recognizedBy: {
        '@type': 'CollegeOrUniversity',
        name: 'New England College of Optometry'
      }
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Fellowship',
      name: 'Fellow of the American Academy of Optometry (F.A.A.O.)',
      recognizedBy: {
        '@type': 'Organization',
        name: 'American Academy of Optometry',
        url: 'https://www.aaopt.org/'
      }
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'license',
      name: 'Licensed Optometrist, Commonwealth of Massachusetts',
      recognizedBy: {
        '@type': 'GovernmentOrganization',
        name: 'Massachusetts Board of Registration in Optometry'
      }
    }
  ],
  memberOf: [
    {
      '@type': 'Organization',
      name: 'American Optometric Association',
      url: 'https://www.aoa.org/'
    },
    {
      '@type': 'Organization',
      name: 'Massachusetts Society of Optometrists',
      url: 'https://www.massoptometrists.org/'
    },
    {
      '@type': 'Organization',
      name: 'American Academy of Optometry',
      url: 'https://www.aaopt.org/'
    }
  ],
  knowsAbout: [
    'Comprehensive eye examinations',
    'Specialty and complex contact lens fitting',
    'LASIK co-management',
    'Glaucoma diagnosis and management',
    'Dry eye disease',
    'Diabetic retinopathy',
    'Macular degeneration',
    'Cataract co-management'
  ],
  worksFor: { '@id': ORG_ID },
  workLocation: [{ '@id': NA_CLINIC_ID }, { '@id': ND_CLINIC_ID }],
  affiliation: {
    '@type': 'Hospital',
    name: "Saint Luke's Hospital of New Bedford"
  },
  mainEntityOfPage: `${CANONICAL_ORIGIN}/doctors/john-magalhaes`,
  sameAs: [
    'https://www.linkedin.com/in/johnmagalhaes/',
    'https://www.healthgrades.com/providers/john-magalhaes-2n6c9',
    'https://doctor.webmd.com/doctor/john-magalhaes-2368a0ba-4903-4543-8e9d-7800cf5d5f17-overview'
  ]
});

// One schema block per page (a handoff rule: never two LocalBusiness
// objects on the same URL). Keys are trailing-slash-normalized paths.
export const getSchemaForPath = (path) => {
  switch (path) {
    case '/':
      return organizationSchema();
    case '/location/north-attleboro-fashion-crossing':
      return northAttleboroSchema();
    case '/location/north-dartmouth':
      return northDartmouthSchema();
    case '/doctors/john-magalhaes':
      return johnMagalhaesSchema();
    default:
      return null;
  }
};

// Blog posts. Not part of the SEO handoff: one BlogPosting block per post
// page, attributed to the practice (the organization defined on the
// homepage) rather than to an individual, since posts may be written by
// staff on a doctor's behalf.
export const getPostSchema = (post) => {
  const practice = {
    '@type': 'MedicalOrganization',
    '@id': ORG_ID,
    name: 'Dr. Magalhaes and Associates, Inc.',
    url: `${CANONICAL_ORIGIN}/`
  };
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    ...(post.summary ? { description: post.summary } : {}),
    ...(post.coverImageUrl ? { image: `${CANONICAL_ORIGIN}${post.coverImageUrl}` } : {}),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: getCanonicalUrl(`/blog/${post.slug}`),
    author: practice,
    publisher: practice
  };
};
