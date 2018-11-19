import { ApiRequest, ApiRequestType } from '../index';
import {AuthPath, AuthResponseType} from './types';

export interface GetCurrentUserResponseType extends AuthResponseType {
}

export class GetCurrentUser extends ApiRequest<GetCurrentUserResponseType> {
  constructor() {
    super(ApiRequestType.Get, `${AuthPath.GetCurrent}`);
  }

  public get request(): Promise<GetCurrentUserResponseType> {
    return super.request.then(response => {
      const {sub: userId, firstName, lastName, middleName, email} = response as any;
      return {
        userId,
        email,
        firstName,
        lastName,
        middleName,
      };
    });
  }
}
