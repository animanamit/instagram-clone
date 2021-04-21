import { useRef } from "react";
import { PropTypes } from "prop-types";
import Header from "./header";
import Image from "./image";
import Actions from "./actions";
import Footer from "./footer";
import Comments from "./comments";

export default function Post({ content }) {
  const commentInput = useRef(null);

  const handleFocus = () => commentInput.current.focus();

  return (
    <div className="rounder col-span-4  border bg-white border-gray-primary mb-16">
      <Header username={content.username} />
      <Image src={content.imageSrc} caption={content.caption} />
      <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer caption={content.caption} username={content.username} />
      <Comments
        docId={content.docId}
        comments={content.comments}
        posted={content.dateCreated}
        commentInput={commentInput}
      />
    </div>
  );
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
