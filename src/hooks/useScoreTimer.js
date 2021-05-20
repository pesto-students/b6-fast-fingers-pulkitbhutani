  
import { useEffect, useRef, useState } from "react"

function useScoreTimer(start) {
    const [startScoreTimer, setStartScoreTimer] = useState(start);
    const [score, setScore] = useState(0);


    let timer = useRef(null);

    useEffect(() => {
        timer.current = startScoreTimer
          ?
            setInterval(() => setScore((prev) => prev + 1), 1000)
          : null;
          return () => clearInterval(timer.current);
      }, [startScoreTimer]);

    return {
        score,
        setScore,
        setStartScoreTimer
    };
}

export default useScoreTimer;