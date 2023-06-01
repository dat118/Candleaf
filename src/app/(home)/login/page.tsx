"use client";

import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const handleSwitchForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <div>
      {isLoginForm ? (
        <LoginForm onSwitchForm={handleSwitchForm} />
      ) : (
        <RegisterForm onSwitchForm={handleSwitchForm} />
      )}
    </div>
  );
};

export default Login;
