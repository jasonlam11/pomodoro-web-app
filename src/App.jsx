// src/App.jsx
// HTML structure with both CSS imports
import React from 'react';
import './styles/global.css';  // Global styles
import './styles/App.css';     // App-specific styles

function App() {
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
          <div className="timer-text">25:00</div>
        </div>

        {/* Control Buttons Section */}
        <div className="control-buttons">
          <button className="btn-primary">Start</button>
          <button className="btn-secondary">Reset</button>
        </div>

      </div>
      
    </div>
  );
}

export default App;