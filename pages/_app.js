import App from 'next/app'
import 'normalize.css/normalize.css';
import fetchSettings from '../fetch/fetchSettings';
import PrismicPreviewScript from '../components/PrismicPreviewScript';

const MainApp = ({ Component, pageProps, fonts, generalFont, headingFont, preview }) => {
  const serif =  headingFont ? `'${headingFont}',"Palatino Linotype", "Book Antiqua", Palatino, serif` : `"Palatino Linotype", "Book Antiqua", Palatino, serif`;
  const sansSerif = generalFont ? `'${generalFont}', Verdana, Geneva, sans-serif` : "Verdana, Geneva, sans-serif";

  return (
    <>
      <Component {...pageProps} />
      <style global jsx>{`
          ${fonts[0] ? `@import url('https://fonts.googleapis.com/css?family=${fonts}&display=swap');` : null}

          html, body, #__next {
            min-height: 100vh;
            width: 100%;
            font-family: ${sansSerif};
          }
          #__next {
            display: flex;
          }
          h1,h2,h3,h4,h5,h6 {
            font-family: ${serif};
          }
          blockquote::before {
            font-family: ${serif};
          }
          p {
            line-height: 1.5;
          }
          iframe {
            max-width: 100%;
          }
        `}</style>
      <PrismicPreviewScript {...{ preview }} />
    </>
  );
};

const prepareFonts = (general, heading) => {
  const fonts = [];

  if (general) {
    fonts.push(general);
  }

  if(heading) {
    fonts.push(heading);
  }

  return fonts.join('|').replace(/\s/g, '+');
};

MainApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  const { general_font, heading_font } = await fetchSettings();
  const fonts = prepareFonts(general_font, heading_font);
  const { query } = appContext.ctx;

  return {
    ...appProps,
    fonts,
    generalFont: general_font,
    headingFont: heading_font,
    preview: !!query.preview
  };
}

export default MainApp;
