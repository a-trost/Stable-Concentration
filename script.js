const apiEndpoint = "https://new-tab-horse.prismic.io/api/v2";

async function getImage() {
  const result = await fetch(
    "https://new-tab-horse.cdn.prismic.io/api/v2/documents/search?page=1&pageSize=1&ref=YRK6dRMAACEAO0i8&q=%5B%5Bat(document.type%2C%20%22images%22)%5D%5D"
  );

  const data = await result.json();

  if (data) {
    const images = data.results[0].data.images;
    const randomIndex = Math.floor(Math.random() * images.length);
    renderImage(images[randomIndex]);
  } else {
    console.error("Sorry :(");
    return null;
  }
}

function renderImage({ image }) {
  const imageUrl = `url(${image.url}&w=3840&h=2160)`;
  document.body.style.setProperty("--horse", imageUrl);
}

async function getQuote() {
  const result = await fetch(
    "https://new-tab-horse.cdn.prismic.io/api/v2/documents/search?page=1&pageSize=1&ref=YRK6dRMAACEAO0i8&q=%5B%5Bat(document.type%2C%20%22quotes%22)%5D%5D"
  );

  const data = await result.json();

  if (data) {
    const quotes = data.results[0].data.quote;
    const randomIndex = Math.floor(Math.random() * quotes.length);

    const selectedQuote = quotes[randomIndex];
    renderQuote(selectedQuote);
  } else {
    console.error("Sorry :(");
    return null;
  }
}

function renderQuote(selectedQuote) {
  const quote = document.querySelector("#quote");
  const author = document.querySelector("figcaption");
  quote.textContent = `"${selectedQuote.quote1}"`;
  author.textContent = `- ${selectedQuote.author || "Anonymous"}`;
}

function updateTime() {
  document.querySelector("h1").textContent = new Date().toLocaleTimeString(
    undefined,
    { hour: "2-digit", minute: "2-digit" }
  );
  setTimeout(updateTime, 1000);
}

function init() {
  getImage();
  getQuote();
  updateTime();
}

init();
