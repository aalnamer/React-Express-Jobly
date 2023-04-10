import { useEffect, useState } from "react";
import axios from "axios";

const useAxios = (url, options = {}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // after the first render, fetch our data
  useEffect(() => {
    const data = async () => {
      try {
        const res = await axios.get(url);

        setResponse(res);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    data();
  }, []);

  return { response, error, isLoading };
};

export default useAxios;
