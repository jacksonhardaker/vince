import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { RichText } from 'prismic-reactjs';
import fetchAboutPageContent from '../fetch/fetchAboutPageContent';
import Quote from '../components/Quote';
import Video from '../components/Video';
import Breadcrumb from '../components/Breadcrumb';

const AboutPage = ({ content }) => {
  const [pageContent, setPageContent] = useState(content);

  const rehydratePrismicContent = async () => {
    const { data } = await fetchAboutPageContent();

    if (data) setPageContent(data);
  };

  useEffect(() => {
    rehydratePrismicContent();
  }, []);

  return (
    <main>
      <Head>
        <title>Biography | Vincent Hardaker</title>
      </Head>
      <Breadcrumb href="/about" page="Biography" color={pageContent.text_color} hover={pageContent.background_color} />
      <h1>Biography</h1>
      <div className="quotes">
        {pageContent.quotes.map(({ quote_author, quote_content, quote_link, quote_publication }, index) => (
          <Quote
            key={index}
            author={quote_author}
            content={quote_content}
            cite={quote_link}
            publication={quote_publication} />
        ))}
      </div>
      <article>
        {RichText.render(pageContent.biography)}
      </article>

      <div className="videos">
        {pageContent.videos.map(({ embed_html }, index) => (
          <Video key={index} html={embed_html} />
        ))}
      </div>
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

AboutPage.getInitialProps = async () => {
  const { data } = await fetchAboutPageContent();

  return { content: data };
};

export default AboutPage;
