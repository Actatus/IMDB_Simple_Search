const apiKey = config.APIKey; //pulls API key from seperate file.

const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', () => {
    console.log(this.value);
    console.log(retrieveDataFromAPI("Blade"));
})

function retrieveDataFromAPI(movieTitle){
    //Fetch request will go here.
    // let search = fetch("https://imdb-api.com/en/API/Search/" + apiKey + "/" + movieTitle);
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch('https://imdb-api.com/en/API/Search/' + apiKey + '/' + movieTitle, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

};

