import { JSONLD, Generic } from 'react-structured-data';
import { Date } from 'prismic-reactjs';
import VincentHardakerSchema from './schema/VincentHardakerSchema';
import LocationSchema from './schema/LocationSchema';

const groupDatesByMonth = dates => {
  const results = [
    { name: 'January', dates: [] },
    { name: 'February', dates: [] },
    { name: 'March', dates: [] },
    { name: 'April', dates: [] },
    { name: 'May', dates: [] },
    { name: 'June', dates: [] },
    { name: 'July', dates: [] },
    { name: 'August', dates: [] },
    { name: 'September', dates: [] },
    { name: 'October', dates: [] },
    { name: 'November', dates: [] },
    { name: 'December', dates: [] },
  ]

  dates.forEach(({ date, time }) => {
    results[
      Date(date).getMonth()
    ].dates.push(
      {
        date: Date(date).getDate(),
        time
      }
    );
  });

  return results.filter(month => !!month.dates[0]);
};

const Calendar = ({ events }) => {

  const displayEvent = event => {
    const { data, id } = event;
    const dates = [{ date: data.first_date, time: data.first_time }, ...data.more_dates];
    const { heading, location, description } = data;
    const parsedDates = groupDatesByMonth(dates);

    return (
      <li key={id}>
        <JSONLD>
          <Generic type="event" jsonldtype="Event" schema={{
            name: heading,
            startDate: dates[0].date,
            endDate: dates[dates.length - 1].date,
            description: description
          }}>
            {LocationSchema(location)}
            {VincentHardakerSchema('performer')}
          </Generic>
        </JSONLD>
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
      <aside className="Calendar">
        <h2>Calendar</h2>
        {displayEvents()}
      </aside>
      <style jsx>
        {`
        aside {
          padding: 2rem;
          color: #fff;
        }
      `}
      </style>
    </>
  );
};

export default Calendar;
