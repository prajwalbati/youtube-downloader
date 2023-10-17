
const path = require("path");
const fs = require("fs");
const express = require('express');
const ytdl = require('ytdl-core');
const app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/getInfo', async (req, res) => {
    let givenURL = req.query.URL;
    let response = await ytdl.getInfo(givenURL);
    return res.json({ title: response.videoDetails.title, author: response.videoDetails.author.name, embedUrl: response.videoDetails.embed, formats: response.formats });
});


app.get("/download", async (req, res) => {

    let givenURL = req.query.URL;
    let itag = req.query.itag;
    let response = await ytdl.getInfo(givenURL);

    const output = path.resolve(__dirname+'/public/videos', `video-${response.videoDetails.videoId}.mp4`);

    const video = ytdl.downloadFromInfo(response, {quality:18});
    let starttime;
    video.pipe(fs.createWriteStream(output));
    video.once('response', () => {
      starttime = Date.now();
    });
  video.on('progress', (chunkLength, downloaded, total) => {
    console.log(total);
      const percent = downloaded / total;
      const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
      const estimatedDownloadTime = (downloadedMinutes / percent) - downloadedMinutes;
      console.log(`${(percent * 100).toFixed(2)}% downloaded `);
      console.log(`(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(total / 1024 / 1024).toFixed(2)}MB)\n`);
      console.log(`running for: ${downloadedMinutes.toFixed(2)}minutes`);
      console.log(`, estimated time left: ${estimatedDownloadTime.toFixed(2)}minutes `);
      console.log("============================");
    });
    video.on('end', () => {
        console.log('\n\n Finish');
        return res.download(output);
    });

});

app.listen(4000, () => {
  console.log('Server listening in the port 4000');
  console.log(`Click the link to visit: http://localhost:4000`);
});