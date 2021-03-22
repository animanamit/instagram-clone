import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";

import { doesUsernameExist } from "../services/firebase";

export default function Signup() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalid = (email === "") | (password === "");

  const handleSignup = async event => {
    event.preventDefault();

    const usernameExists = await doesUsernameExist(username);

    if (!usernameExists.length) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        await createdUserResult.user.updateProfile({
          displayName: username
        });

        await firebase
          .firestore()
          .collection("users")
          .add({
            userId: createdUserResult.user.uid,
            username: username.toLowerCase(),
            fullName,
            emailAddress: email.toLowerCase(),
            following: [],
            dateCreated: Date.now()
          });

        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setFullName("");
        setUsername("");
        setPassword("");
        setEmail("");
        setError(error.message);
      }
    } else {
      setError("Username already taken");
    }
  };

  useEffect(() => {
    document.title = "Instagram Signup";
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="iphone" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border rounded border-gray-primary mb-4">
          <h1 className="flex justify-center w-full m-2">
            <img
              src="/images/logo.png"
              alt="Instagram logo"
              className="mt-2 w-6/12"
            />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
          <form onSubmit={handleSignup} method="POST">
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => {
                setUsername(target.value);
              }}
              value={username}
            />
            <input
              aria-label="Enter your full name"
              type="test"
              placeholder="Full Name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => {
                setFullName(target.value);
              }}
              value={fullName}
            />
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => {
                setEmail(target.value);
              }}
              value={email}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => {
                setPassword(target.value);
              }}
              value={password}
            />

            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium w-full rounded f-bold h-8 text-white
            ${isInvalid && "opacity-50"}`}
            >
              Sign up!
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border rounded border-gray-primary">
          <p className="text-sm ">
            Already have an account?{` `}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
