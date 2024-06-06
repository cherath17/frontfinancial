import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./forgetpassword.css";
import { img_container } from "../../assets/images";

const Forgetpassword = () => {
  const initialState = {
    newPassword: "",
    retypePassword: "",
  };
  const [password, setPassword] = useState(initialState);
  const [error, setError] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [toggleVisibility, setToggleVisibility] = useState(false);

  // Password pattern
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
    setError(""); // Clear the error when user types
  };

  const validatePasswords = () => {
    if (password.newPassword !== password.retypePassword) {
      setError("Passwords do not match");
      return false;
    } else if (!passwordRegex.test(password.newPassword)) {
      setError("Password does not meet the required pattern");
      return false;
    } else if (!passwordRegex.test(password.retypePassword)) {
      setError("Password does not meet the required pattern");
      return false;
    }
    setError("");
    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validatePasswords()) {
      console.log("Passwords are valid. Submitting form...");
      Axios.post("/your-api-endpoint", password)
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            // Navigate or show success message
          }
        })
        .catch((err) => console.log(err));
    }
  };

  // Enable Button if both newPassword and retypePassword have values
  useEffect(() => {
    setIsButtonEnabled(
      password.newPassword !== "" && password.retypePassword !== ""
    );
  }, [password.newPassword, password.retypePassword]);

  const togglePasswordVisibility = (field) => {
    setToggleVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <div className="forget_component">
      <div className="header">
        <img src={img_container?.frontLogo} alt="front_logo" />
      </div>
      <div className="form_layout">
        <div className="welcome_layout">
          <h2>Forget Password</h2>
        </div>
        <form className="password_form">
          <p>New Password</p>
          <div className="password_outline">
            <input
              placeholder="New Password"
              name="newPassword"
              type={toggleVisibility.newPassword ? "text" : "password"}
              id="newPassword"
              value={password.newPassword}
              onChange={handleChange}
              required
            />
            {password.newPassword && (
              <img
                src={
                  toggleVisibility.newPassword
                    ? img_container?.visible
                    : img_container?.invisible
                }
                alt={toggleVisibility.newPassword ? "visible" : "invisible"}
                onClick={() => togglePasswordVisibility("newPassword")}
                className="password_toggle_icon"
              />
            )}
          </div>
          <p>Retype Password</p>
          <div className="password_outline">
            <input
              placeholder="Retype Password"
              type={toggleVisibility.retypePassword ? "text" : "password"}
              name="retypePassword"
              id="retypePassword"
              value={password.retypePassword}
              onChange={handleChange}
              required
            />
            {password.retypePassword && (
              <img
                src={
                  toggleVisibility.retypePassword
                    ? img_container?.visible
                    : img_container?.invisible
                }
                alt={toggleVisibility.retypePassword ? "visible" : "invisible"}
                onClick={() => togglePasswordVisibility("retypePassword")}
                className="password_toggle_icon"
              />
            )}
          </div>
        </form>
        {error && <p className="error">{error}</p>}
        <button
          className="login_btn"
          type="submit"
          disabled={!isButtonEnabled}
          onClick={handleLogin}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default Forgetpassword;
