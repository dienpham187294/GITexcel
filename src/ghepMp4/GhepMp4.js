import React, { useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import videoJson from "./video_merge.json";

function VideoMerger() {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [missingFiles, setMissingFiles] = useState([]);
  const [mergeProgress, setMergeProgress] = useState(0);
  const [currentPair, setCurrentPair] = useState("");
  const [currentOperation, setCurrentOperation] = useState("");
  const [ffmpeg] = useState(
    () =>
      new FFmpeg({
        log: true,
        progress: ({ ratio }) => {
          if (!isNaN(ratio)) {
            const percent = Math.floor(ratio * 40);
            setMergeProgress(50 + percent); // From 50% to 90%
            setCurrentOperation(`Đang ghép video: ${50 + percent}% hoàn thành`);
          }
        },
      })
  );
  const [isFFmpegLoaded, setIsFFmpegLoaded] = useState(false);
  const [processedCount, setProcessedCount] = useState(0);
  const [totalPairs, setTotalPairs] = useState(0);

  const mergeVideos = async (videoList, n) => {
    if (n >= videoList.length) {
      setProcessing(false);
      setError("✅ Đã xử lý xong tất cả video.");
      return;
    }

    const { ID_01, ID_02 } = videoList[n];
    const file1Url = `${process.env.PUBLIC_URL}/data/${ID_01}.mp4`;
    const file2Url = `${process.env.PUBLIC_URL}/data/${ID_02}.mp4`;
    const url01Url = `${process.env.PUBLIC_URL}/data/${ID_01}.mp4`;

    setCurrentPair(`${ID_01} + ${ID_02} + url01`);
    setCurrentOperation(`Bắt đầu xử lý cặp video ${n + 1}/${videoList.length}`);
    setMergeProgress(0);
    setProcessedCount(n);

    let file1Data, file2Data, url01Data;
    let status = true;

    try {
      setCurrentOperation(`Đang tải video 1 (${ID_01}.mp4)...`);
      file1Data = await fetchFile(file1Url);
      setMergeProgress(5);
    } catch (err) {
      setMissingFiles((prev) => [...prev, `${ID_01}.mp4`]);
      status = false;
      console.error(`Không tìm thấy file: ${ID_01}.mp4`, err);
    }

    try {
      setCurrentOperation(`Đang tải video 2 (${ID_02}.mp4)...`);
      file2Data = await fetchFile(file2Url);
      setMergeProgress(10);
    } catch (err) {
      setMissingFiles((prev) => [...prev, `${ID_02}.mp4`]);
      status = false;
      console.error(`Không tìm thấy file: ${ID_02}.mp4`, err);
    }

    try {
      setCurrentOperation("Đang tải video url01 (url01.mp4)...");
      url01Data = await fetchFile(url01Url);
      setMergeProgress(15);
    } catch (err) {
      setMissingFiles((prev) => [...prev, "url01.mp4"]);
      status = false;
      console.error("Không tìm thấy file: url01.mp4", err);
    }

    if (!status) {
      console.log(
        `Bỏ qua cặp ${ID_01}+${ID_02}+url01 do thiếu file, chuyển sang cặp tiếp theo`
      );
      setTimeout(() => {
        mergeVideos(videoList, n + 1);
      }, 1000);
      return;
    }

    try {
      // Load FFmpeg if not already loaded
      if (!isFFmpegLoaded) {
        setCurrentOperation("Đang tải FFmpeg...");
        await ffmpeg.load();
        setIsFFmpegLoaded(true);
        setCurrentOperation("Đã tải FFmpeg thành công");
        setMergeProgress(20);
      }

      const safeUnlink = async (filename) => {
        try {
          await ffmpeg.FS("unlink", filename);
        } catch {}
      };

      setCurrentOperation("Đang chuẩn bị dữ liệu...");
      setMergeProgress(25);

      // Clean up existing files
      await safeUnlink("file1.mp4");
      await safeUnlink("file2.mp4");
      await safeUnlink("url01.mp4");
      await safeUnlink("temp1.mp4");
      await safeUnlink("temp2.mp4");
      await safeUnlink("temp3.mp4");
      await safeUnlink("input.txt");
      await safeUnlink("output.mp4");

      // Prepare first video
      setCurrentOperation(`Đang chuẩn bị video 1 (${ID_01}.mp4)...`);
      await ffmpeg.writeFile("file1.mp4", file1Data);
      // Re-encode first video to ensure compatibility
      await ffmpeg.exec([
        "-i",
        "file1.mp4",
        "-c:v",
        "libx264",
        "-crf",
        "23",
        "-preset",
        "veryfast",
        "-c:a",
        "aac",
        "-b:a",
        "128k",
        "temp1.mp4",
      ]);
      setMergeProgress(30);

      // Prepare second video
      setCurrentOperation(`Đang chuẩn bị video 2 (${ID_02}.mp4)...`);
      await ffmpeg.writeFile("file2.mp4", file2Data);
      // Re-encode second video
      await ffmpeg.exec([
        "-i",
        "file2.mp4",
        "-c:v",
        "libx264",
        "-crf",
        "23",
        "-preset",
        "veryfast",
        "-c:a",
        "aac",
        "-b:a",
        "128k",
        "temp2.mp4",
      ]);
      setMergeProgress(35);

      // Prepare url01 video
      setCurrentOperation("Đang chuẩn bị video url01...");
      await ffmpeg.writeFile("url01.mp4", url01Data);
      // Re-encode url01 video
      await ffmpeg.exec([
        "-i",
        "url01.mp4",
        "-c:v",
        "libx264",
        "-crf",
        "23",
        "-preset",
        "veryfast",
        "-c:a",
        "aac",
        "-b:a",
        "128k",
        "temp3.mp4",
      ]);
      setMergeProgress(40);

      // Get video information for debug
      await ffmpeg.exec(["-i", "temp1.mp4"]);
      await ffmpeg.exec(["-i", "temp2.mp4"]);
      await ffmpeg.exec(["-i", "temp3.mp4"]);

      // Create concat file with the re-encoded videos
      const concatList = `file 'temp1.mp4'\nfile 'temp2.mp4'\nfile 'temp3.mp4'`;
      await ffmpeg.writeFile("input.txt", new TextEncoder().encode(concatList));
      setMergeProgress(50);

      // Use direct stream copy for merging all three videos
      setCurrentOperation("Đang ghép 3 video...");
      await ffmpeg.exec([
        "-f",
        "concat",
        "-safe",
        "0",
        "-i",
        "input.txt",
        "-c",
        "copy", // Copy streams directly without re-encoding
        "output.mp4",
      ]);

      // Check duration of output (debugging)
      await ffmpeg.exec(["-i", "output.mp4", "-f", "null", "-"]);

      setCurrentOperation("Đang chuẩn bị tải xuống...");
      setMergeProgress(95);

      const mergedData = await ffmpeg.readFile("output.mp4");
      const mergedBlob = new Blob([mergedData.buffer], { type: "video/mp4" });
      const mergedUrl = URL.createObjectURL(mergedBlob);

      const link = document.createElement("a");
      link.href = mergedUrl;
      link.download = `${ID_01}_${ID_02}_with_url01.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setCurrentOperation(
        `Video ${ID_01}_${ID_02}_with_url01.mp4 đã được tạo thành công!`
      );
      setMergeProgress(100);

      // Clean up all files
      await safeUnlink("file1.mp4");
      await safeUnlink("file2.mp4");
      await safeUnlink("url01.mp4");
      await safeUnlink("temp1.mp4");
      await safeUnlink("temp2.mp4");
      await safeUnlink("temp3.mp4");
      await safeUnlink("input.txt");
      await safeUnlink("output.mp4");

      // Delay before processing next pair
      setTimeout(() => {
        mergeVideos(videoList, n + 1);
      }, 2000);
    } catch (err) {
      console.error("Lỗi khi merge video:", err);
      setError(`❌ Lỗi khi ghép video: ${err.message}`);
      // Continue with next pair even if there's an error
      setTimeout(() => {
        mergeVideos(videoList, n + 1);
      }, 2000);
    }
  };

  const startMerging = () => {
    setProcessing(true);
    setError(null);
    setMissingFiles([]);
    setProcessedCount(0);
    setTotalPairs(videoJson.length);
    mergeVideos(videoJson, 0);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">
        Merge Video Pairs + URL01
      </h1>

      <button
        onClick={startMerging}
        className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-300"
        disabled={processing}
      >
        {processing ? "Đang xử lý..." : "Bắt đầu ghép video"}
      </button>

      {processing && (
        <div className="mt-6">
          <div className="flex justify-between mb-1">
            <span className="font-medium">
              Tiến trình tổng thể: {processedCount}/{totalPairs} cặp
            </span>
            <span>{Math.floor((processedCount * 100) / totalPairs)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: `${(processedCount * 100) / totalPairs}%` }}
            ></div>
          </div>

          <div className="flex justify-between mb-1">
            <span className="font-medium">Cặp hiện tại: {currentPair}</span>
            <span>{mergeProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${mergeProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">{currentOperation}</p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
          {error}
        </div>
      )}

      <div className="mt-6">
        <h2 className="font-bold text-lg mb-2">
          Danh sách cặp video ({videoJson.length}):
        </h2>
        <div className="max-h-60 overflow-auto border rounded p-3 bg-gray-50">
          {videoJson.map((item, index) => (
            <div
              key={index}
              className="flex justify-between py-1 border-b last:border-0"
            >
              <div>
                {item.ID_01} + {item.ID_02} + url01
              </div>
              {processing && index < processedCount && (
                <span className="text-green-600">✓ Đã xử lý</span>
              )}
              {processing && index === processedCount && (
                <span className="text-blue-600">⚙️ Đang xử lý</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {missingFiles.length > 0 && (
        <div className="mt-6 bg-red-100 p-4 rounded border border-red-400">
          <h2 className="font-bold text-red-600">
            ❌ Không tìm thấy các file sau:
          </h2>
          <ul className="list-disc pl-5">
            {missingFiles.map((filename, index) => (
              <li key={index}>{filename}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default VideoMerger;
