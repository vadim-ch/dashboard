import { ApiRequest, ApiRequestType } from '../index';
import {AuthPath, AuthResponseType} from './types';

type PutAccountType = {
  password: string;
};

export class PutAccount extends ApiRequest<AuthResponseType> {
  constructor(props: PutAccountType) {
    super(ApiRequestType.Put, `${AuthPath.PutAccount}`, props);
  }

  public get request(): Promise<AuthResponseType> {
    return super.request.then(response => {
      const {userId, email, profileId, role, isPasswordExist} = response;
      return {
        userId,
        profileId,
        role,
        email,
        isPasswordExist
      };
    });
  }
}
