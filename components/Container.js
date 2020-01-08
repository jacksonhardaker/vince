import {
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

const Container = ({ bgImage = {}, children }) => {
  const get = size => bgImage[size];

  return (
    <div className="Container">
      {children}
      <style jsx>
        {`
          .Container {
            background-size: cover;
            background-position: center center;
          }

          /* Mobile */
          @media screen and (max-width: 320px) {
            .Container {
              background-image: url(${get(mobile).url});
            }

            @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) { 
              .Container {
                background-image: url(${get(mobile2x).url})
              }
            }
          }

          /* Mobile Large */
          @media screen and (min-width: 321px) {
            .Container {
              background-image: url(${get(mobileL).url});
            }

            @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) { 
              .Container {
                background-image: url(${get(mobileL2x).url})
              }
            }
          }

          /* Tablet */
          @media screen and (min-width: 600px) {
            .Container {
              background-image: url(${get(tablet).url});
            }

            @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) { 
              .Container {
                background-image: url(${get(tablet2x).url})
              }
            }
          }

          /* Desktop Small */
          @media screen and (min-width: 768px) {
            .Container {
              background-image: url(${get(desktopS).url});
            }

            @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) { 
              .Container {
                background-image: url(${get(desktopS2x).url})
              }
            }
          }

          /* Desktop Medium */
          @media screen and (min-width: 1024px) {
            .Container {
              background-image: url(${get(desktop).url});
            }

            @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) { 
              .Container {
                background-image: url(${get(desktop2x).url})
              }
            }
          }

          /* Desktop Large */
          @media screen and (min-width: 1440px) {
            .Container {
              background-image: url(${get(desktopL).url});
            }

            @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) { 
              .Container {
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
