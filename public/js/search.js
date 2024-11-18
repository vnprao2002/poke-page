let pokemonList = [];

// Tải danh sách Pokémon từ API
async function loadPokemonList() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const data = await response.json();
        pokemonList = data.results.map(pokemon => pokemon.name); // Lưu danh sách tên Pokémon
    } catch (error) {
        console.error('Failed to load Pokémon list:', error);
    }
}

// Hiển thị gợi ý
async function showSuggestions(query) {
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = ''; // Xóa gợi ý cũ

    if (!query) {
        suggestions.style.display = 'none';
        return;
    }

    const filteredPokemon = pokemonList.filter(name => name.toLowerCase().includes(query.toLowerCase()));
    if (filteredPokemon.length > 0) {
        suggestions.style.display = 'block';
        for (const name of filteredPokemon.slice(0, 10)) {
            const li = document.createElement('li');
            li.className = 'list-group-item list-group-item-action';
            
            // Tạo phần tử hình ảnh
            const img = document.createElement('img');
            img.src = await getPokemonImage(name); // Lấy hình ảnh của Pokémon
            img.alt = name;
            img.style.width = '30px'; // Cỡ hình ảnh nhỏ
            img.style.marginRight = '10px'; // Khoảng cách giữa hình ảnh và tên

            // Tạo phần tử tên Pokémon
            const textNode = document.createTextNode(name.charAt(0).toUpperCase() + name.slice(1));

            li.appendChild(img);
            li.appendChild(textNode);

            li.onclick = () => {
                document.getElementById('pokemon-search').value = name;
                suggestions.style.display = 'none';
            };
            suggestions.appendChild(li);
        }
    } else {
        suggestions.style.display = 'none';
    }
}

async function getPokemonImage(name) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();
        return data.sprites.front_default; // Lấy hình ảnh nhỏ
    } catch (error) {
        console.error(`Failed to load image for ${name}:`, error);
        return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png'; // Hình mặc định (Ditto)
    }
}
// Lắng nghe sự kiện nhập liệu
document.getElementById('pokemon-search').addEventListener('input', function () {
    showSuggestions(this.value.trim());
});

// Xử lý tìm kiếm khi nhấn Enter hoặc nút Search
document.getElementById('search-button').addEventListener('click', handleSearch);
document.getElementById('pokemon-search').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

function handleSearch() {
    const query = document.getElementById('pokemon-search').value.trim().toLowerCase();
    if (!query) {
        alert('Please enter a Pokémon name or ID');
        return;
    }
    window.location.href = `detail.html?id=${encodeURIComponent(query)}`;
}

// Gọi hàm tải danh sách Pokémon khi trang được tải
loadPokemonList();
