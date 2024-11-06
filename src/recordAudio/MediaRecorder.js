import React, { useState, useRef } from "react";

function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Bắt đầu ghi âm
  const startRecording = () => {
    setAudioUrl(null); // Đặt lại URL nếu đã có ghi âm trước đó
    audioChunksRef.current = []; // Đặt lại mảng âm thanh

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);

        // Lưu trữ dữ liệu âm thanh
        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        // Khi dừng ghi âm, tạo file âm thanh
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/mp3",
          });
          const url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);
        };

        // Bắt đầu ghi âm
        mediaRecorderRef.current.start();
        setIsRecording(true);
      })
      .catch((error) => {
        console.error("Lỗi khi truy cập microphone:", error);
        alert(
          "Không thể truy cập microphone. Hãy kiểm tra lại quyền truy cập của trình duyệt."
        );
      });
  };

  // Dừng ghi âm
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Ghi Âm Với MediaRecorder API</h1>
      <button onClick={startRecording} disabled={isRecording}>
        Bắt đầu ghi âm
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Dừng ghi âm
      </button>
      <div style={{ marginTop: "20px" }}>
        {audioUrl && (
          <div>
            <h3>Tải về file audio:</h3>
            <audio controls src={audioUrl}></audio>
            <br />
            <a href={audioUrl} download="recording.mp3">
              Tải về file âm thanh
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default MediaRecorder;
