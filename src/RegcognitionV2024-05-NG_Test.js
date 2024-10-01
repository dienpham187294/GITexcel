import React, { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
let commands = [];
let timeoutId;

const Dictaphone = ({ fn_Xuly, CMDList, fn_speakSlowly, fn_speakAgain }) => {
  useEffect(() => {
    commands = [
      {
        command: CMDList || ["I am a teacher"],
        callback: (command) => {
          fn_Xuly(command, "Done");
          resetTimeout();
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.65,
        bestMatchOnly: true,
      },
      {
        command: ["clear", "reset"],
        callback: ({ resetTranscript }) => {
          resetTranscript();
          resetTimeout();
        },
      },
      {
        command: "stop",
        callback: stopListening,
      },
      {
        command: [
          "Can you say that again?",
          "Can you repeat that?",
          "Could you say it again, please?",
        ],
        callback: () => {
          fn_speakAgain();
          resetTimeout();
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.65,
        bestMatchOnly: true,
      },
      {
        command: [
          "Can you speak slowly?",
          "Can you say it slowly?",
          "Speak slower, please.",
          "Please repeat slowly.",
        ],
        callback: () => {
          fn_speakSlowly();
          resetTimeout();
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.65,
        bestMatchOnly: true,
      },
    ];
  }, [CMDList]);

  const startListening = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-US",
    });
    resetTimeout(); // Bắt đầu đếm ngược khi bắt đầu lắng nghe
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    clearTimeout(timeoutId); // Xóa timeout khi dừng lắng nghe
  };

  const resetTimeout = () => {
    // Reset lại timeout nếu có tương tác
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      stopListening(); // Tự động tắt lắng nghe sau 60 giây
    }, 60000); // 60 giây
  };

  const { interimTranscript, transcript, listening, resetTranscript } =
    useSpeechRecognition({ commands });

  return (
    <div>
      <div
        className="row"
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          minWidth: "50px",
          width: "fit-content",
          height: "60px",
          backgroundColor: "#f0f0f0",
          boxShadow:
            "0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08)",
          borderRadius: "15px",
          zIndex: 5,
        }}
      >
        {listening ? (
          <div>
            <button
              className="btn btn-danger p-2"
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              onClick={() => {
                stopListening();
              }}
            >
              <i className="bi bi-pause-btn-fill"></i>
            </button>

            <button
              className="btn btn-info p-2 ml-1"
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              onClick={() => {
                resetTranscript();
              }}
            >
              <i className="bi bi-arrow-clockwise"></i>
            </button>
          </div>
        ) : (
          <button
            className="btn btn-primary p-2"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            onClick={() => {
              startListening();
              resetTranscript();
            }}
          >
            <i className="bi bi-skip-start-btn"></i>
          </button>
        )}
      </div>

      <div
        style={{
          position: "fixed",
          top: "0",
          left: "20px",
          width: "fit-content",
          height: "60px",
          zIndex: 5,
          lineHeight: "bottom",
        }}
      >
        {transcript}{" "}
        {transcript !== "" ? (
          <button
            className="btn btn-primary p-2 ml-1"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            onClick={() => {
              fn_Xuly(transcript, "transcript");
              resetTimeout();
            }}
          >
            <i className="bi bi-check2-all"></i>
          </button>
        ) : null}{" "}
        <br /> <i>{interimTranscript}</i>
      </div>

      <button
        style={{ display: "none" }}
        id="resetCMD"
        onClick={() => {
          resetTranscript();
        }}
      ></button>
    </div>
  );
};

export default Dictaphone;
