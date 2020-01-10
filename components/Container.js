import {
  blur,
  mobile,
  mobile2x,
  mobileL,
  mobileL2x,
  tablet,
  tablet2x,
  desktopS,
  desktopS2x,
  desktop,
  desktop2x,
  desktopL,
  desktopL2x,
} from '../styles/image-sizes';
import { base, element } from '../styles/z-index';

const Container = ({ bgImage = {}, children, align = 'center center' }) => {
  const get = size => bgImage[size];

  return (
    <div className="Container">
      <div className="Container--blur">
      </div>
      <div className="Container--hd">
        {children}
      </div>
      <style jsx>
        {`
          .Container {
            position: relative;
            overflow: hidden;
          }
          .Container--hd, .Container--blur {
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: ${align};
          }
          .Container--blur {
            position: absolute;
            background-size: cover;
            background-position: ${align};
            background-image: url(${get(blur).url});
            z-index: ${base};
            filter: blur(8px);
            transform: scale(1.05);
          }
          .Container--hd {
            position: relative;
            z-index: ${element};
          }

          /* Mobile */
          @media screen and (max-width: 320px) {
            .Container--hd {
              background-image: url(${get(mobile).url});
            }

            @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) { 
              .Container--hd {
                background-image: url(${get(mobile2x).url})
              }
            }
          }

          /* Mobile Large */
          @media screen and (min-width: 321px) {
            .Container--hd {
              background-image: url(${get(mobileL).url});
            }

            @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) { 
              .Container--hd {
                background-image: url(${get(mobileL2x).url})
              }
            }
          }

          /* Tablet */
          @media screen and (min-width: 600px) {
            .Container--hd {
              background-image: url(${get(tablet).url});
            }

            @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) { 
              .Container--hd {
                background-image: url(${get(tablet2x).url})
              }
            }
          }

          /* Desktop Small */
          @media screen and (min-width: 768px) {
            .Container--hd {
              background-image: url(${get(desktopS).url});
            }

            @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) { 
              .Container--hd {
                background-image: url(${get(desktopS2x).url})
              }
            }
          }

          /* Desktop Medium */
          @media screen and (min-width: 1024px) {
            .Container--hd {
              background-image: url(${get(desktop).url});
            }

            @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) { 
              .Container--hd {
                background-image: url(${get(desktop2x).url})
              }
            }
          }

          /* Desktop Large */
          @media screen and (min-width: 1440px) {
            .Container--hd {
              background-image: url(${get(desktopL).url});
            }

            @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) { 
              .Container--hd {
                background-image: url(${get(desktopL2x).url})
              }
            }
          }
        `}
      </style>
    </div>
  );
};

export default Container;
