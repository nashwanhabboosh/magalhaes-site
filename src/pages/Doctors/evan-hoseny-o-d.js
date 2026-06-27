import React from 'react';
import { DoctorProfile } from '../../components/DoctorProfile';
import { getDoctorBySlug } from '../../data/doctors';

const EvanHosney = () => <DoctorProfile doctor={getDoctorBySlug('evan-hosney')} />;

export default EvanHosney;
