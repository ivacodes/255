import React from "react";

const paths = {
  up: <polyline points='6 15 12 9 18 15' />,
  down: <polyline points='6 9 12 15 18 9' />,
  sync: (
    <>
      <path d='M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8' />
      <path d='M21 3v5h-5' />
    </>
  ),
  play: <polygon points='7 4 20 12 7 20' fill='currentColor' />,
  stop: <rect x='6' y='6' width='12' height='12' fill='currentColor' />,
};

export const Icon = ({ name, label, onClick, disabled = false }) => (
  <svg
    className={`icon${disabled ? " disabled" : ""}`}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    role='button'
    aria-label={label}
    aria-disabled={disabled}
    onClick={disabled ? undefined : onClick}
  >
    {paths[name]}
  </svg>
);
