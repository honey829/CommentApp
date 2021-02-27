import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const token = localStorage.getItem("Data");
    // console.log(token);
    const userToken = token;
    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem("Data", JSON.stringify(userToken));
    setToken(JSON.stringify(userToken));
  };

  return {
    setToken: saveToken,
    token,
  };
}
