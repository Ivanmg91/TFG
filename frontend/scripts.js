class Show {
    constructor(itemType, showType, id, imdbId, tmdbId, title, overview, firstAirYear, lastAirYear, originalTitle, genres, creators, cast, rating, seasonCount, episodeCount, imageSet, streamingOptions) {
        this.itemType = itemType;
        this.showType = showType;
        this.id = id;
        this.imdbId = imdbId;
        this.tmdbId = tmdbId;
        this.title = title;
        this.overview = overview;
        this.firstAirYear = firstAirYear;
        this.lastAirYear = lastAirYear;
        this.originalTitle = originalTitle;
        this.genres = genres;
        this.creators = creators;
        this.cast = cast;
        this.rating = rating;
        this.seasonCount = seasonCount;
        this.episodeCount = episodeCount;
        this.imageSet = imageSet;
        this.streamingOptions = streamingOptions;
    }
}

// List to store shows
const showList = [];
let hasMore = false;
let nextCursor = null;

// Function to get api info and store it
async function fetchShows() {
    const url = 'https://streaming-availability.p.rapidapi.com/shows/search/filters?country=es&output_language=es';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'af2469ec88msh6b559a4140ac497p19de27jsn094c3d8b6fb0',
            'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        console.log(result);

        const dataResult = await response.json();

        hasMore = dataResult.hasMore;
        nextCursor = dataResult.nextCursor;

        // Add each show in a list
        dataResult.shows.forEach(showData => {
            const show = new Show(
                showData.itemType,
                showData.showType,
                showData.id,
                showData.imdbId,
                showData.tmdbId,
                showData.title,
                showData.overview,
                showData.releaseYear,
                null,
                showData.originalTitle,
                showData.genres.map(genre => genre.name),
                showData.directors,
                showData.cast,
                showData.rating,
                null,
                null,
                showData.imageSet,
                showData.streamingOptions
            );
            showList.push(show);
        });
        
    } catch (error) {
        console.error(error);
    }
}

function displayShows() {

}

/*function displayShowsInDOM() {
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = ''; // Clear previous content

    showList.forEach(show => {
        const showElement = document.createElement('div');
        showElement.innerHTML = `
            <h3>${show.title} (${show.firstAirYear} - ${show.lastAirYear || 'Present'})</h3>
            <p>${show.overview}</p>
            <p><strong>Calificación:</strong> ${show.rating}</p>
        `;
        resultContainer.appendChild(showElement);
    });
}*/

// Function with cards:
function displayShowsInDOM() {
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = ''; // Clear previous content

    showList.forEach(show => {
        const showElement = document.createElement('div');
        showElement.classList.add('card'); // Add a class for styling
        showElement.innerHTML = `
            <div class="card-image">
                <img src="${show.imageSet?.poster || 'placeholder.jpg'}" alt="${show.title}">
            </div>
            <div class="card-content">
                <h3>${show.title} (${show.firstAirYear} - ${show.lastAirYear || 'Present'})</h3>
                <p>${show.overview}</p>
                <p><strong>Calificación:</strong> ${show.rating}</p>
            </div>
        `;
        resultContainer.appendChild(showElement);
    });

    if (hasMore = true) {
        
    }
}

document.getElementById('fetchData').addEventListener('click', fetchShows);
document.getElementById('showData').addEventListener('click', displayShowsInDOM);