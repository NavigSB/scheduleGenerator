import React, { useEffect } from "react";
import { randomColor } from "../../utility/utilityFunctions";

function EventsForm({ onSubmit }) {
  const props = {
    startTime: "9:00",
    endTime: "13:00",
    increment: 10,
  };

  const input = [
    {
      name: "Standup",
      type: "static",
      startTime: "10:00",
      length: 30,
    },
    {
      name: "Physics HW",
      type: "dynamic",
      length: 20,
    },
    {
      name: "Do stretches",
      type: "dynamic",
      length: 10,
    },
    {
      name: "Do English Short Prompt",
      type: "dynamic",
      length: 10,
    },
    {
      name: "Run a Mile",
      type: "dynamic",
      length: 10,
    },
  ];

  useEffect(() => {
    onSubmit(createEventsArr(props, input));
  }, []);

  return <div></div>;
}

function createEventsArr(props, input) {
  let eventProps = { ...props, events: [] };
  for (let i = 0; i < input.length; i++) {
    let event = {
      name: input[i].name,
      type: input[i].type,
      length: input[i].length / props.increment,
      color: randomColor(),
    };
    if (input[i].type === "static") {
      event.start = convertTimeToCoord(
        input[i].startTime,
        props.startTime,
        props.increment
      );
    }
    eventProps.events.push(event);
  }
  return eventProps;
}

// function convertCoordToTime(coord, startTime, increment) {
//   const startHours = parseInt(startTime.split(":")[0]);
//   const startMins = parseInt(startTime.split(":")[1]) + startHours * 60;
//   const timeMins = coord * increment + startMins;
//   const timeHours = floor(timeMins / 60);
//   // console.log("timeHours: ", timeHours, ", timeMins: ", timeMins);

//   return padInt(timeHours, 2) + ":" + padInt(timeMins - timeHours * 60, 2);
// }

function convertTimeToCoord(time, startTime, increment) {
  const startHours = parseInt(startTime.split(":")[0]);
  const timeHours = parseInt(time.split(":")[0]);
  const startMins = parseInt(startTime.split(":")[1]) + startHours * 60;
  const timeMins = parseInt(time.split(":")[1]) + timeHours * 60;

  return (timeMins - startMins) / increment;
}

export default EventsForm;
