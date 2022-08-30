import { createStore } from "redux";

import { openHoursReducer } from "./openHoursReducer";

export const store = createStore(
  openHoursReducer
)
