import React, { useEffect, useState } from "react";

const PlaylistWithSearchAndSidebar = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [matchedVideos, setMatchedVideos] = useState([]);
  const API_KEY = "AIzaSyBWBxqpLe4z7BFwmuDegv82QH7ZTofrO-o";
  const PLAYLIST_ID = "PLC0acE0qMKOlNOu-mq4kE0gOt6v83RjrS";

  useEffect(() => {
    const fetchPlaylistVideos = async () => {
      try {
        let nextPageToken = "";
        let allVideos = [];

        while (nextPageToken !== null) {
          const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${PLAYLIST_ID}&part=snippet&maxResults=50&pageToken=${nextPageToken}`;
          const response = await fetch(apiUrl);
          const data = await response.json();

          allVideos = [...allVideos, ...data.items];
          nextPageToken = data.nextPageToken || null;

          if (allVideos.length >= 200) break;
        }

        setVideos(allVideos);
      } catch (error) {
        console.error("Lỗi khi tải danh sách phát:", error);
      }
    };

    fetchPlaylistVideos();
  }, []);

  const handleSearch = () => {
    if (!searchTerm || videos.length === 0) return;

    const normalizedSearch = searchTerm.toLowerCase();

    const sortedVideos = videos
      .map((video) => {
        const title = video.snippet.title.toLowerCase();
        return {
          ...video,
          distance: levenshteinDistance(normalizedSearch, title),
        };
      })
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 10);

    setMatchedVideos(sortedVideos);
  };

  const levenshteinDistance = (a, b) => {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[b.length][a.length];
  };

  return (
    <div className="flex h-screen">
      {/* Left: Main Content */}
      <div className="w-4/5 p-4">
        <h2 className="text-xl font-bold mb-2">Playlist: Ghép âm tổng hợp</h2>

        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/videoseries?list=${PLAYLIST_ID}`}
          frameBorder="0"
          allowFullScreen
          title="YouTube Playlist"
        ></iframe>

        <div className="mt-6 flex items-center gap-2">
          <input
            type="text"
            placeholder="Nhập từ khóa tìm video..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded w-2/3"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Tìm kiếm
          </button>
        </div>

        {matchedVideos.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Top 10 video gần giống:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchedVideos.map((video) => (
                <div
                  key={video.snippet.resourceId.videoId}
                  className="border rounded p-2 shadow"
                >
                  <iframe
                    width="100%"
                    height="200"
                    src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
                    title={video.snippet.title}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                  <p className="mt-2 text-sm font-medium">
                    {video.snippet.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar */}
      <div className="w-1/5 border-l overflow-y-auto p-4 bg-gray-50">
        <h3 className="font-semibold mb-2 text-sm">Gợi ý Video</h3>
        {videos.slice(0, 5).map((video) => (
          <div key={video.snippet.resourceId.videoId} className="mb-4">
            <iframe
              width="100%"
              height="100"
              src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
              title={video.snippet.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <p className="text-xs mt-1">{video.snippet.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistWithSearchAndSidebar;
