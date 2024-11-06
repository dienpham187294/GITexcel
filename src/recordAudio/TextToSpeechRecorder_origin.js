import React, { useState, useRef, useEffect } from "react";

function TextToSpeechRecorder() {
  const [text, setText] = useState(
    "Xin chào, đây là một ví dụ về text to speech!"
  );
  const [audioUrl, setAudioUrl] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      devices.forEach((device) => {
        console.log(`${device.kind}: ${device.label} (ID: ${device.deviceId})`);
      });
    });
  }, []);
  // Tìm deviceId của "CABLE Input"
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const cableInput = devices.find(
        (device) =>
          device.label.includes("CABLE") && device.kind === "audioinput"
      );
      if (cableInput) {
        setDeviceId(cableInput.deviceId);
      } else {
        console.warn("Không tìm thấy thiết bị CABLE Input.");
      }
    });
  }, []);

  const handleTextToSpeech = () => {
    if (!deviceId) {
      alert("Không tìm thấy thiết bị CABLE Input.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.onstart = () => {
      startRecording(); // Bắt đầu ghi âm khi phát giọng nói
    };

    utterance.onend = () => {
      stopRecording(); // Dừng ghi âm khi giọng nói kết thúc
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
            <a href={audioUrl} download="speech-recording.mp3">
              Tải về file âm thanh
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default TextToSpeechRecorder;
