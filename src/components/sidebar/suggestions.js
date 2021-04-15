import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getSuggestedProfiles } from "../../services/firebase";
import Skeleton from "react-loading-skeleton";

export default function Suggestions({ userId, following }) {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    const suggestedProfiles = async () => {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
    };

    if (userId) {
      suggestedProfiles();
    }
  }, [userId]);

  return !profiles ? (
    <Skeleton height={150} count={1} className="mt-5" />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggested Profiles</p>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.map(profile => {
          <SuggestedProfile
            key={profile.docId}
            userDocId={profile.docId}
            username={profile.username}
            profileId={profile.userId}
            userId={userId}
          />;
        })}
      </div>
    </div>
  ) : null;
}

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array
};
