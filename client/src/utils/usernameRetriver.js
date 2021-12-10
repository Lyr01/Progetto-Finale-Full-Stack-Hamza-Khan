import { useState, useEffect } from "react";

const useUsernameRetriver = () => {
  const [username, setUsername] = useState();

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  return username;
};

export default useUsernameRetriver;