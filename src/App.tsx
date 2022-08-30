import React from "react";
import CSS from "csstype";

import { OpenHoursCard } from "./components/openHours/OpenHoursCard";

const divStyle: CSS.Properties = {
  display: "grid",
  placeItems: "center",
}

function App(): JSX.Element {
  return (
    <div style={divStyle}>
      <OpenHoursCard />
    </div>
  )
}

export default App;
