import Document, { Html, Head, Main, NextScript } from 'next/document';
import VincentHardakerSchema from '../components/schema/VincentHardakerSchema';
import JSONLD from '../components/schema/JSONLD';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <JSONLD>
            <VincentHardakerSchema />
          </JSONLD>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  };
}

export default MyDocument;
