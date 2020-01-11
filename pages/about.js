import Head from 'next/head';
import { RichText } from 'prismic-reactjs';
import fetchAboutPageContent from '../fetch/fetchAboutPageContent';
import Quote from '../components/Quote';
import Video from '../components/Video';
import Breadcrumb from '../components/Breadcrumb';

const AboutPage = (props) => {
  const { biography, quotes, videos, background_color, text_color } = props;

  return (
    <main>
      <Head>
        <title>Biography | Vincent Hardaker</title>
      </Head>
      <Breadcrumb href="/about" page="Biography" color={text_color} hover={background_color} />
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

AboutPage.getInitialProps = async () => {
  const aboutRes = await fetchAboutPageContent();

  if (aboutRes.data) {
    return { ...aboutRes.data };
  }

  return {};
};

export default AboutPage;
