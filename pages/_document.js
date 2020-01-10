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
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="robots" content="noindex" />
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
