import { Date } from 'prismic-reactjs';

const useGroupDatesByMonth = dates => {
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

export default useGroupDatesByMonth;
