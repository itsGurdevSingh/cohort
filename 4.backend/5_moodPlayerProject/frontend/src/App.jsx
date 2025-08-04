import React from 'react';
import { TrackProvider } from './context/TrackContext';
import LiveMoodDetector from './components/LiveMoodDetector';
import RecommendedTracks from './components/RecommendedTracks';
import Player from './components/Player';
import './App.css';

function App() {
  return (
    <TrackProvider>
      <div className="moody-player-app">
        <header className="app-header">
          <h1>Moody Player</h1>
        </header>
        <main className="app-main">
          <LiveMoodDetector />
          <RecommendedTracks />
        </main>
        <Player />
      </div>
    </TrackProvider>
  );
}

export default App;