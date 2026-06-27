import React from 'react';
import { DoctorProfile } from '../../components/DoctorProfile';
import { getDoctorBySlug } from '../../data/doctors';

const NicolePatricio = () => <DoctorProfile doctor={getDoctorBySlug('nicole-patricio')} />;

export default NicolePatricio;
