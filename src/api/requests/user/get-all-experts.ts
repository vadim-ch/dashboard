import { ApiRequest, ApiRequestType } from '../index';
import { UserPath, UserResponseType } from './types';

export type GetUserType = {

};

export interface GetAllExpertsResponseType {
  list: Array<UserResponseType>;
}

export class GetAllExperts extends ApiRequest<GetAllExpertsResponseType> {
  constructor() {
    super(ApiRequestType.Get, `${UserPath.GetAllExperts}`);
  }

  // public get request() {
  //   return super.request.then(response => {
  //     const {id, username, email} = response;
  //     return {
  //       id,
  //       email,
  //       username
  //     }
  //   });
  // }
}
