import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlgorithms } from "../../../store/app/actions";
import { getImageSrc } from "../../../utils/getImageSrc";
import PageTitle from "../../../components/PageTitle/PageTitle";
import AlgorithmCard from "./AlgorithmCard";
import AlgorithmsDeck from "./AlgorithmsDeck";

const AlgorithmsContainer = () => {
    const dispatch = useDispatch();
    const algorithms = useSelector(state => state.app.algorithms);

    useEffect(() => {
        dispatch(fetchAlgorithms());
    }, [dispatch]);

    return (
        <>
            <PageTitle>Алгоритмы</PageTitle>
            {!!algorithms && <AlgorithmsDeck algorithms={algorithms}/>}
        </>
    );
};

export default AlgorithmsContainer;