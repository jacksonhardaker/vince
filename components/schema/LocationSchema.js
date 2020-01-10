const LocationSchema = ({ name }) => name ? JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Place",
  name,
}) : null;

export default LocationSchema;
