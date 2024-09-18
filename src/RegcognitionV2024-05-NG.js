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
      </div>
      <div className="col-4">
        {" "}
        {listening ? (
          <>
            <button
              className="btn btn-danger p-2 m-1"
              onClick={() => {
                stopListening();
              }}
            >
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
              onClick={() => {
                SetCMD(transcript);
              }}
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
