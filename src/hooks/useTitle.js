import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setHeader } from "../store/actions/app";

const useTitle = (title) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (title === "Visual Algorithms")
            document.title = "Главная - Visual Algorithms";
        else
            document.title = `${title} - Visual Algorithms`;

        dispatch(setHeader(title));
    }, [dispatch, title]);
};

export default useTitle;