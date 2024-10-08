import { useEffect, useState } from "react";
import $ from "jquery";
import ReadMessage from "./ReadMessage_2024";
import initializeVoicesAndPlatform from "./initializeVoicesAndPlatform";
import { textSets } from "./help_VideoView_funtion";
function VideoView() {
  const [onStt, setOnStt] = useState(false);
  const [ObjRead, SetObjRead] = useState({ imale: 315, ifemale: 316 });
  const [Text, setText] = useState("");
  // Hàm khởi tạo thông tin giọng nói và platform
  // const initializeVoices = async () => {
  //   const voiceObj = await initializeVoicesAndPlatform();
  //   SetObjRead(voiceObj);
  // };

  useEffect(() => {
    let textT = "";
    textSets.forEach((e) => {
      textT += " " + e.text;
    });
    setText(textT);
  }, []);

  return (
    <div style={VideoViewCss}>
      {JSON.stringify(ObjRead)}
      {Text}
      <h1>Video Screen</h1>
      <button
        onClick={() => {
          ReadMessage(ObjRead, "Đang thử giọng nói", 1, 1);
        }}
      >
        Thử giọng đọc
      </button>
    </div>
  );
}

const VideoViewCss = {
  border: "1px solid black",
  width: "100vw",
  height: "100vh",
  borderRadius: "10px",
};

export default VideoView;
