import React from 'react';
import { memo } from 'react';

function Navbar({ adjective, getAdjective }) {
  console.log("Navbar is rendered");

  return (
    <div>
      Navbar {adjective}
      <button onClick={getAdjective}>change me</button>
    </div>
  );
}

export default memo(Navbar);
