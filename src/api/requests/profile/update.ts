import { ApiRequest, ApiRequestType } from '../index';
import { UserPath, ProfileResponseType } from './types';

export type UpdateUserType = {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  gender?: string;
  birthday?: string;
  avatar?: File;
  qualifications?: Array<string>;
  directionsTherapy?: Array<string>;
  approachesTherapy?: Array<string>;
  methodsTherapy?: Array<string>;
  requestsTherapy?: Array<string>;
};

export class UpdateProfile extends ApiRequest<ProfileResponseType> {
  constructor(props: UpdateUserType) {
    super(ApiRequestType.Put, `${UserPath.Put}`, props, true);
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
