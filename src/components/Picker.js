import React, { useEffect, useState } from "react";

export const Picker = ({ title, defValue, getRes }) => {
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
        <h2>{title}</h2>
        <div className='picker-arrows'>
          {time === 0 ? (
            <i className='im im-angle-down'></i>
          ) : (
            <i
              className='im im-angle-down'
              onClick={() => setTime(time - 1)}
            ></i>
          )}
          <i className='im im-angle-up' onClick={() => setTime(time + 1)}></i>
        </div>
        <div className='picker-time'>{time}</div>
      </div>

      <i className='im im-sync reset' onClick={reset}></i>
    </div>
  );
};
