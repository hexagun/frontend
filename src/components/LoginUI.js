import React from 'react';

import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

import { useState } from 'react';

function LoginForm() {
  const [username, setUsername] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {

      console.log('Token played: ', response)
      const token = await response.text();
      console.log('Token played: ', token)
      login(token);
      navigate("/");
    } else {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" value={username} onChange={(e) => setUsername(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}


const LoginUI = () => {
  return(
    <div id="login-form" style={{ "width": "90vw", "height": "90vh", "margin": "auto" }}>
        <LoginForm></LoginForm>  
    </div>
  )
}

export default LoginUI;