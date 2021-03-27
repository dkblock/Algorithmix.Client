import { useSelector } from "react-redux";

const useExecutiveRole = () => {
    const { role } = useSelector(state => state.account.currentUser);
    return role === "admin" || role === "moderator";
};

export default useExecutiveRole;