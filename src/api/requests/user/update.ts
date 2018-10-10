import { ApiRequest, ApiRequestType } from '../index';
import { UserPath, UserResponseType } from './types';
import { promiseMock, mockData } from '../mock';

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

  // public get request(): Promise<UpdateUserResponseType> {
  //   return super.request.then(response => {
  //     const {id, firstName, lastName, email} = response;
  //     return {
  //       id,
  //       email,
  //       firstName,
  //       lastName
  //     };
  //   });
  // }

  public get request(): Promise<UpdateUserResponseType> {
    return promiseMock(mockData) as any;
  }
}
