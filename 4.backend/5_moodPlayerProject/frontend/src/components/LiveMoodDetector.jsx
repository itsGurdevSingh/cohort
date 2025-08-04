import React, { useState, useRef, useEffect } from 'react';
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';
import { useTracks } from '../context/TrackContext';
import './LiveMoodDetector.css';

const LiveMoodDetector = () => {
  const videoRef = useRef(null);
  const [faceLandmarker, setFaceLandmarker] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [detectedMood, setDetectedMood] = useState('neutral');
  const animationFrameId = useRef(null);
  const { fetchTracksByMood } = useTracks();

  useEffect(() => {
    const createFaceLandmarker = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm');
        const landmarker = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: { modelAssetPath: `/models/face_landmarker.task`, delegate: 'GPU' },
          outputFaceBlendshapes: true,
          runningMode: 'VIDEO',
          numFaces: 1,
        });
        setFaceLandmarker(landmarker);
      } catch (error) {
        console.error('Error loading model:', error);
      }
    };
    createFaceLandmarker();
    return () => stopCamera();
  }, []);

  const interpretMood = (blendshapes) => {
    if (!blendshapes || blendshapes.length === 0) return 'neutral';
    const categories = blendshapes[0].categories;
    const getScore = (name) => categories.find(c => c.categoryName === name)?.score || 0;

    const happyScore = getScore('mouthSmileLeft') + getScore('mouthSmileRight');
    const sadScore = (getScore('mouthFrownLeft') + getScore('mouthFrownRight')) * 1.5 + getScore('browInnerUp');
    const surpriseScore = getScore('jawOpen') + getScore('eyeWideLeft') + getScore('eyeWideRight');
    
    const moods = { happy: happyScore, sad: sadScore, surprised: surpriseScore };
    let dominantMood = 'neutral';
    let maxScore = 0.35;

    for (const mood in moods) {
      if (moods[mood] > maxScore) {
        maxScore = moods[mood];
        dominantMood = mood;
      }
    }
    return dominantMood;
  };

  const predictWebcam = () => {
    if (!faceLandmarker || !videoRef.current?.srcObject) return;
    const results = faceLandmarker.detectForVideo(videoRef.current, performance.now());
    if (results.faceBlendshapes) {
      const mood = interpretMood(results.faceBlendshapes);
      setDetectedMood(mood);
    }
    animationFrameId.current = requestAnimationFrame(predictWebcam);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.addEventListener('loadeddata', predictWebcam);
      setIsCameraOn(true);
    } catch (err) {
      console.error("Error accessing webcam:", err);
    }
  };

  const stopCamera = () => {
    cancelAnimationFrame(animationFrameId.current);
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
  };
  
  const handleStartListening = () => {
      if (!isCameraOn) {
          startCamera();
      }
      fetchTracksByMood(detectedMood);
  }

  return (
    <section className="live-mood-detector">
      <h2>Live Mood Detection</h2>
      <div className="video-container">
        <video ref={videoRef} autoPlay playsInline className="video-feed"></video>
        {!faceLandmarker && <div className="loading-overlay">Loading AI Model...</div>}
      </div>
      <div className="detector-info">
        <p>Your current mood is <strong>{detectedMood}</strong>. <br/> Let's find some music for you.</p>
        <button onClick={handleStartListening} disabled={!faceLandmarker} className="start-listening-button">
          {isCameraOn ? 'Get Recommendations' : 'Start Camera & Listen'}
        </button>
      </div>
    </section>
  );
};

export default LiveMoodDetector;