
const path = require("path");
const express = require('express');
const ytdl = require('ytdl-core');
const app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/download', (req, res) => {
    var URL = req.query.URL;

    res.header('Content-Disposition', 'attachment; filename="video.mp4"');

    ytdl(URL, {
        format: 'mp4'
    }).pipe(res);
});

app.listen(4000, () => {
    console.log('Server listening in the port 4000');
});