import React, { useState, useEffect, useRef } from "react";

export const Timer = ({ workTime, breakTime }) => {
  const [status, setStatus] = useState("stopped");
  const [timer, setTimer] = useState();
  const [work, setWork] = useState(true);
  const isMounted = useRef(false);

  const [secondsLeft, setSecondsLeft] = useState(workTime * 60);

  const start = () => {
    // console.log("Checking work ", work);

    if (work) {
      //work time
      setSecondsLeft(workTime * 60);
      const timer = setInterval(() => {
        setSecondsLeft((secondsLeft) => secondsLeft - 1);
      }, 1000);
      setTimer(timer);
      setStatus("running");
    } else {
      //break time
      setSecondsLeft(breakTime * 60);
      console.log("creating break timer");

      const timer = setInterval(() => {
        setSecondsLeft((secondsLeft) => secondsLeft - 1);
      }, 1000);
      setTimer(timer);
      // console.log(timer);
      setStatus("running");
    }
  };

  const pause = () => {
    clearInterval(timer);
    setStatus("stopped");
  };

  const reset = () => {
    clearInterval(timer);
    setStatus("stopped");
    setSecondsLeft(workTime * 60);
    setWork(true);
  };

  useEffect(() => {
    if (secondsLeft === 0) {
      clearInterval(timer);
      setWork(!work);
    }
  }, [secondsLeft]);

  //monitors the work variable, only after the component is first mounted
  useEffect(() => {
    if (isMounted.current) {
      start();
    } else {
      isMounted.current = true;
    }
  }, [work]);

  useEffect(() => {
    setSecondsLeft(workTime * 60);
    clearInterval(timer);
    setStatus("stopped");
  }, [workTime]);

  return (
    <div className='tomato-container'>
      <h2>{work ? "Work" : "Break"}</h2>
      <div className='timer'>
        {String(Math.floor(secondsLeft / 60)).length < 2
          ? `0${Math.floor(secondsLeft / 60)}`
          : `${Math.floor(secondsLeft / 60)}`}
        :
        {String(Math.floor(secondsLeft % 60)).length < 2
          ? `0${Math.floor(secondsLeft % 60)}`
          : `${Math.floor(secondsLeft % 60)}`}
      </div>
      <div className='timer-controls'>
        {status === "running" ? (
          <i className='im im-stop' onClick={reset}></i>
        ) : (
          <i className='im im-play' onClick={start}></i>
        )}
      </div>
    </div>
  );
};
