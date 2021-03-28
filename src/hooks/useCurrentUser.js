import { useSelector } from "react-redux";

const useCurrentUser = () => {
    const { currentUser, isAuthenticated, isFetching } = useSelector(state => state.account);
    return { currentUser, isAuthenticated, isFetching };
};

export default useCurrentUser;