import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player/youtube";

const VideoPlayer = ({ seconds }) => {
  const playerRef = useRef(null); // Reference to the video player

  // Function to handle seeking to a specified time
  const handleSeek = (seconds) => {
    const timeInSeconds = parseFloat(seconds);
    if (playerRef.current && !isNaN(timeInSeconds)) {
      playerRef.current.seekTo(timeInSeconds);
    }
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
        url="https://www.youtube.com/embed/jE2_wJgmyOs?autoplay=1&mute=1&loop=1&playlist=jE2_wJgmyOs&controls=0&showinfo=0&modestbranding=1&rel=0"
        playing={true}
        muted={true} // Ensures video is muted
        loop={true} // Loops the video
        controls={false} // Hides player controls
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
