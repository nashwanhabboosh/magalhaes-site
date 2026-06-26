import React from 'react';
import Jacqueline_Headshot from '../../assets/Doctors/Jacqueline.jpg'; // Update with actual path
import { DoctorProfile } from '../../components/DoctorProfile';

const JacquelineKlombers = () => {
  const doctorData = {
    name: "Jacqueline Klombers",
    credentials: "OD",
    image: Jacqueline_Headshot,
    bio: `
      Dr. Jacqueline Klombers is a Pennsylvania native who completed her Bachelor's of Science in Biology from the University of New Hampshire. She then received her Doctorate of Optometry from the New England College of Optometry in 2025. Her internships included medical based optometry at Jamaica Plain VA Medical Center, Boston University Eye, and Dorchester Community Health Center. She is experienced with providing comprehensive eye-care and low vision exams.

      In her spare time, Dr. Klombers is also a figure skating coach at the Boston Bruin's practice arena. She loves spending time with family and enjoys hiking with her rescue corgi, Peanut.
    `,
    education: [
      "Doctor of Optometry (OD) - New England College of Optometry, 2025",
      "Bachelor's of Science in Biology - University of New Hampshire"
    ],
    experience: [
      "Internship at Jamaica Plain VA Medical Center",
      "Internship at Boston University Eye",
      "Internship at Dorchester Community Health Center",
      "Comprehensive eye-care exams",
      "Low vision exams"
    ],
    specialties: [
      "Comprehensive Eye Care",
      "Low Vision Exams",
      "Medical Based Optometry"
    ]
  };

  return <DoctorProfile doctor={doctorData} />;
};

export default JacquelineKlombers;