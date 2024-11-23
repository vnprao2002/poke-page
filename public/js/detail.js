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
        if (!response.ok) throw new Error('Pokemon không tìm thấy');
        const data = await response.json();
        renderPokemonData(data);

        // Lấy chuỗi tiến hóa
        fetchEvolutionChain(data.species.url);
    } catch (error) {
        alert(error.message);
    }
}

// Lấy thông tin chuỗi tiến hóa từ API
async function fetchEvolutionChain(speciesUrl) {
    try {
        const speciesResponse = await fetch(speciesUrl);
        const speciesData = await speciesResponse.json();

        const evolutionResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionResponse.json();

        const evolutions = parseEvolutionChain(evolutionData.chain);
        renderEvolutionChart(evolutions);
    } catch (error) {
        console.error('Error fetching evolution chain:', error);
    }
}

// Phân tích chuỗi tiến hóa
function parseEvolutionChain(chain) {
    const evolutions = [];
    let current = chain;

    while (current) {
        evolutions.push({
            name: current.species.name,
            url: current.species.url, // URL đầy đủ, sẽ tách ID sau
        });
        current = current.evolves_to[0]; // Chỉ lấy tiến hóa đầu tiên
    }
    return evolutions;
}

function hexToRgba(hex, alpha = 1) {
    const rgb = hex.replace('#', '').match(/.{1,2}/g).map(x => parseInt(x, 16));
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
}

// Hiển thị biểu đồ tiến hóa
function renderEvolutionChart(evolutions) {
    const evolutionChart = document.getElementById('evolution-chart');
    evolutionChart.innerHTML = ''; // Xóa nội dung cũ

    evolutions.forEach(evolution => {
        // Lấy ID từ URL bằng cách tách chuỗi
        const pokemonId = evolution.url.split('/').filter(Boolean).pop(); 

        evolutionChart.innerHTML += `
            <div class="text-center">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png" 
                     alt="${evolution.name}" class="img-fluid rounded" style="max-width: 150px;padding-right: 12px">
                <p class="mt-2">${evolution.name.toUpperCase()}</p>
            </div>
        `;
    });
}

// Hiển thị thông tin Pokémon
function renderPokemonData(pokemon) {
    // Hiển thị tên và hình ảnh Pokémon
    document.getElementById('pokemon-name').innerHTML = `${pokemon.name.toUpperCase()} <span class="text-muted">#${pokemon.id}</span>`;
    document.getElementById('pokemon-image').src = pokemon.sprites.other['official-artwork'].front_default || '';

    document.getElementById('pokemon-types').innerHTML = pokemon.types
        .map(type => {
            const typeName = type.type.name;
            const typeColor = typeColors[typeName] || '#000';
            return `
                <a href="type.html?type=${typeName}" class="badge" style="background-color: ${typeColor}; color: white;">
                    ${typeName.toUpperCase()}
                </a>`;
        })
        .join('');
    renderAbilities(pokemon.abilities);
        // Thay đổi màu nền dựa trên hệ đầu tiên
        if (pokemon.types.length > 0) {
            const primaryType = pokemon.types[0].type.name; // Hệ đầu tiên
            const backgroundColorHex = typeColors[primaryType] || '#ffffff'; // Lấy màu HEX từ bảng
            const backgroundColorRgba = hexToRgba(backgroundColorHex, 0.5); // Đổi sang RGBA với opacity 50%
            document.body.style.backgroundColor = backgroundColorRgba;
        }
    
    // Hiển thị thông tin bổ sung
    document.querySelector('.stats-container').innerHTML = `
        <h4>Thông Tin Bổ Sung</h4>
        <p><strong>Base Experience:</strong> ${pokemon.base_experience}</p>
        <p><strong>Species:</strong> ${pokemon.species.name}</p>
    `;

    // Hiển thị Top Moves dưới dạng bảng
    renderMovesTable(pokemon.moves.slice(0, 15));
    
    
        // Lấy thông tin ability
async function fetchAbilityDetails(abilityName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/ability/${abilityName}`);
        if (!response.ok) throw new Error(`Ability ${abilityName} not found`);
        const abilityData = await response.json();
        const effectEntry = abilityData.effect_entries.find(entry => entry.language.name === 'en');
        return effectEntry ? effectEntry.short_effect : 'No description available.';
    } catch (error) {
        console.error(error);
        return 'Error fetching ability details.';
    }
}
    // Hiển thị Ability với Tooltip
async function renderAbilities(abilities) {
    const abilitiesContainer = document.getElementById('pokemon-abilities');
    abilitiesContainer.innerHTML = '';

    for (const ability of abilities) {
        const abilityName = ability.ability.name;
        const shortEffect = await fetchAbilityDetails(abilityName);

        const abilityElement = document.createElement('span');
        abilityElement.className = 'badge bg-success position-relative';
        abilityElement.style.cursor = 'pointer';
        abilityElement.textContent = abilityName;

        abilityElement.setAttribute('data-bs-toggle', 'tooltip');
        abilityElement.setAttribute('data-bs-placement', 'top');
        abilityElement.setAttribute('title', shortEffect);

        abilitiesContainer.appendChild(abilityElement);
        abilitiesContainer.appendChild(document.createTextNode(' '));
    }

    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(el => new bootstrap.Tooltip(el));
}
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

// Lấy ID từ URL và gọi API
const pokemonId = getPokemonIdFromUrl();
if (pokemonId) {
    fetchPokemon(pokemonId);
} else {
    alert("No Pokémon ID provided");
}
