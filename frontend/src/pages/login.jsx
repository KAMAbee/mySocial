import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../assets/styles/login.module.scss";

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
    <div className={styles.login}>
      <h2 className={styles.loginTitle}>Login</h2>

      <form onSubmit={handleSubmit} className={styles.loginForm}>

        <div className={styles.loginFormWrap}>
          <label htmlFor="username" className={styles.loginFormLabel}>
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            id="username"
            className={styles.loginFormInput}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.loginFormWrap}>
          <label className={styles.loginFormLabel} htmlFor="password">
            Password
          </label>
          <input
            type="password"
            className={styles.loginFormInput}
            name="password"
            placeholder="Password"
            id="password"
            onChange={handleChange}
            required
          />
        </div>

        {error && <div className={styles.loginFormError}>{error}</div>}

        <button type="submit" className={styles.loginFormSubmit}>
          Log in
        </button>

        <div className={styles.loginFormHave}>Don't have account? <br />
          <a className={styles.loginFormHaveLink} href="/register">Register</a></div>
      </form>
    </div>
  );
}

export default Login;
