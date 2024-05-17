document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  const input = document.getElementById('search-input');
  const container = document.querySelector('.contenedor');

  form.addEventListener('submit', async function (event) {
      event.preventDefault();
      const pokemonId = input.value.trim();
      
      if (!pokemonId || isNaN(pokemonId)) {
          renderError("Por favor, ingresa un número válido.");
          return;
      }

      try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
          if (!response.ok) {
         
              if (response.status === 404) {
                  renderError("No se encontró ningún Pokémon con ese número.");
              } else {
                  throw new Error('No se pudo obtener la información del Pokémon');
              }
          } else {
              const data = await response.json();
              renderPokemon(data);
          }
      } catch (error) {
          console.error('Error al obtener el Pokémon:', error.message);
          renderError("Error al obtener información del Pokémon.");
      }
  });

  function renderPokemon(pokemon) {
      container.innerHTML = `
          <div class="pokemon">
              <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
              <h3>${pokemon.name}</h3>
              <p>Altura: ${pokemon.height}m</p>
              <p>Peso: ${pokemon.weight}kg</p>
          </div>
      `;
  }

  function renderError(message) {
      container.innerHTML = `<p class="error">${message}</p>`;
  }
});
