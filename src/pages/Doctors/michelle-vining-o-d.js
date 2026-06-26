import React from 'react';
import MichelleHeadshot from '../../assets/Doctors/Michelle.jpg'; // Update with actual path
import { DoctorProfile } from '../../components/DoctorProfile';

const MichelleVining = () => {
  const doctorData = {
    name: "Michelle Vining",
    credentials: "OD",
    image: MichelleHeadshot,
    bio: `
      Dr. Michelle Vining is a board-certified optometrist who earned her Doctor of Optometry degree at SUNY College of Optometry in New York, NY in 2017. Her internships include Woodhull Medical Center, East New York Diagnostic and Treatment Center, and Omni Eye Services.
      
      She specializes in primary eye care and performs comprehensive eye exams including contact lens fittings, treatment of ocular disease, and post-surgical management. She is competent in diagnosing and managing ocular diseases including diabetic retinopathy, macular degeneration, and dry eye among others.
      
      Dr. Vining is fluent in Spanish and is happy to serve providing eye care in her community.
    `,
    education: [
      "Doctor of Optometry (OD) - SUNY College of Optometry, New York, NY, 2017",
      "Board-Certified Optometrist"
    ],
    experience: [
      "Internship at Woodhull Medical Center",
      "Internship at East New York Diagnostic and Treatment Center",
      "Internship at Omni Eye Services",
      "Experienced in post-surgical management",
      "Ocular disease diagnosis and treatment",
      "Bilingual services (English/Spanish)"
    ],
    specialties: [
      "Primary eye care",
      "Comprehensive eye examinations",
      "Contact lens fittings",
      "Treatment of ocular disease",
      "Post-surgical management",
      "Diabetic retinopathy management",
      "Macular degeneration care",
      "Dry eye management",
      "Bilingual eye care services"
    ]
  };

  return <DoctorProfile doctor={doctorData} />;
};

export default MichelleVining;