import React from "react";
import CSS from "csstype";

import { FaRegClock } from "react-icons/fa";

const styleTitle: CSS.Properties = {
  fontSize: "24px",
  fontWeight: 700,
  padding: "0 0 5px 0"
}

const styleBlackHR: CSS.Properties = {
  borderWidth: "1px 0 0 0",
  borderColor: "#202125",
}

export const OpenHoursHeader = (): JSX.Element => {
  return (
    <div>
      <div style={styleTitle}>
        <FaRegClock size={"18px"} color={"#A1A2A4"} />
        &nbsp;
        Opening hours
      </div>
      <hr style={styleBlackHR} />
    </div>
  )
}
