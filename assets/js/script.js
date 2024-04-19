// let gifResults = [];
const searchInput = document.querySelector('#searchInput');
const searchBtn = document.querySelector('#searchBtn');
const searchForm = document.querySelector('#search-form');
const resultsEl = document.querySelector('#results');
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
            if (response.status === 404) {
                throw new Error('Word not found')
            }
            if (!response.ok) {
                return response.json().then(error => { throw error; });
            }
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.results);
            const errorMessageDiv = document.querySelector('#error-message');
            errorMessageDiv.innerHTML = '';
            saveSearchHistory(data.word);
            printWordResults(data);
            toggleModal();
        })
        .catch(function (error) {
            const errorMessageDiv = document.querySelector('#error-message');
            const errorMessage = document.createElement('p');
            errorMessageDiv.innerHTML = '';
            errorMessage.textContent ='Sorry, there are no results for the word you have searched, please try again!';
            errorMessageDiv.append(errorMessage);
            console.error(error);
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
    for (let i = 0; i < word.data.length; i++) {
        const imgEl = document.createElement('img');
        const imgLink = document.createElement('a');
        imgEl.setAttribute('src', `${word.data[i].images.fixed_height.url}`);
        imgLink.setAttribute('href', `${word.data[i].images.fixed_height.url}`);
        imgLink.append(imgEl);
        gifResultsEl.append(imgLink);
    }

};


// Function to toggle modal visibility
function toggleModal() {
    modal.classList.toggle('is-active');
}

// Bulma modal function
document.addEventListener('DOMContentLoaded', function () {
    const modalTrigger = document.getElementById('modal-trigger');
    const modal = document.getElementById('modal');
    const modalClose = modal.querySelector('.modal-close');

    // Event listener for button click to toggle modal
    modalTrigger.addEventListener('click', function () {
    toggleModal();
    loadSearchHistory()
    });
    
    // Event listener for modal close button click to close modal
    modalClose.addEventListener('click', toggleModal);

    // Close modal when clicking outside modal content
    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            toggleModal();
        }
    });
});



// when the form is submitted, save the search to search history, close the modal, display gifs and definitions
searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    // toggleModal();
    searchTotal();
});

// load search history from localStorage
function loadSearchHistory() {
    const searchHistoryDiv = document.querySelector('#search-history');
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
    searchHistoryDiv.innerHTML = '';
    searchHistory.forEach(search => {
        const historyBtn = document.createElement('button');
        historyBtn.textContent = search;
        historyBtn.setAttribute('class', 'search-history');
        searchHistoryDiv.append(historyBtn);
        historyBtn.addEventListener('click', function () {
            searchInput.value = search;
            searchTotal();
        })

    });

}

// save search to localStorage
function saveSearchHistory(wordToSave) {
    let storedSearches = JSON.parse(localStorage.getItem('searchHistory')) || [];
    let index = storedSearches.indexOf(wordToSave);
    if (index !== -1) {
        storedSearches.splice(index, 1);
    };
    storedSearches.push(wordToSave);
    if (storedSearches.length > 5) {
        storedSearches.splice(0, storedSearches.length - 5)
    }
    localStorage.setItem('searchHistory', JSON.stringify(storedSearches));
}


