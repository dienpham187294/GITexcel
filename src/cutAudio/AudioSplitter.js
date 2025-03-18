import React, { useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import audio from "./data_can_push/mp3.mp3";
import jsonData_origin from "./data/codefile_01.json";
import $ from "jquery";
function AudioSplitter() {
  const [audioSegments, setAudioSegments] = useState([]);
  const [error, setError] = useState(null);
  const ffmpeg = new FFmpeg({ log: true });

  const loadFFmpeg = async () => {
    await ffmpeg.load();
  };
  let ArrDone = [];
  const splitAudio = async () => {
    try {
      // await loadFFmpeg();
      let time = 200;
      let m = 0;
      let jsonData = jsonData_origin;
      let n = 0;
      // Define the interval function
      let intervalF = setInterval(async () => {
        if (n >= jsonData.length) {
          clearInterval(intervalF); // Stop the interval when all items are processed
          return;
        }
        let item = jsonData[n];
        try {
          await ffmpeg.load();
          // Load the audio file
          await ffmpeg.writeFile("input.mp3", await fetchFile(audio));
          const { id, begin_01, end } = item;

          const startTime = (begin_01 - jsonData[0].begin_01) / 1000 + 0.6;
          const duration = (end - begin_01) / 1000 + 1.5;

          // Execute FFmpeg to extract the segment
          await ffmpeg.exec([
            "-i",
            "input.mp3",
            "-ss",
            `${startTime}`,
            "-t",
            `${duration}`,
            "-acodec",
            "copy",
            `${id}.mp3`,
          ]);

          // Read the output file
          const data = await ffmpeg.readFile(`${id}.mp3`);

          const audioUrl = URL.createObjectURL(
            new Blob([data.buffer], { type: "audio/mp3" })
          );

          // Automatically download the file
          const link = document.createElement("a");
          link.href = audioUrl;
          link.download = `${id}.mp3`;
          document.body.appendChild(link); // Append link to body
          link.click();
          ArrDone.push(n);

          document.getElementById(id).style.display = "none";
          // $("#baocao").append(id + " "); // Display the current id
          document.body.removeChild(link); // Remove the link after download

          // Terminate FFmpeg

          await ffmpeg.terminate(`${item.id}A.mp3`);
        } catch (error) {
          console.error("Error processing segment:", item, error);
        }

        if (n - ArrDone[ArrDone.length - 1] === 0) {
          n++;
        }
        // Move to the next item
      }, 6000);

      // for (const item of jsonData.slice(200, 300)) {
      //   const { id, begin, end } = item;
      //   $("#baocao").append(id);
      //   const startTime = (begin - jsonData[0].begin) / 1000;
      //   const duration = (end - begin) / 1000;

      //   // Execute FFmpeg to extract the segment
      //   await ffmpeg.exec([
      //     "-i",
      //     "input.mp3",
      //     "-ss",
      //     `${startTime}`,
      //     "-t",
      //     `${duration}`,
      //     "-acodec",
      //     "copy",
      //     `${id}A.mp3`,
      //   ]);

      //   // Read the output file
      //   const data = await ffmpeg.readFile(`${id}A.mp3`);
      //   const audioUrl = URL.createObjectURL(
      //     new Blob([data.buffer], { type: "audio/mp3" })
      //   );

      //   // Automatically download the file by creating a link and clicking it
      //   const link = document.createElement("a");
      //   link.href = audioUrl;
      //   link.download = `${id}A.mp3`;
      //   document.body.appendChild(link); // Append link to body
      //   link.click(); // Programmatically click the link
      //   document.body.removeChild(link); // Remove the link after download
      //   // setAudioSegments((prev) => [...prev, { id, url: audioUrl }]);
      //   await ffmpeg.terminate(`${item.id}A.mp3`);
      //   // Clean up the segment from memory
      //   // await ffmpeg.terminate(`${id}.mp3`);
      // }
      // for (const item of jsonData) {

      // }
      // alert("Audio segments have been processed and are ready for download.");
    } catch (err) {
      console.error("An error occurred during processing:", err);
      setError("An error occurred during audio processing.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Cut and Save Audio Segments from JSON</h1>
      <button onClick={splitAudio}>Start Splitting Audio</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        {audioSegments.map((segment) => (
          <div key={segment.id}>
            <a href={segment.url} download={`${segment.id}.mp3`}>
              Download Segment {segment.id}
            </a>
          </div>
        ))}
      </div>
      <h1>{jsonData_origin.length}</h1>
      {jsonData_origin.map((e, i) => (
        <i style={{ padding: "5px", margin: "5px" }} id={e.id} key={i}>
          {e.id}{" "}
        </i>
      ))}
      <div id="baocao"></div>
    </div>
  );
}

export default AudioSplitter;
