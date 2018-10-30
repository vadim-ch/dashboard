import { ApiRequest, ApiRequestType } from '../index';
import { UserPath, UserResponseType } from './types';

export type UpdateUserType = {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  gender?: string;
  birthday?: string;
  avatar?: File;
  qualifications?: Array<string>;
};

export interface UpdateUserResponseType extends UserResponseType {
}

export class UpdateUser extends ApiRequest<UpdateUserResponseType> {
  constructor(id: string, props: UpdateUserType) {
    super(ApiRequestType.Put, `${UserPath.Put}/${id}`, props, true);
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
