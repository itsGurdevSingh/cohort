import React, { useState, useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';
// import hh from '../../Public/models'
import './MoodDetector.css'; // We'll create this for styling

const FaceApiMoodDetector = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [loadingMessage, setLoadingMessage] = useState('Loading AI models, please wait...');
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [detectedMood, setDetectedMood] = useState('none');
  const [isCameraOn, setIsCameraOn] = useState(false);
  const detectionIntervalRef = useRef(null);

  // Load models on component mount
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models'; // Path to the models in your "public" folder
      try {
        console.log('Starting to load models...');
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]);
        setModelsLoaded(true);
        setLoadingMessage('AI Models Loaded. Ready to start camera.');
        console.log('Models loaded successfully!');
      } catch (error) {
        console.error('Error loading models:', error);
        setLoadingMessage('Failed to load AI models. Please check the console.');
      }
    };
    loadModels();

    // Cleanup function to stop camera and interval when component unmounts
    return () => {
      clearInterval(detectionIntervalRef.current);
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    if (isCameraOn || !modelsLoaded) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOn(true);
      }
    } catch (err) {
      console.error("Error accessing webcam: ", err);
      setLoadingMessage('Could not access the camera. Please grant permission.');
    }
  };
  
  const handleVideoPlay = () => {
    if (!modelsLoaded) {
      console.log("Waiting for models to load before starting detection...");
      return;
    }
    
    setLoadingMessage('Detecting mood...');

    detectionIntervalRef.current = setInterval(async () => {
      if (canvasRef.current && videoRef.current && !videoRef.current.paused) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        
        const displaySize = {
          width: video.videoWidth,
          height: video.videoHeight,
        };
        faceapi.matchDimensions(canvas, displaySize);

        const detections = await faceapi.detectAllFaces(
          video,
          new faceapi.TinyFaceDetectorOptions()
        ).withFaceLandmarks().withFaceExpressions();

        if (detections.length > 0) {
          const expressions = detections[0].expressions;
          const dominantMood = Object.keys(expressions).reduce((a, b) =>
            expressions[a] > expressions[b] ? a : b
          );
          setDetectedMood(dominantMood);

          // Draw detections on canvas
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        } else {
          setDetectedMood('none');
        }
      }
    }, 300); // Run detection every 300ms
  };
  
  return (
    <div className="mood-detector-container">
      <h1>Mood Player (face-api.js)</h1>
      <p className="loading-message">{loadingMessage}</p>
      <div className="video-container">
        <video 
          ref={videoRef} 
          autoPlay 
          muted 
          onPlay={handleVideoPlay}
          className="video-feed"
        />
        <canvas ref={canvasRef} className="overlay-canvas" />
      </div>
      {!isCameraOn && (
        <button onClick={startCamera} disabled={!modelsLoaded} className="start-camera-button">
          {modelsLoaded ? 'Start Camera' : 'Loading Models...'}
        </button>
      )}
      <div className="mood-result">
        Detected Mood: <span className="mood-text">{detectedMood}</span>
      </div>
    </div>
  );
};

export default FaceApiMoodDetector;
