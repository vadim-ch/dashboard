export type UserResponseType = {
  firstName: string;
  lastName: string;
  id: string;
  email: string;
};

export const UserPath = {
  Get: 'experts',
  GetCurrent: 'experts/current',
  Put: 'experts',
  GetAll: 'experts'
};
