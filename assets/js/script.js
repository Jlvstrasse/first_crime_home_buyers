// let gifResults = [];
const searchInput = document.querySelector('#searchInput');
const searchBtn = document.querySelector('#searchBtn');
const resultsEl = document.querySelector('#results');
const resultsCard = document.createElement('div');
resultsCard.setAttribute('class', 'results-card');
resultsCard.setAttribute('id', 'resultsCard');
const gifResultsEl = document.querySelector('#gif-results');
const wordResultsEl = document.querySelector('#word-results');


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
            alert('Sorry, there are no results for the word you have searched :(')
            console.error('Error fetching data:', error);
        });


};
// searches for GIFs corresponding to the word input
function searchGifs() {
    const word = searchInput.value;
    let giphyURL = `https://api.giphy.com/v1/gifs/search?q=${word}&api_key=SvmAEVhg2GXssIvHYbFBBLLzgdPproKN&limit=4`;

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
    gifResultsEl.innerHTML = '';
    wordResultsEl.innerHTML = '';
    searchGifs();
    searchWord();
    searchInput.value = '';
}
// print the definition and type of word on the page
function printWordResults(word) {
    const h3El = document.createElement('h3');
    const resultsList = document.createElement('ol');
    resultsList.setAttribute('id', 'resultsList');
    resultsList.setAttribute('class', 'results-list');
    h3El.textContent = `${word.word}`;
    
    // lists all the definitions in a numbered list
    for (let i = 0; i < word.results.length; i++) {
        const listEl = document.createElement('li');
        listEl.textContent = `(${word.results[i].partOfSpeech}): ${word.results[i].definition}`;
        resultsList.append(listEl);
    }
    wordResultsEl.append(h3El, resultsList);
}
// print the gifs onto the page
function printGifResults(word) {
    const giphyBrand = document.createElement('p');
    const giphyBrandImg = document.createElement('img');
    giphyBrandImg.setAttribute('src', './assets/images/GIPHY Transparent 18px.png');
    for (let i = 0; i < word.data.length; i++) {
        const imgEl = document.createElement('img');
        const imgLink = document.createElement('a');
        imgEl.setAttribute('src', `${word.data[i].images.fixed_height.url}`);
        imgLink.setAttribute('href', `${word.data[i].images.fixed_height.url}`);
        imgLink.append(imgEl);
        gifResultsEl.append(imgLink);
    }
    giphyBrand.textContent = `Powered by `;
    giphyBrand.append(giphyBrandImg);
    gifResultsEl.append(giphyBrand);
};


// Function to toggle modal visibility
function toggleModal() {
    modal.classList.toggle('is-active');
}

document.addEventListener('DOMContentLoaded', function () {
    const modalTrigger = document.getElementById('modal-trigger');
    const modal = document.getElementById('modal');
    const modalClose = modal.querySelector('.modal-close');

    // Event listener for button click to toggle modal
    modalTrigger.addEventListener('click', toggleModal);

    // Event listener for modal close button click to close modal
    modalClose.addEventListener('click', toggleModal);

    // Close modal when clicking outside modal content
    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            toggleModal();
        }
    });
});

searchBtn.addEventListener('click', function () {
    toggleModal();
    saveSearchHistory();
    searchTotal();
    
});

// load search history from localStorage
function loadSearchHistory() {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
    console.log(searchHistory);

}

// save search to localStorage
function saveSearchHistory() {
    let storedSearches = JSON.parse(localStorage.getItem('searches')) || [];
    storedSearches.push(searchInput.value);
    console.log(searchInput.value);
    localStorage.setItem('searches', JSON.stringify(storedSearches))
}