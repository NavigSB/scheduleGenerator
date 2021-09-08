import React from "react";
import { extClass } from "../../../utility/utilityFunctions";

function ScheduleTick({ text, height, textClass }) {
  return (
    <div
      className="absolute flex w-full justify-center items-center select-none"
      style={{ top: height }}
    >
      <p className={extClass("mr-3", textClass)}>{text}</p>
      <hr className="w-1/2 border-gray-400" />
      <p className="ml-3 invisible">{text}</p>
    </div>
  );
}

export default ScheduleTick;
