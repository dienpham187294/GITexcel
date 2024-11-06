import React, { useState, useRef, useEffect } from "react";

import $ from "jquery";
function TextToSpeechRecorder() {
  const [text, setText] = useState(
    "Xin chào, đây là một ví dụ về text to speech!"
  );
  const [audioUrl, setAudioUrl] = useState(null);
  const [deviceId, setDeviceId] = useState(
    "e9d2c51d7d3919f5ff64e56f3f9885f050106481fd70ecc5e25a6ba97028d104"
  );
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [VoiceList, setVoiceList] = useState(null);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      devices.forEach((device) => {
        console.log(`${device.kind}: ${device.label} (ID: ${device.deviceId})`);
      });
    });
  }, []);
  // Tìm deviceId của "CABLE Input"
  // useEffect(() => {
  //   navigator.mediaDevices.enumerateDevices().then((devices) => {
  //     const cableInput = devices.find(
  //       (device) =>
  //         device.label.includes("CABLE") && device.kind === "audioinput"
  //     );
  //     if (cableInput) {
  //       setDeviceId(cableInput.deviceId);
  //     } else {
  //       console.warn("Không tìm thấy thiết bị CABLE Input.");
  //     }
  //   });
  // }, []);

  const handleTextToSpeech = () => {
    if (!deviceId) {
      alert("Không tìm thấy thiết bị CABLE Input.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    let voices = window.speechSynthesis.getVoices();
    utterance.voice = voices[316];

    utterance.onstart = () => {
      // startRecording(); // Bắt đầu ghi âm khi phát giọng nói
    };
    utterance.onend = () => {
      // stopRecording(); // Dừng ghi âm khi giọng nói kết thúc
    };

    window.speechSynthesis.speak(utterance);
  };

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: { deviceId } })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        chunksRef.current = []; // Reset các đoạn âm thanh

        mediaRecorderRef.current.ondataavailable = (event) => {
          chunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(chunksRef.current, { type: "audio/wav" });
          const url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);
          chunksRef.current = [];
        };

        mediaRecorderRef.current.start();
        console.log("Đã bắt đầu ghi âm từ hệ thống.");
      })
      .catch((error) => {
        console.error("Lỗi khi truy cập vào thiết bị CABLE Input:", error);
      });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      console.log("Đã dừng ghi âm.");
      // setTimeout(() => {
      //   $("#downloadID")[0].click();
      // }, 5000);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Chuyển Văn Bản Thành Giọng Nói và Ghi Âm Từ Hệ Thống</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="4"
        cols="50"
      />
      <br />
      <button onClick={handleTextToSpeech}>
        Chuyển văn bản thành giọng nói và ghi âm
      </button>
      <div style={{ marginTop: "20px" }}>
        {audioUrl && (
          <div>
            <h3>Tải về file audio:</h3>
            <audio controls src={audioUrl}></audio>
            <br />
            <a id="downloadID" href={audioUrl} download="speech-recording.wav">
              Tải về file âm thanh
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default TextToSpeechRecorder;
