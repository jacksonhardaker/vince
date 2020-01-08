import usePrismicClient from '../hooks/usePrismicClient';
import Prismic from 'prismic-javascript';

const fetchHomePageContent = async () => {
  const client = usePrismicClient();
  const response = await client.query(
    Prismic.Predicates.at('document.type', 'homepage')
  );

  if (response) {
    return response.results[0];
  }

  return null;
};

export default fetchHomePageContent;
