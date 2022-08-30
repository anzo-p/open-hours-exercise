import React, { FC } from "react";
import CSS from "csstype";

import { secondsToTime } from "./util";

const styleTimeEntry: CSS.Properties = {
  float: "right",   // expand to fit minutes if applicable
  textAlign: "right",
  fontWeight: 400,
}

const styleClosed: CSS.Properties = {
  color: "#A1A2A4",
}

type PropsTimeEntry = {
  timeEntry: number[]
}

type PropsTimeEntryList = {
  openHours: number[][]
}

const TimeEntry: FC<PropsTimeEntry> = ({ timeEntry }): JSX.Element => {
  return (
    <div
      style={styleTimeEntry}
    >
      {secondsToTime(timeEntry[0]) + " - " + secondsToTime(timeEntry[1])}
    </div>
  )
}

const LabelClosed = (): JSX.Element => {
  return (
    <div
      style={Object.assign({}, styleTimeEntry, styleClosed)}
    >
      Closed
    </div>
  )
}

export const OpenHoursTimeEntryList: FC<PropsTimeEntryList> = ({ openHours }): JSX.Element => {
  return (
    <div>
      {(openHours.length === 0)
        ? <LabelClosed />
        : openHours.map(timeEntry => (
          <TimeEntry key={timeEntry.toString()} timeEntry={timeEntry} />
        ))
      }
    </div>
  )
}
