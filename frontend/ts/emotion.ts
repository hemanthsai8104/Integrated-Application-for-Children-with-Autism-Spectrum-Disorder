export function initializeEmotionRecognition() {
    const video = document.getElementById('webcam') as HTMLVideoElement;
    const resultDiv = document.getElementById('emotion-result');
    const startBtn = document.getElementById('emotion-start-btn');
    if (!video || !resultDiv || !startBtn) return;
    
    let intervalId: number | null = null;
    const API_URL = 'http://127.0.0.1:5000/recognize_emotion';

    function stopAnalysis() {
        if (intervalId) clearInterval(intervalId);
        intervalId = null;
    }

    async function sendFrame() {
        if (video.paused || video.ended) {
            stopAnalysis();
            return;
        }
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d')!.drawImage(video, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg');

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: dataUrl }),
            });
            // This line is now a proper template literal
            if (!response.ok) throw new Error(`Server error: ${response.status}`);
            const result = await response.json();
            resultDiv!.textContent = result.emotion || "Analyzing...";
        } catch (error) {
            console.error("Analysis error:", error);
            resultDiv!.textContent = "Server Error";
            stopAnalysis();
        }
    }

    async function startCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
            video.onloadedmetadata = () => video.play();
            startBtn!.textContent = "Camera On";
            if (intervalId) clearInterval(intervalId);
            intervalId = window.setInterval(sendFrame, 2000);
        } catch (err) {
            console.error("Webcam error:", err);
            resultDiv!.textContent = "Camera access denied.";
        }
    }

    startBtn.onclick = startCamera;
}