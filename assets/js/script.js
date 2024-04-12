const gifResults = [];
function searchWord(word) {

    const wordsURL = `https://wordsapiv1.p.rapidapi.com/words/${word}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1fc87e2424msh9e5c660a999e3cep1865d4jsn8fffb40e8cff',
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
    };

    fetch(wordsURL, options)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })

}

function searchGifs(word) {
    let giphyURL = `http://api.giphy.com/v1/gifs/search?q=${word}&api_key=SvmAEVhg2GXssIvHYbFBBLLzgdPproKN&limit=5`;

    fetch(giphyURL)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })
        .then(function (data) {
            gifResults = data.data;
            console.log(data);
        })
}

window.onload = function () {
    searchWord(word);
    searchGifs(word);
}

const toggleSearchButton = document.getElementById('toggleSearchButton');
const searchBar = document.getElementById('searchBar');

toggleSearchButton.addEventListener('click', function() {
  if (searchBar.style.display === 'none') {
    searchBar.style.display = 'block';
    toggleSearchButton.textContent = 'Hide Search Bar';
  } else {
    searchBar.style.display = 'none';
    toggleSearchButton.textContent = 'Show Search Bar';
  }
});