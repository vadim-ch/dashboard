import { ApiRequest } from '../requests';

export interface RequestErrors {

}

export enum RequestStatus {
  Pending,
  Complete,
  Error
}

export interface RequestAction<T> {
  errors?: RequestErrors;
  status?: RequestStatus;
  request: ApiRequest<T>;
}

export interface RequestState {
  errors: RequestErrors;
  status: RequestStatus;
}
