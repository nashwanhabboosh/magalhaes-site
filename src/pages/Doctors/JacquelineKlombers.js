import React from 'react';
import { DoctorProfile } from '../../components/DoctorProfile';
import { getDoctorBySlug } from '../../data/doctors';

const JacquelineKlombers = () => <DoctorProfile doctor={getDoctorBySlug('jacqueline-klombers')} />;

export default JacquelineKlombers;
