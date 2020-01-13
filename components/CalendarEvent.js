import React, { useEffect, useState, useRef } from 'react';
import { Date, RichText } from 'prismic-reactjs';
import last from 'lodash/last';
import JSONLD from './schema/JSONLD';
import MusicEventSchema from './schema/MusicEventSchema';
import VincentHardakerSchema from './schema/VincentHardakerSchema';
import LocationSchema from './schema/LocationSchema';

const CalendarEvent = ({ event }) => {
  const [hash, setHash] = useState(null);
  const { data, id } = event;
  const dates = [{ date: data.first_date, time: data.first_time }, ...data.more_dates];
  const { heading, location, description } = data;
  const element = useRef(null);

  const getHash = () => {
    return window && window.location && window.location.hash[0] ?
      window.location.hash.slice(1) :
      null;
  };

  const format = date => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: "long",
      day: "numeric"
    }).format(Date(date))
  };

  const handleHashChange = () => {
    setHash(getHash());
  };

  const handleClick = () => {
    window.location.hash = `#${id}`;
  };

  useEffect(() => {
    setHash(getHash());
  }, []);

  useEffect(() => {
    if (hash === id) {
      element.current.focus();
    }
  }, [hash]);

  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange, false);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    }
  }, [handleHashChange]);

  return (
    <div
    id={id}
    className="CalendarEvent"
    onClick={handleClick} tabIndex={0}
    ref={element} >
    <JSONLD>
      <MusicEventSchema
        name={heading}
        startDate={dates[0].date}
        endDate={last(dates).date}
        description={RichText.asText.description}
        location={LocationSchema({ name: location })}
        performer={VincentHardakerSchema()}
       />
    </JSONLD>

      <h2>{heading}</h2>
      {location && <h3>{location}</h3>}
      {description && RichText.render(description)}
      <ul>
        {dates.map(({ date, time }, index) => (
          <li key={index}>
            <p className="date">{format(date)}</p>
            {time && <p className="time">at {time}</p>}
          </li>
        ))}
      </ul>
      <style jsx>
        {`
          .CalendarEvent {
            padding: 0.3rem 1rem;
          }
          ul {
            list-style: none;
            padding-left: 0;
          }
          li {
            display: flex;
          }
          .date {
            margin-right: 0.5ch;
          }
        `}
      </style>
    </div>
  );
};

export default CalendarEvent;
