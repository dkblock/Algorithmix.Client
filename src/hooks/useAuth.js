import { useSelector } from "react-redux";

const useAuth = () => {
    const isAuth = useSelector(state => state.app.isAuth);
    return isAuth;
};

export default useAuth;