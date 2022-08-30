import React, { FC } from "react";
import CSS from "csstype";

import { initcap } from "./util";

const styleWeekday: CSS.Properties = {
  display: "flex",
  alignItems: "center",
  fontSize: "16px",
  fontWeight: 500,
}

const styleIsToday: CSS.Properties = {
  fontSize: "12px",
  fontWeight: 800,
  textTransform: "uppercase",
  color: "#5BCB02",
  textAlign: "left",
}

type Props = {
  weekday: string
  isToday: boolean
}

export const OpenHoursWeekday: FC<Props> = ({ weekday, isToday }): JSX.Element => {
  return (
    <div style={styleWeekday}>
      {initcap(weekday)}
      {isToday && <span style={styleIsToday}>&emsp;today</span>}
    </div>
  )
}
