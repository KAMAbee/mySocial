import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../assets/styles/register.module.scss';

function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration error");
      }

      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.register}>
      <h1 className={styles.registerTitle}>Registration</h1>

      <form onSubmit={handleSubmit} className={styles.registerForm}>

        <div className={styles.registerFormWrap}>
          <label className={styles.registerFormLabel} htmlFor="username">
            Username
          </label>

          <input
            type="text"
            className={styles.registerFormInput}
            name="username"
            placeholder="Username"
            id="username"
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.registerFormWrap}>
          <label className={styles.registerFormLabel} htmlFor="email">
            Email
          </label>
          <input
            type="email"
            className={styles.registerFormInput}
            name="email"
            placeholder="Email"
            id="email"
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.registerFormWrap}>
          <label className={styles.registerFormLabel} htmlFor="password">
            Password
          </label>
          <input
            type="password"
            className={styles.registerFormInput}
            name="password"
            placeholder="Password"
            id="password"
            onChange={handleChange}
            required
          />
        </div>

        {error && <div className={styles.registerFormError}>{error}</div>}

        <button type="submit" className={styles.registerFormSubmit}>
          Register
        </button>

        <div className={styles.registerFormHave}>Already have account? <br />
        <a className={styles.registerFormHaveLink} href="/login">Log in</a></div>
      </form>
    </div>
  );
}

export default Register;
