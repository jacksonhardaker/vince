import Prismic from 'prismic-javascript';

const apiEndpoint = 'https://vincent-hardaker.cdn.prismic.io/api/v2';
const accessToken = 'MC5YZ3BDdUJJQUFDSUFVRDEx.77-9Lu-_vTnvv70ZBgrvv70ZJ--_vU_vv71y77-9ZQdL77-9au-_ve-_ve-_ve-_ve-_vUwa77-9NO-_vVo';

const usePrismicClient = () => {
  return Prismic.client(apiEndpoint, { accessToken });
};

export default usePrismicClient;
