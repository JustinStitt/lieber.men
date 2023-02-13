import http from 'http';
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import * as dotenv from 'dotenv';
import { query } from './db';
dotenv.config()

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/phishing.html'));
});

app.get('/leaderboard', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/leaderboard.html'));
});

app.get('/api/leaderboard', async (req, res) => {
  const data = await query(
    "SELECT Links.createdBy as user, count(Clicks.userName) numClicks FROM Clicks INNER JOIN Links ON Links.name = Clicks.linkName GROUP BY Links.createdBy ORDER BY count(Clicks.userName) DESC;"
    , []).catch((e) => {})
  res.json(data);
})

app.post('/generate_url', async (req, res) => {
  const body = req.body;
  body.url = encodeURIComponent(body.url)
  await query("INSERT INTO Users (name) VALUES (?);", [body.name]).catch((e) => {})
  await query("INSERT INTO Links (name, createdBy) VALUES (?, ?);", [body.url, body.name]).catch((e) => {
    res.status(400).send("Link already exists")
  })
  if (res.headersSent) return;
  res.json({
    url: `aaron.lieber.men/sus/${body.url}`
  });
});

app.get('/sus/:id', async (req, res) => {
  if (req.cookies.pass && req.cookies.pass === process.env.PHISHING_PASSWORD) {
    await query("INSERT INTO Clicks (userName, linkName) VALUES ('Aaron', ?);", [req.params.id])
  }
  res.sendFile(path.join(__dirname + '/../public/youJustGotPhished.html'));
});

app.get('/blog/', async (req, res) => {
  res.sendFile(path.join(__dirname + `/../public/blog/index.html`));
});

app.get('/blog/:id', async (req, res) => {
  res.sendFile(path.join(__dirname + `/../public/blog/${req.params.id}.html`));
});

app.use(express.static('public'))

const httpServer = http.createServer(app);
httpServer.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`));

module.exports = app
