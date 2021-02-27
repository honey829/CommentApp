import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Sequelize } from "sequelize";
import momment from "moment-timezone";

import multer from "multer";
import fs from "fs";

import excelToJson from "convert-excel-to-json";

const app = express();
const port = 4000;
const sequelize = new Sequelize("commentappdb", "root", "admin", {
  host: "localhost",
  dialect: "mysql",
});

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const upload = multer();

app.use(bodyParser.json());

app.post("/addUser", (req, res) => {
  const currenttimestamp = momment().format("YYYY-MM-DD HH:mm:ss");

  console.log(req.body);

  sequelize
    .query(
      `insert into commentappdb.usertb (username,userpassword,usertimestamp,firstname,lastname,useremail,mobile) values('${req.body.username}','${req.body.password}','${currenttimestamp}','${req.body.firstname}','${req.body.lastname}','${req.body.email}',${req.body.mobile})`
    )
    .then((result) => {
      if (result[1]) {
        res.send({
          status_code: 201,
          status_msg: "created",
        });
      } else {
        res.send({
          status_code: 500,
          status_msg: "internal server error",
          result: result,
        });
      }
    })
    .catch((err) => {
      //   console.log(err.original.code);
      //   console.log(err.original.errno);
      res.send({
        code: err.original.errno,
        msg: err.original.code,
      });
    });
});

app.get("/getComment", (req, res) => {
  sequelize
    .query(
      `select * from commentappdb.commenttb where username = '${req.headers.x_userid}'`
    )
    .then((result) => {
      res.send(result[0]);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/addcomment", (req, res) => {
  const currenttimestamp = momment().format("YYYY-MM-DD HH:mm:ss");

  //   console.log(currenttimestamp);
  //   console.log(req.body);

  sequelize
    .query(
      `insert into commentappdb.commenttb (username,usercomment,commenttimestamp) values('${req.body.userid}', '${req.body.comment}','${currenttimestamp}');`
    )
    .then((result) => {
      if (result[1] === 1) {
        res.send({
          status: result[1],
          msg: "comment added",
        });
      }
    });
});

app.post("/login", (req, res) => {
  sequelize
    .query(
      `select * from commentappdb.usertb where username = '${req.body.username}'`
    )
    .then((result) => {
      const value = result[0].values().next().value;

      if (value == undefined) {
        res.send({ status_msg: "wrongusername", status_code: 15400 });
      } else if (req.body.password === value.userpassword) {
        const rand = function () {
          return Math.random().toString(36).substr(2);
        };

        const token = function () {
          return rand() + rand();
        };

        const resdata = {
          status_code: 15200,
          status_msg: "matched",
          userid: req.body.username,
          result: {
            fname: value.firstname,
            lname: value.lastname,
          },
          consent_token: token(),
        };
        res.send(resdata);
      } else {
        res.send({ status_msg: "wrongpassword", status_code: 15401 });
      }
    })
    .catch((err) => {
      res.send("internal sever error");
      console.log(err);
    });
});

app.post("/getjsonfromxls", upload.single("x_excel_file"), (req, res) => {
  let resdata = {};

  try {
    if (
      req.file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      fs.writeFileSync("./excelfile.xlsx", req.file.buffer);

      const json = excelToJson({
        sourceFile: "./excelfile.xlsx",
      });
      res.send(json);
    }
  } catch (error) {}
});

app.listen(port, "localhost", () => {
  console.log(`listning at port ${port}`);
});
