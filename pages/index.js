import React from 'react';
import { RichText } from 'prismic-reactjs';
import hexToRgba from 'hex-to-rgba';
import fetchHomePageContent from '../fetch/fetchHomePageContent';
import fetchEvents from '../fetch/fetchEvents';
import Container from '../components/Container';
import Quote from '../components/Quote';
import SocialButton from '../components/SocialButton';
import Calendar from '../components/Calendar';
import { base, element } from '../styles/z-index';

const HomePage = ({
  heading,
  subheading,
  background_image,
  quote_author,
  quote_content,
  quote_publication,
  quote_link,
  short_bio,
  sidebar_background,
  sidebar_text,
  events,
}) => {

  return (
    <main>
      <Container bgImage={background_image}>
      </Container>
      <Calendar events={events} />
      <div className="sidebar">
        <header>
          <h1>{heading}</h1>
          <h2>{subheading}</h2>
        </header>

        <Quote
          author={quote_author}
          content={quote_content}
          cite={quote_link}
          publication={quote_publication} />

        <div className="bio">
          {RichText.render(short_bio)}
        </div>

        <footer>
          <SocialButton solid="envelope" href="mailto:vincenthardaker@gmail.com" fill={sidebar_text} />
        </footer>
      </div>
      <style jsx>{`
        main {
          display: grid;
          width: 100%;
          grid-template-rows: 320px auto;
        }
        @media screen and (min-width: 768px) {
          main {
            grid-template-columns: auto 480px;
            grid-template-rows: auto;
          }
        }
        .sidebar {
          display: flex;
          flex-direction: column;
          background-color: ${sidebar_background};
          color: ${sidebar_text};
          padding: 2rem;
        }
        h1, h2 {
          text-align: right;
        }
        header {
          border-bottom: 1px solid ${hexToRgba(sidebar_text, 0.3)};
        }
        footer {
          padding-top: 2rem;
          margin: auto auto 0;
          width: 100%;
          border-top: 1px solid ${hexToRgba(sidebar_text, 0.3)};
          text-align: center;
        }
      `}</style>
      <style global jsx>
        {`
          .Container {
            grid-column: 1 / 2;
            grid-row: 1 / 2;
            z-index: ${base};
          }
          .Calendar {
            background: linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 50%, transparent 80%);
            grid-column: 1 / 2;
            grid-row: 1 / 2;
            position: relative;
            z-index: ${element};
          }
          @media screen and (min-width: 768px) {
            .Calendar {
              background: transparent;
            }
          }
        `}
      </style>
    </main>
  );
};

HomePage.getInitialProps = async () => {
  const homeRes = await fetchHomePageContent();
  const calendarRes = await fetchEvents({ pageSize: 3 });

  if (homeRes.data) {
    return { ...homeRes.data, events: calendarRes };
  }

  return {};
};

export default HomePage;
