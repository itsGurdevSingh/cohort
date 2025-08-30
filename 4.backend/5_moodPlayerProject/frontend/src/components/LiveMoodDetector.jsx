import React, { useRef, useState } from "react";
import { useTracks } from "../context/TrackContext";
import { useFaceLandmarker } from "../hooks/useFaceLandmarker";
import "./LiveMoodDetector.css";

const LiveMoodDetector = () => {
  const videoRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const { fetchTracksByMood } = useTracks();
  const { faceLandmarker, detectedMood, predict } = useFaceLandmarker(videoRef);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.addEventListener("loadeddata", predict);
      setIsCameraOn(true);
    } catch (err) {
      console.error("Error accessing webcam:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
  };

  const handleStartListening = () => {
    if (!isCameraOn) startCamera();
    fetchTracksByMood(detectedMood);
  };

  return (
    <section className="live-mood-detector">
      <h2>Live Mood Detection</h2>
      <div className="video-container">
        <video ref={videoRef} autoPlay playsInline className="video-feed" />
        {!faceLandmarker && (
          <div className="loading-overlay">Loading AI Model...</div>
        )}
      </div>
      <div className="detector-info">
        <p>
          Your current mood is <strong>{detectedMood}</strong>.
          <br /> Let's find some music for you.
        </p>
        <button
          onClick={handleStartListening}
          disabled={!faceLandmarker}
          className="start-listening-button"
        >
          {isCameraOn ? "Get Recommendations" : "Start Camera & Listen"}
        </button>
      </div>
    </section>
  );
};

export default LiveMoodDetector;
