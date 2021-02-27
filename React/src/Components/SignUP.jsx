import axios from "axios";
import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useState } from "react/cjs/react.development";

const Signup = () => {
  let data = {};
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Mobile, setMobile] = useState("");

  const history = useHistory();

  const handleSignUp = (e) => {
    e.preventDefault();

    data = {
      username: UserName,
      password: Password,
      email: Email,
      firstname: FirstName,
      lastname: LastName,
      mobile: Mobile,
    };

    if (
      !/^\d+$/.test(data.mobile) ||
      data.mobile.length > 10 ||
      data.mobile.length < 10
    ) {
      alert("please enter a valid mobile number");
    } else {
      axios
        .post("//localhost:4000/addUser", data)
        .then((res) => {
          console.log(data);
          if (res.data.status_code === 201) {
            alert("User Created ! Please login");
            history.push("/");
            data = {};
          } else {
            if (res.data.code === 1062 || res.data.msg === "ER_DUP_ENTRY") {
              alert(
                "please enter a different username, this one is already taken"
              );
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="login">
              <div className="card white x-large">
                <div className="card-content black-text ">
                  <span className="card-title center">Sign Up</span>
                  <form>
                    <label htmlFor="fname">First Name</label>
                    <input
                      required
                      id="fname"
                      type="text"
                      placeholder="Type your First Name"
                      value={FirstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label htmlFor="lname">Last Name</label>
                    <input
                      required
                      id="lname"
                      type="text"
                      placeholder="Type your Last Name"
                      value={LastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />

                    <label htmlFor="email">Email</label>
                    <input
                      required
                      id="email"
                      type="email"
                      placeholder="Type your Email"
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="contact">Contact No</label>
                    <input
                      required
                      id="number"
                      type="text"
                      placeholder="Type your Mobile Number"
                      value={Mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />

                    <label htmlFor="username">Username</label>
                    <input
                      id="username"
                      required
                      type="text"
                      placeholder="Type your Username"
                      value={UserName}
                      onChange={(e) => {
                        setUserName(e.target.value);
                      }}
                    ></input>

                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      required
                      type="password"
                      placeholder="Type your password"
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="center">
                      <input
                        type="button"
                        className="btn cust-btn margin-top-2"
                        value="Sign Up"
                        onClick={handleSignUp}
                      ></input>
                    </div>
                  </form>

                  <div className="card-action center">
                    <p> Get Started ! Login here </p>

                    <NavLink className="btn cust-btn margin-top-2" to="/">
                      Login
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

export default Signup;
