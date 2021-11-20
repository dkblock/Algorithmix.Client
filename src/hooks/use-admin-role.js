import useCurrentUser from "./use-current-user";
import roles from "../constants/roles";

const useAdminRole = () => {
  const { currentUser } = useCurrentUser();

  if (!currentUser) return false;
  return currentUser.role === roles.administrator;
};

export default useAdminRole;
