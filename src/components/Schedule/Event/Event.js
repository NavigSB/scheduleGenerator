import React from "react";

function Event({ name, height, top, color }) {
  console.log(color);

  return (
    <div
      className="absolute flex w-full justify-center"
      style={{ top: `calc(${top} + 0.75rem)`, height }}
    >
      <div
        className="flex justify-center w-1/4 rounded-md shadow-sm select-none"
        style={{ backgroundColor: color }}
      >
        {name}
      </div>
    </div>
  );
}

export default Event;
