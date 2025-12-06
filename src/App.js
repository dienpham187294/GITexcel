import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import DocumentsForMap from "./getDocument_Content.js";
import DocumentsForMap from "./getDocument_Content";
import Test from "./prac_componets/A1_Get_Test";
import VideoView from "./prac_componets/C1_VideoView";
import VoiceList from "./getVoiceslist";
import VideoCreate from "./video_components_Move_01/B100_SPEAK_AND_RECORD";
import VideoCreate_01 from "./video_components_01/B100_SPEAK_AND_RECORD";
import TextToSpeechRecorder from "./recordAudio/TextToSpeechRecorder.js";
import AudioSplitter from "./cutAudio/AudioSplitter.js";
import NewVideoModel from "./newVideoModel/NewVideoModel.js";
import NewTableFromJson from "./getNewTableFormJSON/NewTableFromJson.js";
import YoutubeDiv from "./YoutubeGetLink.js";
import YouTubePlaylist from "./YoutubePlaylist.js";
import VideoTiktokGhepAm from "./quayvideoTiktok/quayvideoTiktokGhepAm.js";
import LayIPASort from "./layIPASort/layIPASort.js";
// import VideoMerger from "./ghepMp4/GhepMp4.js";
// import VideoMerger01 from "./ghepMp4/GhepMp4_01.js";
// import VideoMerger02 from "./ghepMp4/GhepMp4_02.js";
import VideoMerger03 from "./ghepMp4/GhepMp4_03.js";
import GhiAm from "./ghiAm/ghiAm.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { isMobile } from "pixi.js";
import WeddingPages from "./wedding/wedding.js";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WeddingPages />} />{" "}
          <Route path="/doc" element={<DocumentsForMap />} />{" "}
          {/* <Route path="/test" element={<Test />} />
          <Route path="/videoview" element={<VideoView />} />
          <Route path="/voice" element={<VoiceList />} />
          <Route path="/video" element={<VideoCreate />} />
          <Route path="/video-01" element={<VideoCreate_01 />} />
          <Route path="/record" element={<TextToSpeechRecorder />} />
          <Route path="/newvideomodel" element={<NewVideoModel />} />
          <Route path="/newtable" element={<NewTableFromJson />} />
          <Route path="/cut" element={<AudioSplitter />} /> */}

          {/* <Route path="/merge" element={<VideoMerger />} />
          <Route path="/merge01" element={<VideoMerger01 />} />
          <Route path="/merge02" element={<VideoMerger02 />} />{" "} */}
          
          {/* <Route path="/merge" element={<VideoMerger03 />} />{" "}
          <Route path="/ghiam" element={<GhiAm />} />
          <Route path="/youtube" element={<YouTubePlaylist />} />
          <Route path="/tiktok" element={<VideoTiktokGhepAm />} />
          <Route path="/ipasort" element={<LayIPASort />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
