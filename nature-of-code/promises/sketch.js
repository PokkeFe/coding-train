const mywidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
const myheight = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;

const wordAPI = "https://random-word-api.herokuapp.com/word?number=1";

const giphyAPI = 'https://api.giphy.com/v1/gifs/search?api_key=APIKEY&limit=1&offset=0&rating=g&lang=en&q=';

function setup() {
  noCanvas();

  fetch(wordAPI)
    .then(response => response.json())
    .then(json => {
      createP(json[0]);
      return fetch(giphyAPI + json[0]);
    })
    .then(response => response.json())
    .then(json => {
      if(json.data[0]){
        createImg(json.data[0].images.fixed_height_downsampled.url);
      } else {
        createP("NO GIF 4 U!");
      }
    })
    .catch(err => console.log(err));
}

function draw() {
}
