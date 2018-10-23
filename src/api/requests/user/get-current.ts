import { ApiRequest, ApiRequestType } from '../index';
import { UserPath, UserResponseType } from './types';

export interface GetCurrentUserResponseType extends UserResponseType {
}

export class GetCurrentUser extends ApiRequest<GetCurrentUserResponseType> {
  constructor() {
    super(ApiRequestType.Get, `${UserPath.GetCurrent}`);
  }

  public get request(): Promise<GetCurrentUserResponseType> {
    return super.request.then(response => {
      const {id, firstName, lastName, email} = response;
      return {
        ...response
      };
    });
  }
}
