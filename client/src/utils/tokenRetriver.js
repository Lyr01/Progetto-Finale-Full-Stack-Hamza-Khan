import { useState, useEffect } from "react";

const useTokenRetriver = () => {
  const [token, setToken] = useState();

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  }, []);

  return token;
};

export default useTokenRetriver;