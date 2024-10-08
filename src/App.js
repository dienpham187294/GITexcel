import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DocumentsForMap from "./getDocument_ForOnlyMapConversation";
import Test from "./prac_componets/A1_Get_Test";
import VideoView from "./prac_componets/C1_VideoView";
import VoiceList from "./getVoiceslist";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { isMobile } from "pixi.js";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<DocumentsForMap />} />{" "}
          <Route path="/test" element={<Test />} />
          <Route path="/videoview" element={<VideoView />} />
          <Route path="/voice" element={<VoiceList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
