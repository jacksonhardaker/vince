import React from 'react';
import hexToRgba from 'hex-to-rgba';

const Base64SVG = ({ stream, fill = '#fff', hover }) => {

  const hoverRGBA = hover || hexToRgba(fill, 0.6);

  if (!window.atob)
    return null;

  const html = {
    __html: atob(stream.substring(26))
  };

  return (
    <>
      <i dangerouslySetInnerHTML={html}></i>
      <style jsx>{`
        i {
          fill: ${fill};
          display: block;
        }

        i:hover {
          fill: ${hoverRGBA}
        }
      `}</style>
    </>
  )
}

export default Base64SVG;
