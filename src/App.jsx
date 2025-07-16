import React, { useState, useEffect, useCallback } from 'react';
import './styles/global.css';
import './styles/App.css';

const soundUrl = process.env.PUBLIC_URL + '/sounds/alarm.mp3';
const playSound = () => {
  const audio = new Audio(soundUrl);
  audio.play();
};

function App() {
  const [workTime, setWorkTime] = useState(25);   // in minutes
  const [breakTime, setBreakTime] = useState(5);  // in minutes
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false); // Timer running state
  const [mode, setMode] = useState('work');        // Timer mode
  const [session, setSession] = useState(1);       // Current session number
  const [completedSessions, setCompletedSessions] = useState(0); // Completed sessions

  // Handle timer completion (when it reaches 00:00)
  const handleTimerComplete = useCallback(() => {
    playSound();
    console.log('Timer completed!');

    if (mode === 'work') {
      // Work session completed
      setCompletedSessions(prev => prev + 1);
      setMode('break');
      setTimeLeft(breakTime * 60);  // Always use selected break time
    } else {
      // Break completed - back to work
      setMode('work');
      setTimeLeft(workTime * 60); // Use selected work time
      setSession(prev => prev + 1);
    }
  }, [mode, session, workTime, breakTime]);

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      // timer running and time left
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
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
      case 'break': return 'Break Time';
      default: return 'Work Time';
    }
  };

  // Helper to determine if timer is at initial value for current mode
  const getInitialTime = () => {
    switch (mode) {
      case 'work':
        return workTime * 60;
      case 'break':
        return breakTime * 60;
      default:
        return workTime * 60;
    }
  };

  // Handle start/pause button
  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  // Handle reset button
  const handleReset = () => {
    setIsActive(false);
    switch (mode) {
      case 'work':
        setTimeLeft(workTime * 60);
        break;
      case 'break':
        setTimeLeft(breakTime * 60);
        break;
      default:
        setTimeLeft(workTime * 60);
    }
  };

  // Handlers for dropdowns
  const handleWorkTimeChange = (e) => {
    const newWorkTime = parseInt(e.target.value, 10);
    setWorkTime(newWorkTime);
    if (mode === 'work' && !isActive) {
      setTimeLeft(newWorkTime * 60);
    }
  };

  const handleBreakTimeChange = (e) => {
    const newBreakTime = parseInt(e.target.value, 10);
    setBreakTime(newBreakTime);
    if (mode === 'break' && !isActive) {
      setTimeLeft(newBreakTime * 60);
    }
  };

  return (
    <div className="app-container">
      <div className="timer-card">
        <header className="app-header">
          <h1 className="app-title">Pomodoro Timer</h1>
          <p className="app-subtitle">{getModeText()}</p>
          <div className="session-info">
            <span className="session-badge">Session {session}</span>
            <span className="separator">•</span>
            <span className="session-badge">Completed: {completedSessions}</span>
          </div>
        </header>

        <div className="timer-display">
          <div className="timer-text">{formatTime(timeLeft)}</div>
        </div>

        {/* Settings Panel with Dropdowns */}
        <div className="settings-panel">
          <h3 className="settings-title">⚙️ Timer Settings</h3>
          <div className="settings-grid">
            {/* Work Time Dropdown */}
            <div className="dropdown-group">
              <label className="dropdown-label" htmlFor="work-time">Study Time</label>
              <select
                id="work-time"
                value={workTime}
                onChange={handleWorkTimeChange}
                disabled={isActive}
                className="dropdown-select"
              >
                {[...Array(12)].map((_, i) => {
                  const val = 5 * (i + 1);
                  return <option key={val} value={val}>{val} minutes</option>;
                })}
              </select>
            </div>
            {/* Break Time Dropdown */}
            <div className="dropdown-group">
              <label className="dropdown-label" htmlFor="break-time">Break Time</label>
              <select
                id="break-time"
                value={breakTime}
                onChange={handleBreakTimeChange}
                disabled={isActive}
                className="dropdown-select"
              >
                {[...Array(6)].map((_, i) => {
                  const val = 5 * (i + 1);
                  return <option key={val} value={val}>{val} minutes</option>;
                })}
              </select>
            </div>
          </div>
        </div>

        {/* Control Buttons Section */}
        <div className="control-buttons">
          <button
            className="btn-primary"
            onClick={handleStartPause}
            disabled={timeLeft === 0}
          >
            {isActive
              ? 'Pause'
              : timeLeft !== getInitialTime()
                ? 'Resume'
                : 'Start'}
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