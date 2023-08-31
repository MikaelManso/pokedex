const PokeContainer = document.querySelector("#pokeContainer");
const pokemonCount = 1010;
const colors = {
    fire: '#FF9999',
    grass: '#58D68D',
    electric: '#FFD700',
    water: '#00BFFF',
    ground: '#CD853F',
    rock: '#d5d5d4',
    fairy: '#F8C6E4',
    poison: '#E6E6FA',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#9370DB',
    flying: '#87CEEB',
    fighting: '#C0C0C0',
    normal: '#F5F5F5'
};

const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemons(i);
    }
};

const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`; 
    const resp = await fetch(url);
    const data = await resp.json();
    createPokemonCard(data); 
};

const createPokemonCard = (poke) => {
    const card = document.createElement('div');
    card.classList.add("Pokemon");

    const name = poke.name.charAt(0).toUpperCase() + poke.name.slice(1);
    const id = poke.id.toString().padStart(3, '0');

    const pokeTypes = poke.types.map(type => type.type.name);
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1);
    const color = colors[type];

    card.style.backgroundColor = color;

    const pokemonInnerHTML = `
        <div class="ImgConteiner"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}"></div>
        <div class="Info">
            <span class="number">#${id}</span>
            <h3 class="nome">${name}</h3>
            <small class="Type" >Type: <span>${type}</span></small>
        </div>
    `;

    card.innerHTML = pokemonInnerHTML;

    card.addEventListener("click", () => {
        card.classList.toggle("Pokemon-expanded");
    });

    PokeContainer.appendChild(card);
};

const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");

searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm === "") {
        fetchPokemons();
        return;
    }
    
    PokeContainer.innerHTML = ""; 
    for (let i = 1; i <= pokemonCount; i++) {
        getPokemonsFiltered(i, searchTerm);
    }
});

const getPokemonsFiltered = async (id, searchTerm) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const resp = await fetch(url);
    const data = await resp.json();
    
    const name = data.name.toLowerCase();
    const idString = data.id.toString();
    
    if (name.includes(searchTerm) || idString === searchTerm) {
        createPokemonCard(data);
    }
};

fetchPokemons();
