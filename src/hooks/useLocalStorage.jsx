import { useState } from "react";

const useLocalStorage = () => {
  const getEmail = localStorage.getItem("email");
  const getPass = localStorage.getItem("pass");
  const getCheck = localStorage.getItem("check");

  const [email, setEmail] = useState(getEmail ? getEmail : "");
  const [password, setPassword] = useState(getPass ? getPass : "");
  const [isChecked, setIsChecked] = useState(
    getCheck === "true" ? true : false
  );
  return {
    email,
    setEmail,
    password,
    setPassword,
    isChecked,
    setIsChecked,
  };
};

export default useLocalStorage;
