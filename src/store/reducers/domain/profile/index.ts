import { RequestState, RequestStatus } from '../../../../api/types';
import { UPDATE_PROFILE, UpdateProfileAction } from '../../../actions/user/update-profile-action';
import { GET_PROFILE, GetProfileAction } from '../../../actions/user/get-profile-action';

const initialState = {
  expertId: '',
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
  expertId: string;
  firstName: string;
  lastName: string;
  middleName: string;
  avatar: string;
  email: string;
  description: string;
  birthday: string;
  gender: string;
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
    action: UpdateProfileAction | GetProfileAction
): ProfileState {
  switch (action.type) {
    case GET_PROFILE:
    case UPDATE_PROFILE: {
      if (action.status === RequestStatus.Complete) {
        return {
          ...state,
          expertId: action.payload.id,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          middleName: action.payload.middleName,
          avatar: action.payload.avatar,
          qualifications: action.payload.qualifications,
          directionsTherapy: action.payload.directionsTherapy,
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
