import Head from 'next/head';
import { RichText } from 'prismic-reactjs';
import fetchAboutPageContent from '../fetch/fetchAboutPageContent';
import Quote from '../components/Quote';
import Video from '../components/Video';
import Breadcrumb from '../components/Breadcrumb';

const AboutPage = (props) => {
  console.log(props);
  const { biography, quotes, videos } = props;
  console.log(videos);

  return (
    <main>
      <Head>
        <title>Biography | Vincent Hardaker</title>
      </Head>
      <Breadcrumb href="/about" page="Biography" />
      <h1>Biography</h1>
      <div className="quotes">
        {quotes.map(({ quote_author, quote_content, quote_link, quote_publication }, index) => (
          <Quote
            key={index}
            author={quote_author}
            content={quote_content}
            cite={quote_link}
            publication={quote_publication} />
        ))}
      </div>
      <article>
        {RichText.render(biography)}
      </article>

      <div className="videos">
        {videos.map(({ embed_html }, index) => (
          <Video key={index} html={embed_html} />
        ))}
      </div>
      <style jsx>
        {`
          main {
            max-width: 600px;
            margin: 0 auto;
            padding: 2rem;
          }
        `}
      </style>
    </main>
  );
};

AboutPage.getInitialProps = async () => {
  const aboutRes = await fetchAboutPageContent();
  // const calendarRes = await fetchEvents({ pageSize: 3 });

  if (aboutRes.data) {
    return { ...aboutRes.data };
  }

  return {};
};

export default AboutPage;
