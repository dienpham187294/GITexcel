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
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.65,
        bestMatchOnly: true,
      },
      {
        command: ["clear", "reset"],
        callback: ({ resetTranscript }) => resetTranscript(),
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
        callback: () => fn_speakAgain(),
      },
      {
        command: [
          "Can you speak slowly?",
          "Can you say it slowly?",
          "Speak slower, please.",
          "Please repeat slowly.",
        ],
        callback: () => fn_speakSlowly(),
      },
    ];
  }, [CMDList]);

  const startListening = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-US",
    });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
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
          minWidth: "200px",
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
            <select
              className="form-control"
              style={{
                width: "150px",
                display: "inline-block",
                verticalAlign: "middle",

                marginTop: "10px",
              }} // Đặt width và căn giữa select với icon
              onChange={(e) => {
                let cmd = e.currentTarget.value;
                if (cmd === "stop") {
                  stopListening();
                }
                if (cmd === "reset") {
                  resetTranscript();
                }
                if (cmd === "use") {
                  fn_Xuly(transcript, "transcript");
                }
                e.currentTarget.value = "none"; // Đặt lại giá trị về 'none' sau khi chọn
              }}
            >
              <option value={"none"}>Mode</option>
              <option value={"stop"}>Stop</option>
              <option value={"reset"}>Reset</option>
              <option value={"use"}>Use this sentence</option>
            </select>
          </div>
        ) : (
          <button
            className="btn btn-primary p-2"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            onClick={() => {
              startListening();
              resetTranscript();
              fn_Xuly(null);
            }}
          >
            <i className="bi bi-bullseye"></i>
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
          backgroundColor: "#f0f0f0",
          boxShadow:
            "0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08)",
          borderRadius: "15px",
          zIndex: 5,
          padding: "10px",
        }}
      >
        {" "}
        {transcript} <br />
      </div>
      <i>{interimTranscript}</i>
    </div>
  );
};

export default Dictaphone;
