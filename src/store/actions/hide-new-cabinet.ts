import { ActionCreator } from 'redux';

export const HIDE_NEW_CABINET = 'hide-new-cabinet';

export type HideNewCabinetAction = {
  type: typeof HIDE_NEW_CABINET;
};

export const hideNewCabinet: ActionCreator<HideNewCabinetAction> = (): HideNewCabinetAction => {
  return {
    type: HIDE_NEW_CABINET
  };
};
