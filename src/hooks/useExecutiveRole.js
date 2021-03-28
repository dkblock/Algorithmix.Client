import useCurrentUser from "./useCurrentUser";

const useExecutiveRole = () => {
    const { currentUser: { role } } = useCurrentUser();
    return role === "admin" || role === "moderator";
};

export default useExecutiveRole;