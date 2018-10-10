import { ApiRequest, ApiRequestType } from '../index';
import { UserPath, UserResponseType } from './types';
import { promiseMock, mockData } from '../mock';
export interface GetCurrentUserResponseType extends UserResponseType {
}

export class GetCurrentUser extends ApiRequest<GetCurrentUserResponseType> {
  constructor() {
    super(ApiRequestType.Get, `${UserPath.GetCurrent}`);
  }

  // public get request(): Promise<GetCurrentUserResponseType> {
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
  public get request(): Promise<GetCurrentUserResponseType> {
    return promiseMock() as any;
  }
}
