import { useCallback } from "react";
import debounce from "../utils/debounce";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useDebounce(fn: (...args: any[]) => void) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const callback = useCallback(debounce(fn), []);
    return callback;
}

export default useDebounce;