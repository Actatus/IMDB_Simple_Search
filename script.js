const apiKey = config.APIKey; //pulls API key from seperate file.


//Document variables
const searchButton = document.getElementById('searchButton');
const searchBox = document.getElementById('searchBox');
let searchOutputContainer = document.getElementById('searchOutputContainer');



searchButton.addEventListener('click', () => {
    let searchQuery = searchBox.value;
    if (!searchQuery){ //Verify input is not null or undefined.
        alert("Invalid search. Is the search bar empty?");
    }

    retrieveDataFromAPI(searchQuery);
});

function retrieveDataFromAPI(movieTitle){
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

   return fetch('https://imdb-api.com/en/API/Search/' + apiKey + '/' + movieTitle, requestOptions)
        .then(response => response.text())
        .then(result => {
            // console.log(result)
            outputSearchResults(JSON.parse(result));
        })
        .catch(error => console.log('error', error));
};



function outputSearchResults (queryResults) {
    let outputPosterSrc = queryResults.results[0].image;
    let outputPoster = document.createElement('img');
    outputPoster.src = outputPosterSrc;

    searchOutputContainer.append(outputPoster);
    console.log(outputPosterSrc)
}
