import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getPhotos, getUserByUserId } from "../services/firebase";

export default function usePhotos() {
  const [photos, setPhotos] = useState(null);

  const {
    user: { uid: userId = "" } //pull out uid, rename it to userId, give it a default of empty string
  } = useContext(UserContext);

  useEffect(() => {
    async function getTimelinePhotos() {
      const [{ following }] = await getUserByUserId(userId);
      let followedUserPhotos = [];

      // if the user logged in is actually following people
      if (following.length > 0) {
        followedUserPhotos = await getPhotos(userId, following);
      }

      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      setPhotos(followedUserPhotos);
    }

    if (userId) {
      getTimelinePhotos();
    }
  }, [userId]);
  return { photos };
}
