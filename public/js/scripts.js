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
}