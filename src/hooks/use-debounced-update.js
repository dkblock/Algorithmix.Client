import { useDebouncedCallback } from "use-debounce";

const useDebouncedUpdate = (updateFn, timeout = 500) => {
  const handleUpdate = useDebouncedCallback(({ params }) => updateFn(params), timeout);

  const exec = (params) => handleUpdate(params);
  const cancel = () => handleUpdate.cancel();
  const isPending = () => handleUpdate.isPending();

  const execNow = (params) => {
    if (isPending()) {
      cancel();
      updateFn(params);
    }
  };

  return {
    exec,
    execNow,
    cancel,
    isPending,
  };
};

export default useDebouncedUpdate;
