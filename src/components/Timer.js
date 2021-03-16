import React, { useState, useEffect } from "react";

let timer;

export const Timer = ({ workTime, breakTime }) => {
  const [title, setTitle] = useState("Work");
  const [status, setStatus] = useState("stopped");
  const [timer, setTimer] = useState();
  const [paused, setPaused] = useState();
  const [work, setWork] = useState(true);

  const [secondsLeft, setSecondsLeft] = useState(workTime * 60);

  const start = () => {
    if (work) {
      setSecondsLeft(workTime * 60);
      const timer = setInterval(() => {
        setSecondsLeft((secondsLeft) => secondsLeft - 1);

        if (secondsLeft === 0) {
          clearInterval(timer);
        }
      }, 1000);
      setTimer(timer);
      setStatus("running");
      setTitle("Work");
    } else {
      setSecondsLeft(breakTime * 60);
      const timer = setInterval(() => {
        setSecondsLeft((secondsLeft) => secondsLeft - 1);

        if (secondsLeft === 0) {
          clearInterval(timer);
        }
      }, 1000);
      setTimer(timer);
      setStatus("running");
      setTitle("Break");
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
      start();
    }
  }, [secondsLeft, timer]);

  useEffect(() => {
    setSecondsLeft(workTime * 60);
    clearInterval(timer);
    setStatus("stopped");
  }, [workTime]);

  return (
    <div className='tomato-container'>
      <h2>{title}</h2>
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
          <i className='im im-pause' onClick={pause}></i>
        ) : (
          <i className='im im-play' onClick={start}></i>
        )}
        <i className='im im-sync reset' onClick={reset}></i>
      </div>
    </div>
  );
};
