import React, { useEffect, useState } from "react";

const YouTubePlaylist = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [videoIds, setVideoIds] = useState(new Set());
  const [duplicateCount, setDuplicateCount] = useState(0); // Thêm biến đếm số video lặp lại
  const API_KEY = "AIzaSyBWBxqpLe4z7BFwmuDegv82QH7ZTofrO-o"; // Thay bằng API Key của bạn
  const PLAYLIST_ID = "PLC0acE0qMKOlNOu-mq4kE0gOt6v83RjrS"; // Playlist ID của bạn
  const MAX_DUPLICATES = 100; // Giới hạn số lượng video bị lặp lại

  useEffect(() => {
    const fetchVideos = async () => {
      if (duplicateCount >= MAX_DUPLICATES) return; // Dừng khi số lần video bị lặp lại đạt 100

      let apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${PLAYLIST_ID}&part=snippet&maxResults=50`;

      if (nextPageToken) {
        apiUrl += `&pageToken=${nextPageToken}`;
      }

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const newVideos = [];
        let newDuplicates = 0;

        // Kiểm tra và chỉ thêm các video chưa tồn tại trong videoIds
        data.items.forEach((video) => {
          const videoId = video.snippet.resourceId.videoId;
          if (videoIds.has(videoId)) {
            // Nếu video đã có trong danh sách, tăng số lần lặp lại
            newDuplicates++;
          } else {
            // Nếu video chưa có, thêm vào danh sách
            newVideos.push(video);
            videoIds.add(videoId); // Thêm videoId vào Set để tránh lặp lại
          }
        });

        // Cập nhật lại số lần video bị lặp lại
        setDuplicateCount(duplicateCount + newDuplicates);

        // Cập nhật danh sách video và pageToken
        setVideos((prevVideos) => [...prevVideos, ...newVideos]);
        setNextPageToken(data.nextPageToken); // Lưu pageToken để lấy trang tiếp theo
        setVideoIds(new Set(videoIds)); // Cập nhật videoIds với những video mới
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [nextPageToken, duplicateCount, videoIds]);

  const handleVideoClick = (videoId) => {
    setSelectedVideo(videoId);
  };

  return (
    <div className="container p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video, i) => (
          <div
            key={video.snippet.resourceId.videoId}
            className="border p-2 shadow rounded"
          >
            <h5>{i + 1}</h5>
            <p className="font-bold">{video.snippet.title}</p>
            <button
              onClick={() => handleVideoClick(video.snippet.resourceId.videoId)}
              className="mt-2 p-2 bg-blue-500 text-white rounded"
            >
              Xem video
            </button>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <div className="mt-4">
          <h3 className="font-bold text-xl">Video được chọn:</h3>
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${selectedVideo}`}
            frameBorder="0"
            allowFullScreen
            title="Embedded YouTube Video"
          ></iframe>
        </div>
      )}

      {/* Nút để tải thêm video nếu chưa có quá 100 video bị lặp lại */}
      {nextPageToken && duplicateCount < MAX_DUPLICATES && (
        <div className="mt-4">
          <button
            onClick={() => setNextPageToken(nextPageToken)}
            className="p-2 bg-green-500 text-white rounded"
          >
            Tải thêm video
          </button>
        </div>
      )}
    </div>
  );
};

export default YouTubePlaylist;
