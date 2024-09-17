import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import GetDocument from "./getDocument";
import VoiceList from "./getVoiceslist";

import DocumentsForMap from "./getDocument_ForOnlyMapConversation";
// import PixiMap from "./H_Pixi";
import { useState } from "react";
function App() {
  return (
    <div className="App">
      {/* <PixiMap /> */}
      <hr />
      {/* <GetDocument />
      <VoiceList /> */}

      <DocumentsForMap />
    </div>
  );
}

export default App;
