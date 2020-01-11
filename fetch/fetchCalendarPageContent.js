import usePrismicClient from '../hooks/usePrismicClient';
import Prismic from 'prismic-javascript';

const fetchCalendarPageContent = async () => {
  const client = usePrismicClient();
  const response = await client.query(
    Prismic.Predicates.at('document.type', 'calendar_page')
  );

  if (response) {
    return response.results[0];
  }

  return null;
};

export default fetchCalendarPageContent;
