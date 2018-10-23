import { ApiRequest, ApiRequestType } from '../index';
import { UserPath, UserResponseType } from './types';

export type UpdateUserType = {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
};

export interface UpdateUserResponseType extends UserResponseType {
}

export class UpdateUser extends ApiRequest<UpdateUserResponseType> {
  constructor(props: UpdateUserType) {
    const formData = new FormData();
    formData.append('firstName', props.firstName);
    formData.append('lastName', props.lastName);
    formData.append('avatar', props.avatar);
    super(ApiRequestType.Put, `${UserPath.Put}/${props.id}`, formData);
  }

  public get request(): Promise<UpdateUserResponseType> {
    return super.request.then(response => {
      const {id, firstName, lastName, email} = response;
      return {
        ...response
      };
    });
  }
}
