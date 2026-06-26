import React from 'react';
import NicoleHeadshot from '../../assets/Doctors/Nicole.jpg'; // Update with actual path
import { DoctorProfile } from '../../components/DoctorProfile';

const NicolePatricio = () => {
  const doctorData = {
    name: "Nicole Patricio Mowatt",
    credentials: "OD, MPH",
    image: NicoleHeadshot,
    bio: `
      Dr. Nicole Patricio Mowatt is a graduate of the University of Massachusetts Dartmouth where she received her Bachelor of Sciences Degree in Biology. She then received her doctorate in Optometry and Master in Public Health from MCPHS University in 2016.
      
      Her internships include Upham's Health Center and Fenway Health Center, where she gained valuable experience in community health and comprehensive eye care.
      
      Dr. Patricio Mowatt is licensed in Massachusetts and Rhode Island and is a member of the American Optometric Association as well as the American Academy of Optometrists. She is dedicated to providing thorough comprehensive eye exams with a focus on patient education and personalized care.
    `,
    education: [
      "Doctor of Optometry (OD) - MCPHS University, 2016",
      "Master in Public Health (MPH) - MCPHS University, 2016",
      "Bachelor of Sciences in Biology - University of Massachusetts Dartmouth"
    ],
    experience: [
      "Licensed in Massachusetts and Rhode Island",
      "Internship at Upham's Health Center",
      "Internship at Fenway Health Center",
      "Member, American Optometric Association",
      "Member, American Academy of Optometrists",
      "Experienced in comprehensive eye examinations",
      "Focus on community health and patient education"
    ],
    specialties: [
      "Comprehensive eye examinations",
      "Public health optometry",
      "Patient education and counseling",
      "Preventive eye care",
      "Community health eye care"
    ],
    testimonials: [
      {
        text: "Best experience I’ve ever had at the eye doctors. She was just wonderful! And extremely patient and informative. I always felt rushed at my previous eye doctor’s office and once was even insulted. My entire experience from the moment I walked in the door was incredible. Highly recommend 💕 ",
        author: "Jennifer Yentz"
      }
    ]
  };

  return <DoctorProfile doctor={doctorData} />;
};

export default NicolePatricio;