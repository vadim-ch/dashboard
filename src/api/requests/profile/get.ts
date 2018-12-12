import { ApiRequest, ApiRequestType } from '../index';
import { UserPath, ProfileResponseType } from './types';

export class GetProfile extends ApiRequest<ProfileResponseType> {
  constructor() {
    super(ApiRequestType.Get, `${UserPath.Get}`);
  }

  public get request(): Promise<ProfileResponseType> {
    return super.request.then(response => {
      const {id, firstName, lastName, email} = response;
      return {
        ...response
      };
    });
  }
}
