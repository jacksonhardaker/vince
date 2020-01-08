import React from 'react';
import fetchHomePageContent from '../fetch/fetchHomePageContent';
import fetchEvents from '../fetch/fetchEvents';
import Container from '../components/Container';

const HomePage = ({ heading, subheading, background_image }) => {
  return (
    <main>
      <Container bgImage={background_image} align="left center">
      </Container>
      <div className="sidebar">
        <h1>{heading}</h1>
        <h2>{subheading}</h2>
      </div>
      <style jsx>{`
        main {
          display: grid;
          width: 100%;
          grid-template-columns: auto 320px;
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
