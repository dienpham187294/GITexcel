import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Dictaphone = ({ SetCMD }) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const startListening = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-US",
    });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening({});
  };

  return (
    <div className="row">
      <div className="col-8">
        {" "}
        <h1>{transcript || ". . . "}</h1>
      </div>
      <div className="col-4">
        {" "}
        {listening ? (
          <>
            {" "}
            <button
              className="btn btn-outline-primary p-2 m-1"
              onClick={() => {
                resetTranscript();
                SetCMD(null);
              }}
            >
              Reset
            </button>
            <button
              className="btn btn-outline-primary p-2 m-1"
              onClick={() => {
                SetCMD(transcript);
              }}
            >
              USE
            </button>
            <button
              className="btn btn-danger p-2 m-1"
              onClick={() => {
                stopListening();
              }}
            >
              STOP
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
