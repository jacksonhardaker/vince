const useLinkResolver = (doc) => {
  // Pretty URLs for known types
  if (doc.type === 'homepage') return '/';
  if (doc.type === 'about_page') return '/about';
  if (doc.type === 'calendar_page') return '/calendar';

  // Fallback for other types, in case new custom types get created
  return '/';
};

export default useLinkResolver;
