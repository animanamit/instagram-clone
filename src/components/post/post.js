import { useRef } from "react";
import { PropTypes } from "prop-types";

export default function Post({ content }) {
  return <p>this is a post</p>;
}

Post.propTypes = {
  content: PropTypes.shape({
    username: PropTypes.string,
    imageSrc: PropTypes.string,
    docId: PropTypes.string,
    caption: PropTypes.string,
    userLikedPhoto: PropTypes.bool,
    likes: PropTypes.array,
    comments: PropTypes.array,
    dateCreated: PropTypes.number
  })
};
