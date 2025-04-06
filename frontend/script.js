const API_KEY = "TU_CLAVE_RAPIDAPI";
const API_HOST = "streaming-availability.p.rapidapi.com";

async function searchMovies() {
    const query = document.getElementById("searchInput").value;
    if (!query) return alert("Escribe un título");

    const url = `https://${API_HOST}/shows/search/title?series_granularity=show&show_type=movie&output_language=en&title=${encodeURIComponent(query)}`;

    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": API_KEY,
            "x-rapidapi-host": API_HOST
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        displayResults(data.shows || []);
    } catch (error) {
        console.error("Error al buscar películas:", error);
    }
}

function displayResults(movies) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (movies.length === 0) {
        resultsDiv.innerHTML = "<p>No se encontraron resultados.</p>";
        return;
    }

    movies.forEach(movie => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${movie.image || 'https://via.placeholder.com/150'}" width="150">
            <h3>${movie.title}</h3>
            <p>${getStreamingPlatforms(movie)}</p>
        `;
        resultsDiv.appendChild(card);
    });
}

function getStreamingPlatforms(movie) {
    if (!movie.streamingInfo || Object.keys(movie.streamingInfo).length === 0) return "No disponible en streaming";

    return Object.keys(movie.streamingInfo)
        .map(platform => platform.toUpperCase())
        .join(", ");
}
