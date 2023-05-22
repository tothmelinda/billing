import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import "./Login.css";
import Cookies from "js-cookie";

interface LoginComponentProps {
  onLogin: (token: string) => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/authenticate", {
        email,
        password,
      });
      const { data } = response;
      if (data && data.length > 0) {
        const token = data; // Assuming the token is directly available in the response data
        // Save the token in a cookie
        Cookies.set("token", token, { expires: 1, path: "/" });

        // Set the token as default header for all axios requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Call the onLogin function with the token to indicate successful login
        onLogin(token);
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError("An error occurred");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-heading">Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
