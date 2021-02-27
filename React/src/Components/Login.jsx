import React, { useState } from "react";
import axios from "axios";
import { NavLink, useHistory } from "react-router-dom";

const Login = ({ setToken }) => {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");

  const history = useHistory();

  const handlelogin = (e) => {
    e.preventDefault();
    // console.log(UserName, Password);
    const data = {
      username: UserName,
      password: Password,
    };

    axios.post("//localhost:4000/login", data).then((res) => {
      if (res.data.status_msg === "matched" && res.data.status_code === 15200) {
        setToken(res.data);

        history.push(`/home/${res.data.consent_token}`);
      } else if (res.data.status_code === 15410) {
        alert("Invalid UserID/Password");
      } else {
        alert("Invalid UserID/Password");
      }
    });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="login">
              <div className="card white large">
                <div className="card-content black-text ">
                  <span className="card-title center">Login</span>
                  <form onSubmit={handlelogin}>
                    <label htmlFor="username">Username</label>
                    <input
                      id="username"
                      type="text"
                      placeholder="Type your Username"
                      value={UserName}
                      onChange={(e) => setUserName(e.target.value)}
                    ></input>

                    <label htmlFor="Password">Password</label>
                    <input
                      type="Password"
                      placeholder="Type your password"
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="center">
                      <input
                        type="submit"
                        className="btn cust-btn margin-top-2"
                        value="Login"
                      ></input>
                    </div>
                  </form>

                  <div className="card-action center">
                    <p>Have not signed up yet ?</p>

                    <NavLink to="/signup" className="cust-btn btn">
                      Signup
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
