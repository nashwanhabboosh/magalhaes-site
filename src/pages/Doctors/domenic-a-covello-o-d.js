import React from 'react';
import { DoctorProfile } from '../../components/DoctorProfile';
import { getDoctorBySlug } from '../../data/doctors';

const DomenicCovello = () => <DoctorProfile doctor={getDoctorBySlug('domenic-covello')} />;

export default DomenicCovello;
