// Bảng màu sắc cho các loại Pokémon
const typeColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
};

// Màu sắc cho từng stat
const statColors = {
    hp: '#28a745',
    attack: '#dc3545',
    defense: '#17a2b8',
    speed: '#ffc107',
    'special-attack': '#fd7e14',
    'special-defense': '#6c757d',
};

// Lấy ID Pokémon từ URL
function getPokemonIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id'); // Lấy ID từ tham số URL (?id=1)
}

// Lấy dữ liệu từ API
async function fetchPokemon(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) throw new Error('Pokemon not found');
        const data = await response.json();
        renderPokemonData(data);
    } catch (error) {
        alert(error.message);
    }
}

// Lấy thông tin chi tiết về Move
async function fetchMoveDetails(moveName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/move/${moveName}`);
        if (!response.ok) throw new Error(`Move ${moveName} not found`);
        const moveData = await response.json();
        return {
            name: moveData.name,
            type: moveData.type.name,
            power: moveData.power || 'N/A',
            pp: moveData.pp || 'N/A',
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Hiển thị thông tin Pokémon
function renderPokemonData(pokemon) {
    // Hiển thị tên và hình ảnh Pokémon
    document.getElementById('pokemon-name').innerHTML = `${pokemon.name.toUpperCase()} <span class="text-muted">#${pokemon.id}</span>`;
    document.getElementById('pokemon-image').src = pokemon.sprites.other['official-artwork'].front_default || '';

    // Hiển thị loại (type) với màu sắc
    document.getElementById('pokemon-types').innerHTML = pokemon.types
        .map(type => {
            const typeName = type.type.name;
            const typeColor = typeColors[typeName] || '#000';
            return `<span class="badge" style="background-color: ${typeColor}; color: white;">${typeName.toUpperCase()}</span>`;
        })
        .join('');

    // Hiển thị thông tin bổ sung
    document.querySelector('.stats-container').innerHTML = `
        <h4>Additional Information</h4>
        <p><strong>Base Experience:</strong> ${pokemon.base_experience}</p>
        <p><strong>Species:</strong> ${pokemon.species.name}</p>
    `;

    // Hiển thị Top Moves dưới dạng bảng
    renderMovesTable(pokemon.moves.slice(0, 15));

    // Hiển thị Abilities
    document.getElementById('pokemon-abilities').innerHTML = pokemon.abilities
        .map(ability => `<span class="badge bg-success">${ability.ability.name}</span>`)
        .join('');

    // Hiển thị chiều cao và cân nặng
    document.getElementById('pokemon-height').textContent = `${pokemon.height / 10} m`;
    document.getElementById('pokemon-weight').textContent = `${pokemon.weight / 10} kg`;

    // Hiển thị Base Stats
    renderBaseStats(pokemon.stats);
}

// Hiển thị Base Stats
function renderBaseStats(stats) {
    const maxStat = 250; // Giá trị tối đa của chỉ số
    const statsContainer = document.querySelector('.stats-container');

    statsContainer.innerHTML += '<h4>Base Stats</h4>';
    stats.forEach(stat => {
        const percentage = (stat.base_stat / maxStat) * 100;
        const statName = stat.stat.name;
        const statColor = statColors[statName] || '#6c757d';

        statsContainer.innerHTML += `
            <div class="progress mb-3">
                <div class="progress-bar" style="width: ${percentage}%; background-color: ${statColor};" 
                     role="progressbar" 
                     aria-valuenow="${stat.base_stat}" 
                     aria-valuemin="0" 
                     aria-valuemax="${maxStat}">
                    ${statName.toUpperCase()}: ${stat.base_stat}
                </div>
            </div>`;
    });
}

// Hiển thị Moves dưới dạng bảng
async function renderMovesTable(moves) {
    const movesTable = document.querySelector('.moves-container');
    movesTable.innerHTML = '<h4>Top Moves</h4><table class="table table-bordered"><thead><tr><th>Name</th><th>Type</th><th>Power</th><th>PP</th></tr></thead><tbody></tbody></table>';
    const tableBody = movesTable.querySelector('tbody');

    for (const move of moves) {
        const moveDetails = await fetchMoveDetails(move.move.name);
        if (moveDetails) {
            const row = `
                <tr>
                    <td>${moveDetails.name.toUpperCase()}</td>
                    <td style="background-color: ${typeColors[moveDetails.type] || '#000'}; color: white;">${moveDetails.type.toUpperCase()}</td>
                    <td>${moveDetails.power}</td>
                    <td>${moveDetails.pp}</td>
                </tr>`;
            tableBody.innerHTML += row;
        }
    }
}

// Lấy ID từ URL và gọi API
const pokemonId = getPokemonIdFromUrl();
if (pokemonId) {
    fetchPokemon(pokemonId);
} else {
    alert("No Pokémon ID provided");
}
