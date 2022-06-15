import { useEffect, useReducer } from "react";

import axios from "../Axios";

interface State<T> {
  loading: boolean;
  data?: T;
  error?: Error;
}
type Action<T> =
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: Error }
  | { type: "reset" };

interface Opts {
  isDisabled: boolean;
}

function FetchData<T = unknown>(
  url: string,
  opts?: Opts
): { state: State<T>; reset: () => void } {
  // Initial state of loading is true if the hook is not disabled. Is set to false when the request is completed/errors.
  const initialState: State<T> = {
    loading: opts?.isDisabled ? false : true,
    error: undefined,
    data: undefined,
  };

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "fetched":
        return {
          ...initialState,
          data: action.payload,
          loading: action.payload ? false : true,
        };
      case "error":
        return {
          ...initialState,
          error: action.payload,
          loading: action.payload ? false : true,
        };
      case "reset":
        return { ...initialState };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if (!url) return;
    if (opts?.isDisabled) return;

    const fetchData = async () => {
      try {
        const response = await axios(url);
        if (!response.data) {
          throw new Error("We didn't get any data from the server");
        }
        const data = response.data as T;

        dispatch({ type: "fetched", payload: data });
      } catch (error) {
        dispatch({ type: "error", payload: error as Error });
      }
    };

    fetchData();
  }, [url, opts?.isDisabled]);

  const reset = () => dispatch({ type: "reset" });

  return { state, reset };
}

export default FetchData;
