
const path = require("path");
const express = require('express');
const ytdl = require('ytdl-core');
const app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/getInfo', async (req, res) => {
    let givenURL = req.query.URL;
    const urlParams = new URL(givenURL);
    let response = await ytdl.getInfo(urlParams.searchParams.get('v'));

    // let format = ytdl.chooseFormat(response.formats, { quality: '134' });

    return res.json({ title: response.videoDetails.title, author: response.videoDetails.author.name, embedUrl: response.videoDetails.embed, formats: response.formats });
});

app.listen(4000, () => {
    console.log('Server listening in the port 4000');
});