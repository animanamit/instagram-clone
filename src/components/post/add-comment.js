import { useState, useContext } from "react";
import FirebaseContext from "../../context/firebase";
import { PropTypes } from "prop-types";
import UserContext from "../../context/user";

export default function AddComment({
  docId,
  comments,
  setComments,
  commentInput
}) {
  const [comment, setComment] = useState("");

  const {
    user: { displayName }
  } = useContext(UserContext);

  const handleSubmitComment = event => {
    event.preventDefault();
    return null;
  };

  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={event =>
          comment.length >= 1
            ? handleSubmitComment(event)
            : event.preventDefault()
        }
      >
        <input
          aria-label="add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4"
          type="text"
          name="add-comment"
          placeholder="Add a comment..."
        ></input>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  docId: PropTypes.string,
  comments: PropTypes.array,
  setComments: PropTypes.func,
  commentInput: PropTypes.object
};