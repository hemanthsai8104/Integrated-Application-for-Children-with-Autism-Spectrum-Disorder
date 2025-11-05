var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function initializeEmotionRecognition() {
    const video = document.getElementById('webcam');
    const resultDiv = document.getElementById('emotion-result');
    const startBtn = document.getElementById('emotion-start-btn');
    if (!video || !resultDiv || !startBtn)
        return;
    let intervalId = null;
    const API_URL = 'http://127.0.0.1:5000/recognize_emotion';
    function stopAnalysis() {
        if (intervalId)
            clearInterval(intervalId);
        intervalId = null;
    }
    function sendFrame() {
        return __awaiter(this, void 0, void 0, function* () {
            if (video.paused || video.ended) {
                stopAnalysis();
                return;
            }
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0);
            const dataUrl = canvas.toDataURL('image/jpeg');
            try {
                const response = yield fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ image: dataUrl }),
                });
                // This line is now a proper template literal
                if (!response.ok)
                    throw new Error(`Server error: ${response.status}`);
                const result = yield response.json();
                resultDiv.textContent = result.emotion || "Analyzing...";
            }
            catch (error) {
                console.error("Analysis error:", error);
                resultDiv.textContent = "Server Error";
                stopAnalysis();
            }
        });
    }
    function startCamera() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stream = yield navigator.mediaDevices.getUserMedia({ video: true });
                video.srcObject = stream;
                video.onloadedmetadata = () => video.play();
                startBtn.textContent = "Camera On";
                if (intervalId)
                    clearInterval(intervalId);
                intervalId = window.setInterval(sendFrame, 2000);
            }
            catch (err) {
                console.error("Webcam error:", err);
                resultDiv.textContent = "Camera access denied.";
            }
        });
    }
    startBtn.onclick = startCamera;
}
