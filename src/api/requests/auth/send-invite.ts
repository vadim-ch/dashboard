import { ApiRequest, ApiRequestType } from '../index';
import { AuthPath } from './types';

export type SendInviteType = {
  email: string;
};

export class SendInvite extends ApiRequest<any> {
  constructor(props: SendInviteType) {
    super(ApiRequestType.Post, AuthPath.SendInvite, props);
  }

  // public get request(): Promise<any> {
  //   return super.request.then(response => {
  //    return {};
  //   });
  // }
}
