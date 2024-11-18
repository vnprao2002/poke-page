let offset = 0;
const limit = 12;
let isLoading = false; // Biến kiểm tra xem có đang tải dữ liệu hay không

async function fetchPokemonList() {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching Pokemon list:', error);
        return [];
    }
}

async function fetchPokemonDetails(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Error fetching Pokemon details:', error);
        return null;
    }
}

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

async function loadPokemonCards() {
    if (isLoading) return;  // Nếu đang tải dữ liệu, không thực hiện lại
    isLoading = true;

    // Hiển thị spinner khi bắt đầu tải dữ liệu
    document.getElementById('loadingSpinner').classList.remove('d-none');

    const pokemonList = await fetchPokemonList();
    const pokemonGrid = document.getElementById('pokemonGrid');

    for (const pokemon of pokemonList) {
        const details = await fetchPokemonDetails(pokemon.url);
        if (details) {
            // Lấy danh sách các loại (types)
            const types = details.types.map(type => type.type.name);

            const card = document.createElement('div');
            card.className = 'col-sm-6 col-md-4 col-lg-3 mb-4 pokemon-card';
            card.setAttribute('data-pokemon-id', details.id);
            card.innerHTML = `
                <div class="card h-100">
                    <img src="${details.sprites.front_default}" class="card-img-top p-3" alt="${details.name}">
                    <div class="card-body text-center">
                        <h5 class="card-title text-capitalize">${details.name}</h5>
                        <div class="types-container">
                            ${types.map(type => `
                                <a href="./type.html" 
                                    class="btn type-btn" style="display: inline-block; text-align: center; background-color: ${typeColors[type]}; ">
                                    ${type}
                                </a>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
            pokemonGrid.appendChild(card);
        }
    }

    offset += limit;

    // Ẩn spinner khi tải xong
    document.getElementById('loadingSpinner').classList.add('d-none');
    isLoading = false;  // Sau khi tải xong, có thể tiếp tục tải dữ liệu
}


// Chỉnh sửa sự kiện khi nhấn vào thẻ card
document.addEventListener('click', function(event) {
    if (event.target.closest('.pokemon-card')) {
        const pokemonId = event.target.closest('.pokemon-card').getAttribute('data-pokemon-id');
        window.location.href = `detail.html?id=${pokemonId}`; // Chuyển đến trang detail.html và truyền ID
    }
});

// Tự động tải thêm Pokémon khi cuộn chuột xuống
window.addEventListener('scroll', function() {
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;

    // Kiểm tra khi nào người dùng cuộn đến gần đáy trang
    if (scrollPosition >= documentHeight - 200 && !isLoading) {
        loadPokemonCards();
    }
});

// Load initial Pokémon cards
loadPokemonCards();
