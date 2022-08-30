import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import CSS from "csstype";

import { OpenHoursHeader } from "./OpenHoursHeader";
import { OpenHoursWeekList } from "./OpenHoursWeekList";

import { STORE_OPEN_HOURS } from "../../store/openHoursActions";
import { loadParseOpenHours } from "../../api/openHours/parseOpenHoursData";

const styleCardBase: CSS.Properties = {
  background: "#FFFFFF",
  border: "2px solid #EEEEEE",
  borderRadius: "15px",
  padding: "35px 33px 25px 33px",
  boxShadow: "1px 3px 4px #EEEEEE",
  minWidth: "270px",
}

export const OpenHoursCard = (): JSX.Element => {
  const dispatch = useDispatch()

  useEffect(() => {
    const loadAndStoreOpenHours = () => {
      dispatch({
        type: STORE_OPEN_HOURS,
        payload: loadParseOpenHours()
      })
    }
    loadAndStoreOpenHours()
  }, [dispatch])

  return (
    <div style={styleCardBase}>
      <OpenHoursHeader />
      <OpenHoursWeekList />
    </div>
  )
}
