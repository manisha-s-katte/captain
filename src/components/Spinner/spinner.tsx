import React from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';

export default function Spinner() {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <PacmanLoader color="#FCCC4C" />
    </div>
  );
}
