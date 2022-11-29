import React from "react";

export default function useMountedState(): () => boolean {
  const mountedRef = React.useRef(false);
  const getIsMounted = React.useCallback(() => mountedRef.current, []);

  React.useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return getIsMounted;
}
