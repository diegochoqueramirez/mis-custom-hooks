import { useEffect, useRef, useState } from 'react';

export const useFetch = (url) => {
  const isMounted = useRef(true);
  const [state, setstate] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setstate({ data: null, error: null, loading: true });
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (isMounted.current) {
          setstate({
            data,
            loading: false,
            error: null,
          });
        }
      })
      .catch(() => {
        setstate({
          data: null,
          loading: true,
          error: 'No se encontro la data',
        });
      });
  }, [url]);

  return state;
};
