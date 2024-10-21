import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";

const linkYoutubeID = "k_MSa1AmV5Q";
const VideoPlayer = ({ seconds }) => {
  const playerRef = useRef(null); // Reference to the video player
  const [currentTime, setCurrentTime] = useState(0);
  // Function to handle seeking to a specified time
  const handleSeek = (seconds) => {
    const timeInSeconds = parseFloat(seconds);
    if (playerRef.current && !isNaN(timeInSeconds)) {
      playerRef.current.seekTo(timeInSeconds);
    }
  };

  useEffect(() => {
    if (parseInt(currentTime) === 90) {
      handleSeek(15);
    }
  }, [currentTime]);
  const handleProgress = (state) => {
    setCurrentTime(state.playedSeconds); // Cập nhật thời gian hiện tại của video
  };
  // Trigger seek when the `seconds` prop changes
  useEffect(() => {
    if (seconds !== undefined) {
      handleSeek(seconds);
    }
  }, [seconds]);

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: -1, // Ensure the video is in the background
        overflow: "hidden",
      }}
    >
      <ReactPlayer
        ref={playerRef}
        url={
          "https://www.youtube.com/embed/" +
          linkYoutubeID +
          "?autoplay=1&mute=1&loop=1&playlist=jE2_wJgmyOs&controls=0&showinfo=0&modestbranding=1&rel=0"
        }
        playing={true}
        muted={true} // Ensures video is muted
        loop={true} // Loops the video
        controls={false} // Hides player controls
        onProgress={handleProgress}
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          objectFit: "cover", // Ensures the video covers the entire div
          pointerEvents: "none", // Prevents video from interfering with other interactions
        }}
      />
    </div>
  );
};

export default VideoPlayer;
