import { useEffect, useRef } from "react";

export const useComponentDidMount = handler => {
  return useEffect(() => {
    return handler();
  }, []);
};

export const useComponentDidUpdate = (handler, deps) => {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;

      return;
    }

    return handler();
  }, deps);
};

export const useComponentWillUnmount = handler => {
  return useEffect(() => handler, []);
};