import useCurrentUser from "./useCurrentUser";
import roles from "../constants/roles";

const useExecutiveRole = () => {
  const {
    currentUser: { role },
  } = useCurrentUser();

  return role === roles.administrator || role === roles.moderator;
};

export default useExecutiveRole;
