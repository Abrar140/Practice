import React, {useState, useRef}from 'react'

function StopWatch() {
    const [starttime, setstarttime]=useState(null)
    const [now,setNow]=useState(null)
    const intervalRef=useRef(null);

    function handleStart(){
        setstarttime(Date.now())
        setNow(Date.now())

        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
          setNow(Date.now());
        }, 10);
    }
    function handleStop(){
        clearInterval(intervalRef.current);
    }
    let secondsPassed = 0;
    if(starttime!=null && now!=null){
        secondsPassed=(now-starttime)/1000
    }

    return (
            <>
              <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
              <button onClick={handleStart}>
                Start
              </button>
              <button onClick={handleStop}>
                Stop
              </button>
            </>
          );
}

export default StopWatch






