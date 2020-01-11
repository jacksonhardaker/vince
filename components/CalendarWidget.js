import Link from 'next/link';
import last from 'lodash/last';
import VincentHardakerSchema from './schema/VincentHardakerSchema';
import LocationSchema from './schema/LocationSchema';
import JSONLD from './schema/JSONLD';
import MusicEventSchema from './schema/MusicEventSchema';
import useGroupDatesByMonth from '../hooks/useGroupDatesByMonth';

const CalendarWidget = ({ events }) => {

  const displayEvent = event => {
    const { data, id } = event;
    const dates = [{ date: data.first_date, time: data.first_time }, ...data.more_dates];
    const { heading, location, description } = data;
    const parsedDates = useGroupDatesByMonth(dates);

    return (
      <li key={id}>
        <JSONLD>
          <MusicEventSchema
            name={heading}
            startDate={dates[0].date}
            endDate={last(dates).date}
            description={description}
            location={LocationSchema({ name: location })}
            performer={VincentHardakerSchema()}
           />
        </JSONLD>
        <Link href="/calendar" as={`/calendar#${id}`} >
          <a>
            <h3>{heading}</h3>
            {parsedDates.map(month => (
              <p key={month.name}>
                <span className="dates">
                  {month.dates.map(datetime => datetime.date).join(',')}
                </span>
                <span className="month">
                  {month.name}
                </span>
              </p>
            ))}
          </a>
        </Link>
        <style jsx>
          {`
            h3 {
              margin-bottom: 0;
            }
            p {
              margin-top: 0;
            }
            .dates {
              margin-right: 1ch;
            }
            a {
              color: inherit;
              text-decoration: none;
              display: inline-block;
              padding: 0 0.3rem;
            }
            a:hover, a:active, a:focus {
              color: #000;
              background-color: #fff;
            }
          `}
        </style>
      </li>
    );
  };

  const displayEvents = () => {
    return (
      <>
        <ul>
          {events.map(displayEvent)}
        </ul>
        <style jsx>
          {`
            ul {
              padding-left: 0;
              list-style: none;
            }
          `}
        </style>
      </>
    );
  };

  return (
    <>
      <aside className="CalendarWidget">
        <Link href="/calendar">
          <a>
            <h2>Calendar</h2>
          </a>
        </Link>
        {displayEvents()}
      </aside>
      <style jsx>
        {`
        aside {
          padding: 2rem;
          color: #fff;
        }
        a {
          color: inherit;
          text-decoration: none;
          display: inline-block;
          padding: 0 0.3rem;
        }
        a:hover, a:active, a:focus {
          color: #000;
          background-color: #fff;
        }
      `}
      </style>
    </>
  );
};

export default CalendarWidget;
