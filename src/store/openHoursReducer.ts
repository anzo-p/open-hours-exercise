import cloneDeep from "lodash/cloneDeep";

import { ActionOpenHours } from "./openHoursActions";
import { OpenHours } from "../components/openHours/Types";
import { openHoursTemplate } from "../components/openHours/util";

import { STORE_OPEN_HOURS } from "./openHoursActions";

export interface IOpenHoursState {
  openHours: OpenHours
}

const initState = {
  openHours: cloneDeep(openHoursTemplate)
};

export const openHoursReducer = (
  state: IOpenHoursState = initState,
  action: ActionOpenHours):
  any => {

  switch (action.type) {

    case STORE_OPEN_HOURS:
      return { ...state, openHours: { ...state.openHours, ...action.payload } };

    default:
      return state;
  }
};
