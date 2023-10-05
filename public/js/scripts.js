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
    embedVideoElem.appendChild(iframeElem);

    let formatList = document.querySelector(".formats");
    for (let i = 0; i < data.formats.length; i++) {
        let list = document.createElement("li");
        list.innerHTML = 'itag: ' + data.formats[i].itag;
        formatList.appendChild(list);
    }
}