import React, { useEffect } from 'react';
import { parse } from 'url';
import qs from 'qs';
import usePrismicClient from "../hooks/usePrismicClient";
import useLinkResolver from '../hooks/useLinkResolver';

const apiEndpoint = 'https://vincent-hardaker.cdn.prismic.io/api/v2';

const PreviewPage = ({ query }) => {

  useEffect(() => {
    const client = usePrismicClient();
    const params = qs.parse(query);
    client.getApi(apiEndpoint).then(async api => {
      const url = await api.previewSession(params.token, useLinkResolver, '/');
      
      if (window) window.location = `${url}?preview=true`;
    });
  }, []);

  return <p>Loading preview...</p>;
};

PreviewPage.getInitialProps = async ({ req, ctx }) => {
  const { query } = parse(req.url);

  return {
    query
  };
}

export default PreviewPage;
