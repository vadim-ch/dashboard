import {ApiRequest, ApiRequestType} from '../index';
import { AuthPath } from './types';
import { promiseMock } from '../mock';

export type LogoutResponseType = {

};

export class Logout extends ApiRequest<LogoutResponseType> {
  constructor() {
    super(ApiRequestType.Post, AuthPath.Logout);
  }

  public get request(): Promise<LogoutResponseType> {
    return promiseMock({}) as any;
  }
}
