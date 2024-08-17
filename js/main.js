// Configuration for Marvel API
const API_KEY = '0ff3c6786e75d23ed4dbfe5ba1c62320'; // Your public API key
const PRIVATE_KEY = 'bac575f3c70dd0cb1fc42d9a3f7e685ab1b21725'; // Your private API key
const API_URL = 'https://gateway.marvel.com:443/v1/public/characters';

// Function to generate MD5 hash
function md5(string) {
    return CryptoJS.MD5(string).toString();
}

// Function to fetch Marvel characters
async function fetchCharacters() {
    const timestamp = new Date().getTime(); // Current timestamp for security
    const hash = md5(`${timestamp}${PRIVATE_KEY}${API_KEY}`); // Generate hash

    try {
        const response = await fetch(`${API_URL}?ts=${timestamp}&apikey=${API_KEY}&hash=${hash}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data.data.results;
    } catch (error) {
        console.error('Error fetching characters:', error);
    }
}

// Function to update UI with characters
function updateUI(characters) {
    const container = document.getElementById('character-container');
    container.innerHTML = ''; // Clear existing content

    characters.forEach(character => {
        const characterDiv = document.createElement('div');
        characterDiv.className = 'character';
        characterDiv.innerHTML = `
            <div class="character-thumbnail">
                <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}" />
            </div>
            <div class="character-info">
                <h3>${character.name}</h3>
                <p>${character.description || 'No description available'}</p>
            </div>
        `;
        container.appendChild(characterDiv);
    });
}

// Event listener for the button
document.getElementById('fetchCharacters').addEventListener('click', async () => {
    const characters = await fetchCharacters();
    if (characters) updateUI(characters);
});
