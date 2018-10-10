import { ApiRequest, ApiRequestType } from '../index';
import { UserPath, UserResponseType } from './types';
import { promiseMock, mockData } from '../mock';

export type GetUserType = {
  id: string;
};

export interface GetUserResponseType extends UserResponseType {
}

export class GetUser extends ApiRequest<GetUserResponseType> {
  constructor(props: GetUserType) {
    super(ApiRequestType.Get, `${UserPath.Get}/${props.id}`);
  }

  // public get request(): Promise<GetUserResponseType> {
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
  public get request(): Promise<GetUserResponseType> {
    return promiseMock() as any;
  }
}
