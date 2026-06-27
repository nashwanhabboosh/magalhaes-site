// src/data/locations.js
//
// Single source of truth for office location data, used by:
//   - pages/Locations/Locations.js      (the two-location overview grid)
//   - pages/Locations/NorthAttleboro.js (full North Attleboro detail page)
//   - pages/Locations/Dartmouth.js      (full North Dartmouth detail page)
//   - pages/Home/Home.js                (brief "Two Convenient Locations" cards)
//   - pages/Contact/ContactUs.js        (location info next to the contact form)
//
// Previously, the address/phone/fax/hours/map-embed data for each office was
// duplicated across all of the above, with two slightly different shapes for
// `hours` (a per-day array in some places, a {weekday, saturday, sunday}
// summary object in others). This file standardizes on the per-day array
// (it's the richer shape -- it's what lets the location detail page
// highlight "today" in the hours list) and any page that wants the
// simpler weekday/saturday/sunday summary can derive it with
// getWeekdaySummary() below.

export const locations = [
  {
    slug: 'north-attleboro',
    name: 'North Attleboro Fashion Crossing',
    shortName: 'North Attleboro',
    route: '/location/north-attleboro-fashion-crossing/',
    address: {
      street: '1250 S. Washington St',
      street2: 'Fashion Crossing',
      city: 'North Attleborough',
      state: 'MA',
      zip: '02760'
    },
    phone: '508-717-0425',
    fax: '508-992-3239',
    hours: [
      { day: 'Monday', hours: '9:00 AM - 6:30 PM', isOpen: true },
      { day: 'Tuesday', hours: '9:00 AM - 6:30 PM', isOpen: true },
      { day: 'Wednesday', hours: '9:00 AM - 6:30 PM', isOpen: true },
      { day: 'Thursday', hours: '9:00 AM - 6:30 PM', isOpen: true },
      { day: 'Friday', hours: '9:00 AM - 6:30 PM', isOpen: true },
      { day: 'Saturday', hours: '9:00 AM - 4:30 PM', isOpen: true },
      { day: 'Sunday', hours: '12:00 PM - 3:30 PM', isOpen: true }
    ],
    coordinates: {
      lat: 41.9329,
      lng: -71.3398
    },
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2967.8336979770897!2d-71.3503967242156!3d41.93942477123503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e45d633f1697fb%3A0x8f44abc25c938a5a!2s1250%20S%20Washington%20St%2C%20North%20Attleborough%2C%20MA%2002760!5e0!3m2!1sen!2sus!4v1764319263337!5m2!1sen!2sus'
  },
  {
    slug: 'north-dartmouth',
    name: 'North Dartmouth',
    shortName: 'Dartmouth',
    route: '/location/north-dartmouth/',
    address: {
      street: '382 State Road',
      street2: 'Dartmouth Towne Center',
      city: 'North Dartmouth',
      state: 'MA',
      zip: '02747'
    },
    phone: '508-717-0425',
    fax: '508-992-3239',
    hours: [
      { day: 'Monday', hours: '9:00 AM - 6:30 PM', isOpen: true },
      { day: 'Tuesday', hours: '9:00 AM - 6:30 PM', isOpen: true },
      { day: 'Wednesday', hours: '9:00 AM - 6:30 PM', isOpen: true },
      { day: 'Thursday', hours: '9:00 AM - 6:30 PM', isOpen: true },
      { day: 'Friday', hours: '9:00 AM - 6:30 PM', isOpen: true },
      { day: 'Saturday', hours: '9:00 AM - 4:30 PM', isOpen: true },
      { day: 'Sunday', hours: '12:00 PM - 3:30 PM', isOpen: true }
    ],
    coordinates: {
      lat: 41.6351,
      lng: -70.9828
    },
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2981.683444508563!2d-70.99739972423218!3d41.64097337126886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e4e344f426dcbf%3A0x93c04ae41d179eee!2sDr.%20Magalhaes%20and%20Associates%2C%20Inc.!5e0!3m2!1sen!2sus!4v1764399606519!5m2!1sen!2sus'
  }
];

export const getLocationBySlug = (slug) => locations.find((loc) => loc.slug === slug);

// Combines street + street2 (if present) + city/state/zip into one string,
// e.g. for use in a Google Maps directions link.
export const formatAddress = (address) =>
  [address.street, address.street2].filter(Boolean).join(', ') +
  `, ${address.city}, ${address.state} ${address.zip}`;

// Derives the simpler {weekday, saturday, sunday} summary some pages use
// for a compact display, from the canonical per-day hours array. Assumes
// Mon-Fri share the same hours (true for both current locations).
export const getWeekdaySummary = (hours) => ({
  weekday: hours.find((h) => h.day === 'Monday')?.hours ?? '',
  saturday: hours.find((h) => h.day === 'Saturday')?.hours ?? '',
  sunday: hours.find((h) => h.day === 'Sunday')?.hours ?? ''
});

// Formats a stored "508-717-0425" phone/fax number as "(508) 717-0425"
// for display, e.g. on the Contact page.
export const formatPhone = (number) => {
  const digits = number.replace(/\D/g, '');
  if (digits.length !== 10) return number;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};
