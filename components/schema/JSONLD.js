import React from 'react';
import ReactDOMServer from 'react-dom/server';
import unescape from 'lodash/unescape';

const JSONLD = ({ children }) => {
  const schema = ReactDOMServer.renderToString(children);
  return <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: unescape(schema) }} />;
};

export default JSONLD;
