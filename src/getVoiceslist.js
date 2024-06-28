import { useEffect, useState } from "react";

function initializeVoicesAndPlatform(n) {
  if (n > 1) {
    return "null";
  }

  if (n <= 1) {
    return new Promise((resolve) => {
      if ("speechSynthesis" in window) {
        const getVoices = () => {
          const voices = window.speechSynthesis.getVoices();
          if (voices.length === 0) {
            window.speechSynthesis.onvoiceschanged = () => {
              resolve(filterVoicesByLang());
            };
          } else {
            resolve(filterVoicesByLang());
          }
        };

        const filterVoicesByLang = () => {
          const voices = window.speechSynthesis.getVoices();
          const filteredVoices = voices
            .filter((voice) => voice.lang.includes("en-"))
            .map((voice) => ({ lang: voice.lang, name: voice.name }));
          return filteredVoices;
        };

        getVoices();
      } else {
        setTimeout(() => {
          initializeVoicesAndPlatform(n + 1);
        }, 1000);
      }
    });
  }
}

// React component using the above function
const VoiceList = () => {
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    initializeVoicesAndPlatform(0).then(setVoices);
  }, []);

  return (
    <div>
      <h1>Available Voices</h1>
      <ul>
        {voices.map((voice, index) => (
          <li key={index}>
            {voice.name} ({voice.lang})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VoiceList;
