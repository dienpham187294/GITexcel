import { useEffect, useState } from "react";

function initializeVoicesAndPlatform02(n, setVoicesCONSOLE) {
  if (n > 1) {
    return Promise.resolve(null);
  }

  return new Promise((resolve) => {
    const getVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          resolve(testVoices());
        };
      } else {
        resolve(testVoices());
      }
    };

    const findVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      let imale = null;
      let ifemale = null;
      voices.forEach((voice, index) => {
        setVoicesCONSOLE((prevVoices) => [
          ...prevVoices,
          JSON.stringify({ name: voice.name, lang: voice.lang }),
        ]);
      });
      if (isRunningOnWindows()) {
        setVoicesCONSOLE((prevVoices) => [...prevVoices, "ON WINDOWS"]);
        voices.forEach((voice, index) => {
          if (voice.lang.includes("en-")) {
            if (voice.name.includes("David")) {
              imale = index;
            }
            if (voice.name.includes("Zira")) {
              ifemale = index;
            }
          }
        });
      } else if (isRunningOnMac() || isIOS()) {
        setVoicesCONSOLE((prevVoices) => [...prevVoices, "ON MAC/iOS"]);
        voices.forEach((voice, index) => {
          if (voice.lang.includes("en-")) {
            if (voice.name.includes("Daniel")) {
              imale = index;
            }
            if (voice.name.includes("Karen")) {
              ifemale = index;
            }
          }
        });
      } else if (isAndroid()) {
        setVoicesCONSOLE((prevVoices) => [...prevVoices, "ON ANDROID"]);
        voices.forEach((voice, index) => {
          if (voice.lang.includes("en-GB")) {
            imale = index;
            ifemale = index;
          }
        });
      }

      setVoicesCONSOLE((prevVoices) => [
        ...prevVoices,
        JSON.stringify({ imale, ifemale }),
      ]);

      return { imale, ifemale };
    };

    const testVoices = () => {
      const result1 = findVoices();
      const result2 = findVoices();

      if (JSON.stringify(result1) === JSON.stringify(result2)) {
        return result1;
      } else {
        const result3 = findVoices();
        if (JSON.stringify(result1) === JSON.stringify(result3)) {
          return result1;
        } else if (JSON.stringify(result2) === JSON.stringify(result3)) {
          return result2;
        } else {
          return result3;
        }
      }
    };

    if ("speechSynthesis" in window) {
      getVoices();
    } else {
      setTimeout(() => {
        initializeVoicesAndPlatform02(n + 1, setVoicesCONSOLE);
      }, 1000);
    }
  });
}

const VoiceList = () => {
  const [voices, setVoices] = useState([]);
  const [voicesPICK, setVoicesPICK] = useState([]);
  const [voicesCONSOLE, setVoicesCONSOLE] = useState([]);

  useEffect(() => {
    initializeVoicesAndPlatform02(0, setVoicesCONSOLE).then(setVoicesPICK);
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
      <hr />
      <pre>{JSON.stringify(voicesPICK, null, 2)}</pre>
      <hr />
      {voicesCONSOLE.map((e, i) => (
        <p key={i}>{e}</p>
      ))}
    </div>
  );
};

export default VoiceList;

function isIOS() {
  return /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
}

function isAndroid() {
  return /android/.test(navigator.userAgent.toLowerCase());
}

function isRunningOnWindows() {
  return /windows/.test(navigator.userAgent.toLowerCase());
}

function isRunningOnMac() {
  return /macintosh|mac os x/.test(navigator.userAgent.toLowerCase());
}
