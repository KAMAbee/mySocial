import React, { useState } from "react";
import {
  createCookie,
  createCookieSessionStorage,
  useNavigate,
} from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login error");
      }

      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <h2 className="login__title">Login</h2>

      <form onSubmit={handleSubmit} className="login__form">
        <label htmlFor="username" className="login__form-label">
          Username
        </label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          id="username"
          className="login__form-input"
          onChange={handleChange}
          required
        />

        <label className="login__form-password" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          className="login__form-input"
          name="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          required
        />

        {error && <p className="login__form-error">{error}</p>}
        <button type="submit" className="login__form-submit">
          Log in
        </button>
      </form>
    </>
  );
}

export default Login;
