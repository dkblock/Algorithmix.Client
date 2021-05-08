export const onPendingDefault = (state, fetchingProp = "isFetching") => {
  state[fetchingProp] = true;
  state.hasError = false;
};

export const onSavingDefault = (state) => {
  state.isSaving = true;
  state.hasError = false;
};

export const onFulfilledDefault = (state, hasError, fetchingProp = "isFetching") => {
  state[fetchingProp] = false;
  state.hasError = hasError;

  if (!!state.isSaving) {
    state.isSaving = false;
  }
};

export const onRejectedDefault = (state, fetchingProp = "isFetching") => {
  state[fetchingProp] = false;
  state.hasError = true;

  if (!!state.isSaving) {
    state.isSaving = false;
  }
};