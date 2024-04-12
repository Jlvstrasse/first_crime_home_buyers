// let gifResults = [];
const searchInput = document.querySelector('#searchInput');
const searchBtn = document.querySelector('#searchBtn');

// searches for the word corresponding to the word input
function searchWord() {
    const word = searchInput.value;
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
                return response.json().then(error => { throw error; });
            }
            return response.json();
        })
        .then(function (word) {
            console.log(word);
            console.log(word.results);
            printWordResults(word);
        })
        .catch(function (error) {
            console.error('Error fetching data:', error);
        });

        
};
// searches for GIFs corresponding to the word input
function searchGifs() {
    const word = searchInput.value;
    let giphyURL = `https://api.giphy.com/v1/gifs/search?q=${word}&api_key=SvmAEVhg2GXssIvHYbFBBLLzgdPproKN&limit=5`;

    fetch(giphyURL)
        .then(function (response) {
            if (!response.ok) {
                return response.json().then(error => { throw error; });
            }
            return response.json();
        })
        .then(function (word) {
            gifResults = word.data;
            console.log(gifResults);
            console.log(gifResults[0].images.downsized.url);
            printGifResults(word);
        })
        .catch(function (error) {
            console.error('Error fetching data:', error);
        });
};

// searches for both the word and GIFs
function searchTotal() {
    searchWord();
    searchGifs();

    searchInput.value = '';
}
// print the definition and type of word on the page
function printWordResults(word) {
    const resultsEl = document.querySelector('#results');
    const h3El = document.createElement('h3');
    const resultsList = document.createElement('ol');
    resultsList.setAttribute('id', 'resultsList');
    h3El.textContent = `${word.word}`;
    resultsEl.insertBefore(resultsList, resultsEl.firstChild);
    resultsEl.insertBefore(h3El, resultsEl.firstChild);
  
        // lists all the definitions in a numbered list
    for (let i = 0; i < word.results.length; i++) {
        const listEl = document.createElement('li');
        listEl.textContent = `(${word.results[i].partOfSpeech}): ${word.results[i].definition}`;
        resultsList.append(listEl);
    }
}
// print the gifs onto the page
function printGifResults(word) {
    const resultsEl = document.querySelector('#results');
    const imgEl = document.createElement('img');
    imgEl.setAttribute('src', `${word.data[0].images.downsized.url}`)
    resultsEl.append(imgEl);
}

searchBtn.addEventListener('click', searchTotal);

