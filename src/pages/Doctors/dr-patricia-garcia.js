import React from 'react';
import PatriciaHeadshot from '../../assets/Doctors/Patricia.jpg'; // Update with actual path
import { DoctorProfile } from '../../components/DoctorProfile';

const PatriciaGarcia = () => {
  const doctorData = {
    name: "Patricia Garcia",
    credentials: "OD",
    image: PatriciaHeadshot,
    bio: `
      Dr. Patricia Garcia is a graduate of California State University, San Marcos where she received a Bachelor's degree in Biology. She also studied Physiology. After exploring post graduate options, she decided to enroll in the Optometry program at the Massachusetts College of Pharmacy and Health Sciences, where, after a successful 4 years, she graduated with a degree as a Doctor of Optometry.
      
      She gained vast experience in the treatment of eye disease, functional vision care, and refraction rotating through clinics in Massachusetts and Rhode Island. Those included Boston Vision, the Edward M Kennedy Community Health Center, and the Providence Veterans Affairs Hospital.
      
      Her specialties include post-operative care of cataracts, Lasik, and glaucoma. She is well versed in the fitting of specialty contact lenses and anterior segment disease. She welcomes all patients, including her beloved Spanish-speaking population.
    `,
    education: [
      "Doctor of Optometry (OD) - Massachusetts College of Pharmacy and Health Sciences",
      "Bachelor's Degree in Biology - California State University, San Marcos",
      "Physiology Studies - California State University, San Marcos"
    ],
    experience: [
      "Clinical rotation at Boston Vision",
      "Clinical rotation at Edward M Kennedy Community Health Center",
      "Clinical rotation at Providence Veterans Affairs Hospital",
      "Extensive experience in treatment of eye disease",
      "Functional vision care specialist",
      "Post-operative care management",
      "Bilingual services (English/Spanish)"
    ],
    specialties: [
      "Post-operative care of cataracts",
      "Post-operative Lasik care",
      "Glaucoma management",
      "Specialty contact lens fittings",
      "Anterior segment disease",
      "Eye disease treatment",
      "Functional vision care",
      "Bilingual eye care services"
    ]
  };

  return <DoctorProfile doctor={doctorData} />;
};

export default PatriciaGarcia;