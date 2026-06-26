import React from 'react';
import DomenicHeadshot from '../../assets/Doctors/Domenic.jpg'; // Update with actual path
import { DoctorProfile } from '../../components/DoctorProfile';

const DomenicCovello = () => {
  const doctorData = {
    name: "Domenic Covello",
    credentials: "OD",
    image: DomenicHeadshot,
    bio: `
      Dr. Domenic Covello is a graduate of Providence College in Providence, RI and received his Doctor of Optometry degree from the Pennsylvania College of Optometry at Salus University in 2012. While in optometry school he was a member of the Beta Sigma Kappa honor society.
      
      Dr. Covello practices in both the North Attleboro and North Dartmouth offices where he provides patients with comprehensive family eye examinations and contact lens evaluations. He has been an extremely valuable, loyal, and dedicated staff doctor. He is our longest standing doctor with 10 years experience at Dr. Magalhaes and Associates.
      
      Dr. Covello is licensed in Massachusetts and is a member of the American Optometric Association and the Massachusetts Society of Optometry. He interned at the VA Hospitals in Jamaica Plain, MA and Providence, RI where he was trained to diagnose and care for individuals with retinal disease, cataracts, and glaucoma.
      
      Dr. Covello is dedicated to providing patients with thorough comprehensive vision care in a friendly and professional environment.
    `,
    education: [
      "Doctor of Optometry (OD) - Pennsylvania College of Optometry at Salus University, 2012",
      "Bachelor's Degree - Providence College, Providence, RI",
      "Beta Sigma Kappa Honor Society Member"
    ],
    experience: [
      `${new Date().getFullYear() - 2012} years at Dr. Magalhaes and Associates (longest standing doctor)`,
      "Practices at North Attleboro and North Dartmouth offices",
      "Internship at VA Hospital, Jamaica Plain, MA",
      "Internship at VA Hospital, Providence, RI",
      "Specialized training in retinal disease, cataracts, and glaucoma",
      "Licensed in Massachusetts",
      "Member, American Optometric Association",
      "Member, Massachusetts Society of Optometry"
    ],
    specialties: [
      "Comprehensive family eye examinations",
      "Contact lens evaluations and fittings",
      "Retinal disease diagnosis and management",
      "Cataract care",
      "Glaucoma diagnosis and management",
      "Amblyopia treatment",
      "Pediatric eye care"
    ],
    testimonials: [
      {
        text: "My son has amblyopia. His depth perception was terrible, and his left eye very weak. Dr. Covello has been very diligently doing his best to help correct his eye issue to the fullest extent. My son has gained some small amount of depth perception, and his vision in the bad eye has improved two lines on the chart. We won't let any other eye doctor see him. Dr. Covello has improved the quality of my son's vision greatly. He is patient during exams, and explains his findings and concerns. I'm thrilled that we found him. Excellent eye doctor.",
        author: "Parent of Pediatric Patient"
      }
    ]
  };

  return <DoctorProfile doctor={doctorData} />;
};

export default DomenicCovello;