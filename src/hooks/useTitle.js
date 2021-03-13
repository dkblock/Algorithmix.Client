import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setHeader } from "../store/actions/app";

const useTitle = (title) => {
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = `${title} - Visual Algorithms`;
        dispatch(setHeader(title));
    }, [dispatch, title]);
};

export default useTitle;