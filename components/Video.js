const Video = ({ html }) => {
  return <div className="Video" dangerouslySetInnerHTML={{ __html: html }}></div>
};

export default Video;
