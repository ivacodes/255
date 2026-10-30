import React, { useState, useEffect } from "react";
import { Icon } from "./Icon";
import bell from "../assets/bell.wav";

const audioElement = new Audio(bell);

export const Timer = ({ workTime, breakTime, selection }) => {
  const [status, setStatus] = useState("stopped");
  const [timer, setTimer] = useState();
  const [work, setWork] = useState(true);

  const [secondsLeft, setSecondsLeft] = useState(workTime * 60);

  const start = (isWork = work) => {
    setSecondsLeft((isWork ? workTime : breakTime) * 60);
    const timer = setInterval(() => {
      setSecondsLeft((secondsLeft) => secondsLeft - 1);
    }, 1000);
    setTimer(timer);
    setStatus("running");
  };

  const reset = () => {
    clearInterval(timer);
    setStatus("stopped");
    setSecondsLeft(workTime * 60);
    setWork(true);
  };

  useEffect(() => {
    if (secondsLeft === 0) {
      audioElement.play();
      clearInterval(timer);
      setWork(!work);
      start(!work);
    }
  }, [secondsLeft]);

  //stops the countdown and shows the given phase, ready to be started
  const select = (isWork) => {
    clearInterval(timer);
    setStatus("stopped");
    setWork(isWork);
    setSecondsLeft((isWork ? workTime : breakTime) * 60);
  };

  useEffect(() => {
    if (work) select(true);
  }, [workTime]);

  useEffect(() => {
    if (!work) select(false);
  }, [breakTime]);

  //a click on a picker title; the object identity makes repeat clicks count
  useEffect(() => {
    if (selection) select(selection.phase === "work");
  }, [selection]);

  useEffect(() => {
    let minString =
      String(Math.floor(secondsLeft / 60)).length < 2
        ? `0${Math.floor(secondsLeft / 60)}`
        : `${Math.floor(secondsLeft / 60)}`;
    let secString =
      String(Math.floor(secondsLeft % 60)).length < 2
        ? `0${Math.floor(secondsLeft % 60)}`
        : `${Math.floor(secondsLeft % 60)}`;

    let status = work ? "W" : "B";

    document.title = `${status} ${minString}:${secString}`;
  }, [secondsLeft]);

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
          <Icon name='stop' label='Stop' onClick={reset} />
        ) : (
          <Icon name='play' label='Start' onClick={() => start()} />
        )}
      </div>
    </div>
  );
};
