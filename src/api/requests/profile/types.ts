export type ProfileResponseType = {
  firstName: string;
  lastName: string;
  middleName: string;
  avatar: string;
  qualifications: Array<string>;
  directionsTherapy: Array<string>;
  approachesTherapy: Array<string>;
  methodsTherapy: Array<string>;
  requestsTherapy: Array<string>;
  id: string;
  userId: string;
  email: string;
};

export const UserPath = {
  Get: 'profile',
  Put: 'profile'
};
