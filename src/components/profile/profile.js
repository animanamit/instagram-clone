import { PropTypes } from "prop-types";
import Header from "./header";
import { useReducer, useEffect } from "react";
import { getUserPhotosByUsername } from "../../services/firebase";
import Photos from "./photos";

export default function UserProfile({ user, username }) {
  const reducer = (state, newState) => ({ ...state, ...newState });

  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0
  };
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUsername(username);
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length
      });
    }

    if (user.username) {
      getProfileInfoAndPhotos();
    }
  }, []);

  return (
    <>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} />
    </>
  );
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    emailAddress: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
    fullName: PropTypes.string,
    username: PropTypes.string,
    docId: PropTypes.string,
    likes: PropTypes.array,
    dateCreated: PropTypes.number,
    userId: PropTypes.string
  })
};
