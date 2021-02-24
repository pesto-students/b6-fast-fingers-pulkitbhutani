import { useEffect, useRef, useState } from "react";

function useTimer(value) {
  const [startTimer, setStartTimer] = useState(false);
  const [restartTimer, setRestartTimer] = useState(false);

  const [seconds, setSeconds] = useState(value);
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

  return {
    seconds,
    miliseconds,
    setStartTimer,
    setRestartTimer,
  };
}

export default useTimer;
