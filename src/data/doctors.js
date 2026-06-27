// src/data/doctors.js
//
// Single source of truth for doctor data, used by both:
//   - pages/Doctors/Doctors.js          (the grid/listing page)
//   - pages/Doctors/<doctor-slug>.js    (each doctor's full profile page)
//
// Previously this data was duplicated in both places (a summary version
// in Doctors.js and a full version on each profile page), which meant a
// name, credential, or slug change had to be made in two places and could
// drift out of sync (this already happened once: see the Jacqueline
// Klombers slug bugfix in this same cleanup).
//
// `slug` is the URL segment used in both the route path (App.js) and the
// nav dropdown link (Header.js) — e.g. slug: 'john-magalhaes' results in
// the route /doctors/john-magalhaes.

import johnImg from '../assets/Doctors/John.jpg';
import domenicImg from '../assets/Doctors/Domenic.jpg';
import nicoleImg from '../assets/Doctors/Nicole.jpg';
import patriciaImg from '../assets/Doctors/Patricia.jpg';
import tinaImg from '../assets/Doctors/Tina.jpg';
import evanImg from '../assets/Doctors/Evan.jpg';
import michelleImg from '../assets/Doctors/Michelle.jpg';
import jacquelineImg from '../assets/Doctors/Jacqueline.jpg';

export const doctors = [
  {
    slug: 'john-magalhaes',
    name: 'John Magalhães',
    credentials: 'OD, FAAO',
    image: johnImg,
    specialty: 'Managing Doctor, Medical Eye Care',
    summary: 'Nearly 26 years of clinical experience with a focus on the highest level of clinical care and technology. Board Certified and former President of the Massachusetts Society of Optometrists.',
    highlights: ['26 Years Experience', 'Board Certified', 'Medical Missions', 'Young OD of the Year 2012'],
    bio: `
      Dr. John Magalhães brings over 30 years of clinical experience in medical eye care as managing doctor. He received his Bachelor’s degree and Doctorate degree in Optometry from the acclaimed New England College of Optometry.

      Having served two terms as President of the Massachusetts Society of Optometrists, he has had the privilege of working with industry leaders in the practice of ophthalmic medicine. He was elected by his peers as Young Optometrist of the Year in 2012. Board Certified in Optometry, he always promotes the highest level of clinical care and technology.

      Dr. Magalhães has dedicated his time to noble outreaches to countries such as Haiti, Tanzania, Bolivia, and Morocco. These medical missions resulted in thousands of eye examinations, treatment of eye diseases, and dispensing of countless eye prescriptions. A new mission is in the planning.

      Dr. Magalhães is accepting new patients and continues to bring his expertise and passion to the care of patients of any age. He is committed to providing the best possible care and ensuring his patients have access to the most advanced and effective treatments.
    `,
    education: [
      'Doctor of Optometry (OD) - New England College of Optometry',
      'Bachelor of Science in Optometry - New England College of Optometry'
    ],
    experience: [
      'Over 30 years of clinical experience in medical eye care',
      'Managing Doctor at LensCrafters',
      'Former President, Massachusetts Society of Optometrists (2 terms)',
      'Elected Young Optometrist of the Year, 2012',
      'Board Certified in Optometry',
      'Experienced in performing complex eye exams, contact lens fittings, and glaucoma management'
    ]
  },
  {
    slug: 'domenic-covello',
    name: 'Domenic Covello',
    credentials: 'OD',
    image: domenicImg,
    specialty: 'Comprehensive Family Eye Care',
    summary: 'Graduate of Pennsylvania College of Optometry with 10 years at Dr. Magalhães and Associates. Specialized training in retinal disease, cataracts, and glaucoma from VA Hospital internships.',
    highlights: ['10 Years at DMA', 'Beta Sigma Kappa', 'VA Hospital Training', 'Contact Lens Expert'],
    bio: `
      Dr. Domenic Covello is a graduate of Providence College in Providence, RI and received his Doctor of Optometry degree from the Pennsylvania College of Optometry at Salus University in 2012. While in optometry school he was a member of the Beta Sigma Kappa honor society.
      
      Dr. Covello practices in both the North Attleboro and North Dartmouth offices where he provides patients with comprehensive family eye examinations and contact lens evaluations. He has been an extremely valuable, loyal, and dedicated staff doctor. He is our longest standing doctor with 10 years experience at Dr. Magalhaes and Associates.
      
      Dr. Covello is licensed in Massachusetts and is a member of the American Optometric Association and the Massachusetts Society of Optometry. He interned at the VA Hospitals in Jamaica Plain, MA and Providence, RI where he was trained to diagnose and care for individuals with retinal disease, cataracts, and glaucoma.
      
      Dr. Covello is dedicated to providing patients with thorough comprehensive vision care in a friendly and professional environment.
    `,
    education: [
      'Doctor of Optometry (OD) - Pennsylvania College of Optometry at Salus University, 2012',
      'Bachelor\'s Degree - Providence College, Providence, RI',
      'Beta Sigma Kappa Honor Society Member'
    ],
    experience: [
      `${new Date().getFullYear() - 2012} years at Dr. Magalhaes and Associates (longest standing doctor)`,
      'Practices at North Attleboro and North Dartmouth offices',
      'Internship at VA Hospital, Jamaica Plain, MA',
      'Internship at VA Hospital, Providence, RI',
      'Specialized training in retinal disease, cataracts, and glaucoma',
      'Licensed in Massachusetts',
      'Member, American Optometric Association',
      'Member, Massachusetts Society of Optometry'
    ],
    specialties: [
      'Comprehensive family eye examinations',
      'Contact lens evaluations and fittings',
      'Retinal disease diagnosis and management',
      'Cataract care',
      'Glaucoma diagnosis and management',
      'Amblyopia treatment',
      'Pediatric eye care'
    ],
    testimonials: [
      {
        text: "My son has amblyopia. His depth perception was terrible, and his left eye very weak. Dr. Covello has been very diligently doing his best to help correct his eye issue to the fullest extent. My son has gained some small amount of depth perception, and his vision in the bad eye has improved two lines on the chart. We won't let any other eye doctor see him. Dr. Covello has improved the quality of my son's vision greatly. He is patient during exams, and explains his findings and concerns. I'm thrilled that we found him. Excellent eye doctor.",
        author: 'Parent of Pediatric Patient'
      }
    ]
  },
  {
    slug: 'nicole-patricio',
    name: 'Nicole Patricio Mowatt',
    credentials: 'OD, MPH',
    image: nicoleImg,
    specialty: 'Comprehensive Eye Care & Public Health',
    summary: 'Double doctorate in Optometry and Master in Public Health from MCPHS University. Dedicated to patient education and personalized care with community health focus.',
    highlights: ['MPH Degree', 'Community Health Focus', 'Patient Education', 'AAO Member'],
    bio: `
      Dr. Nicole Patricio Mowatt is a graduate of the University of Massachusetts Dartmouth where she received her Bachelor of Sciences Degree in Biology. She then received her doctorate in Optometry and Master in Public Health from MCPHS University in 2016.
      
      Her internships include Upham's Health Center and Fenway Health Center, where she gained valuable experience in community health and comprehensive eye care.
      
      Dr. Patricio Mowatt is licensed in Massachusetts and Rhode Island and is a member of the American Optometric Association as well as the American Academy of Optometrists. She is dedicated to providing thorough comprehensive eye exams with a focus on patient education and personalized care.
    `,
    education: [
      'Doctor of Optometry (OD) - MCPHS University, 2016',
      'Master in Public Health (MPH) - MCPHS University, 2016',
      'Bachelor of Sciences in Biology - University of Massachusetts Dartmouth'
    ],
    experience: [
      'Licensed in Massachusetts and Rhode Island',
      "Internship at Upham's Health Center",
      'Internship at Fenway Health Center',
      'Member, American Optometric Association',
      'Member, American Academy of Optometrists',
      'Experienced in comprehensive eye examinations',
      'Focus on community health and patient education'
    ],
    specialties: [
      'Comprehensive eye examinations',
      'Public health optometry',
      'Patient education and counseling',
      'Preventive eye care',
      'Community health eye care'
    ],
    testimonials: [
      {
        text: "Best experience I’ve ever had at the eye doctors. She was just wonderful! And extremely patient and informative. I always felt rushed at my previous eye doctor’s office and once was even insulted. My entire experience from the moment I walked in the door was incredible. Highly recommend 💕 ",
        author: 'Jennifer Yentz'
      }
    ]
  },
  {
    slug: 'patricia-garcia',
    name: 'Patricia Garcia',
    credentials: 'OD',
    image: patriciaImg,
    specialty: 'Post-Operative Care & Specialty Contact Lenses',
    summary: 'MCPHS graduate specializing in post-operative care of cataracts, LASIK, and glaucoma. Expert in specialty contact lenses and bilingual Spanish services.',
    highlights: ['Post-Op Specialist', 'Specialty Contact Lenses', 'Bilingual Spanish', 'Anterior Segment Expert'],
    bio: `
      Dr. Patricia Garcia is a graduate of California State University, San Marcos where she received a Bachelor's degree in Biology. She also studied Physiology. After exploring post graduate options, she decided to enroll in the Optometry program at the Massachusetts College of Pharmacy and Health Sciences, where, after a successful 4 years, she graduated with a degree as a Doctor of Optometry.
      
      She gained vast experience in the treatment of eye disease, functional vision care, and refraction rotating through clinics in Massachusetts and Rhode Island. Those included Boston Vision, the Edward M Kennedy Community Health Center, and the Providence Veterans Affairs Hospital.
      
      Her specialties include post-operative care of cataracts, Lasik, and glaucoma. She is well versed in the fitting of specialty contact lenses and anterior segment disease. She welcomes all patients, including her beloved Spanish-speaking population.
    `,
    education: [
      'Doctor of Optometry (OD) - Massachusetts College of Pharmacy and Health Sciences',
      "Bachelor's Degree in Biology - California State University, San Marcos",
      'Physiology Studies - California State University, San Marcos'
    ],
    experience: [
      'Clinical rotation at Boston Vision',
      'Clinical rotation at Edward M Kennedy Community Health Center',
      'Clinical rotation at Providence Veterans Affairs Hospital',
      'Extensive experience in treatment of eye disease',
      'Functional vision care specialist',
      'Post-operative care management',
      'Bilingual services (English/Spanish)'
    ],
    specialties: [
      'Post-operative care of cataracts',
      'Post-operative Lasik care',
      'Glaucoma management',
      'Specialty contact lens fittings',
      'Anterior segment disease',
      'Eye disease treatment',
      'Functional vision care',
      'Bilingual eye care services'
    ]
  },
  {
    slug: 'tina-parker',
    name: 'Tina Parker',
    credentials: 'OD',
    image: tinaImg,
    specialty: 'Pediatrics & Vision Rehabilitation',
    summary: "New England College of Optometry graduate with Pediatric Residency. Advanced expertise in children's vision care, dry eye management, and scleral contact lenses.",
    highlights: ['Pediatric Residency', "Children's Vision", 'Dry Eye Management', 'Scleral Lenses'],
    bio: `
      Dr. Parker is an experienced Optometrist with a demonstrated history of working in the optometric medical practice industry. She is skilled in primary family eye care, medically based eyecare, emergencies, pre and post-operative care, pediatrics, dry eye management, specialty contact lenses, keratoconus, scleral contact lenses, and vision rehabilitation.
      
      Dr. Parker graduated from the New England College of Optometry and completed a Pediatric Residency, which has given her advanced expertise in caring for patients of all ages, with a special focus on children's vision care.
      
      Her comprehensive skill set and dedication to patient care make her a valuable asset to the practice, providing expert care across a wide range of optometric services.
    `,
    education: [
      'Doctor of Optometry (OD) - New England College of Optometry',
      "Pediatric Residency - Advanced training in children's vision care"
    ],
    experience: [
      'Demonstrated history in optometric medical practice',
      'Completed Pediatric Residency',
      'Expert in primary family eye care',
      'Emergency eye care specialist',
      'Pre and post-operative care management',
      'Vision rehabilitation specialist'
    ],
    specialties: [
      'Primary family eye care',
      'Medically based eye care',
      'Eye emergencies',
      'Pre and post-operative care',
      'Pediatric eye care',
      'Dry eye management',
      'Specialty contact lenses',
      'Keratoconus treatment',
      'Scleral contact lenses',
      'Vision rehabilitation'
    ]
  },
  {
    slug: 'evan-hosney',
    name: 'Evan Hosney',
    credentials: 'OD',
    image: evanImg,
    specialty: 'Comprehensive Eye Care',
    summary: 'MCPHS University graduate with unique hands-on experience in optical lab work and patient care. Comprehensive understanding from fabrication to clinical practice.',
    highlights: ['Lab Experience', 'Comprehensive Care', 'Contact Lenses', 'Sports Enthusiast'],
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
      'Ophthalmic lab experience at Lenscrafters',
      'Patient care experience in optometric practice',
      'Hands-on optical fabrication and construction',
      'Comprehensive understanding of clinical and technical optometry',
      'Rhode Island native with deep community roots'
    ],
    specialties: [
      'Comprehensive eye examinations',
      'Optical fabrication knowledge',
      'Patient-centered care',
      'Eyeglass fitting and adjustments'
    ]
  },
  {
    slug: 'michelle-vining',
    name: 'Michelle Vining',
    credentials: 'OD',
    image: michelleImg,
    specialty: 'Primary Eye Care & Ocular Disease',
    summary: 'Board-certified SUNY College of Optometry graduate. Specializes in diabetic retinopathy, macular degeneration, and dry eye. Fluent in Spanish.',
    highlights: ['Board Certified', 'Bilingual Spanish', 'Disease Management', 'Post-Surgical Care'],
    bio: `
      Dr. Michelle Vining is a board-certified optometrist who earned her Doctor of Optometry degree at SUNY College of Optometry in New York, NY in 2017. Her internships include Woodhull Medical Center, East New York Diagnostic and Treatment Center, and Omni Eye Services.
      
      She specializes in primary eye care and performs comprehensive eye exams including contact lens fittings, treatment of ocular disease, and post-surgical management. She is competent in diagnosing and managing ocular diseases including diabetic retinopathy, macular degeneration, and dry eye among others.
      
      Dr. Vining is fluent in Spanish and is happy to serve providing eye care in her community.
    `,
    education: [
      'Doctor of Optometry (OD) - SUNY College of Optometry, New York, NY, 2017',
      'Board-Certified Optometrist'
    ],
    experience: [
      'Internship at Woodhull Medical Center',
      'Internship at East New York Diagnostic and Treatment Center',
      'Internship at Omni Eye Services',
      'Experienced in post-surgical management',
      'Ocular disease diagnosis and treatment',
      'Bilingual services (English/Spanish)'
    ],
    specialties: [
      'Primary eye care',
      'Comprehensive eye examinations',
      'Contact lens fittings',
      'Treatment of ocular disease',
      'Post-surgical management',
      'Diabetic retinopathy management',
      'Macular degeneration care',
      'Dry eye management',
      'Bilingual eye care services'
    ]
  },
  {
    slug: 'jacqueline-klombers',
    name: 'Jacqueline Klombers',
    credentials: 'OD',
    image: jacquelineImg,
    specialty: 'Comprehensive Eye Care & Low Vision',
    summary: 'New England College of Optometry graduate with internship experience at Jamaica Plain VA Medical Center, Boston University Eye, and Dorchester Community Health Center. Experienced in comprehensive eye care and low vision exams.',
    highlights: ['Low Vision Exams', 'VA Medical Training', 'Medical Optometry', 'NECO Graduate'],
    bio: `
      Dr. Jacqueline Klombers is a Pennsylvania native who completed her Bachelor's of Science in Biology from the University of New Hampshire. She then received her Doctorate of Optometry from the New England College of Optometry in 2025. Her internships included medical based optometry at Jamaica Plain VA Medical Center, Boston University Eye, and Dorchester Community Health Center. She is experienced with providing comprehensive eye-care and low vision exams.

      In her spare time, Dr. Klombers is also a figure skating coach at the Boston Bruin's practice arena. She loves spending time with family and enjoys hiking with her rescue corgi, Peanut.
    `,
    education: [
      'Doctor of Optometry (OD) - New England College of Optometry, 2025',
      "Bachelor's of Science in Biology - University of New Hampshire"
    ],
    experience: [
      'Internship at Jamaica Plain VA Medical Center',
      'Internship at Boston University Eye',
      'Internship at Dorchester Community Health Center',
      'Comprehensive eye-care exams',
      'Low vision exams'
    ],
    specialties: [
      'Comprehensive Eye Care',
      'Low Vision Exams',
      'Medical Based Optometry'
    ]
  }
];

// Convenience lookup for profile pages: getDoctorBySlug('john-magalhaes')
export const getDoctorBySlug = (slug) => doctors.find((doctor) => doctor.slug === slug);
