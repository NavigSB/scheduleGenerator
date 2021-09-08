import React from "react";
import { extClass, padInt, timeToDate } from "../../utility/utilityFunctions";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Event from "./Event/Event";
import ScheduleTick from "./ScheduleTick/ScheduleTick";

function Schedule({ staticEventProps, className, loading }) {
  let { startTime, endTime, increment, events } = staticEventProps;

  let startDate = timeToDate(startTime);
  let endDate = timeToDate(endTime);

  const MS_PER_MIN = 60 * 1000;

  const dayLength =
    (endDate.getTime() - startDate.getTime()) / MS_PER_MIN / increment + 1;

  let ticks = [];
  let iterDate = new Date(startDate.getTime());
  for (let i = 0; i < dayLength; i++) {
    ticks.push({
      text:
        padInt(iterDate.getHours(), 2) + ":" + padInt(iterDate.getMinutes(), 2),
      height: (100 / dayLength) * i + "%",
      className: iterDate.getMinutes() === 0 ? "" : "invisible",
    });
    iterDate.setTime(iterDate.getTime() + increment * MS_PER_MIN);
  }

  return (
    <>
      {!loading ? (
        <div className={extClass("w-full h-full", className)}>
          {ticks.map((tick) => (
            <ScheduleTick
              key={tick.text}
              text={tick.text}
              height={tick.height}
              textClass={tick.className}
            />
          ))}
          {events.map((event) => {
            return (
              <Event
                key={event.name}
                name={event.name}
                top={(event.start * 100) / dayLength + "%"}
                height={(event.length * 100) / dayLength + "%"}
                color={event.color}
              />
            );
          })}
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <LoadingSpinner color="black" />
        </div>
      )}
    </>
  );
}

export default Schedule;
