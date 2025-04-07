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

const maxShows = 50; // Allow adjust the card list limit

async function fetchAllShows() {
    let url = 'https://streaming-availability.p.rapidapi.com/shows/search/filters?country=es&output_language=es';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'e073b530e0msh5a489d58ded6fe2p167d0cjsn6e3a9bca4a92',
            'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
        }
    };

    showList.length = 0; // Clean de list before to start
    let hasMore = true;
    let cursor = null;

    while (hasMore && showList.length < maxShows) { // Ends when the limit is reached
        const fetchUrl = cursor ? `${url}&cursor=${cursor}` : url; // Use cursor to pagination

        try {
            const response = await fetch(fetchUrl, options);
            const dataResult = await response.json();

            dataResult.shows.forEach(showData => {
                if (showList.length >= maxShows) return; // If we have already reached the limit, stop the loop
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

            hasMore = dataResult.hasMore;
            cursor = dataResult.nextCursor;
        } catch (error) {
            console.error('Error fetching data:', error);
            break;
        }
    }
}

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

document.getElementById('fetchData').addEventListener('click', async () => {
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = '<p>Cargando películas...</p>';
    
    await fetchAllShows();
    displayShowsInDOM();
});

document.getElementById('showData').addEventListener('click', displayShowsInDOM);