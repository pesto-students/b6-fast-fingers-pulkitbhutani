  
import { useEffect, useRef, useState } from "react"

function useTimer(value) {
    const [startTimer, setStartTimer] = useState(false);
    const [restartTimer, setRestartTimer] = useState(false);

    const [seconds, setSeconds] = useState(value);
    const [miliseconds, setMiliseconds] = useState(0);

    let timer = useRef(null);
    useEffect(() => {
        console.log("before start timer" + seconds);
        console.log("before start timer bool" + startTimer);
        timer.current = startTimer
          ? /* setInterval(() => {
              if (miliseconds > 0) {
                //setMiliseconds((m) => m - 1);
              }
              if (miliseconds === 0) {
                setSeconds((s) => s - 1);
                //setMiliseconds(59);
              }
            }, 1000) */
            setInterval(() => setSeconds((prev) => prev - 1), 1000)
          : null;
          return () => clearInterval(timer.current);
      }, [startTimer]);

    useEffect(() => {
        if (seconds <= 0) {
            clearInterval(timer.current);
            setStartTimer(false);
        }
    }, [seconds])


    useEffect(() => {
      if (restartTimer){
        setSeconds(value);
    }
      setRestartTimer(false);
  }, [restartTimer,value])

    return {
        seconds,
        setStartTimer,
        setRestartTimer
    };
}

export default useTimer;