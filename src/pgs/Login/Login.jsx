import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../../assets/logo.png";
import { toast } from "react-toastify";

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const loginUrl = "https://fakestoreapi.com/auth/login";
  

  async function handleSubmit(e) {
    e.preventDefault();

    if (!username) {
      toast.error("Username is required!");
      return;
    }

    if (!password) {
      toast.error("Password is required!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      setLoading(false);

      if (data) {
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } catch (error) {
      setLoading(false);

      toast.error("Username or password incorrect!");
    }
  }

  function handleUsernameChange(e) {
    setError("");
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setError("");
    setPassword(e.target.value);
  }

  return (
    
    <div className="login">
      <img src={logo} alt="Company Logo" className="login-logo" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form onSubmit={handleSubmit}>
          {signState === "Sign Up" && (
            <input type="text" placeholder="Your Name" />
          )}
          <input
            type="username"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          {error && <p className="error-message">{error}</p>}
          <button className="button" type="submit" disabled={loading}>
            {loading ? "Loading..." : signState}
          </button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="remember-me">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to Video-Vault?
              <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span>
            </p>
          ) : (
            <p>
              Already have an account?
              <span onClick={() => setSignState("Sign In")}>Sign In Now</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
