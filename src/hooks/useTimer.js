import { useEffect, useRef, useState } from "react";

function useTimer(value) {
  console.log(value);
  const displaySeconds = value-1;
  const FULL_DASH_ARRAY = 283;
  const [startTimer, setStartTimer] = useState(false);
  const [restartTimer, setRestartTimer] = useState(false);

  const [seconds, setSeconds] = useState(displaySeconds);
  const [miliseconds, setMiliseconds] = useState(59);

  let timer = useRef(null);

  useEffect(() => {
    console.log("before start timer" + miliseconds);
    console.log("before start timer bool" + startTimer);
    timer.current = startTimer
      ? setInterval(() => setMiliseconds((prev) => prev - 1), 16.6)
      : null;
    return () => clearInterval(timer.current);
  }, [startTimer]);

  useEffect(() => {
    if (seconds <= 0) {
      clearInterval(timer.current);
      setStartTimer(false);
    }
    console.log('timer', seconds);
    setCircleDasharray();
  }, [seconds]);

  useEffect(() => {
    if (miliseconds <= 0) {
      setSeconds((s) => s - 1);
      setMiliseconds(59);
    }
  }, [miliseconds]);

  useEffect(() => {
    if (restartTimer) {
      setSeconds(value);
      setMiliseconds(59);
    }
    setRestartTimer(false);
  }, [restartTimer, value]);

     
  // Update the dasharray value as time passes, starting with 283
  function setCircleDasharray() {
    const circleDasharray = `${(
      (seconds/value)* FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
      .getElementById("base-timer-path-remaining")
      .setAttribute("stroke-dasharray", circleDasharray);
  }

  return {
    seconds,
    miliseconds,
    setStartTimer,
    setRestartTimer,
  };
}

export default useTimer;
