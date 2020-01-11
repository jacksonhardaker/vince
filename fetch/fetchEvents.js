import usePrismicClient from '../hooks/usePrismicClient';
import Prismic from 'prismic-javascript';

const fetchEvents = async ({ pageSize, page, afterToday } = {}) => {
  const today = new Date().toISOString().split('T')[0];

  const predicates = [Prismic.Predicates.at('document.type', 'calendar_event')];

  if (afterToday) {
    predicates.push(Prismic.Predicates.dateAfter('my.calendar_event.first_date', today));
  }

  const client = usePrismicClient();
  const response = await client.query(
    predicates,
    { pageSize, page, orderings: '[my.calendar_event.first_date]' }
  );

    return response;
};

export default fetchEvents;
