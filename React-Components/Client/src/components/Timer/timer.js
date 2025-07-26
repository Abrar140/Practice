import React, { useState, useEffect } from 'react';
import './timmer.css';

const Timer=()=>{
const [time, setTime]=useState(0);
const[isActive,setTimeeIsActive]=useState(false);
useEffect(()=>{
let interval= null;
if(isActive){
    interval=setInterval(()=>{
        setTime((prevTime)=>prevTime+1);
    },1000)
}
else{
    clearInterval(interval)
}
return()=>clearInterval(interval)
},[isActive]);
const toggle=()=>{
    setTimeeIsActive(!isActive);
}
const reset=()=>{
    setTime(0);
    setTimeeIsActive(false);
}
const formatTime=(time)=>{
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = Math.floor(time / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
}



 
  return (
    <div className="app">
      <div className="time">
        {formatTime(time)}
      </div>
      <div className="row">
        <button className={` button button-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="button resetbutton" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
