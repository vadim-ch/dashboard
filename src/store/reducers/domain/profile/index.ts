import { RequestState, RequestStatus } from '../../../../api/types';
import { UPDATE_USER, UpdateUserAction } from '../../../actions/user/update-user-action';
import { GET_CURRENT_USER, GetCurrentUserAction } from '../../../actions/user/get-current-user-action';

const initialState = {
  firstName: '',
  lastName: '',
  middleName: '',
  avatar: '',
  email: '',
  description: '',
  birthday: '',
  gender: 'male',
  location: '',
  sessionTime: '',
  sessionPrice: '',
  sessionFormat: [],
  qualifications: [],
  ownTherapyHours: 0,
  directionsTherapy: [],
  errors: undefined,
  status: RequestStatus.Complete
};

export interface ProfileState extends RequestState {
  firstName: string;
  lastName: string;
  middleName: string;
  avatar: string;
  email: string;
  description: string;
  birthday: string;
  gender: 'male' | 'female';
  location: string;
  sessionTime: string;
  sessionPrice: string;
  sessionFormat: Array<string>;
  qualifications: Array<string>;
  ownTherapyHours: number;
  directionsTherapy: Array<string>;
}

export function profile(
    state: ProfileState = initialState,
    action: UpdateUserAction | GetCurrentUserAction
): ProfileState {
  switch (action.type) {
    case UPDATE_USER:
    case GET_CURRENT_USER: {
      if (action.status === RequestStatus.Complete) {
        return {
          ...state,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          middleName: action.payload.middleName,
          avatar: action.payload.avatar,
          status: action.status
        };
      }
      if (action.status === RequestStatus.Pending) {
        return {
          ...state,
          status: action.status
        };
      }
      if (action.status === RequestStatus.Error) {
        return {
          ...state,
          status: action.status,
          errors: action.errors
        };
      }
      return state;
    }
    default:
      return state;
  }
}
