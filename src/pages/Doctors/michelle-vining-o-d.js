import React from 'react';
import { DoctorProfile } from '../../components/DoctorProfile';
import { getDoctorBySlug } from '../../data/doctors';

const MichelleVining = () => <DoctorProfile doctor={getDoctorBySlug('michelle-vining')} />;

export default MichelleVining;
