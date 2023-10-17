var convertBtn = document.querySelector('.convert-button');
var URLinput = document.querySelector('.URL-input');
convertBtn.addEventListener('click', () => {
    // console.log(`URL: ${URLinput.value}`);
    sendURL(URLinput.value);
});

async function sendURL(URL) {
    const response = await fetch(`/getInfo?URL=${URL}`);
    const data = await response.json();
    document.querySelector('.title span').innerHTML = data.title;
    document.querySelector('.author span').innerHTML = data.author;


    let videoDetails = document.querySelector('.videoDetails');
    videoDetails.classList.remove("hidden");

    let iframeElem = document.createElement('iframe');
    iframeElem.width = data.embedUrl.width;
    iframeElem.height = data.embedUrl.height;
    iframeElem.setAttribute('src', data.embedUrl.iframeUrl);

    let embedVideoElem = document.querySelector('.embededVideo');
    embedVideoElem.innerHTML = "";
    embedVideoElem.appendChild(iframeElem);

    let formatList = document.querySelector(".formatsTbl tbody");
    formatList.innerHTML = "";
    for (let i = 0; i < data.formats.length; i++) {
        let list = document.createElement("tr");
        let format = data.formats[i];
        console.log(format);
        // console.log(format.approxDurationMs/1000);
        list.innerHTML = `<td>${format.itag}</td><td>${format.container}</td><td>${format.quality}</td><td>${format.qualityLabel}</td><td>${format.width}X${format.height}</td><td>${format.codecs}</td><td>${format.bitrate}</td><td>${format.audioBitrate}</td><td><a href="/download?URL=${URL}&itag=${format.itag}">Download</a></td>`;
        formatList.appendChild(list);
    }
}



async function downloadVideo(itag) {
    console.log(itag);
    let url = URLinput.value;
    console.log(url);

    const response = await fetch(`/download?URL=${url}&itag=${itag}`);
    const data = await response.json();
    console.log(data);
}