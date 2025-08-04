import React, { useState, useEffect } from 'react';
import { useTracks } from '../context/TrackContext';
import './Player.css';

// --- (SVG Icons and formatTime function remain the same) ---
const PreviousIcon = () => ( <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M6 6H8V18H6V6ZM9.5 12L18 18V6L9.5 12Z" /></svg> );
const NextIcon = () => ( <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16 6H18V18H16V6ZM8 18V6L16.5 12L8 18Z" /></svg> );
const PlayIcon = () => ( <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M8 5V19L19 12L8 5Z" /></svg> );
const PauseIcon = () => ( <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M6 19H10V5H6V19ZM14 5V19H18V5H14Z" /></svg> );
const VolumeIcon = () => ( <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3 9V15H7L12 20V4L7 9H3ZM16.5 12C16.5 10.23 15.54 8.71 14 7.97V16.02C15.54 15.29 16.5 13.77 16.5 12Z"/></svg> );
const formatTime = (time) => { if (isNaN(time) || time === 0) return '00:00'; const mins = Math.floor(time / 60); const secs = Math.floor(time % 60); return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`; };


const Player = () => {
  const { 
    currentTrack, isPlaying, playTrack, playNextTrack, playPreviousTrack,
    currentTime, duration, recommendedTracks,
    loopMode, toggleLoopMode, volume, handleVolumeChange,
    handleSeekStart, handleSeekCommit
  } = useTracks();
  
  // Local state to hold the slider value while dragging
  const [seekValue, setSeekValue] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Sync local seekValue with context's currentTime when not dragging
  useEffect(() => {
    if (!isDragging) {
      setSeekValue(currentTime);
    }
  }, [currentTime, isDragging]);

  if (!currentTrack) {
    return (
      <footer className="player-container placeholder">
        <p>Select a song to start playing</p>
      </footer>
    );
  }

  const currentTrackIndex = recommendedTracks.findIndex(t => t._id === currentTrack._id);
  const isFirstTrack = currentTrackIndex === 0;
  const isLastTrack = currentTrackIndex === recommendedTracks.length - 1;

  const getLoopButtonText = () => {
    if (loopMode === 'playlist') return 'LOOP 🔁';
    if (loopMode === 'single') return 'LOOP 🔂';
    return 'LOOP';
  };

  const onSeekChange = (e) => {
    setSeekValue(e.target.value);
  };

  const onSeekMouseDown = () => {
    setIsDragging(true);
    handleSeekStart();
  };

  const onSeekMouseUp = (e) => {
    setIsDragging(false);
    handleSeekCommit(e.target.value);
  };

  const progressPercentage = duration ? (seekValue / duration) * 100 : 0;
  const volumePercentage = volume * 100;

  return (
    <footer className="player-container">
      <div className="track-details">
        <span className="current-track-title">{currentTrack.name}</span>
        <span className="current-track-artist">{currentTrack.artist}</span>
      </div>

      <div className="player-core">
        <div className="player-controls">
          <button onClick={playPreviousTrack} disabled={isFirstTrack} className="control-button"><PreviousIcon /></button>
          <button onClick={() => playTrack(currentTrack)} className={`control-button play-pause ${isPlaying ? 'playing' : ''}`}>{isPlaying ? <PauseIcon /> : <PlayIcon />}</button>
          <button onClick={playNextTrack} disabled={isLastTrack && loopMode === 'none'} className="control-button"><NextIcon /></button>
        </div>
        <div className="progress-bar-container">
          <span className="time-display">{formatTime(seekValue)}</span>
          <input 
            type="range" 
            min="0"
            max={duration || 0}
            value={seekValue}
            onMouseDown={onSeekMouseDown}
            onChange={onSeekChange}
            onMouseUp={onSeekMouseUp}
            className="seek-bar"
            style={{'--progress': `${progressPercentage}%`}}
          />
          <span className="time-display">{formatTime(duration)}</span>
        </div>
      </div>
      
      <div className="player-options">
        <button onClick={toggleLoopMode} className={`control-button loop-button ${loopMode !== 'none' ? 'active' : ''}`}>{getLoopButtonText()}</button>
        <div className="volume-control">
            <VolumeIcon />
            <input 
                type="range" min="0" max="1" step="0.01" value={volume}
                onChange={handleVolumeChange} className="volume-slider"
                style={{'--volume': `${volumePercentage}%`}}
            />
        </div>
      </div>
    </footer>
  );
};

export default Player;