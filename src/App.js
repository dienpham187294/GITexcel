import "./App.css";
import GetDocument from "./getDocument";
import VoiceList from "./getVoiceslist";

import DocumentsForMap from "./getDocument_ForOnlyMapConversation";
import CreateGame from "./B100_0A_CreateGame";
import { useState } from "react";
function App() {
  const [showGame, setShowGame] = useState(false);
  return (
    <div className="App">
      <button
        onClick={() => {
          setShowGame(true);
        }}
      >
        View Map
      </button>
      <hr />
      {/* <GetDocument />
      <VoiceList /> */}

      <DocumentsForMap />
      {/* <CreateGame /> */}
    </div>
  );
}

export default App;
