import React, { createContext, useState, useRef, useEffect, useContext } from 'react';

const TrackContext = createContext();

export const useTracks = () => useContext(TrackContext);

export const TrackProvider = ({ children }) => {
  const [recommendedTracks, setRecommendedTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loopMode, setLoopMode] = useState('none');
  const [volume, setVolume] = useState(0.75);
  const [isSeeking, setIsSeeking] = useState(false); // State to track if user is dragging
  const audioRef = useRef(new Audio());

  useEffect(() => {
    audioRef.current.volume = volume;
  }, []);

  const fetchTracksByMood = async (mood) => {
    if (!mood) {
      setRecommendedTracks([]);
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/songs/${mood.toUpperCase()}`);
      if (!response.ok) throw new Error(`Network response was not ok`);
      const data = await response.json();
      setRecommendedTracks(data);
    } catch (error) {
      console.error('Failed to fetch tracks:', error);
      setRecommendedTracks([]);
    }
  };

  const playTrack = (track) => {
    if (currentTrack?._id === track._id) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      audioRef.current.src = track.audio;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const playNextTrack = () => {
    if (recommendedTracks.length === 0 || !currentTrack) return;
    const currentIndex = recommendedTracks.findIndex(t => t._id === currentTrack._id);
    if (currentIndex < recommendedTracks.length - 1) {
      playTrack(recommendedTracks[currentIndex + 1]);
    }
  };

  const playPreviousTrack = () => {
    if (recommendedTracks.length === 0 || !currentTrack) return;
    const currentIndex = recommendedTracks.findIndex(t => t._id === currentTrack._id);
    if (currentIndex > 0) {
      playTrack(recommendedTracks[currentIndex - 1]);
    }
  };

  const toggleLoopMode = () => {
    if (loopMode === 'none') setLoopMode('playlist');
    else if (loopMode === 'playlist') setLoopMode('single');
    else setLoopMode('none');
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };
  
  // --- NEW SEEK LOGIC ---
  const handleSeekStart = () => {
    setIsSeeking(true);
  };

  const handleSeekCommit = (newTime) => {
    audioRef.current.currentTime = newTime;
    setIsSeeking(false);
  };
  // --- END NEW SEEK LOGIC ---


  useEffect(() => {
    const audio = audioRef.current;
    const updateTimes = () => {
      // Only update the time if the user is NOT actively dragging the seek bar
      if (!isSeeking) {
        setCurrentTime(audio.currentTime);
      }
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      const currentIndex = recommendedTracks.findIndex(t => t._id === currentTrack._id);
      const isLastTrack = currentIndex === recommendedTracks.length - 1;

      if (loopMode === 'single') {
        audio.currentTime = 0;
        audio.play();
      } else if (loopMode === 'playlist') {
        const nextIndex = (currentIndex + 1) % recommendedTracks.length;
        playTrack(recommendedTracks[nextIndex]);
      } else {
        if (!isLastTrack) {
          playNextTrack();
        } else {
          setIsPlaying(false);
        }
      }
    };

    audio.addEventListener('timeupdate', updateTimes);
    audio.addEventListener('loadedmetadata', updateTimes);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTimes);
      audio.removeEventListener('loadedmetadata', updateTimes);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack, recommendedTracks, loopMode, isSeeking]); // isSeeking is now a dependency

  const value = {
    recommendedTracks, currentTrack, isPlaying, currentTime, duration, loopMode, volume,
    fetchTracksByMood, playTrack, playNextTrack, playPreviousTrack,
    toggleLoopMode, handleVolumeChange,
    handleSeekStart, handleSeekCommit, // Expose new seek functions
  };

  return <TrackContext.Provider value={value}>{children}</TrackContext.Provider>;
};