import React, { useState, useRef, useEffect } from "react";
import $ from "jquery";
import VideoPlayer from "./YoutubeCover";
function TextToSpeechRecorder() {
  // const [text, setText] = useState(
  //   "Xin chào, đây là một ví dụ về text to speech!"
  // );

  //File {text, rate, number}
  const [jsonData, setJsonData] = useState(null);
  const [Timeline, setTimeline] = useState([]);
  const [INDEX, setINDEX] = useState(0);
  const [error, setError] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  // useEffect(() => {
  //   navigator.mediaDevices.enumerateDevices().then((devices) => {
  //     devices.forEach((device) => {
  //       console.log(`${device.kind}: ${device.label} (ID: ${device.deviceId})`);
  //     });
  //   });
  // }, []);
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

  const handleTextToSpeech = (n, jsonDataFN) => {
    setINDEX(n);
    // if (!deviceId) {
    //   alert("Không tìm thấy thiết bị CABLE Input.");
    //   return;
    // }

    const utterance = new SpeechSynthesisUtterance(jsonDataFN[n].text);
    utterance.rate = jsonDataFN[n].rate;
    let voices = window.speechSynthesis.getVoices();
    utterance.voice = voices[jsonDataFN[n].lang];

    let objTimeline = { id: jsonDataFN[n].audioCode, begin: "", end: "" };

    utterance.onstart = () => {
      objTimeline.begin = Date.now();
      // startRecording(); // Bắt đầu ghi âm khi phát giọng nói
    };
    let firstBoundaryLogged = false; // Biến để kiểm soát việc ghi log chỉ một lần cho từ đầu tiên
    let firstBoundaryEND = false;
    utterance.onboundary = (event) => {
      const currentTime = Date.now();
      console.log(
        event.charLength + event.charLength,
        jsonDataFN[n].text.length
      );
      if (!firstBoundaryLogged) {
        console.log("Thời gian bắt đầu đọc từ đầu tiên:", currentTime);
        objTimeline.begin_01 = Date.now();
        firstBoundaryLogged = true;
      }

      // Kiểm tra nếu vị trí đang ở cuối văn bản để log thời gian đọc từ cuối cùng
      // if (
      //   event.charIndex + event.charLength > jsonDataFN[n].text.length - 40 &&
      //   !firstBoundaryEND
      // ) {
      //   firstBoundaryEND = true;
      //   console.log("Thời gian kết thúc đọc từ cuối cùng:", currentTime);
      //   objTimeline.end = Date.now();
      //   setTimeline((D) => [...D, objTimeline]);
      //   if (n + 1 < jsonDataFN.length) {
      //     handleTextToSpeech(n + 1, jsonDataFN);
      //   }
      // }
    };

    utterance.onend = () => {
      objTimeline.end = Date.now();
      setTimeline((D) => [...D, objTimeline]);
      // stopRecording(); // Dừng ghi âm khi giọng nói kết thúc
      setTimeout(() => {
        if (n + 1 < jsonDataFN.length) {
          handleTextToSpeech(n + 1, jsonDataFN);
        }
      }, 1000);
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
      // if (n < jsonDataFN.length) {
      //   setTimeout(() => {
      //     handleTextToSpeech = (n + 1, jsonDataFN);
      //   }, 3000);
      // } else {
      //   alert("END");
      // }
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = e.target.result;

        try {
          const parsedData = JSON.parse(fileContent);
          setJsonData(parsedData);
          setError(null); // Clear any previous errors
        } catch (parseError) {
          setError(
            "Error parsing JSON. Please make sure the file format is correct."
          );
          setJsonData(null); // Clear JSON data if parse fails
        }
      };

      reader.onerror = () => {
        setError("Failed to read file. Please try again.");
        setJsonData(null);
      };

      reader.readAsText(file);
    }
  };
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Chuyển Văn Bản Thành Giọng Nói và Ghi Âm Từ Hệ Thống</h1>
      <input type="file" accept=".txt" onChange={handleFileUpload} />
      <br />
      <button
        onClick={() => {
          try {
            handleTextToSpeech(0, jsonData);
          } catch (error) {
            try {
              handleTextToSpeech(0, [jsonData]);
            } catch (error) {
              alert("Kiểm tra file thông tin.");
              console.log(error);
            }
          }
        }}
      >
        Chuyển văn bản thành giọng nói và ghi âm bằng phần mềm ngoài
      </button>

      <button
        onClick={() => {
          try {
            handleTextToSpeech(0, jsonData);
          } catch (error) {
            alert("Kiểm tra file thông tin.");
          }
        }}
      >
        Chạy thử mô hình video mới.
      </button>
      <div style={{ marginTop: "20px" }}>
        {audioUrl && (
          <div>
            <h3>Tải về file audio:</h3>
            <audio controls src={audioUrl}></audio>
            <br />
            <a
              id="downloadID"
              href={audioUrl}
              download={jsonData[0][INDEX].audioCode + ".wav"}
            >
              Tải về file âm thanh
            </a>
          </div>
        )}
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        {jsonData ? Timeline.length + "/" + jsonData.length : "Loading"}
      </div>
      <div
        style={{
          maxHeight: "300px",
          overflow: "hidden",
        }}
      >
        {JSON.stringify(Timeline)}
      </div>
      <div
        style={{
          maxHeight: "300px",
          overflow: "hidden",
        }}
      >
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
