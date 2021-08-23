const poke_container = document.getElementById('poke_container');
const colors = {
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
	fairy: '#D685AD'
};
const main_types = Object.keys(colors);

const fetchPokemons = async () => {
	for (let i = 1; i <= 20; i++) {
		await getPokemon(i);
	}
};

const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');

	const poke_types = pokemon.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = colors[type];
	
	pokemonEl.style.backgroundColor = color;

	if (poke_types[1]) {
		const pokeInnerHTML = `
			<div class="img-container">
				<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
								pokemon.id
							}.png" alt="${name}" />
				<span class="number">#${pokemon.id
							.toString()
							.padStart(3, '0')}</span>
			</div>
			<div class="info">
				<div class="name"><h3>${name}</h3></div>
				<div class="types">
					<div class="type"><small><span>${poke_types[0].toUpperCase()}</span></small></div>
					<div class="type"><small><span>${poke_types[1].toUpperCase()}</span></small></div>
				</div>
			</div>
    	`;
		
		pokemonEl.innerHTML = pokeInnerHTML;
		poke_container.appendChild(pokemonEl);
	} else {
		const pokeInnerHTML = `
			<div class="img-container">
				<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
								pokemon.id
							}.png" alt="${name}" />
				<span class="number">#${pokemon.id
							.toString()
							.padStart(3, '0')}</span>
			</div>
			<div class="info">
				<div class="name"><h3>${name}</h3></div>
				<div class="types">
					<div class="type"><small><span>${poke_types[0].toUpperCase()}</span></small></div>
				</div>
			</div>
    	`;

		pokemonEl.innerHTML = pokeInnerHTML;
		poke_container.appendChild(pokemonEl);
	}
}

fetchPokemons();