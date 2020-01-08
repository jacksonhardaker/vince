import App from 'next/app'
import 'normalize.css/normalize.css';
import fetchSettings from '../fetch/fetchSettings';

const MainApp = ({ Component, pageProps, fonts, generalFont, headingFont }) => {
  console.log(fonts);
  return (
    <>
       <Component {...pageProps} />
       <style global jsx>{`
          @import url('https://fonts.googleapis.com/css?family=${fonts}&display=swap');

          html, body, #__next {
            min-height: 100vh;
            width: 100%;
            font-family: '${generalFont}', sans-serif;
          }
          #__next {
            display: flex;
          }
          h1,h2,h3,h4,h5,h6 {
            font-family: '${headingFont}', serif;
          }
        `}</style>
    </>
  );
};

MainApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  const { general_font, heading_font } = await fetchSettings();
  const fonts = [general_font, heading_font].join('|').replace(/\s/g, '+');

  return {
    ...appProps,
    fonts,
    generalFont: general_font,
    headingFont: heading_font
  };
}

export default MainApp;
