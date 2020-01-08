import React from 'react';
import fetchHomePageContent from '../fetch/fetchHomePageContent';
import fetchEvents from '../fetch/fetchEvents';
import Container from '../components/Container';
import Quote from '../components/Quote';

const HomePage = ({ heading, subheading, background_image, quote_author, quote_content, quote_publication, quote_link }) => {
  return (
    <main>
      <Container bgImage={background_image}>
      </Container>
      <div className="sidebar">
        <h1>{heading}</h1>
        <h2>{subheading}</h2>

        <Quote
          author={quote_author}
          content={quote_content}
          cite={quote_link}
          publication={quote_publication} />
      </div>
      <style jsx>{`
        main {
          display: grid;
          width: 100%;
        }
        @media screen and (min-width: 600px) {
          main {
            grid-template-columns: auto 320px;
          }
        }
        .sidebar {
          background-color: #009473;
          color: #fff;
        }
      `}</style>
    </main>
  );
};

HomePage.getInitialProps = async () => {
  const homeRes = await fetchHomePageContent();
  const calendarRes = await fetchEvents({ pageSize: 3 });
  console.log(homeRes.data);

  if (homeRes.data) {
    return { ...homeRes.data };
  }

  return {};
};

export default HomePage;
