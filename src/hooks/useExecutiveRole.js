import { useSelector } from "react-redux";

const useExecutiveRole = () => {
    const { role } = useSelector(state => state.account);
    return role === "admin" || "moderator";
};

export default useExecutiveRole;