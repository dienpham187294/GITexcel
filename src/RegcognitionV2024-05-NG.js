import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
// import stringSimilarity from "string-similarity";

const Dictaphone = ({}) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const startListening = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-US",
    });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  return (
    <div>
      <h1>{transcript || ". . . "}</h1>
      {listening ? "lisening" : "off"}

      <button
        onClick={() => {
          startListening();
        }}
      >
        Start
      </button>
      <button
        onClick={() => {
          stopListening();
        }}
      >
        Stop
      </button>
    </div>
  );
};

export default Dictaphone;
