import http from 'http';
import express from 'express';
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config()

const app = express();

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/phishing.html'));
});

app.get('/leaderboard', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/leaderboard.html'));
});

app.get('/phishing', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/phishing.html'));
});

app.get('/api/leaderboard', async (req, res) => {
  return {'hello': 'world'};
})

app.post('/generate_url', async (req, res) => {
  const body = req.body;
  body.url = encodeURIComponent(body.url)
  if (res.headersSent) return;
  res.json({
    url: `aaron.lieber.men/sus/${body.url}`
  });
});

app.get('/sus/:id', async (req, res) => {
  console.log('password entered: ', req.cookies.pass)
  res.sendFile(path.join(__dirname + '/../public/youJustGotPhished.html'));
});

app.get('/blog/', async (req, res) => {
  res.sendFile(path.join(__dirname + `/../public/blog/index.html`));
});

app.get('/blog/:id', async (req, res) => {
  res.sendFile(path.join(__dirname + `/../public/blog/${req.params.id}.html`));
});


const httpServer = http.createServer(app);
httpServer.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`));


// app.listen(process.env.PORT || 3000);

module.exports = app;
