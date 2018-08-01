// API REQUEST
export const RESTAURANTS_REQUESTED = 'RESTAURANTS_REQUESTED';
export const RESTAURANTS_RESOLVED = 'RESTAURANTS_RESOLVED';
export const RESTAURANTS_REJECTED = 'RESTAURANTS_REJECTED';

export const getRestaurants = () => ({ type: RESTAURANTS_REQUESTED });
