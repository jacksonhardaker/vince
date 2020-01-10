import usePrismicClient from '../hooks/usePrismicClient';
import Prismic from 'prismic-javascript';

const fetchAboutPageContent = async () => {
  const client = usePrismicClient();
  const response = await client.query(
    Prismic.Predicates.at('document.type', 'about_page')
  );

  if (response) {
    return response.results[0];
  }

  return null;
};

export default fetchAboutPageContent;
