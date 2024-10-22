import React, { useState, useEffect } from "react";
import chobietlyAudio from "./Audio/chobietly.mp3";
// import setsGennaral from "./jsonData/DOCTRUYEN/trutien.json";
// import VoiceList from "./getVoiceslist";
import initializeVoicesAndPlatform from "./initializeVoicesAndPlatform";
// import SpanJson from "./B100_SPandRCJSON.json";
import VideoPlayer from "./B100_SPEAK_AND_RECORD_YOUTUBEVIDEO";
import ContentDiv from "./B100_SPEAK_AND_RECORD_DIV";
import $ from "jquery";
// import "../../App.css";
// import "./B100_SPandRCCSS.css";

const voiceSetup = initializeVoicesAndPlatform();
// const sets = SpanJson;

// const imagesSets = [];
// const uniqueImages = new Set();

// sets.forEach((e) => {
//   if (e.img && !uniqueImages.has(e.img)) {
//     imagesSets.push(e.img);
//     uniqueImages.add(e.img);
//   }
// });
const TextToSpeech = () => {
  const [supportVietnamese, setSupportVietnamese] = useState(false);
  // const [currentSetIndex, setCurrentSetIndex] = useState(-1);
  const [timeline, setTimeline] = useState([]);
  const [text, setText] = useState("");
  const [TimeYoutube, setTimeYoutube] = useState(0);
  const [ActionSet, setActionSet] = useState("");
  const [ActionSTT, setActionSTT] = useState(0);
  const [ReadSTT, setReadSTT] = useState(0);
  const [ReadOBJ, setReadOBJ] = useState(null);
  const [Border, setBorder] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [audioObj, setAudioObj] = useState(null);

  const [InputData, setInputData] = useState(null);
  let inputDataPureJavaript;
  useEffect(() => {
    setActionSet("");
    setActionSTT(0);
    setReadSTT(0);
    inputDataPureJavaript = InputData;
  }, [InputData]);

  useEffect(() => {
    const updateVoiceSupport = () => {
      const voices = speechSynthesis.getVoices();
      const vietnameseVoices = voices.filter((voice) => voice.lang === "vi-VN");
      setSupportVietnamese(vietnameseVoices.length > 0);
    };

    speechSynthesis.onvoiceschanged = updateVoiceSupport;
    updateVoiceSupport();

    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    if (ActionSTT !== 0 && ActionSTT === ReadSTT) {
      try {
        speakNextSet(InputData, ActionSTT);
      } catch (error) {}
    }
  }, [ActionSTT, ReadSTT]);

  const speakNextSet = (sets, index) => {
    if (index < sets.length && index !== -1) {
      const {
        lang,
        rate,
        textToSpeak,
        column,
        divCss,
        divAppear,
        imgInDiv,
        textInDiv,
        textAppear,
        clickAnimation,
      } = sets[index];

      setText(textToSpeak);

      setActionSet({
        column,
        divCss,
        divAppear,
        imgInDiv,
        textInDiv,
        textAppear,
        clickAnimation,
      });
      // setBorder(border);
      // showFloatingText(text);
      // setBackgroundImage(img);

      // if (divCss === null) {
      //   setActionSTT((D) => D + 1);
      // }

      if (textToSpeak !== null) {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = rate;
        const voices = window.speechSynthesis.getVoices();
        utterance.voice = voices[lang];
        speechSynthesis.speak(utterance);
        let stt;
        utterance.onstart = () => {
          stt = false;
        };

        // utterance.onboundary = (event) => {
        //   if (
        //     event.name === "word" &&
        //     event.charIndex > textToSpeak.length - 20
        //   ) {
        //     if (index + 1 < sets.length) {
        //       setReadSTT((D) => D + 1);
        //     } else {
        //       setText("Done!");
        //       // stopAudio();
        //       const stopButton = document.getElementById("stopbutton");
        //       stopButton.click();
        //     }
        //   }
        // };

        utterance.onend = () => {
          if (index + 1 < sets.length) {
            setReadSTT((D) => D + 1);
          } else {
            // readobj([]);
            setText("Done!");
            // stopAudio();
            const stopButton = document.getElementById("stopbutton");
            stopButton.click();
          }
        };
      } else {
        setReadSTT((D) => D + 1);
      }
    }
  };

  const playAudio = () => {
    const audio = new Audio(chobietlyAudio);
    audio.volume = 0.1;
    audio.loop = true;
    audio.play();
    setAudioObj(audio);
  };

  const stopAudio = () => {
    if (audioObj) {
      audioObj.loop = false;
      const fadeOutDuration = 3000; // Duration of fade-out in milliseconds
      const fadeOutSteps = 30; // Number of fade-out steps
      const fadeOutInterval = fadeOutDuration / fadeOutSteps;
      const fadeOutVolumeStep = audioObj.volume / fadeOutSteps;
      const fadeOut = setInterval(() => {
        if (audioObj.volume > 0) {
          audioObj.volume = Math.max(0, audioObj.volume - fadeOutVolumeStep);
        } else {
          clearInterval(fadeOut);
          audioObj.pause();
          audioObj.currentTime = 0;
        }
      }, fadeOutInterval);
    }
  };

  const startSpeaking = () => {
    playAudio();
    speakNextSet(inputDataPureJavaript, 0);
  };

  const handleChange = (e) => {
    try {
      const parsedData = JSON.parse(e);
      console.log(JSON.stringify(parsedData));
      setInputData(parsedData);
    } catch (err) {
      alert("Lỗi: Kiểm tra lại"); // Báo lỗi nếu không thể parse
    }
  };
  const rateDiv = 2;

  return (
    <div>
      <div>
        <div
          style={{
            width: 43 * rateDiv + "vw",
            height: 50 * rateDiv + "vh",
            position:
              "relative" /* Đảm bảo rằng các div khác có thể nổi trên video */,
            overflow: "hidden",
            marginLeft: rateDiv * 2 + "vw",
          }}
          className="coverCanvas"
        >
          <VideoPlayer seconds={TimeYoutube} />
          <ContentDiv
            rateDiv={rateDiv}
            actionSet={ActionSet}
            setActionSTT={setActionSTT}
          />
        </div>
        <div className="col-12">
          {JSON.stringify(voiceSetup)}
          {InputData ? (
            <button onClick={() => startSpeaking()}>Speak sets</button>
          ) : (
            <button>NHẬP DỮ LIỆU</button>
          )}

          <p>
            {supportVietnamese
              ? "Vietnamese is supported."
              : "Vietnamese is not supported."}
          </p>
        </div>
        <div className="col-6"></div>
        <div className="col-3">
          <div>
            <button onClick={playAudio}>Phát âm thanh</button>
            <button id="stopbutton" onClick={stopAudio}>
              Dừng
            </button>
            <button
              onClick={() => {
                try {
                  const doc = document.documentElement; // Lấy toàn bộ phần tử <html>

                  if (doc.requestFullscreen) {
                    doc.requestFullscreen();
                  } else if (doc.mozRequestFullScreen) {
                    // Firefox
                    doc.mozRequestFullScreen();
                  } else if (doc.webkitRequestFullscreen) {
                    // Chrome, Safari, Opera
                    doc.webkitRequestFullscreen();
                  } else if (doc.msRequestFullscreen) {
                    // IE/Edge
                    doc.msRequestFullscreen();
                  }
                  $("#coverCanvas")
                    .removeAttr("style") // Xóa toàn bộ các style inline trước đó
                    .css({
                      position: "fixed",
                      top: "0",
                      bottom: "0",
                      left: "0",
                      right: "0",
                    });
                } catch (error) {
                  console.error("Error while trying to go fullscreen:", error);
                }
              }}
            >
              FULL MÀN HÌNH
            </button>
            <button
              onClick={() => {
                setTimeYoutube(15);
              }}
            >
              TimeYoutube 15
            </button>
            <button
              onClick={() => {
                setTimeYoutube(16);
              }}
            >
              TimeYoutube 16
            </button>
            Action: {ActionSTT}-Read:{ReadSTT}
          </div>

          {/* <VoiceList /> */}
          {/* <TimeDisplay sets={timeline} /> */}
        </div>{" "}
        <input
          type="text"
          onChange={(e) => {
            handleChange(e.target.value);
          }} // Pass the input value to the handleChange function
          placeholder="Enter JSON string"
          style={{ width: "100%", padding: "10px" }}
        />
      </div>
    </div>
  );
};

export default TextToSpeech;

function splitTextIntoChunks(text, maxChunkSize = 2500) {
  const sentences = text.match(/[^.!?]+[.!?]\s*/g) || [text];
  const chunks = [];
  let currentChunk = "";

  sentences.forEach((sentence) => {
    if (currentChunk.length + sentence.length > maxChunkSize) {
      chunks.push(currentChunk);
      currentChunk = sentence;
    } else {
      currentChunk += sentence;
    }
  });

  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }

  return chunks;
}

const TimeDisplay = ({ sets }) => {
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${hours} giờ ${minutes} phút ${seconds} giây`;
  };

  const baseTime = sets.length > 0 ? sets[0].time : 0;

  try {
    return (
      <div>
        {sets.map((set, index) => (
          <div key={index}>
            <h5>{set.id}</h5>
            <p>
              {index === 0
                ? "0 giờ 0 phút 0 giây"
                : formatTime(set.time - baseTime)}
            </p>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    return null;
  }
};

function newform(data, mode) {
  const res = [];
  data.forEach((e, i) => {
    if (i % 2 === 1) {
      splitTextIntoChunks(
        `${
          data[i - 1]
        }<break time="1.5s"/>${e}<break time="1.5s"/> Hết chương ${
          i % 2
        }. Chúc các bạn nghe truyện tại cá đọc truyện chữ vui vẻ. Nhớ đăng ký ủng hộ kênh nhé.`
      ).forEach((chunk, chunkIndex) => {
        res.push({
          id: `Chuong-${Math.floor(i / 2) + 1}-${chunkIndex}`,
          content: chunk,
        });
      });
    }
  });

  if (mode === "data") {
    return JSON.stringify(res);
  } else {
    return res.map((e, i) => <div key={i}>{e.content}</div>);
  }
}

{
  /* <div className="containerPlanet">
            <div className="planet"></div>
            <div className="orbit">
              <div className="moon"></div>
            </div>
          </div> */
}
{
  /* <div
            className="containerImg"
            style={{ position: "absolute", top: "10%" }}
          >
            <img className="moving-image" src={backgroundImage} width="330px" />
          </div> */
}

function showFloatingText(text) {
  // Create a div element for the floating text
  const textElement = document.createElement("div");
  textElement.className = "floating-text";
  textElement.textContent = text;
  document.body.appendChild(textElement);

  // Trigger the move-up animation
  setTimeout(() => {
    textElement.classList.add("move-up");
  }, 100); // Delay to ensure the element is added to the DOM

  // Trigger the fade-out effect after moving up
  setTimeout(() => {
    textElement.classList.add("fade-out");
  }, 7100); // 7 seconds for the move-up animation

  // Remove the element after the fade-out animation is complete
  setTimeout(() => {
    document.body.removeChild(textElement);
  }, 14100); // 14 seconds total (7 seconds move-up + 7 seconds fade-out)
}
