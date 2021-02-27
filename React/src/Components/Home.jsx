import axios from "axios";
import React from "react";

import { useEffect, useState } from "react/cjs/react.development";

const Home = (props) => {
  const token = props.match.params.accessToken;
  const storedData = JSON.parse(localStorage.getItem("Data"));

  let userid = "";
  let firstname = "";
  let lastname = "";

  if (storedData.consent_token === token) {
    firstname = storedData.result.fname;
    lastname = storedData.result.lname;
    userid = storedData.userid;
  }

  const [dataArray, setArray] = useState([]);
  const [comment, addComment] = useState("");

  useEffect(() => {
    axios
      .get("//localhost:4000/getComment", {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          x_userid: userid,
          x_token: token,
        },
      })
      .then((res) => {
        if (res.data !== undefined) {
          setArray(res.data);
        } else {
          setArray([
            {
              data: "no comments",
            },
          ]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddComment = (e) => {
    e.preventDefault();

    const data = {
      userid: userid,
      comment: comment,
    };

    if (comment.length < 141) {
      axios.post("//localhost:4000/addcomment", data).then((res) => {
        if (res.data.status === 1) {
          axios
            .get("//localhost:4000/getComment", {
              headers: {
                Accept: "application/json",
                "content-type": "application/json",
                x_userid: userid,
                x_token: token,
              },
            })
            .then((res) => {
              if (res.data !== undefined) {
                setArray(res.data);
              } else {
                setArray([
                  {
                    data: "no comments",
                  },
                ]);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
      addComment("");
    } else {
      alert("Only 140 characters allowed");
    }
  };

  return (
    <>
      <p className="white center">
        Welcome to the comment section,{firstname} {lastname}
      </p>

      <div className="cust-container">
        <div className="Content">
          <div className="container">
            <div className="row">
              <div className="col s12">
                {dataArray.map((el, index) => {
                  return (
                    <p readOnly type="text" className="comment" key={index}>
                      {el.usercomment}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="input-field">
          <textarea
            id="textarea1"
            type="textarea"
            className="materialize-textarea"
            value={comment}
            onChange={(e) => {
              addComment(e.target.value);
            }}
          ></textarea>

          <label htmlFor="textarea1">Comment</label>
          <button className="btn cust-btn-send" onClick={handleAddComment}>
            <i className="fa fa-paper-plane" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
