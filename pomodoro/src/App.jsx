import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center p-3"
      style={{
        background: 'linear-gradient(135deg, #dc2626 0%, #db2777 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif'
      }}
    >
      <div 
        className="w-100"
        style={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '25px',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2), 0 8px 25px rgba(0,0,0,0.1)',
          maxWidth: '420px'
        }}
      >
        <div className="p-4">
          {/* Header Section */}
          <div className="text-center mb-4">
            <h1 
              className="display-5 fw-bold text-white mb-2"
              style={{ 
                textShadow: '0 2px 15px rgba(0,0,0,0.3)',
                letterSpacing: '-0.5px'
              }}
            >
              Pomodoro Timer
            </h1>
            <p 
              className="fs-4 text-white mb-1"
              style={{ 
                opacity: '0.9',
                textShadow: '0 1px 8px rgba(0,0,0,0.2)'
              }}
            >
              Work Time
            </p>
            <div 
              className="small text-white d-flex justify-content-center align-items-center gap-2"
              style={{ 
                opacity: '0.7',
                textShadow: '0 1px 5px rgba(0,0,0,0.2)'
              }}
            >
              <span 
                className="badge bg-light text-dark px-2 py-1" 
                style={{ borderRadius: '12px' }}
              >
                Session 1
              </span>
              <span>•</span>
              <span 
                className="badge bg-light text-dark px-2 py-1" 
                style={{ borderRadius: '12px' }}
              >
                Completed: 0
              </span>
            </div>
          </div>
          
          {/* Timer Display - Placeholder for now */}
          <div className="text-center mb-4">
            <div 
              className="text-white fw-bold mx-auto d-flex align-items-center justify-content-center" 
              style={{ 
                fontSize: '4rem', 
                fontFamily: 'monospace',
                textShadow: '0 2px 15px rgba(0,0,0,0.3)',
                height: '120px'
              }}
            >
              25:00
            </div>
          </div>
          
          {/* Buttons - Placeholder for now */}
          <div className="text-center">
            <button 
              className="btn btn-light me-2 px-4 py-2"
              style={{
                borderRadius: '20px',
                fontWeight: '500',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}
            >
              Start
            </button>
            <button 
              className="btn btn-outline-light px-4 py-2"
              style={{
                borderRadius: '20px',
                fontWeight: '500',
                borderColor: 'rgba(255,255,255,0.6)',
                backgroundColor: 'rgba(255,255,255,0.1)'
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;