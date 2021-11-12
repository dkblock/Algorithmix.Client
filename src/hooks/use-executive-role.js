import useCurrentUser from "./use-current-user";
import roles from "../constants/roles";

const useExecutiveRole = () => {
  const { currentUser } = useCurrentUser();

  if (!currentUser) return false;
  return currentUser.role === roles.administrator || currentUser.role === roles.moderator;
};

export default useExecutiveRole;
