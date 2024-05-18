import React from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import EventCard from "./EventCard";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div> // Display a loading message while data is loading
      ) : (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Popular Events</h1>
          </div>

          {/* for showing more than one events */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allEvents.length > 0 ? (
              allEvents.map(event => (
                <EventCard key={event._id} data={event} active={event.isActive} />
              ))
            ) : (
              <h4>There are currently no events!</h4>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;