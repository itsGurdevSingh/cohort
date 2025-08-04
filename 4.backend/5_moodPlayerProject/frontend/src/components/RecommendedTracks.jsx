import React from 'react';
import { useTracks } from '../context/TrackContext';
import './RecommendedTracks.css';

const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
  </svg>
);

const RecommendedTracks = () => {
  const { recommendedTracks, playTrack, currentTrack, isPlaying } = useTracks();

  if (recommendedTracks.length === 0) {
    return (
      <section className="recommended-tracks">
        <h2>Recommended Tracks</h2>
        <div className="no-tracks-message">
          <p>Click "Get Recommendations" to find songs that match your mood.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="recommended-tracks">
      <h2>Recommended Tracks</h2>
      <ul className="track-list">
        {recommendedTracks.map((track) => (
          <li 
            key={track._id} 
            className={`track-item ${currentTrack?._id === track._id ? 'active' : ''}`}
            onClick={() => playTrack(track)}
          >
            <div className="track-info">
              <span className="track-title">{track.name}</span>
              <span className="track-artist">{track.artist}</span>
            </div>
            <button className="play-button" aria-label={`Play ${track.name}`}>
              {currentTrack?._id === track._id && isPlaying ? '❚❚' : <PlayIcon />}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RecommendedTracks;