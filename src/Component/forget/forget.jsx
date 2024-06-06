import React, { useState } from "react";

const ForgetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [error, setError] = useState("");

  const validatePasswords = () => {
    if (newPassword !== retypePassword) {
      setError("Passwords do not match");
      return false;
    } else if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePasswords()) {
      console.log("Passwords are valid. Submitting form...");
    }
  };

  return (
    <div className="forget-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="retypePassword">Retype Password</label>
          <input
            type="password"
            id="retypePassword"
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" onSubmit={handleSubmit}>
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
