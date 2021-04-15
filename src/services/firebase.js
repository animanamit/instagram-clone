import { firebase, FieldValue } from "../lib/firebase";

export async function doesUsernameExist(username) {
  console.log(username);
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.docs.map(user => user.data().length > 0);
}

// a function that gets user data from firestore, taking in a user id as a param
export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();

  const user = result.docs.map(item => ({
    ...item.data(),
    docId: item.id
  }));

  console.log("getuserbyuserid ", user);

  return user;
}

export async function getSuggestedProfiles(userId, following) {
  const result = await firebase
    .firestore()
    .collection("users")
    .get();

  // get all users
  // filter out yourself from list
  // filter out ppl who you already are following
  const res = result.docs
    .map(user => ({ ...user.data(), docId: user.docId }))
    .filter(
      profile =>
        profile.userId !== userId && !following.includes(profile.userId)
    );

  console.log("getsuggestedprofiles ", res);

  return res;
}
