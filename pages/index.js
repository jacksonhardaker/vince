import React, { useState, useEffect } from 'react';
import { RichText } from 'prismic-reactjs';
import hexToRgba from 'hex-to-rgba';
import Head from 'next/head';
import Link from 'next/link';
import fetchHomePageContent from '../fetch/fetchHomePageContent';
import fetchEvents from '../fetch/fetchEvents';
import Container from '../components/Container';
import Quote from '../components/Quote';
import SocialButton from '../components/SocialButton';
import CalendarWidget from '../components/CalendarWidget';
import { base, element } from '../styles/z-index';

const HomePage = ({ content, events }) => {
  const [pageContent, setPageContent] = useState(content);
  const [concerts, setConcerts] = useState(events);

  const rehydratePrismicContent = async () => {
    const { data } = await fetchHomePageContent();
    const { results } = await fetchEvents({ pageSize: 3, afterToday: true });

    if (data) setPageContent(data);
    if (results) setConcerts(results);
  };

  useEffect(() => {
    rehydratePrismicContent();
  }, []);

  return (
    <main>
      <Head>
        <title>Vincent Hardaker | Conductor</title>
      </Head>
      <Container bgImage={pageContent.background_image}>
      </Container>

      <CalendarWidget events={concerts} />

      <div className="sidebar">
        <header>
          <h1>{pageContent.heading}</h1>
          <h2>{pageContent.subheading}</h2>
        </header>

        <Quote
          author={pageContent.quote_author}
          content={pageContent.quote_content}
          cite={pageContent.quote_link}
          publication={pageContent.quote_publication} />

        <div className="bio">
          {RichText.render(pageContent.short_bio)}
        </div>

        <Link href="/about">
          <a>Read More</a>
        </Link>

        <footer>
          <SocialButton solid="envelope" href="mailto:vincenthardaker@gmail.com" fill={pageContent.sidebar_text} />
        </footer>
      </div>
      <style jsx>{`
        main {
          display: grid;
          width: 100%;
          grid-template-rows: 320px auto;
        }
        .sidebar {
          display: flex;
          flex-direction: column;
          background-color: ${pageContent.sidebar_background};
          color: ${pageContent.sidebar_text};
          padding: 2rem;
        }
        h1, h2 {
          text-align: right;
        }
        a {
          color: ${pageContent.sidebar_text};
          align-self: flex-start;
          padding: 0.3rem;
        }
        a:hover, a:active, a:focus {
          color: ${pageContent.sidebar_background};
          background-color: ${pageContent.sidebar_text};
        }
        header {
          border-bottom: 1px solid ${hexToRgba(pageContent.sidebar_text, 0.3)};
        }
        footer {
          padding-top: 2rem;
          margin: auto auto 0;
          width: 100%;
          border-top: 1px solid ${hexToRgba(pageContent.sidebar_text, 0.3)};
          text-align: center;
        }
        @media screen and (min-width: 768px) {
          main {
            grid-template-columns: auto 480px;
            grid-template-rows: auto;
          }
          .sidebar {
            position: relative;
            z-index: ${element};
            box-shadow: -3px 0px 10px 0px rgba(0,0,0,0.3);
          }
        }
      `}</style>
      <style global jsx>
        {`
          .Container {
            grid-column: 1 / 2;
            grid-row: 1 / 2;
            z-index: ${base};
          }
          .CalendarWidget {
            background: linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 50%, transparent 80%);
            grid-column: 1 / 2;
            grid-row: 1 / 2;
            position: relative;
            z-index: ${element};
          }
          @media screen and (min-width: 768px) {
            .CalendarWidget {
              background: transparent;
            }
          }
        `}
      </style>
    </main>
  );
};

HomePage.getInitialProps = async () => {
  const { data } = await fetchHomePageContent();
  const { results } = await fetchEvents({ pageSize: 3, afterToday: true });

  return { content: data, events: results };
};

export default HomePage;
