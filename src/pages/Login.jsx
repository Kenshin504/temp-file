import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (username === "admin" && password === "password") {
      localStorage.setItem("username", username); // Save username in localStorage
      navigate("/dashboard");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="login-page">
      <div className="card">
        <div className="heading-text">
          <div className="logo"></div>
        </div>
        <div className="form-part">
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label>
                <span style={{ transitionDelay: "0ms" }}>U</span>
                <span style={{ transitionDelay: "50ms" }}>s</span>
                <span style={{ transitionDelay: "100ms" }}>e</span>
                <span style={{ transitionDelay: "150ms" }}>r</span>
                <span style={{ transitionDelay: "200ms" }}>n</span>
                <span style={{ transitionDelay: "250ms" }}>a</span>
                <span style={{ transitionDelay: "300ms" }}>m</span>
                <span style={{ transitionDelay: "350ms" }}>e</span>
              </label>
            </div>

            <div className="form-control password-container">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>
                <span style={{ transitionDelay: "0ms" }}>P</span>
                <span style={{ transitionDelay: "50ms" }}>a</span>
                <span style={{ transitionDelay: "100ms" }}>s</span>
                <span style={{ transitionDelay: "150ms" }}>s</span>
                <span style={{ transitionDelay: "200ms" }}>w</span>
                <span style={{ transitionDelay: "250ms" }}>o</span>
                <span style={{ transitionDelay: "300ms" }}>r</span>
                <span style={{ transitionDelay: "350ms" }}>d</span>
              </label>
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁"}
              </span>
            </div>

            {error && <p className="error-message">{error}</p>}

            <button className="login-button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
