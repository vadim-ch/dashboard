export type UserResponseType = {
  firstName: string;
  lastName: string;
  middleName: string;
  avatar: string;
  id: string;
  userId: string;
  email: string;
};

export const UserPath = {
  Get: 'experts',
  GetCurrent: 'experts/current',
  Put: 'experts',
  GetAll: 'experts'
};
