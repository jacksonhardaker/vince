import usePrismicClient from '../hooks/usePrismicClient';
import Prismic from 'prismic-javascript';

const fetchSettings = async () => {
  try {
    const client = usePrismicClient();
    const response = await client.query(
      Prismic.Predicates.at('document.type', 'settings')
    );
  
    if (response) {
      return response.results[0].data || {};
    }
  
    return null;
  }
  catch (error) {
    console.log(error);
    return {};
  }
};

export default fetchSettings;
