import Link from 'next/link';
import JSONLD from './schema/JSONLD';

const Breadcrumb = ({ page, href, color, hover }) => {
  return (
    <nav>
      <JSONLD>
        {`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.vincenthardaker.com"
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "Biography",
              "item": "https://www.vincenthardaker.com/about"
            }]
          }
        `}
      </JSONLD>
      <Link href="/">
        <a>Home</a>
      </Link>
      <span>/</span>
      <Link href={href}>
        <a>{page}</a>
      </Link>
      <style jsx>
        {`
          a {
            color: ${color};
            align-self: flex-start;
            padding: 0.3rem;
          }
          a:hover, a:active, a:focus {
            color: ${hover};
            background-color: ${color};
          }
          span {
            margin: 0 1ch;
          }
        `}
      </style>
    </nav>
  );
};

export default Breadcrumb;
