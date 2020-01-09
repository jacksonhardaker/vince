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

  const displayEvent = (event, index) => {
    const dates = [{ date: event.first_date, time: event.first_time }, ...event.more_dates];
    const { heading, location, description } = event;
    const parsedDates = groupDatesByMonth(dates);

    return (
      <li key={index}>
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
        <h3>{event.heading}</h3>
        {parsedDates.map(month => (
          <p key={month.name}>
            <span>
              {month.dates.map(datetime => datetime.date).join(',')}
            </span>
            <span>
              {month.name}
            </span>
          </p>
        ))}
      </li>
    );
  };

  const displayEvents = () => {
    return (
      <ul>
        {events.map(displayEvent)}
      </ul>
    );
  };

  return (
    <>
      <aside>
        <h2>Calendar</h2>
        {displayEvents()}
      </aside>
      <style jsx>
        {`
        aside {
          background-color: #fff;
        }
      `}
      </style>
    </>
  );
};

export default Calendar;
