import { ActionCreator } from 'redux';

export const SHOW_NEW_CABINET = 'show-new-cabinet';

export type ShowNewCabinetAction = {
  type: typeof SHOW_NEW_CABINET;
};

export const showNewCabinet: ActionCreator<ShowNewCabinetAction> = (): ShowNewCabinetAction => {
  return {
    type: SHOW_NEW_CABINET
  };
};
