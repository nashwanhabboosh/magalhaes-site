import React from 'react';
import EvanHeadshot from '../../assets/Doctors/Evan.jpg'; // Update with actual path
import { DoctorProfile } from '../../components/DoctorProfile';

const EvanHosney = () => {
  const doctorData = {
    name: "Evan Hosney",
    credentials: "OD",
    image: EvanHeadshot,
    bio: `
      Dr. Evan Hosney was born and raised in Cumberland, RI. He attended The University of Rhode Island where he earned his Bachelor's of Science in Cellular Biology. After graduation, Dr. Hosney took a year away from studying and spent time working at Lenscrafters in their ophthalmic lab constructing glasses and at an optometric practice working with patients. After gaining insight into optometry he moved to Worcester to attend MCPHS University's School of Optometry for his Doctorate of Optometry.
      
      His hands-on experience in both optical lab work and patient care prior to optometry school has given him a unique perspective and comprehensive understanding of all aspects of eye care, from fabrication to clinical practice.
      
      Dr. Hosney is an avid sports fan who most enjoys playing and watching hockey – Go Bruins!
    `,
    education: [
      "Doctor of Optometry (OD) - MCPHS University's School of Optometry",
      "Bachelor's of Science in Cellular Biology - University of Rhode Island"
    ],
    experience: [
      "Ophthalmic lab experience at Lenscrafters",
      "Patient care experience in optometric practice",
      "Hands-on optical fabrication and construction",
      "Comprehensive understanding of clinical and technical optometry",
      "Rhode Island native with deep community roots"
    ],
    specialties: [
      "Comprehensive eye examinations",
      "Optical fabrication knowledge",
      "Patient-centered care",
      "Eyeglass fitting and adjustments"
    ]
  };

  return <DoctorProfile doctor={doctorData} />;
};

export default EvanHosney;