import React, { useState, useEffect, useCallback } from 'react';
import './styles/global.css';
import './styles/App.css';

function App() {
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false); // Timer running state
  const [mode, setMode] = useState('work');        // Timer mode
  const [session, setSession] = useState(1);       // Current session number
  const [completedSessions, setCompletedSessions] = useState(0); // Completed sessions

  // Handle timer completion (when it reaches 00:00)
  const handleTimerComplete = useCallback(() => {
    console.log('Timer completed!');

    if (mode === 'work') {
      // Work session completed
      setCompletedSessions(prev => prev + 1);

      // Determine next mode: every 4th session is a long break
      if (session % 4 === 0) {
        setMode('longBreak');
        setTimeLeft(15 * 60); // 15 minutes
      } else {
        setMode('break');
        setTimeLeft(5 * 60);  // 5 minutes
      }
    } else {
      // Break completed - back to work
      setMode('work');
      setTimeLeft(25 * 60); // 25 minutes
      setSession(prev => prev + 1);
    }
  }, [mode, session]);

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      // timer running and time left
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // timer reached zero
      setIsActive(false);
      handleTimerComplete();
    }

    return () => clearInterval(interval);

  }, [isActive, timeLeft, handleTimerComplete]);

  // Convert seconds to MM:SS format
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getModeText = () => {
    switch (mode) {
      case 'work': return 'Work Time';
      case 'break': return 'Short Break';
      case 'longBreak': return 'Long Break';
      default: return 'Work Time';
    }
  };

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  // handle reset button
  const handleReset = () => {
    setIsActive(false);

    switch (mode) {
      case 'work':
        setTimeLeft(25 * 60);
        break;
      case 'break':
        setTimeLeft(5 * 60);
        break;
      case 'longBreak':
        setTimeLeft(15 * 60);
        break;
      default:
        setTimeLeft(25 * 60);
    }
  };

  return (
    <div className="app-container">

      {/* Main Timer Card */}
      <div className="timer-card">

        {/* Header Section */}
        <header className="app-header">
          <h1 className="app-title">Pomodoro Timer</h1>
          <p className="app-subtitle">{getModeText()}</p>
          <div className="session-info">
            <span className="session-badge">Session {session}</span>
            <span className="separator">•</span>
            <span className="session-badge">Completed: {completedSessions}</span>
          </div>
        </header>

        {/* Timer Display Section */}
        <div className="timer-display">
          <div className="timer-text">{formatTime(timeLeft)}</div>
        </div>

        {/* Control Buttons Section */}
        <div className="control-buttons">
          <button
            className="btn-primary"
            onClick={handleStartPause}
            disabled={timeLeft === 0} // Disable if timer is at 0
          >
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button className="btn-secondary" onClick={handleReset}>
            Reset
          </button>
        </div>

        {/* Timer Status Indicator */}
        <div style={{
          marginTop: '20px',
          textAlign: 'center',
          color: 'rgba(255,255,255,0.7)',
          fontSize: '0.9rem'
        }}>
          {isActive ? (
            <span>🍅 Focus time! Keep going...</span>
          ) : timeLeft === 0 ? (
            <span>🎉 Time's up! Great work!</span>
          ) : (
            <span>Ready to start your session?</span>
          )}
        </div>

      </div>

    </div>
  );
}

export default App;