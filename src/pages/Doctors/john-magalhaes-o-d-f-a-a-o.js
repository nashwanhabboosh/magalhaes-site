import React from 'react';
import { DoctorProfile } from '../../components/DoctorProfile';
import { getDoctorBySlug } from '../../data/doctors';

const JohnMagalhaes = () => <DoctorProfile doctor={getDoctorBySlug('john-magalhaes')} />;

export default JohnMagalhaes;
