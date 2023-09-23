import { useState, useEffect } from 'react';
import isMounted from './isMounted';
function isPromise(val) {
  return val && typeof val.then === 'function';
}

/**
 * Use this hook promise status of a handler.
 * @param handler
 * @param loading
 * @returns {*[]}
 */
// eslint-disable-next-line import/no-anonymous-default-export
export default (handler, loading) => {
  const [isLoading, setLoading] = useState(loading);
  const mounted = isMounted();
  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const handleClick = (e) => {
    if (typeof handler === 'function') {
      const result = handler(e);
      if (isPromise(result)) {
        setLoading(true);
        return result.finally(() => {
          if (mounted.current) {
            setLoading(false);
          }
        });
      }
    }
  };

  return [isLoading, handleClick];
};