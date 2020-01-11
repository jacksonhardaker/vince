import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import last from 'lodash/last';
import fetchEvents from '../fetch/fetchEvents';
import Breadcrumb from '../components/Breadcrumb';
import fetchCalendarPageContent from '../fetch/fetchCalendarPageContent';
import CalendarEvent from '../components/CalendarEvent';

const CalendarPage = (props) => {
  const { text_color, background_color, ...rest } = props;
  const [pages, setPages] = useState([{ ...rest }]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      const lastPage = last(pages);

      if (lastPage.next_page) {
        const data = await fetch(lastPage.next_page, { signal }).then(res => res.json());
        setPages([...pages, data]);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [pages]);

  const renderPages = () => {
    return pages.map(({ results }) => {
      return results.map(event => {
        return (
          <CalendarEvent key={event.id} event={event} />
        );
      });
    });
  };

  return (
    <main>
      <Head>
        <title>Calendar | Vincent Hardaker</title>
      </Head>
      <Breadcrumb href="/calendar" page="Calendar" color={text_color} hover={background_color} />
      <h1>Calendar</h1>
      <article>
        {renderPages()}
      </article>
      <style jsx>
        {`
          main {
            width: calc(100% - 4rem);
            max-width: 600px;
            margin: 0 auto;
            padding: 2rem;
            background-color: ${background_color};
            color: ${text_color};
          }
        `}
      </style>
    </main>
  );
};

CalendarPage.getInitialProps = async () => {
  const { data } = await fetchCalendarPageContent();
  const calendarRes = await fetchEvents();

  if (calendarRes) {
    return { ...data, ...calendarRes };
  }

  return {};
};

export default CalendarPage;
