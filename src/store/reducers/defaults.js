export const onPendingDefault = (state) => {
  state.isFetching = true;
  state.hasError = false;
};

export const onSavingDefault = (state) => {
  state.isSaving = true;
  state.hasError = false;
};

export const onFulfilledDefault = (state, hasError) => {
  state.isFetching = false;
  state.hasError = hasError;

  if (!!state.isSaving) {
    state.isSaving = false;
  }
};

export const onRejectedDefault = (state) => {
  state.isFetching = false;
  state.hasError = true;

  if (!!state.isSaving) {
    state.isSaving = false;
  }
};