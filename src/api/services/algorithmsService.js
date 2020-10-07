import api from "../api";

const fetchAlgorithms = async () => {
    const url = api.algorithms.fetchAlgorithmsUrl();
    const algorithms = await fetch(url);

    return await algorithms.json();
};

export default {
    fetchAlgorithms
};