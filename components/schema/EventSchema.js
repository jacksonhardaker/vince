const EventSchema = ({ type = "Event", location, performer, ...rest }) => JSON.stringify({
  "@context": "https://schema.org",
  "@type": type,
  ...rest,
  location: location ? JSON.parse(location) : undefined,
  performer: performer ? JSON.parse(performer) : undefined,
});

export default EventSchema;
