import React from 'react';
import TinaHeadshot from '../../assets/Doctors/Tina.jpg'; // Update with actual path
import { DoctorProfile } from '../../components/DoctorProfile';

const TinaParker = () => {
  const doctorData = {
    name: "Tina Parker",
    credentials: "OD",
    image: TinaHeadshot,
    bio: `
      Dr. Parker is an experienced Optometrist with a demonstrated history of working in the optometric medical practice industry. She is skilled in primary family eye care, medically based eyecare, emergencies, pre and post-operative care, pediatrics, dry eye management, specialty contact lenses, keratoconus, scleral contact lenses, and vision rehabilitation.
      
      Dr. Parker graduated from the New England College of Optometry and completed a Pediatric Residency, which has given her advanced expertise in caring for patients of all ages, with a special focus on children's vision care.
      
      Her comprehensive skill set and dedication to patient care make her a valuable asset to the practice, providing expert care across a wide range of optometric services.
    `,
    education: [
      "Doctor of Optometry (OD) - New England College of Optometry",
      "Pediatric Residency - Advanced training in children's vision care"
    ],
    experience: [
      "Demonstrated history in optometric medical practice",
      "Completed Pediatric Residency",
      "Expert in primary family eye care",
      "Emergency eye care specialist",
      "Pre and post-operative care management",
      "Vision rehabilitation specialist"
    ],
    specialties: [
      "Primary family eye care",
      "Medically based eye care",
      "Eye emergencies",
      "Pre and post-operative care",
      "Pediatric eye care",
      "Dry eye management",
      "Specialty contact lenses",
      "Keratoconus treatment",
      "Scleral contact lenses",
      "Vision rehabilitation"
    ]
  };

  return <DoctorProfile doctor={doctorData} />;
};

export default TinaParker;