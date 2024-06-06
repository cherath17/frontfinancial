import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import "./login.css";
import { img_container } from "../../assets/images";

const Login = () => {
  //State mangement

  const initialstate = {
    name: "",
    password: "",
  };

  const [login, setLogin] = useState(initialstate);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  //Handle submit
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const [error, setError] = useState({});

  //Password show
  const [toggle, setToggle] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
    if (name == "name") {
      setError((err) => ({ ...err, name: "" }));
    } else if (name == "password") {
      setError((err) => ({ ...err, password: "" }));
    }
  };

  // Error validation
  const validate = (values, scallback = () => {}) => {
    if (!values.name && !values.password) {
      setError(() => ({
        name: "Email is required",
        password: "Passsword is required",
      }));
    } else if (!values.name) {
      setError((e) => ({ ...e, name: "Email is required" }));
    } else if (!emailRegex.test(values.name)) {
      setError((e) => ({ ...e, name: "Please enter a vaild Email Address" }));
    } else if (!values.password) {
      setError((e) => ({ ...e, password: "Passsword is required" }));
    } else {
      setError((e) => ({
        name: "",
        password: "",
      }));
      scallback();
    }
  };

  // Enable Button if both newPassword and retypePassword have values
  useEffect(() => {
    setIsButtonEnabled(login.name !== "" && login.password !== "");
  }, [login.name, login.password]);

  // Password Regex

  // const validate = (values, scallback = () => {}) => {
  //   const errors = {};

  //   if (!values.name) {
  //     errors.name = "Email is required";
  //   } else if (!emailRegex.test(values.name)) {
  //     errors.name = "Please enter a valid Email Address";
  //   }

  //   if (!values.password) {
  //     errors.password = "Password is required";
  //   } else if (!passwordRegex.test(values.password)) {
  //     errors.password =
  //       "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character";
  //   }

  //   setError(errors);
  //   if (Object.keys(errors).length === 0) {
  //     scallback();
  //   }
  // };

  //Login API
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("working!");
    validate(login, () => {
      const errorValues = Object.values(error).filter((s) => s !== "");
      if (errorValues.length === 0) {
        console.log(login);
        Axios({ url: "", method: "post", data: login })
          .then((res) => {
            if (res?.status === 200) {
              console.log(res);
              // navigate("/forget");
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <div className="login_component">
      <div className="header">
        <img src={img_container?.frontLogo} alt="front_logo" />
      </div>
      <div className="form_layout">
        <div className="welcome_layout">
          <h2>Welcome </h2>
          <p>Sign in to your account</p>
        </div>
        <form onSubmit={(e) => handleLogin(e)}>
          <div className="email_input">
            <p>Email</p>
            <input
              placeholder="adam.smith@gmail.com"
              type="text"
              name="name"
              value={login?.name}
              onChange={(e) => handleChange(e)}
            />
            <small className="error">{error?.name}</small>
          </div>
          <div className="password_input">
            <p>Password</p>
            <div className="password_outline">
              <input
                type={toggle ? "text" : "password"}
                name="password"
                value={login?.password}
                onChange={(e) => handleChange(e)}
              />
              {login.password && (
                <img
                  src={
                    toggle ? img_container?.visible : img_container?.invisible
                  }
                  alt={toggle ? "visible" : "invisible"}
                  onClick={() => setToggle(!toggle)}
                  className="password_toggle_icon"
                />
              )}
            </div>
            {/* <button onClick={(e) => setToggle(!toggle)}>Show</button> */}
            <small className="error">{error?.password}</small>
          </div>
          <small className="forget_password">
            <Link to={"/forgetpassword"}>Forget Password </Link>
          </small>
          <button
            className="login_btn"
            disabled={!isButtonEnabled}
            onClick={(e) => handleLogin(e)}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
