import React from 'react';
import { DoctorProfile } from '../../components/DoctorProfile';
import { getDoctorBySlug } from '../../data/doctors';

const PatriciaGarcia = () => <DoctorProfile doctor={getDoctorBySlug('patricia-garcia')} />;

export default PatriciaGarcia;
