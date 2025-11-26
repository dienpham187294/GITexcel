import React, { useState, useRef, useEffect } from "react";
import $ from "jquery";
import VideoPlayer from "./YoutubeCover";

function TextToSpeechRecorder() {
  let beginNumber = 0;

  const [jsonData, setJsonData] = useState(null);
  const [Timeline, setTimeline] = useState([]);
  const [INDEX, setINDEX] = useState(0);
  const [error, setError] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [deviceId, setDeviceId] = useState(null);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  // ================== HOTKEY LISTENER ==================
  useEffect(() => {
    const handleKeyDown = (e) => {
      console.log(e.code);
      if (e.code === "F8") {
        console.log("F9 pressed, will start recording in 3s...");
        setTimeout(() => {
          if (!jsonData) return alert("Upload file trước đã!");
          try {
            handleTextToSpeech(0, jsonData.slice(beginNumber));
          } catch (error) {
            alert("Lỗi dữ liệu đầu vào.");
            console.log(error);
          }
        }, 3000);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ================== TTS ==================
  const handleTextToSpeech = (n, jsonDataFN) => {
    setINDEX(n);

    const utterance = new SpeechSynthesisUtterance(jsonDataFN[n].text);
    utterance.rate = jsonDataFN[n].rate || 1;
    let voices = window.speechSynthesis.getVoices();
    utterance.voice = voices[jsonDataFN[n].lang] || null;

    let objTimeline = { id: jsonDataFN[n].audioCode, begin: "", end: "" };

    utterance.onstart = () => {
      objTimeline.begin = Date.now();
    };

    utterance.onend = () => {
      objTimeline.end = Date.now();
      setTimeline((D) => [...D, objTimeline]);

      setTimeout(() => {
        if (n + 1 < jsonDataFN.length) {
          handleTextToSpeech(n + 1, jsonDataFN);
        }
      }, 2000);
    };

    utterance.onerror = () => {
      setError("Error in speech synthesis");
    };

    window.speechSynthesis.speak(utterance);
  };

  // ================== RECORD ==================
  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: { deviceId } })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        chunksRef.current = [];

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
        console.log("Recording started (after 3s delay).");
      })
      .catch((error) => {
        console.error("Error accessing audio device:", error);
      });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      console.log("Recording stopped.");
    }
  };

  // ================== FILE UPLOAD ==================
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;

      if (file.name.endsWith(".json")) {
        try {
          const parsedData = JSON.parse(fileContent);
          setJsonData(parsedData);
          setError(null);
        } catch {
          setError("Invalid JSON file.");
          setJsonData(null);
        }
      } else if (file.name.endsWith(".txt")) {
        // Gói text thành object để TTS dùng được
        setJsonData([
          {
            text: fileContent,
            rate: 1,
            lang: 0,
            audioCode: "txt_" + Date.now(),
          },
        ]);
        setError(null);
      } else {
        setError("Unsupported file type. Please upload .txt or .json.");
      }
    };
    reader.onerror = () => {
      setError("Failed to read file.");
      setJsonData(null);
    };
    reader.readAsText(file);
  };

  // ================== UI ==================
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Text → Speech + Recording</h1>
      File JSON
      <input type="file" accept=".txt,.json" onChange={handleFileUpload} />
      <br />

      <button
        onClick={() => {
          if (!jsonData) return alert("Upload file trước đã!");
          try {
            handleTextToSpeech(0, jsonData.slice(beginNumber));
          } catch (error) {
            alert("Lỗi dữ liệu đầu vào.");
            console.log(error);
          }
        }}
      >
        Chạy Text to Speech
      </button>

      <button onClick={stopRecording}>Dừng ghi</button>

      <div style={{ marginTop: "20px" }}>
        {audioUrl && (
          <div>
            <h3>File audio đã ghi:</h3>
            <audio controls src={audioUrl}></audio>
            <br />
            <a
              id="downloadID"
              href={audioUrl}
              download={jsonData[0][INDEX].audioCode + ".wav"}
            >
              Tải xuống
            </a>
          </div>
        )}
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        {jsonData
          ? Timeline.length + beginNumber + "/" + jsonData.length
          : "Chưa có dữ liệu"}
      </div>

      <div style={{ maxHeight: "300px", overflow: "hidden" }}>
        {JSON.stringify(Timeline)}
      </div>

      <div style={{ maxHeight: "300px", overflow: "hidden" }}>
        {jsonData && (
          <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
            {JSON.stringify(jsonData, null, 2)}
          </pre>
        )}
      </div>

      {/* <VideoPlayer /> */}
    </div>
  );
}

export default TextToSpeechRecorder;
