const withImages = require("next-images");

module.exports = withImages({
  async redirects() {
    return [
      {
        source: "/(photos|media)(/?)",
        destination: "/about",
        permanent: true,
      },
    ];
  },
});
