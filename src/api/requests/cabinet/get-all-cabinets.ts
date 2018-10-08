import { ApiRequest, ApiRequestType } from '../index';
import { CabinetPath, CabinetResponseType } from './types';

export type GetAllCabinetsResponseType = Array<CabinetResponseType>;

export class GetAllCabinets extends ApiRequest<GetAllCabinetsResponseType> {
  constructor() {
    super(ApiRequestType.Get, `${CabinetPath.GetAll}`);
  }

  // public get request(): Promise<GetAllExpertsResponseType> {
  //   return super.request.then(response => {
  //     return {
  //       list: response
  //     }
  //   });
  // }
}
