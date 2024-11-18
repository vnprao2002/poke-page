const TYPE_COLORS = {
    normal: "bg-gray-400",
    fighting: "bg-red-600",
    flying: "bg-blue-300",
    poison: "bg-purple-500",
    ground: "bg-yellow-600",
    rock: "bg-yellow-800",
    bug: "bg-green-500",
    ghost: "bg-purple-700",
    steel: "bg-gray-500",
    fire: "bg-red-500",
    water: "bg-blue-500",
    grass: "bg-green-600",
    electric: "bg-yellow-400",
    psychic: "bg-pink-500",
    ice: "bg-blue-200",
    dragon: "bg-purple-600",
    dark: "bg-gray-800",
    fairy: "bg-pink-300",
  };
  
  let types = [];
  let selectedType = null;
  let typeDetails = null;
  
  const app = document.getElementById('app');
  const loadingElement = document.getElementById('loading');
  const errorElement = document.getElementById('error');
  const errorMessage = document.getElementById('errorMessage');
  const typesGrid = document.getElementById('typesGrid');
  const searchQueryInput = document.getElementById('searchQuery');
  const typeDetailsElement = document.getElementById('typeDetails');
  const typeNameElement = document.getElementById('typeName');
  const damageRelationsElement = document.getElementById('damageRelations');
  const pokemonListElement = document.getElementById('pokemonList');
  
  searchQueryInput.addEventListener('input', () => {
    renderTypes(searchQueryInput.value);
  });
  
  async function fetchTypes() {
    try {
      loadingElement.classList.remove('hidden');
      const response = await axios.get("https://pokeapi.co/api/v2/type");
      types = response.data.results;
      renderTypes();
    } catch (err) {
      showError("Failed to fetch Pokemon types");
    } finally {
      loadingElement.classList.add('hidden');
    }
  }
  
  async function fetchTypeDetails(typeUrl) {
    try {
      const response = await axios.get(typeUrl);
      typeDetails = response.data;
      renderTypeDetails();
    } catch (err) {
      showError("Failed to fetch type details");
    }
  }
  
  function renderTypes(searchQuery = "") {
    const filteredTypes = types.filter((type) =>
      type.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    typesGrid.innerHTML = "";
    filteredTypes.forEach(type => {
      const typeCard = document.createElement('div');
      typeCard.classList.add('p-4', 'rounded-lg', 'shadow-lg', 'cursor-pointer', 'transform', 'hover:scale-105', 'transition-transform', 'duration-200');
      typeCard.classList.add(TYPE_COLORS[type.name] || "bg-gray-400");
      typeCard.innerHTML = `<h3 class="text-white font-bold text-xl capitalize">${type.name}</h3>`;
      typeCard.addEventListener('click', () => {
        selectedType = type;
        fetchTypeDetails(type.url);
      });
      typesGrid.appendChild(typeCard);
    });
  }
  
  function renderTypeDetails() {
    typeDetailsElement.classList.remove('hidden');
    typeNameElement.textContent = `${typeDetails.name} Type Details`;
  
    damageRelationsElement.innerHTML = "";
    Object.entries(typeDetails.damage_relations).forEach(([relation, types]) => {
      const relationElement = document.createElement('div');
      relationElement.classList.add('border-b', 'pb-2');
      relationElement.innerHTML = `
        <p class="font-medium capitalize mb-2">${relation.replace("_", " ")}:</p>
        <div class="flex flex-wrap gap-2">
          ${types.map(type => `
            <span class="${TYPE_COLORS[type.name] || "bg-gray-400"} px-3 py-1 rounded text-white capitalize">
              ${type.name}
            </span>
          `).join('')}
        </div>
      `;
      damageRelationsElement.appendChild(relationElement);
    });
  
    pokemonListElement.innerHTML = "";
    typeDetails.pokemon.forEach(({ pokemon }) => {
      const pokemonItem = document.createElement('div');
      pokemonItem.classList.add('p-2', 'bg-gray-100', 'rounded', 'hover:bg-gray-200', 'transition-colors', 'duration-200');
      pokemonItem.innerHTML = `<p class="capitalize">${pokemon.name}</p>`;
      pokemonListElement.appendChild(pokemonItem);
    });
  }
  
  function showError(message) {
    errorElement.classList.remove('hidden');
    errorMessage.textContent = message;
  }
  
  fetchTypes();
  