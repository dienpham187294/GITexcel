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

    const { ID_01, ID_02, nameVideo } = videoList[n];
    if (ID_01 === null || ID_02 === null) {
      setTimeout(() => {
        mergeVideos(videoList, n + 1);
      }, 2000);
      return;
    }

    const file1Url = `${process.env.PUBLIC_URL}/data/${ID_01}.mp4`;
    const file2Url = `${process.env.PUBLIC_URL}/data/${ID_02}.mp4`;
    const outroUrl = `${process.env.PUBLIC_URL}/data/${ID_01}.mp4`;

    // const outroUrl = `${process.env.PUBLIC_URL}/data/project_outro.mp4`;

    setCurrentPair(`${ID_01} + ${ID_02} + outro`);
    setCurrentOperation(`Bắt đầu xử lý cặp video ${n + 1}/${videoList.length}`);
    setMergeProgress(0);
    setProcessedCount(n);

    let file1Data, file2Data, outroData;
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
      setCurrentOperation("Đang tải video outro (project_outro.mp4)...");
      outroData = await fetchFile(outroUrl);
      setMergeProgress(15);
    } catch (err) {
      setMissingFiles((prev) => [...prev, "project_outro.mp4"]);
      status = false;
      console.error("Không tìm thấy file: project_outro.mp4", err);
    }

    if (!status) {
      console.log(
        `Bỏ qua cặp ${ID_01}+${ID_02}+outro do thiếu file, chuyển sang cặp tiếp theo`
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

      // Làm sạch tất cả các file trước đó
      setCurrentOperation("Đang chuẩn bị không gian làm việc...");
      const filesToClean = [
        "file1.mp4",
        "file2.mp4",
        "outro.mp4",
        "video1.mp4",
        "video2.mp4",
        "video3.mp4",
        "audio1.aac",
        "audio2.aac",
        "audio2_normalized.aac",
        "audio3.aac",
        "temp1.mp4",
        "temp2.mp4",
        "temp3.mp4",
        "concat_video.txt",
        "concat_audio.txt",
        "merged_video.mp4",
        "merged_audio.aac",
        "output.mp4",
        "normalized.mp4",
        "loudness1.txt",
        "loudness2.txt",
      ];

      for (const file of filesToClean) {
        await safeUnlink(file);
      }
      setMergeProgress(22);

      // Viết các file đầu vào
      setCurrentOperation("Đang chuẩn bị dữ liệu...");
      await ffmpeg.writeFile("file1.mp4", file1Data);
      await ffmpeg.writeFile("file2.mp4", file2Data);
      await ffmpeg.writeFile("outro.mp4", outroData);
      setMergeProgress(25);

      // BƯỚC 1: Tách riêng phần video (không có âm thanh) từ mỗi file
      setCurrentOperation("Đang tách hình ảnh từ video 1...");
      await ffmpeg.exec([
        "-i",
        "file1.mp4",
        "-an", // Loại bỏ âm thanh
        "-c:v",
        "libx264",
        "-crf",
        "18", // Chất lượng cao hơn
        "-preset",
        "slow", // Mã hóa chậm hơn nhưng chất lượng tốt hơn
        "-r",
        "30", // Đặt framerate cố định
        "video1.mp4",
      ]);
      setMergeProgress(28);

      setCurrentOperation("Đang tách hình ảnh từ video 2...");
      await ffmpeg.exec([
        "-i",
        "file2.mp4",
        "-an",
        "-c:v",
        "libx264",
        "-crf",
        "18",
        "-preset",
        "slow",
        "-r",
        "30",
        "video2.mp4",
      ]);
      setMergeProgress(31);

      setCurrentOperation("Đang tách hình ảnh từ video outro...");
      await ffmpeg.exec([
        "-i",
        "outro.mp4",
        "-an",
        "-c:v",
        "libx264",
        "-crf",
        "18",
        "-preset",
        "slow",
        "-r",
        "30",
        "video3.mp4",
      ]);
      setMergeProgress(34);

      // BƯỚC 2: Tách riêng phần âm thanh từ mỗi file
      setCurrentOperation("Đang tách âm thanh từ video 1...");
      await ffmpeg.exec([
        "-i",
        "file1.mp4",
        "-vn", // Loại bỏ video
        "-c:a",
        "aac",
        "-b:a",
        "192k", // Bitrate âm thanh tốt hơn
        "-ar",
        "48000", // Sample rate cố định
        "audio1.aac",
      ]);
      setMergeProgress(36);

      setCurrentOperation("Đang tách âm thanh từ video 2...");
      await ffmpeg.exec([
        "-i",
        "file2.mp4",
        "-vn",
        "-c:a",
        "aac",
        "-b:a",
        "192k",
        "-ar",
        "48000",
        "audio2.aac",
      ]);
      setMergeProgress(38);

      setCurrentOperation("Đang tách âm thanh từ video outro...");
      await ffmpeg.exec([
        "-i",
        "outro.mp4",
        "-vn",
        "-c:a",
        "aac",
        "-b:a",
        "192k",
        "-ar",
        "48000",
        "audio3.aac",
      ]);
      setMergeProgress(40);

      // BƯỚC MỚI: Phân tích âm lượng của video 1 để chuẩn hóa âm lượng video 2
      setCurrentOperation("Đang phân tích âm lượng video 1...");
      await ffmpeg.exec([
        "-i",
        "audio1.aac",
        "-af",
        "volumedetect",
        "-f",
        "null",
        "-y",
        "/dev/null",
      ]);

      // Tiếp tục phân tích âm lượng video 2
      setCurrentOperation("Đang phân tích âm lượng video 2...");
      await ffmpeg.exec([
        "-i",
        "audio2.aac",
        "-af",
        "volumedetect",
        "-f",
        "null",
        "-y",
        "/dev/null",
      ]);
      setMergeProgress(42);

      // Chuẩn hóa âm lượng của video 2 bằng với video 1
      setCurrentOperation("Đang chuẩn hóa âm lượng video 2 theo video 1...");
      await ffmpeg.exec([
        "-i",
        "audio1.aac",
        "-af",
        "loudnorm=print_format=json",
        "-f",
        "null",
        "-",
      ]);

      await ffmpeg.exec([
        "-i",
        "audio2.aac",
        "-af",
        "loudnorm=I=-16:LRA=11:TP=-1.5", // Thiết lập chuẩn âm lượng
        "audio2_normalized.aac",
      ]);
      setMergeProgress(45);

      // BƯỚC 3: Ghép phần video và âm thanh riêng biệt
      // Tạo danh sách ghép nối video
      const concatVideoList = `file 'video1.mp4'\nfile 'video2.mp4'\nfile 'video3.mp4'`;
      await ffmpeg.writeFile(
        "concat_video.txt",
        new TextEncoder().encode(concatVideoList)
      );

      // Tạo danh sách ghép nối âm thanh (sử dụng file âm thanh 2 đã được chuẩn hóa)
      const concatAudioList = `file 'audio1.aac'\nfile 'audio2_normalized.aac'\nfile 'audio3.aac'`;
      await ffmpeg.writeFile(
        "concat_audio.txt",
        new TextEncoder().encode(concatAudioList)
      );

      // Ghép nối video (không có âm thanh)
      setCurrentOperation("Đang ghép phần hình ảnh...");
      await ffmpeg.exec([
        "-f",
        "concat",
        "-safe",
        "0",
        "-i",
        "concat_video.txt",
        "-c:v",
        "copy", // Có thể dùng copy vì đã được xử lý với cùng một cấu hình
        "merged_video.mp4",
      ]);
      setMergeProgress(50);

      // Ghép nối âm thanh
      setCurrentOperation("Đang ghép phần âm thanh đã chuẩn hóa...");
      await ffmpeg.exec([
        "-f",
        "concat",
        "-safe",
        "0",
        "-i",
        "concat_audio.txt",
        "-c:a",
        "aac",
        "-b:a",
        "192k",
        "merged_audio.aac",
      ]);
      setMergeProgress(60);

      // BƯỚC 4: Kết hợp video và âm thanh đã ghép nối
      setCurrentOperation("Đang kết hợp âm thanh và hình ảnh...");
      await ffmpeg.exec([
        "-i",
        "merged_video.mp4",
        "-i",
        "merged_audio.aac",
        "-c:v",
        "copy",
        "-c:a",
        "copy",
        "-map",
        "0:v:0", // Lấy luồng video đầu tiên từ file đầu vào thứ nhất
        "-map",
        "1:a:0", // Lấy luồng âm thanh đầu tiên từ file đầu vào thứ hai
        "-shortest", // Đảm bảo output có độ dài của luồng ngắn nhất
        "output.mp4",
      ]);
      setMergeProgress(70);

      // BƯỚC 5: Chuẩn hóa và kiểm tra đồng bộ hóa
      setCurrentOperation("Đang tối ưu hóa video và đồng bộ hóa...");
      await ffmpeg.exec([
        "-i",
        "output.mp4",
        "-c:v",
        "libx264",
        "-crf",
        "23",
        "-preset",
        "medium",
        "-c:a",
        "aac",
        "-b:a",
        "192k",
        "-vsync",
        "cfr", // Đảm bảo tốc độ khung hình không đổi
        "-af",
        "aresample=async=1", // Điều chỉnh đồng bộ
        "-fflags",
        "+genpts", // Tạo mới time stamp
        "-movflags",
        "+faststart", // Tối ưu cho web playback
        "normalized.mp4",
      ]);
      setMergeProgress(80);

      // BƯỚC 6: Kiểm tra video sau khi chuẩn hóa
      await ffmpeg.exec(["-i", "normalized.mp4"]);
      setMergeProgress(85);

      // BƯỚC 7: Đọc và tải xuống video
      setCurrentOperation("Đang chuẩn bị tải xuống...");
      const finalData = await ffmpeg.readFile("normalized.mp4");
      const finalBlob = new Blob([finalData.buffer], { type: "video/mp4" });
      const finalUrl = URL.createObjectURL(finalBlob);
      setMergeProgress(95);

      const link = document.createElement("a");
      link.href = finalUrl;
      link.download = `${nameVideo}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setCurrentOperation(
        `Video ${ID_01}_${ID_02}_with_outro.mp4 đã được tạo thành công!`
      );
      setMergeProgress(100);

      // Dọn dẹp
      for (const file of filesToClean) {
        await safeUnlink(file);
      }

      // Xử lý cặp tiếp theo sau khoảng thời gian nghỉ
      setTimeout(() => {
        mergeVideos(videoList, n + 1);
      }, 2000);
    } catch (err) {
      console.error("Lỗi khi ghép video:", err);
      setError(`❌ Lỗi khi ghép video: ${err.message}`);
      // Tiếp tục với cặp tiếp theo ngay cả khi có lỗi
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
        Merge Video Pairs + Outro
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
      <div className="row">
        <div className="col-6">
          {" "}
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
                    {item.ID_01} + {item.ID_02} + outro
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
        </div>
        <div className="col-6">
          {" "}
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
      </div>
    </div>
  );
}

export default VideoMerger;
