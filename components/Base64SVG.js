import React from "react";
import hexToRgba from "hex-to-rgba";

const Base64SVG = ({ stream, fill = "#fff", hover }) => {
  const hoverRGBA = hover || hexToRgba(fill, 0.6);
  const [html, setHtml] = React.useState(null);

  React.useEffect(() => {
    setHtml({
      __html: atob(stream.substring(26)),
    });
  }, []);

  if (!html) return null;

  return (
    <>
      <i dangerouslySetInnerHTML={html}></i>
      <style jsx>{`
        i {
          fill: ${fill};
          display: block;
        }

        i:hover {
          fill: ${hoverRGBA};
        }
      `}</style>
    </>
  );
};

export default Base64SVG;
