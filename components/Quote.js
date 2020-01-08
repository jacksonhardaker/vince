import { RichText } from 'prismic-reactjs';

const Quote = ({ author, content, cite, publication }) => {

  const citation = () => publication ? <>, <cite>{publication}</cite></> : null;

  return (
    <blockquote {...{ cite }}>
      {RichText.render(content)}
      <footer>
        {author}
        {citation()}
      </footer>
      <style jsx>
        {`
          blockquote {
            position: relative;
          }
          blockquote::before {
            content: "“";
            font-size: 6rem;
            opacity: 0.2;
            position: absolute;
            top: -1.5rem;
            left: -1rem;
          }
        `}
      </style>
    </blockquote>
  );
};

export default Quote;
