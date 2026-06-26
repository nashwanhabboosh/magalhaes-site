import React from 'react';
import JohnHeadshot from '../../assets/Doctors/John.jpg'
import { DoctorProfile } from '../../components/DoctorProfile'; // Adjust the path accordingly

const JohnMagalhaes = () => {
  const doctorData = {
    name: "John Magalhães",
    credentials: "OD, FAAO",
    image: JohnHeadshot,
    bio: `
      Dr. John Magalhães brings over 30 years of clinical experience in medical eye care as managing doctor. He received his Bachelor’s degree and Doctorate degree in Optometry from the acclaimed New England College of Optometry.

      Having served two terms as President of the Massachusetts Society of Optometrists, he has had the privilege of working with industry leaders in the practice of ophthalmic medicine. He was elected by his peers as Young Optometrist of the Year in 2012. Board Certified in Optometry, he always promotes the highest level of clinical care and technology.

      Dr. Magalhães has dedicated his time to noble outreaches to countries such as Haiti, Tanzania, Bolivia, and Morocco. These medical missions resulted in thousands of eye examinations, treatment of eye diseases, and dispensing of countless eye prescriptions. A new mission is in the planning.

      Dr. Magalhães is accepting new patients and continues to bring his expertise and passion to the care of patients of any age. He is committed to providing the best possible care and ensuring his patients have access to the most advanced and effective treatments.
    `,
    education: [
      "Doctor of Optometry (OD) - New England College of Optometry",
      "Bachelor of Science in Optometry - New England College of Optometry"
    ],
    experience: [
      "Over 30 years of clinical experience in medical eye care",
      "Managing Doctor at LensCrafters",
      "Former President, Massachusetts Society of Optometrists (2 terms)",
      "Elected Young Optometrist of the Year, 2012",
      "Board Certified in Optometry",
      "Experienced in performing complex eye exams, contact lens fittings, and glaucoma management"
    ]
  };

  return <DoctorProfile doctor={doctorData} />;
};

export default JohnMagalhaes;
