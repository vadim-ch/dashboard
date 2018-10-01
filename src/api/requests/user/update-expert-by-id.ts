import { ApiRequest, ApiRequestType } from '../index';
import { UserPath, UserResponseType } from './types';

export type UpdateUserType = {
  id: string;
  firstName: string;
  lastName: string;
};

export interface UpdateUserResponseType extends UserResponseType {
}

export class UpdateUser extends ApiRequest<UpdateUserResponseType> {
  constructor(props: UpdateUserType) {
    super(ApiRequestType.Put, `${UserPath.Put}/${props.id}`, {firstName: props.firstName, lastName: props.lastName});
  }

  public get request(): Promise<UpdateUserResponseType> {
    return super.request.then(response => {
      const {id, username, email} = response;
      return {
        id,
        email,
        username
      };
    });
  }
}
