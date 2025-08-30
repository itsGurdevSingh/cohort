// src/hooks/useFaceLandmarker.js
import { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export const useFaceLandmarker = (videoRef) => {
  const [faceLandmarker, setFaceLandmarker] = useState(null);
  const [detectedMood, setDetectedMood] = useState("neutral");
  const animationFrameId = useRef(null);

  // Load model
  useEffect(() => {
    const initLandmarker = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
        );

        const landmarker = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "/models/face_landmarker.task", // from public/
            delegate: "GPU",
          },
          outputFaceBlendshapes: true,
          runningMode: "VIDEO",
          numFaces: 1,
        });

        setFaceLandmarker(landmarker);
      } catch (err) {
        console.error("Error loading FaceLandmarker:", err);
      }
    };

    initLandmarker();

    return () => {
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  // Mood interpretation helper
  const interpretMood = (blendshapes) => {
    if (!blendshapes?.length) return "neutral";
    const categories = blendshapes[0].categories;
    const getScore = (name) =>
      categories.find((c) => c.categoryName === name)?.score || 0;

    const happy = getScore("mouthSmileLeft") + getScore("mouthSmileRight");
    const sad =
      (getScore("mouthFrownLeft") + getScore("mouthFrownRight")) * 1.5 +
      getScore("browInnerUp");
    const surprised =
      getScore("jawOpen") + getScore("eyeWideLeft") + getScore("eyeWideRight");

    const moods = { happy, sad, surprised };
    let mood = "neutral";
    let max = 0.35;

    for (const key in moods) {
      if (moods[key] > max) {
        max = moods[key];
        mood = key;
      }
    }
    return mood;
  };

  // Prediction loop
  const predict = () => {
    if (!faceLandmarker || !videoRef.current?.srcObject) return;
    const results = faceLandmarker.detectForVideo(
      videoRef.current,
      performance.now()
    );
    if (results.faceBlendshapes) {
      setDetectedMood(interpretMood(results.faceBlendshapes));
    }
    animationFrameId.current = requestAnimationFrame(predict);
  };

  return { faceLandmarker, detectedMood, predict };
};
