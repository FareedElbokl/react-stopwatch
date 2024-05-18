import React, { useState, useRef } from "react";

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false); //wether stopwatch running or not
  const [elapsedTime, setElapsedTime] = useState(0); //time passed
  const timerRef = useRef(null);

  function toggleButtonClicked() {
    if (isRunning) {
      clearInterval(timerRef.current);
    } else {
      const startTime = Date.now() - elapsedTime;
      timerRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100);
    }

    setIsRunning(!isRunning);
  }

  function resetButtonClicked() {
    clearInterval(timerRef.current);
    setElapsedTime(0);
    setIsRunning(false);
  }

  //calculate the hours, minutes, and seconds
  const hours = Math.floor(elapsedTime / 3600000);
  const minutes = Math.floor((elapsedTime % 3600000) / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  const milliseconds = Math.floor(elapsedTime % 1000);

  const styleIfRunning = { backgroundColor: "#ed6f64" };
  return (
    <div className="container">
      <div className="time-container">
        <p>{`${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`}</p>
      </div>
      <div className="btn-container">
        <button
          className="start-btn"
          style={isRunning ? styleIfRunning : null}
          onClick={toggleButtonClicked}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        <button className="reset-btn" onClick={resetButtonClicked}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
