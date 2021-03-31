import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setHeader } from "../store/actions/app";

const useTitle = (title) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!title) {
            document.title = "Algorithmix";
            return;
        }

        if (title === "Algorithmix")
            document.title = "Главная - Algorithmix";
        else
            document.title = `${title} - Algorithmix`;

        dispatch(setHeader(title));
    }, [dispatch, title]);
};

export default useTitle;