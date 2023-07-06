import React, { useEffect, useState } from "react";
import Head from "next/head";
import last from "lodash/last";
import fetchEvents from "../fetch/fetchEvents";
import Breadcrumb from "../components/Breadcrumb";
import fetchCalendarPageContent from "../fetch/fetchCalendarPageContent";
import CalendarEvent from "../components/CalendarEvent";

const CalendarPage = ({ content, events }) => {
  const [pageContent, setPageContent] = useState(content);
  const [concerts, setConcerts] = useState(events);
  const [pages, setPages] = useState([events]);

  const rehydratePrismicContent = async (resolve) => {
    const { data } = await fetchCalendarPageContent();
    const [before, after] = await Promise.all([
      fetchEvents({ beforeToday: true }),
      fetchEvents({ afterToday: true }),
    ]);

    resolve({
      data,
      events: [before, after],
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
    setPages([concerts]);
  }, [concerts]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      const lastPage = last(pages);

      if (lastPage.next_page) {
        const data = await fetch(lastPage.next_page, { signal }).then((res) =>
          res.json()
        );
        setPages([...pages, data]);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [pages]);

  const renderPages = () => {
    return pages.map(
      ([{ results: beforeResults }, { results: afterResults }]) => {
        return (
          <>
            <h2>Upcoming Events</h2>
            {afterResults.map((event) => (
              <CalendarEvent key={event.id} event={event} />
            ))}
            <hr />
            <h2>Past Events</h2>
            {beforeResults.map((event) => (
              <CalendarEvent key={event.id} event={event} />
            ))}
          </>
        );
      }
    );
  };

  return (
    <main>
      <Head>
        <title>Calendar | Vincent Hardaker</title>
      </Head>
      <Breadcrumb
        href="/calendar"
        page="Calendar"
        color={pageContent.text_color}
        hover={pageContent.background_color}
      />
      <h1>Calendar</h1>
      <article>{renderPages()}</article>
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
          :root {
            --text-color: ${pageContent.text_color};
            --background-color: ${pageContent.background_color};
          }

          a {
            color: var(--text-color);
            align-self: flex-start;
            padding: 0.3rem;
          }
          a:hover,
          a:active,
          a:focus {
            color: var(--background-color);
            background-color: var(--text-color);
          }
        `}
      </style>
    </main>
  );
};

CalendarPage.getInitialProps = async () => {
  const { data } = await fetchCalendarPageContent();
  const [before, after] = await Promise.all([
    fetchEvents({ beforeToday: true }),
    fetchEvents({ afterToday: true }),
  ]);

  if (before && after) {
    return { content: data, events: [before, after] };
  }

  return {};
};

export default CalendarPage;
