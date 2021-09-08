import React, { useEffect, useState } from "react";
import { getBestEventProps } from "../utility/scheduleGA";
import EventsForm from "./EventsForm/EventsForm";
import Schedule from "./Schedule/Schedule";

function App() {
  const [loading, setLoading] = useState(true);
  const [eventProps, setEventProps] = useState({
    startTime: "",
    endTime: "",
    increment: 0,
    events: [],
  });
  const [staticEventProps, setStaticEventProps] = useState({
    startTime: "",
    endTime: "",
    increment: 0,
    events: [],
  });

  useEffect(() => {
    (async () => {
      if (eventProps.startTime !== "") {
        let bestEventProps = await getBestEventProps(eventProps, 500, 1000);
        console.log(bestEventProps);
        setStaticEventProps(bestEventProps);
        setLoading(false);
      }
    })();
  }, [eventProps]);

  async function onSubmit(output) {
    setEventProps(output);
  }

  return (
    <div className="w-full h-screen">
      <EventsForm onSubmit={onSubmit} />
      <Schedule loading={loading} staticEventProps={staticEventProps} />
    </div>
  );
}

export default App;
