import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <>
      <h2 className="register__title">Registration</h2>

      <form onSubmit={handleSubmit} className="register__form">
        <label className="register__form-label" name="username">
          Username
        </label>
        <input
          type="text"
          className="register__form-input"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />

        <label className="register__form-label" name="email">
          Email
        </label>
        <input
          type="email"
          className="register__form-input"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <label className="register__form-password" name="password">
          Password
        </label>
        <input
          type="password"
          className="register__form-password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        {error && <p className="register__form-error">{error}</p>}
        <button type="submit" className="register__form-submit">
          Register
        </button>
      </form>
    </>
  );
}

export default Register;
