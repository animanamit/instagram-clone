import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalid = (email === "") | (password === "");

  const handleLogin = () => {};

  useEffect(() => {
    document.title = "Instagram Login";
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <h1>Login</h1>
    </div>
  );
}
