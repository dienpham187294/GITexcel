import { useState, useEffect, useRef } from "react";

export default function ImprovedTextToSpeechRecorder() {
  const [text, setText] = useState(
    "Xin chào, đây là ví dụ ghi âm giọng nói từ trình duyệt."
  );
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [captureMethod, setCaptureMethod] = useState("system"); // 'system' or 'microphone'
  const [audioLevel, setAudioLevel] = useState(0);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Load available voices
  useEffect(() => {
    function loadVoices() {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      // Try to set Vietnamese voice as default
      const vietnameseVoice = availableVoices.find((v) => v.lang === "vi-VN");
      if (vietnameseVoice) {
        setSelectedVoice(vietnameseVoice);
      } else if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0]);
      }
    }

    // Chrome needs this event to get voices
    if (window.speechSynthesis) {
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;

      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    } else {
      setStatusMessage("Trình duyệt của bạn không hỗ trợ Speech Synthesis API");
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop();
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Clean up URL objects
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const updateAudioLevel = () => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    // Calculate average level
    const average =
      dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
    setAudioLevel(average);

    // Continue animation loop
    animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
  };

  const speakAndRecord = async () => {
    if (!window.speechSynthesis) {
      setStatusMessage("Trình duyệt của bạn không hỗ trợ Speech Synthesis API");
      return;
    }

    try {
      // Reset previous recording
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }

      audioChunksRef.current = [];
      setIsRecording(true);
      setStatusMessage("Đang chuẩn bị ghi âm...");

      // Create new AudioContext
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();

      let stream;

      if (captureMethod === "system") {
        // Try system audio capture first
        try {
          stream = await navigator.mediaDevices.getDisplayMedia({
            video: false,
            audio: {
              echoCancellation: false,
              noiseSuppression: false,
              autoGainControl: false,
              channelCount: 2,
            },
          });
          setStatusMessage("Đang ghi âm từ âm thanh hệ thống...");
        } catch (displayError) {
          console.warn("Không thể ghi âm âm thanh hệ thống:", displayError);

          // Notify user and switch to microphone
          setStatusMessage(
            "Không thể ghi âm hệ thống, chuyển sang dùng microphone..."
          );
          setCaptureMethod("microphone");

          stream = await navigator.mediaDevices.getUserMedia({
            audio: {
              echoCancellation: false,
              noiseSuppression: false,
              autoGainControl: false,
            },
          });
        }
      } else {
        // Use microphone directly
        stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false,
          },
        });
        setStatusMessage("Đang ghi âm qua microphone...");
      }

      // Set up audio visualization
      const mediaStreamSource = audioContext.createMediaStreamSource(stream);
      analyserRef.current = audioContext.createAnalyser();
      analyserRef.current.fftSize = 256;
      mediaStreamSource.connect(analyserRef.current);

      // Start audio level visualization
      updateAudioLevel();

      // Set up MediaRecorder with high quality
      const options = {
        mimeType: MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
          ? "audio/webm;codecs=opus"
          : MediaRecorder.isTypeSupported("audio/webm")
          ? "audio/webm"
          : "audio/ogg",
        audioBitsPerSecond: 128000,
      };

      mediaRecorderRef.current = new MediaRecorder(stream, options);

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        // Stop all stream tracks
        stream.getTracks().forEach((track) => track.stop());

        // Cancel animation frame
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }

        // Create audio blob
        const audioBlob = new Blob(audioChunksRef.current, {
          type: options.mimeType,
        });

        // Check blob size
        if (audioBlob.size <= 44) {
          setStatusMessage(
            "Không có dữ liệu âm thanh được ghi. Vui lòng kiểm tra cài đặt âm thanh."
          );
          setIsRecording(false);
          return;
        }

        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setIsRecording(false);
        setStatusMessage("Ghi âm hoàn tất!");
        setAudioLevel(0);
      };

      // Start recording with shorter chunks for lower latency
      mediaRecorderRef.current.start(100);

      // Create TTS utterance
      const utterance = new SpeechSynthesisUtterance(text);

      // Apply selected voice
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      // Set optimal speech properties
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Add speech completion event
      utterance.onend = () => {
        // Wait before stopping to capture trailing audio
        setTimeout(() => {
          if (
            mediaRecorderRef.current &&
            mediaRecorderRef.current.state !== "inactive"
          ) {
            mediaRecorderRef.current.stop();
          }
        }, 1500); // Wait 1.5 seconds to ensure all audio is captured
      };

      // Add error handler
      utterance.onerror = (event) => {
        console.error("SpeechSynthesis error:", event);
        if (
          mediaRecorderRef.current &&
          mediaRecorderRef.current.state !== "inactive"
        ) {
          mediaRecorderRef.current.stop();
        }
        setStatusMessage(
          "Lỗi khi phát giọng nói: " + (event.error || "Không rõ lỗi")
        );
      };

      // Play speech
      window.speechSynthesis.speak(utterance);

      // Safety timeout
      const maxTimeout = setTimeout(() => {
        if (
          mediaRecorderRef.current &&
          mediaRecorderRef.current.state !== "inactive"
        ) {
          mediaRecorderRef.current.stop();
          setStatusMessage("Đã dừng ghi âm sau 30 giây");
        }
      }, 30000);
    } catch (error) {
      console.error("Error during speech and recording:", error);
      setIsRecording(false);
      setStatusMessage(`Lỗi: ${error.message || "Không thể ghi âm"}`);
      setAudioLevel(0);
    }
  };

  const handleVoiceChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    setSelectedVoice(voices[selectedIndex]);
  };

  const handleMethodChange = (e) => {
    setCaptureMethod(e.target.value);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Text to Speech + Ghi âm
      </h2>

      <div className="mb-4">
        <textarea
          className="w-full p-2 border rounded-md"
          rows="4"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isRecording}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 mb-2">Chọn giọng đọc:</label>
          <select
            className="w-full p-2 border rounded-md bg-white"
            onChange={handleVoiceChange}
            value={selectedVoice?.name || ""}
            disabled={isRecording || voices.length === 0}
          >
            {voices.length === 0 && <option>Đang tải giọng đọc...</option>}
            {voices.map((voice, index) => (
              <option key={index} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Phương pháp ghi âm:
          </label>
          <select
            className="w-full p-2 border rounded-md bg-white"
            value={captureMethod}
            onChange={handleMethodChange}
            disabled={isRecording}
          >
            <option value="system">Âm thanh hệ thống (Chrome/Edge)</option>
            <option value="microphone">Microphone (Tất cả trình duyệt)</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <button
          className={`px-4 py-2 rounded-md text-white font-medium ${
            isRecording
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={
            isRecording
              ? () => {
                  if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
                }
              : speakAndRecord
          }
        >
          {isRecording ? "Dừng ghi âm" : "Phát & Ghi âm"}
        </button>

        {isRecording && (
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-green-600 h-4 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${Math.min(100, audioLevel / 2.56)}%` }}
            ></div>
          </div>
        )}

        {statusMessage && (
          <div
            className={`text-sm ${
              statusMessage.includes("Lỗi") ? "text-red-500" : "text-green-500"
            }`}
          >
            {statusMessage}
          </div>
        )}

        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <h3 className="text-sm font-medium text-yellow-800">
            Hướng dẫn sử dụng:
          </h3>
          <ul className="mt-2 text-sm text-yellow-700 list-disc pl-5 space-y-1">
            <li>
              <strong>Để ghi âm hệ thống (Chrome/Edge):</strong> Khi hộp thoại
              xuất hiện, chọn "Chia sẻ tab này" hoặc "Chia sẻ âm thanh hệ thống"
            </li>
            <li>
              <strong>Nếu dùng microphone:</strong> Đặt loa gần microphone hoặc
              sử dụng tai nghe có mic
            </li>
            <li>
              <strong>Kiểm tra âm lượng:</strong> Nếu thanh âm lượng không di
              chuyển khi đang ghi, có thể không có âm thanh nào được ghi
            </li>
            <li>
              <strong>Nếu không nghe thấy âm thanh trong bản ghi:</strong> Hãy
              thử phương pháp ghi âm khác hoặc kiểm tra cài đặt âm thanh
            </li>
          </ul>
        </div>

        <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
          <h3 className="text-sm font-medium text-blue-800">
            Khắc phục sự cố:
          </h3>
          <ul className="mt-2 text-sm text-blue-700 list-disc pl-5 space-y-1">
            <li>
              Nếu âm thanh ghi âm quá nhỏ: Tăng âm lượng thiết bị và thử lại
            </li>
            <li>
              Nếu không có âm thanh trong file ghi: Chọn "Microphone" và đặt loa
              máy tính gần microphone
            </li>
            <li>
              Một số trình duyệt không hỗ trợ ghi âm hệ thống: Firefox và Safari
              nên sử dụng phương pháp microphone
            </li>
            <li>
              Trong Chrome/Edge: Cần chọn đúng "Chia sẻ âm thanh hệ thống" hoặc
              "Chia sẻ tab này"
            </li>
          </ul>
        </div>

        {audioUrl && (
          <div className="space-y-2 border p-3 rounded-md bg-gray-50">
            <h3 className="font-medium">File ghi âm đã hoàn thành:</h3>
            <audio controls src={audioUrl} className="w-full">
              Trình duyệt của bạn không hỗ trợ thẻ audio.
            </audio>

            <div className="flex space-x-2 mt-2">
              <a
                href={audioUrl}
                download="tts-recording.webm"
                className="flex-1 px-4 py-2 bg-green-600 text-center text-white rounded-md hover:bg-green-700"
              >
                Tải xuống giọng nói
              </a>

              <button
                onClick={() => {
                  URL.revokeObjectURL(audioUrl);
                  setAudioUrl(null);
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Xóa bản ghi
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
