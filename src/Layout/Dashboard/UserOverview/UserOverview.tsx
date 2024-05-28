import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const UserOverview = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <div>
        <h1>
          <span>Hi, Welcome</span>
          {user?.displayName ? user.displayName : "Back"}
        </h1>
      </div>
    </div>
  );
};

export default UserOverview;
