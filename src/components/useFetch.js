import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    (async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await axios.get(url);

        if (isMounted) {
          setData(response.data);
        }
      } catch (requestError) {
        if (isMounted) {
          setError('Please try again in a moment.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
