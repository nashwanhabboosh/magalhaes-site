// Dartmouth.js
import React from 'react';
import LocationPage from '../../components/LocationPage';
import { getLocationBySlug } from '../../data/locations';

const DartmouthLocation = () => (
  <LocationPage location={getLocationBySlug('north-dartmouth')} />
);

export default DartmouthLocation;
