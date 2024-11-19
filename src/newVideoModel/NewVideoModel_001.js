// import React, { useState, useEffect } from "react";
// // import chobietlyAudio from "./Audio/chobietly.mp3";
// // import initializeVoicesAndPlatform from "./initializeVoicesAndPlatform";
// // import JsonDataInput from "./B100_SPandRCJSON.json";
// import $ from "jquery";
// // import { playAudioById } from "./function/ulti";
// // const imagePath = `/media/images/A1.webp`;
// const voiceSetup = initializeVoicesAndPlatform();
// let i = 1;
// // Tạo đối tượng lưu trữ các file âm thanh đã load
// let audioFilesLoaded = {};
// let loadedCount = 0; // Đếm số lượng file đã load xong
// const totalAudioFiles = JsonDataInput.length; // Tổng số file cần load

// const TextToSpeech = () => {
//   const [supportVietnamese, setSupportVietnamese] = useState(false);
//   // const [currentSetIndex, setCurrentSetIndex] = useState(-1);
//   const [timeline, setTimeline] = useState([]);
//   const [text, setText] = useState("");
//   const [TimeYoutube, setTimeYoutube] = useState(0);
//   const [ActionSet, setActionSet] = useState("");
//   const [ActionSTT, setActionSTT] = useState(0);
//   const [ReadSTT, setReadSTT] = useState(0);
//   const [ReadOBJ, setReadOBJ] = useState(null);
//   const [Border, setBorder] = useState("");
//   const [backgroundImage, setBackgroundImage] = useState(null);
//   const [audioObj, setAudioObj] = useState(null);
//   const [TEXTABC, setTEXTABC] = useState("Text 01");
//   const [InputData, setInputData] = useState([]);

//   const [isShrunk, setIsShrunk] = useState(false);

//   // Hàm xóa tất cả các file âm thanh đã load
//   function clearAudioFiles() {
//     // Đặt lại đối tượng lưu trữ và biến đếm
//     audioFilesLoaded = {};
//     loadedCount = 0;
//     console.log("Đã xóa tất cả các file âm thanh đã lưu.");
//   }

//   // Hàm load tất cả các file âm thanh
//   function preloadAudioFiles(callback) {
//     // Xóa tất cả các file âm thanh trước khi load file mới
//     clearAudioFiles();

//     JsonDataInput.concat([
//       { audioCode: "SE-type.wav" },
//       { audioCode: "SE-tingSound.mp3" },
//     ]).forEach((e) => {
//       if (e.audioCode) {
//         // Thêm phần mở rộng .mp3 vào audioCode để tạo đường dẫn đầy đủ
//         const audio = new Audio(`media/audio/${e.audioCode}`);
//         audio.preload = "auto";

//         // Lưu trữ đối tượng audio với tên key thêm "Loaded" để dễ sử dụng sau này
//         audioFilesLoaded[`${e.audioCode}Loaded`] = audio;

//         // Đảm bảo file đã sẵn sàng để phát
//         audio.load();

//         // Xử lý sự kiện khi file âm thanh có thể phát đầy đủ
//         audio.oncanplaythrough = () => {
//           loadedCount++;
//           console.log(
//             `File âm thanh đã load: ${e.audioCode} (${loadedCount}/${totalAudioFiles})`
//           );

//           // Kiểm tra nếu tất cả file đã được load
//           if (
//             loadedCount === totalAudioFiles &&
//             typeof callback === "function"
//           ) {
//             callback(); // Gọi hàm callback khi tất cả các file đã load xong
//           }
//         };

//         // Xử lý lỗi khi không thể load file
//         audio.onerror = () => {
//           console.error(`Không thể load file âm thanh: ${e.audioCode}`);
//         };
//       }
//     });
//   }

//   // Hàm sẽ được gọi sau khi tất cả âm thanh đã preload
//   function onAllAudioPreloaded() {
//     console.log("Tất cả các file âm thanh đã load xong, sẵn sàng để phát.");
//     // Thực hiện hành động khác sau khi tất cả audio đã được preload
//   }
//   if (i === 1) {
//     preloadAudioFiles(onAllAudioPreloaded);
//     i++;
//   }
//   // Gọi hàm để load sẵn các file âm thanh và chờ đến khi tất cả file load xong

//   let inputDataPureJavaript;
//   useEffect(() => {
//     setActionSet("");
//     setActionSTT(0);
//     setReadSTT(0);
//     inputDataPureJavaript = InputData;
//   }, [InputData]);

//   useEffect(() => {
//     const updateVoiceSupport = () => {
//       const voices = speechSynthesis.getVoices();
//       const vietnameseVoices = voices.filter((voice) => voice.lang === "vi-VN");
//       setSupportVietnamese(vietnameseVoices.length > 0);
//     };

//     speechSynthesis.onvoiceschanged = updateVoiceSupport;
//     updateVoiceSupport();

//     return () => {
//       speechSynthesis.onvoiceschanged = null;
//     };
//   }, []);

//   // useEffect(() => {
//   //   setInterval(() => {
//   //     setTEXTABC((D) => D + "1");
//   //   }, 2000);
//   // }, []);

//   // useEffect(() => {
//   //   if (ActionSTT !== 0 && ActionSTT === ReadSTT) {
//   //     try {
//   //       speakNextSet(InputData, ActionSTT);
//   //     } catch (error) {}
//   //   }
//   // }, [ActionSTT, ReadSTT]);
//   // playAudioById(
//   //   "A1",
//   //   () => console.log("Âm thanh bắt đầu phát"), // onStart callback
//   //   () => console.log("Âm thanh đã kết thúc") // onEnd callback
//   // );
//   const STARTProcessing = (n, JsonDataInput) => {
//     if (n >= JsonDataInput.length) {
//       console.log("Kết thúc VIDEO");
//       return;
//     }
//     if (JsonDataInput[n].audioCode) {
//       const audioKey = JsonDataInput[n].audioCode + "Loaded";
//       const audio = audioFilesLoaded[audioKey];

//       // playAudioById(
//       //   audio,
//       //   () => {
//       //     console.log(
//       //       "Âm thanh bắt đầu phát lần " + n,
//       //       "shrinkable-0" + ((n % 2) + 1),
//       //       "#ImgDivID-N" + n,
//       //       n % 2
//       //     );
//       //     const element = $("#ImgDivID-N" + n)[0]; // Get the DOM element from jQuery

//       //     if (n % 3 === 0) {
//       //       // Function to apply the horizontal movement animation
//       //       function applyHorizontalAnimation(element) {
//       //         element.animate(
//       //           [
//       //             { transform: "translateX(0)" }, // Start position
//       //             { transform: "translateX(5%)" }, // Move to the right
//       //             { transform: "translateX(0)" }, // Return to center
//       //             { transform: "translateX(-5%)" }, // Move to the left
//       //             { transform: "translateX(0)" }, // Return to center
//       //           ],
//       //           {
//       //             duration: 15000, // 30 seconds for the full loop
//       //             iterations: Infinity, // Infinite loop
//       //             easing: "ease-in-out", // Smooth in-and-out motion
//       //           }
//       //         );
//       //       }

//       //       // Apply horizontal animation if `n` is even
//       //       // Apply horizontal animation if `n` is even
//       //       applyHorizontalAnimation(element);
//       //     } else if (n % 3 === 1) {
//       //       // Function to apply the scaling animation
//       //       function applyScalingAnimation(element) {
//       //         element.animate(
//       //           [
//       //             { transform: "scale(1)" }, // Start size
//       //             { transform: "scale(1.3)" }, // Scale up
//       //             { transform: "scale(1)" }, // Return to normal
//       //             { transform: "scale(0.8)" }, // Scale down
//       //             { transform: "scale(1)" }, // Return to normal
//       //           ],
//       //           {
//       //             duration: 15000, // 30 seconds for the full loop
//       //             iterations: Infinity, // Infinite loop
//       //             easing: "ease-in-out", // Smooth in-and-out motion
//       //           }
//       //         );
//       //       }

//       //       // Apply scaling animation if `n` is odd
//       //       applyScalingAnimation(element);
//       //     } else {
//       //       function applyHorizontalAnimation01(element) {
//       //         element.animate(
//       //           [
//       //             { transform: "translateX(0)" }, // Start position
//       //             { transform: "translateX(-5%)" }, // Move to the right
//       //             { transform: "translateX(0)" }, // Return to center
//       //             { transform: "translateX(5%)" }, // Move to the left
//       //             { transform: "translateX(0)" }, // Return to center
//       //           ],
//       //           {
//       //             duration: 15000, // 30 seconds for the full loop
//       //             iterations: Infinity, // Infinite loop
//       //             easing: "ease-in-out", // Smooth in-and-out motion
//       //           }
//       //         );
//       //       }

//       //       // Apply horizontal animation if `n` is even
//       //       applyHorizontalAnimation01(element);
//       //     }

//       //     // .removeClass() // Remove all existing classes
//       //     // .addClass("shrinkable-0" + ((n % 2) + 1)); // Add the new class
//       //   }, // onStart callback
//       //   () => {
//       //     // $("#ImgDivID-" + n).hide();
//       //     if (n < JsonDataInput.length - 1) {
//       //       const obj = $("#ImgDivID-N" + n);
//       //       obj.css("opacity", 0.9);

//       //       // Gradually fade opacity to 0 over 1 second
//       //       obj.animate({ opacity: 0 }, 1000, () => {
//       //         obj.remove(); // Clean up the element once the fade is complete
//       //       });
//       //     }

//       //     STARTProcessing(n + 1, JsonDataInput);
//       //   }
//       // );
//     }
//   };

//   const playAudio = () => {
//     const audio = new Audio(chobietlyAudio);
//     audio.volume = 0.1;
//     audio.loop = true;
//     audio.play();
//     setAudioObj(audio);
//   };

//   const stopAudio = () => {
//     if (audioObj) {
//       audioObj.loop = false;
//       const fadeOutDuration = 3000; // Duration of fade-out in milliseconds
//       const fadeOutSteps = 30; // Number of fade-out steps
//       const fadeOutInterval = fadeOutDuration / fadeOutSteps;
//       const fadeOutVolumeStep = audioObj.volume / fadeOutSteps;
//       const fadeOut = setInterval(() => {
//         if (audioObj.volume > 0) {
//           audioObj.volume = Math.max(0, audioObj.volume - fadeOutVolumeStep);
//         } else {
//           clearInterval(fadeOut);
//           audioObj.pause();
//           audioObj.currentTime = 0;
//         }
//       }, fadeOutInterval);
//     }
//   };

//   // const startSpeaking = () => {
//   //   STARTProcessing(0, JsonDataInput);
//   // };

//   const handleChange = (e) => {
//     try {
//       const parsedData = JSON.parse(e);
//       console.log(JSON.stringify(parsedData));
//       setInputData(parsedData);
//     } catch (err) {
//       alert("Lỗi: Kiểm tra lại"); // Báo lỗi nếu không thể parse
//     }
//   };
//   const rateDiv = 1;

//   return (
//     <div style={{ overflow: "hidden" }}>
//       <div
//         id="NEW"
//         style={{
//           position: "relative",
//           width: 450 * rateDiv + "px",
//           height: (450 * rateDiv * 16) / 9 + "px", // Đặt chiều cao dựa trên chiều rộng và tỷ lệ 9:16
//           border: "1px solid black",
//           position: "fixed",
//           top: "0%",
//           left: "30%",
//           // transform: "translate(-50%, -50%)",
//           overflow: "hidden", // Đảm bảo nội dung nằm trong khung
//         }}
//       >
//         {/* <h1>NEW</h1>
//         <h1>{TEXTABC}</h1> */}
//         {/* <div
//           id="MANHINHDENNEN"
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: "black",
//             color: "white",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 1000,
//             opacity: "0",
//           }}
//         ></div> */}
//         <div
//           id="ImgDivID-NEN"
//           style={{
//             position: "absolute",
//             top: "0px",
//             left: "-87.5px",
//             right: "-87.5px",
//             bottom: "0px",
//             backgroundColor: "black",
//             color: "white",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 1,
//           }}
//         >
//           <img
//             src={imagePath}
//             alt={"fileName"}
//             style={{ width: "800px", height: "800px" }}
//           />
//         </div>
//         <div
//           id="IMGBackgroundCover"
//           style={{
//             position: "absolute",
//             top: "10%",
//             left: "2%",
//             right: "2%",
//             bottom: "10%",
//             backgroundColor: "black",
//             color: "white",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 102,
//             borderRadius: "15px",
//             opacity: "0.7",
//           }}
//         ></div>
//         <div
//           id="XULY"
//           style={{
//             position: "absolute",
//             top: "10%",
//             left: "2%",
//             right: "2%",
//             bottom: "10%",
//             // backgroundColor: "black",
//             color: "white",
//             // display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 103,
//             borderRadius: "15px",
//             // opacity: "0.3",
//           }}
//         ></div>
//         {/* {JsonDataInput.map((e, i) => (
//           <div
//             key={i}
//             id={"ImgDivID-N" + i}
//             style={{
//               position: "absolute",
//               top: "-400px",
//               left: "-487.5px",
//               right: "-487.5px",
//               bottom: "-400px",
//               backgroundColor: "black",
//               color: "white",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               zIndex: 100 - i,
//               borderRadius: "10px",
//               backgroundImage: `url(/media/images/${e.imgCode})`,
//               backgroundSize: "cover", // Ensures the image covers the entire div
//               backgroundPosition: "center", // Centers the image within the div
//               backgroundRepeat: "no-repeat", // Prevents the background image from repeating
//             }}
//           >
//             <img
//               src={`/media/images/${e.imgCode}`}
//               alt="fileName"
//               style={{ width: "800px", height: "800px" }}
//             />
//           </div>
//         ))} */}

//         {/* <div
//           id="STARTBTN"
//           style={{
//             position: "absolute",
//             top: "0px",
//             left: "0px",
//             right: "0px",
//             bottom: "0px",
//             backgroundColor: "white",
//             color: "white",
//             display: "flex",
//             // alignItems: "center",
//             // justifyContent: "center",
//             zIndex: 120,
//             opacity: "0.5",
//           }}
//         >
//           <button
//             style={{ height: "100px" }}
//             onClick={() => {
//               const elements = document.querySelectorAll(".shrinkable");

//               elements.forEach((element) => {
//                 let scale = 1;
//                 let direction = 1;
//                 let translateX = 0;
//                 let translateDirection = 1;
//                 let fpsInterval = 1000 / 30; // 30fps interval
//                 let lastFrameTime = 0;
//                 let totalTime = 0; // Track total elapsed time
//                 const loopDuration = 150000; // 15 seconds loop

//                 function animate(timestamp) {
//                   if (!lastFrameTime) lastFrameTime = timestamp;
//                   const deltaTime = timestamp - lastFrameTime;

//                   // Only update at 30fps intervals
//                   if (timestamp - lastFrameTime >= fpsInterval) {
//                     lastFrameTime = timestamp;
//                     totalTime += deltaTime;

//                     // Calculate progress within the 15-second loop (0 to 1)
//                     const progress = (totalTime % loopDuration) / loopDuration;

//                     // Calculate scale and translation based on progress
//                     scale = 0.8 + 0.4 * Math.sin(progress * 2 * Math.PI); // Smooth scale between 0.8 and 1.2
//                     translateX = 10 * Math.sin(progress * 2 * Math.PI); // Smooth horizontal movement between -10% and 10%

//                     // Apply both scale and horizontal movement
//                     element.style.transform = `scale(${scale}) translateX(${translateX}%)`;
//                   }

//                   requestAnimationFrame(animate);
//                 }

//                 requestAnimationFrame(animate);
//               });
//             }}
//           >
//             CHUYEN DONG
//           </button>
//           <button
//             style={{ height: "100px" }}
//             onClick={() => {
//               $("#STARTBTN").hide();
//               setTimeout(() => {
//                 startSpeaking();
//               }, 3000);
//             }}
//           >
//             START
//           </button>
//         </div> */}
//       </div>
//       <div style={{ width: "400px", height: "400px" }}>
//         {JSON.stringify(voiceSetup)}
//         {InputData ? (
//           <button onClick={() => startSpeaking()}>Speak sets</button>
//         ) : (
//           <button>NHẬP DỮ LIỆU</button>
//         )}

//         <p>
//           {supportVietnamese
//             ? "Vietnamese is supported."
//             : "Vietnamese is not supported."}
//         </p>
//         <div>
//           <button onClick={playAudio}>Phát âm thanh</button>
//           <button id="stopbutton" onClick={stopAudio}>
//             Dừng
//           </button>
//           <button
//             onClick={() => {
//               try {
//                 const doc = document.documentElement; // Lấy toàn bộ phần tử <html>

//                 if (doc.requestFullscreen) {
//                   doc.requestFullscreen();
//                 } else if (doc.mozRequestFullScreen) {
//                   // Firefox
//                   doc.mozRequestFullScreen();
//                 } else if (doc.webkitRequestFullscreen) {
//                   // Chrome, Safari, Opera
//                   doc.webkitRequestFullscreen();
//                 } else if (doc.msRequestFullscreen) {
//                   // IE/Edge
//                   doc.msRequestFullscreen();
//                 }
//                 $("#coverCanvas")
//                   .removeAttr("style") // Xóa toàn bộ các style inline trước đó
//                   .css({
//                     position: "fixed",
//                     top: "0",
//                     bottom: "0",
//                     left: "0",
//                     right: "0",
//                   });
//               } catch (error) {
//                 console.error("Error while trying to go fullscreen:", error);
//               }
//             }}
//           >
//             FULL MÀN HÌNH
//           </button>
//           <button
//             onClick={() => {
//               rotateAndScaleElement("NEW");
//             }}
//           >
//             Xoay
//           </button>
//           <button
//             onClick={() => {
//               setTimeYoutube(15);
//             }}
//           >
//             TimeYoutube 15
//           </button>
//           <button
//             onClick={() => {
//               setTimeYoutube(16);
//             }}
//           >
//             TimeYoutube 16
//           </button>
//           Action: {ActionSTT}-Read:{ReadSTT}
//           <button
//             onClick={() => {
//               // Đặt opacity = 1 để hiện div trước
//               $("#MANHINHDENNEN").css("opacity", 0.9);

//               // Sau đó từ từ giảm opacity về 0 trong 1 giây
//               $("#MANHINHDENNEN").animate({ opacity: 0 }, 1000);
//             }}
//           >
//             Chuyển cảnh 1
//           </button>
//           <button
//             onClick={() => {
//               const $screen = $("#MANHINHDENNEN");

//               // Bắt đầu bằng cách làm đen toàn màn hình (opacity lên 1)
//               $screen.css("opacity", 1);

//               // Sau 0.5s, bắt đầu mở từ phải qua trái
//               setTimeout(() => {
//                 $screen.animate({ width: "0%" }, 1000, function () {
//                   // Khi hoàn tất chuyển cảnh, có thể ẩn hoàn toàn nếu cần
//                   $screen.css({ opacity: 0, width: "100%" });
//                 });
//               }, 500);
//             }}
//           >
//             Chuyển cảnh 2
//           </button>
//           <button
//             onClick={() => {
//               const $screen = $("#ImgDivID-01");

//               // Bắt đầu bằng cách làm đen toàn màn hình (opacity lên 1)
//               $screen.addClass("shrinkable");
//             }}
//           >
//             Thu nhỏ| IMG 01
//           </button>
//           <button
//             onClick={() => {
//               const $screen = $("#ImgDivID-01");

//               $screen.animate({ width: "0%" }, 1000, function () {
//                 // Khi hoàn tất chuyển cảnh, có thể ẩn hoàn toàn nếu cần
//                 $screen.css({ opacity: 0, width: "100%" });
//               });
//             }}
//           >
//             Chuyển cảnh IMG1 - SANG TRÁI| IMG 01
//           </button>
//           <button
//             onClick={() => {
//               // STARTProcessing(0, JsonDataInput);
//               startLoop(0, "sat", "sæt");
//             }}
//           >
//             TYPING SOUND
//           </button>
//           {/* <div id="AudioDiv">
//             {JsonDataInput.map((e, i) => (
//               <div key={i}>
//                 {" "}
//                 {e.audioCode}{" "}
//                 <audio
//                   key={i}
//                   src={"media/audio/" + e.audioCode}
//                   preload="auto"
//                   controls
//                 />{" "}
//               </div>
//             ))}
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TextToSpeech;

// function splitTextIntoChunks(text, maxChunkSize = 2500) {
//   const sentences = text.match(/[^.!?]+[.!?]\s*/g) || [text];
//   const chunks = [];
//   let currentChunk = "";

//   sentences.forEach((sentence) => {
//     if (currentChunk.length + sentence.length > maxChunkSize) {
//       chunks.push(currentChunk);
//       currentChunk = sentence;
//     } else {
//       currentChunk += sentence;
//     }
//   });

//   if (currentChunk.length > 0) {
//     chunks.push(currentChunk);
//   }

//   return chunks;
// }

// const TimeDisplay = ({ sets }) => {
//   const formatTime = (time) => {
//     const hours = Math.floor(time / 3600000);
//     const minutes = Math.floor((time % 3600000) / 60000);
//     const seconds = Math.floor((time % 60000) / 1000);
//     return `${hours} giờ ${minutes} phút ${seconds} giây`;
//   };

//   const baseTime = sets.length > 0 ? sets[0].time : 0;

//   try {
//     return (
//       <div>
//         {sets.map((set, index) => (
//           <div key={index}>
//             <h5>{set.id}</h5>
//             <p>
//               {index === 0
//                 ? "0 giờ 0 phút 0 giây"
//                 : formatTime(set.time - baseTime)}
//             </p>
//           </div>
//         ))}
//       </div>
//     );
//   } catch (error) {
//     return null;
//   }
// };

// function newform(data, mode) {
//   const res = [];
//   data.forEach((e, i) => {
//     if (i % 2 === 1) {
//       splitTextIntoChunks(
//         `${
//           data[i - 1]
//         }<break time="1.5s"/>${e}<break time="1.5s"/> Hết chương ${
//           i % 2
//         }. Chúc các bạn nghe truyện tại cá đọc truyện chữ vui vẻ. Nhớ đăng ký ủng hộ kênh nhé.`
//       ).forEach((chunk, chunkIndex) => {
//         res.push({
//           id: `Chuong-${Math.floor(i / 2) + 1}-${chunkIndex}`,
//           content: chunk,
//         });
//       });
//     }
//   });

//   if (mode === "data") {
//     return JSON.stringify(res);
//   } else {
//     return res.map((e, i) => <div key={i}>{e.content}</div>);
//   }
// }

// {
//   /* <div className="containerPlanet">
//             <div className="planet"></div>
//             <div className="orbit">
//               <div className="moon"></div>
//             </div>
//           </div> */
// }
// {
//   /* <div
//             className="containerImg"
//             style={{ position: "absolute", top: "10%" }}
//           >
//             <img className="moving-image" src={backgroundImage} width="330px" />
//           </div> */
// }

// function showFloatingText(text) {
//   // Create a div element for the floating text
//   const textElement = document.createElement("div");
//   textElement.className = "floating-text";
//   textElement.textContent = text;
//   document.body.appendChild(textElement);

//   // Trigger the move-up animation
//   setTimeout(() => {
//     textElement.classList.add("move-up");
//   }, 100); // Delay to ensure the element is added to the DOM

//   // Trigger the fade-out effect after moving up
//   setTimeout(() => {
//     textElement.classList.add("fade-out");
//   }, 7100); // 7 seconds for the move-up animation

//   // Remove the element after the fade-out animation is complete
//   setTimeout(() => {
//     document.body.removeChild(textElement);
//   }, 14100); // 14 seconds total (7 seconds move-up + 7 seconds fade-out)
// }

// function rotateAndScaleElement(id) {
//   $(`#${id}`).css({
//     // width: "800px",
//     position: "absolute",
//     top: "-37%",
//     left: "22%",
//     // scale: "2.35",
//     transform: "rotate(90deg)",
//     "transform-origin": "center center",
//   });
// }

// function startLoop(n, textInput, ipaInput) {
//   let text = textInput.split("");
//   let ipa = ipaInput;

//   const audioKey = "SE-type.wavLoaded";
//   const audio = audioFilesLoaded[audioKey];

//   const playSound = () =>
//     playAudioById(
//       audio,
//       () => console.log("SE START"),
//       () => console.log("SE END")
//     );

//   function findVowelInIPA(ipaString) {
//     const UEOAIsets = [
//       { vowel: "U", ipa: ["ʊ", "uː"] },
//       { vowel: "E", ipa: ["e"] },
//       { vowel: "O", ipa: ["ɒ", "ɔː"] },
//       { vowel: "A", ipa: ["æ", "ʌ", "ɑː"] },
//       { vowel: "I", ipa: ["ɪ", "iː"] },
//       { vowel: "Ơ", ipa: ["ɜː"] },
//     ];

//     let foundVowel = null;
//     let vowelRepresentation = null;

//     UEOAIsets.forEach((e) => {
//       e.ipa.forEach((e1) => {
//         if (ipaString.includes(e1)) {
//           foundVowel = e1;
//           vowelRepresentation = e.vowel;
//         }
//       });
//     });
//     let ipaArray = [];
//     const getTime_01 = ipaString.split(foundVowel);
//     ipaArray.push(getTime_01[0]);
//     ipaArray.push(foundVowel);
//     ipaArray.push(getTime_01[1]);
//     return { ipaArray, foundVowel, vowelRepresentation };
//   }

//   const IDget = $("#XULY");
//   IDget.html(""); // Xóa nội dung trước khi bắt đầu vòng lặp mới
//   IDget.css({ opacity: 1 });
//   IDget.append(`<div class="allClass" id="XULYSript` + n + `"></div>`);
//   IDget.append(`<div class="allClass" id="XULYText` + n + `"></div>`);
//   IDget.append(`<div class="allClass" id="XULYIPA` + n + `"></div>`);
//   IDget.append(`<div class="allClass" id="XULYExplain` + n + `"></div>`);
//   IDget.append(`<div class="allClass" id="XULYEND` + n + `"></div>`);
//   IDget.append(`<div class="allClass" id="XULYTable` + n + `"></div>`);
//   const IDgetScript = $("#XULYSript" + n);
//   const IDgetText = $("#XULYText" + n);
//   const IDgetIPA = $("#XULYIPA" + n);
//   const IDgetExplain = $("#XULYEND" + n);
//   const IDgetEnd = $("#XULYExplain" + n);
//   const IDgetTable = $("#XULYTable" + n);

//   IDget.css({ fontSize: "80px", fontWeight: "800" });
//   IDgetScript.css({
//     fontSize: "20px",
//     fontWeight: "500",
//     padding: "0 5px",
//     color: "white",
//     height: "60px",
//   });
//   // IDgetText.css({ marginTop: "20%" });
//   IDgetIPA.css({ color: "yellow" });
//   IDgetExplain.css({ opacity: 0, fontSize: "0px" });
//   IDgetEnd.css({ opacity: 0, fontSize: "0px" });
//   IDgetTable.css({
//     fontSize: "20px",
//   });
//   const vowelFound = findVowelInIPA(ipa);

//   let time01 = 500 + text.length * 500;
//   let time02 = 1500 + text.length * 500 + ipa.length * 500;

//   // Append each character of `text` with a delay
//   IDgetScript.text("Từ vựng");
//   text.forEach((char, index) => {
//     setTimeout(() => {
//       IDgetText.append(
//         `<span class="allClass textClass textClass${index}${n}">${char}</span>`
//       );
//       playSound();
//     }, index * 500);
//   });

//   // After `text` is appended, add a line break and start appending `ipa`
//   setTimeout(() => {
//     IDgetScript.text("Phiên âm quốc tế");
//     IDgetIPA.css({
//       border: "1px solid green",
//       borderRadius: "10px",
//       backgroundColor: "grey",
//     });

//     vowelFound.ipaArray.forEach((char, index) => {
//       setTimeout(() => {
//         IDgetIPA.append(
//           `<span class="allClass ipaClass ipaClass${index}${n}">${char}</span>`
//         );
//         playSound();
//       }, index * 500);
//     });
//   }, time01);

//   setTimeout(() => {
//     IDgetScript.text("Bước 1: Xác định nguyên âm đại diện");
//     IDgetExplain.append(
//       `<span> <span>${vowelFound.foundVowel}</span> ~ <u>${vowelFound.vowelRepresentation}</u> </span>`
//     );
//     addtable(IDgetTable, vowelFound.vowelRepresentation);
//     IDgetExplain.css({
//       opacity: 1,
//       fontSize: "100px",
//       transition: "all 3s ease",
//     });
//   }, time02);

//   setTimeout(() => {
//     $(".ipaClass1" + n).css({
//       transition: "all 2s ease",
//       color: "blue",
//     });
//     IDgetText.css({
//       fontSize: 0,
//       opacity: 0,
//       transition: "all 2s ease",
//     });
//   }, time02 + 2000);

//   setTimeout(() => {
//     IDgetExplain.css({
//       fontSize: "0px",
//       opacity: 0,
//       transition: "all 1s ease",
//     });
//   }, time02 + 5000);

//   setTimeout(() => {
//     IDgetScript.text("Bước 2: (Âm chính to, dài hơn) -- Âm dấu nhỏ ngắn hơn.");
//     const audioKey = "SE-tingSound.mp3Loaded";
//     const audio = audioFilesLoaded[audioKey];

//     const playSound_01 = () =>
//       playAudioById(
//         audio,
//         () => console.log("SE START"),
//         () => console.log("SE END")
//       );
//     playSound_01();
//     IDgetEnd.append(
//       `<span> <i>(${vowelFound.ipaArray[0]}</i> <u class="allClass vowelRepresentationClass">${vowelFound.vowelRepresentation}</u>
//       )<i class="allClass endsound"> --${vowelFound.ipaArray[2]} </i>
//       </span>`
//     );

//     IDgetEnd.css({
//       fontWeight: "500",
//       padding: "0px",
//       opacity: 1,
//       fontSize: "100px",
//       transition: "all 1s ease",
//     });

//     setTimeout(() => {
//       $(".vowelRepresentationClass").css({
//         fontSize: "60px",
//         color: "blue",
//         transition: "all 2s ease",
//       });
//       $(".endsound").css({
//         fontSize: "40px",
//         color: "purple",
//         transition: "all 2s ease",
//       });
//     }, 2000);

//     setTimeout(() => {
//       IDget.css({
//         opacity: 0,
//         // fontSize: "0",
//         transition: "all 1s ease",
//       });
//       setTimeout(() => {
//         startLoop(n + 1, text.join(""), ipa); // Gọi lại hàm startLoop để tiếp tục vòng lặp
//       }, 1000);
//     }, 7000);
//   }, time02 + 6000);
// }

// function addtable(objectFocus, vowelRepresentation) {
//   // Dữ liệu cho bảng
//   const UEOAIsets = [
//     { vowel: "U", ipa: ["ʊ", "uː"] },
//     { vowel: "E", ipa: ["e"] },
//     { vowel: "O", ipa: ["ɒ", "ɔː"] },
//     { vowel: "A", ipa: ["æ", "ʌ", "ɑː"] },
//     { vowel: "I", ipa: ["ɪ", "iː"] },
//     { vowel: "Ơ", ipa: ["ɜː"] },
//   ];

//   // Tạo bảng và thêm các hàng
//   const table = $("<table></table>").css({
//     border: "1px solid black",
//     borderCollapse: "collapse",
//     width: "100%",
//   });

//   // Thêm hàng dữ liệu
//   UEOAIsets.forEach((item) => {
//     const styleCSS =
//       item.vowel === vowelRepresentation
//         ? "border: 1px solid black; padding: 8px; background-color: gray;"
//         : "border: 1px solid black; padding: 8px;";

//     table.append(`
//       <tr>
//         <td style="${styleCSS}">${item.vowel}</td>
//         <td style="${styleCSS}">${item.ipa.join(", ")}</td>
//       </tr>
//     `);
//   });

//   // Thêm bảng vào phần tử được truyền vào dưới dạng `objectFocus`
//   objectFocus.append(table);
// }

return <div></div>;
