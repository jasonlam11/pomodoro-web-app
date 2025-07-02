import React, { useState } from 'react';
import './styles/global.css';  // Global styles
import './styles/App.css';     // App-specific styles

function App() {

  // State
  const [timeLeft, setTimeLeft] = useState(1500); // 25 min
  const [isActive, setIsActive] = useState(false); // false = stopped, true = running

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60); // whole minutes
    const secs = seconds % 60; // remaining seconds

    const minsStr = mins.toString().padStart(2, '0');
    const secsStr = secs.toString().padStart(2, '0');

    return `${minsStr}:${secsStr}`;
  }

  const handleStartPause = () => {
    console.log('Button clicked! Current isActive:', isActive);
    setIsActive(!isActive);
  };

  const handleReset = () => {
    console.log('Reset clicked!');

    setIsActive(false);  // Stop the timer
    setTimeLeft(1500);   // Reset to 25 minutes

    console.log('Timer reset to 1500 seconds (25:00)');
  };

  return (
    <div className="app-container">

      {/* Main Timer Card */}
      <div className="timer-card">

        {/* Header Section */}
        <header className="app-header">
          <h1 className="app-title">Pomodoro Timer</h1>
          <p className="app-subtitle">Work Time</p>
          <div className="session-info">
            <span className="session-badge">Session 1</span>
            <span className="separator">•</span>
            <span className="session-badge">Completed: 0</span>
          </div>
        </header>

        {/* Timer Display Section */}
        <div className="timer-display">
          <div className="timer-text">{formatTime(timeLeft)}</div>
        </div>

        {/* Control Buttons Section */}
        <div className="control-buttons">
          <button className="btn-primary" onClick={handleStartPause}>
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button className="btn-secondary" onClick={handleReset}>
            Reset
          </button>
        </div>

      </div>

    </div>
  );
}

export default App;