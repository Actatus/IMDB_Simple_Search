/*IMDB Simple's goal is to use the API access from imdb-api.com to search IMDB's database and retrieve
    search's title and movie. The project should use vanilla JS to accomplish this.
*/

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
            searchParser(JSON.parse(result));
            // outputSearchResults(JSON.parse(result));
        })
        .catch(error => console.log('error', error));
};

function checkValidSearch(searchQuery){
    if (searchQuery.errorMessage != '' || searchQuery.results.length == 0) {
        return false;
    }
}

function searchParser(searchQuery){
    //Will check that errorMessage is empty, then pull image sources and titles.
    if (checkValidSearch(searchQuery) == false){
        alert("There was an error in your search. Maybe what you're looking for doesn't exist?");
        return false; //Search must be invalid, should not pass down to output functions.
    }
    let queryResultsObject = {}; //Will store as 0 : { title: ..., imageSrc: ...}, 1 : {....}, etc
    for (let i = 0; i < searchQuery.results.length; i++){
        queryResultsObject[i] = {
            title: searchQuery.results[i].title,
            imgSrc: searchQuery.results[i].image
        };
    };

    outputSearchResults(queryResultsObject);
}

function outputSearchResults (queryResults) {
    let mainPosterSrc = queryResults[0].imgSrc;
    let mainPoster = document.createElement('img');
    mainPoster.src = mainPosterSrc;

    searchOutputContainer.append(mainPoster);
    console.log(queryResults)
}
