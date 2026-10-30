import React, { useEffect, useState } from "react";
import { Icon } from "./Icon";

export const Picker = ({ title, defValue, getRes, onSelect }) => {
  const [time, setTime] = useState(defValue);

  const reset = () => {
    setTime(defValue);
  };

  useEffect(() => {
    getRes(time);
  }, [time, getRes]);

  return (
    <div className='picker-container'>
      <div className='picker'>
        <h2>
          <button className='picker-title' onClick={onSelect}>
            {title}
          </button>
        </h2>
        <div className='picker-arrows'>
          <Icon
            name='down'
            label={`Decrease ${title.toLowerCase()} time`}
            disabled={time === 1}
            onClick={() => setTime(time - 1)}
          />
          <Icon
            name='up'
            label={`Increase ${title.toLowerCase()} time`}
            onClick={() => setTime(time + 1)}
          />
        </div>
        <div className='picker-time'>{time}</div>
      </div>

      <div className='reset'>
        <Icon
          name='sync'
          label={`Reset ${title.toLowerCase()} time`}
          onClick={reset}
        />
      </div>
    </div>
  );
};
