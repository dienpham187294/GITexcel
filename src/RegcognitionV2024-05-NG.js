import React, { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
let commands = [];
const Dictaphone = ({ SetCMD, CMDList }) => {
  useEffect(() => {
    commands = [
      {
        command: CMDList || ["I am a teacher"],
        callback: (command) => {
          SetCMD(command);
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.65,
        bestMatchOnly: true,
      },
      {
        command: ["clear", "reset"],
        callback: ({ resetTranscript }) => resetTranscript(),
      },
      // {
      //   command: ["use", "take it"],
      //   callback: ({ resetTranscript, transcript }) => {
      //     SetCMD(transcript);
      //     resetTranscript();
      //   },
      // },
      {
        command: "stop",
        callback: stopListening,
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

  // Update the command list with CMDlist when CMDlist changes
  // useEffect(() => {
  //   commands[0].commands = CMDList;
  //   console.log(CMDList);
  // }, [CMDList]);

  return (
    <div
      className="row"
      style={{
        border: "1px solid black",
        borderRadius: "10px",
        padding: "10px",
        marginBottom: "5px",
      }}
    >
      <div className="col-8" style={{ height: "100px", overflow: "auto" }}>
        <h3>{transcript}</h3>
        <h5 style={{ color: "gray" }}>{interimTranscript}</h5>
      </div>
      <div className="col-4">
        {listening ? (
          <>
            <button className="btn btn-danger p-2 m-1" onClick={stopListening}>
              STOP
            </button>
            <button
              id="resetCMD"
              className="btn btn-outline-primary p-2 ml-3"
              onClick={() => {
                resetTranscript();
                SetCMD(null);
              }}
            >
              Reset
            </button>
            <button
              className="btn btn-outline-primary p-2 ml-3"
              onClick={() => SetCMD(transcript)}
            >
              USE
            </button>
          </>
        ) : (
          <button
            className="btn btn-primary p-2 m-1"
            onClick={() => {
              startListening();
              resetTranscript();
              SetCMD(null);
            }}
          >
            Start
          </button>
        )}
      </div>
    </div>
  );
};

export default Dictaphone;
