import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DocumentsForMap from "./getDocument_ForOnlyMapConversation";
import Test from "./prac_componets/A1_Get_Test";
import VideoView from "./prac_componets/C1_VideoView";
import VoiceList from "./getVoiceslist";
import VideoCreate from "./video_components_Move_01/B100_SPEAK_AND_RECORD";
import VideoCreate_01 from "./video_components_01/B100_SPEAK_AND_RECORD";
import TextToSpeechRecorder from "./recordAudio/TextToSpeechRecorder.js";
import AudioSplitter from "./cutAudio/AudioSplitter.js";
import NewVideoModel from "./newVideoModel/NewVideoModel.js";
import NewTableFromJson from "./getNewTableFormJSON/NewTableFromJson.js";
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
          <Route path="/video" element={<VideoCreate />} />
          <Route path="/video-01" element={<VideoCreate_01 />} />
          <Route path="/record" element={<TextToSpeechRecorder />} />
          <Route path="/newvideomodel" element={<NewVideoModel />} />
          <Route path="/newtable" element={<NewTableFromJson />} />
          <Route path="/cut" element={<AudioSplitter />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
