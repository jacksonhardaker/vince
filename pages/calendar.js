import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import last from 'lodash/last';
import fetchEvents from '../fetch/fetchEvents';
import Breadcrumb from '../components/Breadcrumb';
import fetchCalendarPageContent from '../fetch/fetchCalendarPageContent';
import CalendarEvent from '../components/CalendarEvent';

const CalendarPage = ({ content, events }) => {
  const [pageContent, setPageContent] = useState(content);
  const [concerts, setConcerts] = useState(events);
  const [pages, setPages] = useState([events]);

  const rehydratePrismicContent = async (resolve) => {
    const { data } = await fetchCalendarPageContent();
    const calendarRes = await fetchEvents();

    resolve({
      data,
      events: calendarRes
    });
  };

  useEffect(() => {
    let outerReject;
    new Promise((resolve, reject) => {
      outerReject = reject;
      rehydratePrismicContent(resolve);
    }).then(({ data, events }) => {
      if (data) setPageContent(data);
      if (events) setConcerts(events);
    });

    return outerReject;
  }, []);

  useEffect(() => {
    setPages([concerts])
  }, [concerts]);

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
      <Breadcrumb href="/calendar" page="Calendar" color={pageContent.text_color} hover={pageContent.background_color} />
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
            color: ${pageContent.text_color};
          }
        `}
      </style>
      <style global jsx>
        {`
          #__next {
            background-color: ${pageContent.background_color};
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
    return { content: data, events: calendarRes };
  }

  return {};
};

export default CalendarPage;
