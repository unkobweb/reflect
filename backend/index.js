const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const fs = require('fs');
const {google} = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

app.use(cors());
app.use(express.json());

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

app.post('/names', urlencodedParser, (req, res) => {
  console.log(req.body);
  io.emit('names', req.body);
  res.sendStatus(200);
});

app.get('/calendars/:name', (req, res) => {
  const content = JSON.parse(fs.readFileSync('credentials.json'));
  const {client_secret, client_id, redirect_uris} = content.web;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  fs.readFile(`${req.params.name.toLowerCase()}_token.json`, (err, token) => {
    if (err) return res.send([]);
    oAuth2Client.setCredentials(JSON.parse(token));
    const calendar = google.calendar({version: 'v3', auth: oAuth2Client});
    calendar.events.list({
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime'
    }, (err, result) => {
      if (err) return res.send([]);
      const events = result.data.items;
      return res.send(events);
    });
  });
})

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(4000, () => {
  console.log('listening on *:4000');
});