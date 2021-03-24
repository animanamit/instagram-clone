import useUser from "../../hooks/use-user";
import User from "./user";
import Suggestions from "./suggestions";

export default function Sidebar() {
  const {
    user: { fullName, username, userId }
  } = useUser();
  console.log(username, fullName, "from sidebar.js");
  return (
    <div className="p-4">
      <User username={username} fullName={fullName} />
      <Suggestions userId={userId} />
    </div>
  );
}
