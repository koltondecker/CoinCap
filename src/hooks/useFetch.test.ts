import { renderHook } from "@testing-library/react-hooks";

import FetchData from "./FetchData";

describe("FetchData", () => {
  it("returns initial state loading as true by default", () => {
    const { result } = renderHook(() => FetchData("/assets"));
    expect(result.current.state).toEqual({
      loading: true,
      data: undefined,
      error: undefined,
    });
  });

  it("returns initial state loading as false when disabled options are passed", () => {
    const { result } = renderHook(() =>
      FetchData("/assets", { isDisabled: true })
    );
    expect(result.current.state).toEqual({
      loading: false,
      data: undefined,
      error: undefined,
    });
  });
});
