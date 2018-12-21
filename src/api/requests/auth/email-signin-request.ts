import { ApiRequest, ApiRequestType } from '../index';
import { AuthPath } from './types';

export type EmailSigninRequestType = {
  email: string;
};

export class EmailSigninRequest extends ApiRequest<any> {
  constructor(props: EmailSigninRequestType) {
    super(ApiRequestType.Post, AuthPath.EmailSigninRequest, props);
  }
}
