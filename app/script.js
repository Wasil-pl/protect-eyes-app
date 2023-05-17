import React, { useEffect, useMemo, useState } from 'react';
import { render } from 'react-dom';

function App() {
  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(20 * 60 * 1000);
  const [timerOn, setTimerOn] = useState(false);

  const playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  useEffect(() => {
    if (time === 0) {
      if (status === 'work') {
        playBell();
        setStatus('rest');
        setTime(20 * 1000);
      } else if (status === 'rest') {
        playBell();
        setStatus('work');
        setTime(20 * 60 * 1000);
      }
    }
  }, [status, time]);

  const formatTime = useMemo(() => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, [time]);

  const handleStart = () => {
    setStatus('work');
    setTimerOn(true);
  };

  const handleStop = () => {
    setTimerOn(false);

    setTimeout(() => {
      setStatus('off');
      setTime(20 * 60 * 1000);
    }, 10);
  };

  const closeApp = () => {
    window.close();
  };

  return (
    <div>
      {status !== 'off' && <h1>Protect your eyes</h1>}
      {status === 'off' && (
        <span>
          <p>
            According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to
            rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.
          </p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </span>
      )}
      {status !== 'off' && (
        <span>
          {status === 'work' && <img src="./images/work.png" />}
          {status === 'rest' && <img src="./images/rest.png" />}
        </span>
      )}
      <div className="timer">{formatTime}</div>
      {status === 'off' && (
        <button onClick={handleStart} className="btn">
          Start
        </button>
      )}
      {status !== 'off' && (
        <button onClick={handleStop} className="btn">
          Stop
        </button>
      )}
      <button onClick={closeApp} className="btn btn-close">
        X
      </button>
    </div>
  );
}

render(<App />, document.querySelector('#app'));
