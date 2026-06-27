import React from 'react';
import { DoctorProfile } from '../../components/DoctorProfile';
import { getDoctorBySlug } from '../../data/doctors';

const TinaParker = () => <DoctorProfile doctor={getDoctorBySlug('tina-parker')} />;

export default TinaParker;
