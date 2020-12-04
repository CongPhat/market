import { useState, useCallback, useEffect } from "react";

interface IState {
  status: "ready" | "loading" | "error";
  value: any;
  error: any;
}

interface IOptions {
  showError?: boolean;
  showSuccess?: boolean;
}

export const useAsync = (asyncFunction, options?: IOptions) => {
  const { showError = true, showSuccess = false } = options || {};

  const [state, setState] = useState<IState>({
    status: "ready",
    value: null,
    error: null,
  });

  const onSuccess = (response) => {
    setState((prevState) => ({
      ...prevState,
      status: "ready",
      value: response,
    }));

    if (showSuccess) {
    }

    return Promise.resolve(response);
  };

  const onError = (error) => {
    setState((prevState) => ({
      ...prevState,
      status: "error",
      error: error,
    }));

    if (showError) {
    }

    return Promise.reject(error);
  };

  const execute = useCallback(
    async (...args) => {
      setState((prevState) => ({
        ...prevState,
        status: "loading",
        value: null,
        error: null,
      }));

      return await asyncFunction(...args)
        .then((response) => {
          return onSuccess(response);
        })
        .catch((error) => {
          return onError(error);
        });
    },
    [asyncFunction]
  );

  return { execute, ...state };
};
