import usePrismicClient from '../hooks/usePrismicClient';
import Prismic from 'prismic-javascript';

const fetchEvents = async ({ pageSize, page} = {}) => {
  const client = usePrismicClient();
  const response = await client.query(
    Prismic.Predicates.at('document.type', 'calendar_event'),
    { pageSize, page, orderings : '[my.calendar_event.first_date]' }
  );

  if (response) {
    return response.results.map(result => result.data);
  }

  return null;
};

export default fetchEvents;
