import {ApiRequest, ApiRequestType} from '../index';
import { AuthPath } from './types';

export type LogoutResponseType = {

};

export class Logout extends ApiRequest<LogoutResponseType> {
  constructor() {
    super(ApiRequestType.Post, AuthPath.Logout);
  }
}
