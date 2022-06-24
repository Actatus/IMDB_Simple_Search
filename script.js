const apiKey = config.APIKey; //pulls API key from seperate file.

const searchButton = document.getElementById('searchButton');
const searchBox = document.getElementById('searchBox');
let searchOutputContainer = document.getElementById('searchOutputContainer');

searchButton.addEventListener('click', () => {
    let searchQuery = searchBox.value;
    if (!searchQuery){
        alert("Invalid search. Is the search bar empty?");
    }

    retrieveDataFromAPI(searchQuery);
});

function retrieveDataFromAPI(movieTitle){
    //Fetch request will go here.
    // let search = fetch("https://imdb-api.com/en/API/Search/" + apiKey + "/" + movieTitle);
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

   return fetch('https://imdb-api.com/en/API/Search/' + apiKey + '/' + movieTitle, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            outputSearchResults(result);
        })
        .catch(error => console.log('error', error));
};

function outputSearchResults (results) {
    let outputText = results;
    searchOutputContainer.append(results);
}
