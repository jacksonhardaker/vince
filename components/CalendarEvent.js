import { Date } from 'prismic-reactjs';
import useGroupDatesByMonth from "../hooks/useGroupDatesByMonth";

	
// var date = PrismicDOM.Date(document.data.postDate);
 
// var formattedDate = new Intl.DateTimeFormat('en-US',{
//   year: "numeric",
//   month: "short",
//   day: "2-digit"
// }).format(date);

const CalendarEvent = ({ event }) => {
  const { data, id } = event;
  const dates = [{ date: data.first_date, time: data.first_time }, ...data.more_dates];
  const { heading, location, description } = data;
  const parsedDates = useGroupDatesByMonth(dates);

  const format = date => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: "long",
      day: "numeric"
    }).format(Date(date))
  };

  return (
    <div>
      <h2>{heading}</h2>
      {location && <h3>{location}</h3>}
      {description && <p>{description}</p>}
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
