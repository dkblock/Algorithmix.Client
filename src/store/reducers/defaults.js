export const onPendingDefault = (state) => {
    state.isFetching = true;
    state.hasError = false;
};

export const onFulfilledDefault = (state) => {
    state.isFetching = false;
    state.hasError = false;
};

export const onRejectedDefault = (state) => {
    state.isFetching = false;
    state.hasError = true;
};