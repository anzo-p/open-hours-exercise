import React from "react";
import { useSelector } from "react-redux";
import CSS from "csstype";

import { OpenHoursWeekday } from "./OpenHoursWeekday";
import { OpenHoursTimeEntryList } from "./OpenHoursTimeEntryList";

import { IOpenHoursState } from "../../store/openHoursReducer";
import { strWeekdayMap, isToday } from "./util";

const styleWeekdayBase: CSS.Properties = {
  display: "grid",
  gridTemplateColumns: "50% 50%",
}

const styleLightHR: CSS.Properties = {
  borderWidth: "0 0 1px 0",
  borderColor: "#EEEEEE",
}

export const OpenHoursWeekList = (): JSX.Element => {
  const openHours = useSelector<IOpenHoursState, IOpenHoursState["openHours"]>(state =>
    state.openHours
  )

  return (
    <div>
      {Object.entries(strWeekdayMap).map(([weekdayStr, weekdayInt]) => (
        <div
          key={weekdayInt}>
          <div
            style={styleWeekdayBase}
            key={weekdayInt}>

            <OpenHoursWeekday
              weekday={weekdayStr}
              isToday={isToday(weekdayInt)}
            />
            <OpenHoursTimeEntryList
              openHours={openHours[weekdayStr]}
            />
          </div>

          <hr style={styleLightHR} />
        </div>
      ))}
    </div>
  )
}
