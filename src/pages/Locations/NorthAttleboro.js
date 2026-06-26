// NorthAttleboro.js
import React from 'react';
import LocationPage from '../../components/LocationPage';

const NorthAttleboroLocation = () => {
  const locationData = {
    name: "North Attleboro Fashion Crossing",
    address: {
      street: "1250 S. Washington St",
      city: "North Attleborough",
      state: "MA",
      zip: "02760"
    },
    phone: "508-717-0425",
    fax: "508-992-3239",
    hours: [
      { day: "Monday", hours: "9:00 AM - 6:30 PM", isOpen: true },
      { day: "Tuesday", hours: "9:00 AM - 6:30 PM", isOpen: true },
      { day: "Wednesday", hours: "9:00 AM - 6:30 PM", isOpen: true },
      { day: "Thursday", hours: "9:00 AM - 6:30 PM", isOpen: true },
      { day: "Friday", hours: "9:00 AM - 6:30 PM", isOpen: true },
      { day: "Saturday", hours: "9:00 AM - 4:30 PM", isOpen: true },
      { day: "Sunday", hours: "12:00 PM - 3:30 PM", isOpen: true }
    ],
    coordinates: {
      lat: 41.9329,
      lng: -71.3398
    },
    // To get the actual embed URL:
    // 1. Go to Google Maps: https://www.google.com/maps
    // 2. Search for your address: "1250 S. Washington St, North Attleborough, MA 02760"
    // 3. Click "Share" button
    // 4. Click "Embed a map" tab
    // 5. Copy the src URL from the iframe code
    mapEmbed:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2967.8336979770897!2d-71.3503967242156!3d41.93942477123503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e45d633f1697fb%3A0x8f44abc25c938a5a!2s1250%20S%20Washington%20St%2C%20North%20Attleborough%2C%20MA%2002760!5e0!3m2!1sen!2sus!4v1764319263337!5m2!1sen!2sus"
  };

  return <LocationPage location={locationData} />;
};

export default NorthAttleboroLocation;

/*
 * INSTRUCTIONS FOR GETTING THE REAL GOOGLE MAPS EMBED URL:
 * 
 * 1. Go to https://www.google.com/maps
 * 2. Search for: "1250 S. Washington St, North Attleborough, MA 02760"
 * 3. Click the "Share" button
 * 4. Select the "Embed a map" tab
 * 5. Choose your preferred size (Small, Medium, Large, or Custom)
 * 6. Copy the entire src URL from the <iframe> code
 * 7. Replace the mapEmbed value above with your copied URL
 * 
 * Example of what the real embed URL looks like:
 * "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2961.3956... (very long string)"
 * 
 * The current URL is a placeholder and won't show the exact location.
 */