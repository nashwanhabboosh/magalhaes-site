// NorthAttleboro.js
import React from 'react';
import LocationPage from '../../components/LocationPage';
import { getLocationBySlug } from '../../data/locations';

const NorthAttleboroLocation = () => (
  <LocationPage location={getLocationBySlug('north-attleboro')} />
);

export default NorthAttleboroLocation;
