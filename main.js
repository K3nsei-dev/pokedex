let base_URL = "https://pokeapi.co/api/v2/pokemon/";

// Function to fetch a list of pokemon
function getPokemonList(url) {
  fetch(url)
    // Convert data from JSON
    .then((response) => response.json())
    //Stuff to do with data
    .then((data) => {
      // Console log to make sure I am getting the data
      console.log(data);
      // Get the list of pokemon from the results
      let pokemon = data.results;
      // Get element from HTML to write buttons in
      let container = document.querySelector(".pokemon-list-container");
      // Clear the container
      container.innerHTML = "";
      // Loop over pokemon list and create an HTML button for each one. Add the button to the container
      pokemon.forEach((btn) => {
        container.innerHTML += `<button class="btn pokemon-btn" onclick="getPokemonInfo('${btn.url}')">${btn.name}</button>`;
      });
      // Add a next pokemon button
      container.innerHTML += `<br><br><button class="btn click-btn" onclick="getPokemonList('${data.next}')">Next</button>`;
      container.innerHTML += `<br><br><button class="btn click-btn" onclick="getPokemonList('${data.previous}')">Previous</button>`;
    });
}

// Get default pokemon list
getPokemonList(base_URL);

// Function to get information about a specific pokemin
function getPokemonInfo(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Make sure data comes throufg
      console.log(data);
      // Write data to pokemon information container
      document.querySelector(".pokemon-info").innerHTML = `
    <img src="${data.sprites.front_default} ">
    ${abilitiesLoop(data.abilities)} 
     ${typesLoop(data.types)}
     ${moveSet(data.moves)}`;
      document.querySelector('.pokemon-info').innerHTML += `<div>Height: ${data.height}</div>`
      document.querySelector('.pokemon-info').innerHTML += `<div># ${data.game_indices[0].game_index}</div>`
      document.querySelector('#modal').classList.toggle('active');
    });
}

function removeModal(){
  document.querySelector('#modal').classList.remove('active')
}

function abilitiesLoop(abilities){
  let items = ''
  for (let item of abilities){
    items += `<div>Abilities: ${item.ability.name}</div>`;
  };
  return items;
}

function typesLoop(types){
  let typeItems = '';
  for (let typeItem of types){
    typeItems += `<div>Types: ${typeItem.type.name}</div>`;
  };
  return typeItems;
}

function moveSet(moves){
  let index1 = Math.floor(Math.random() * moves.length);
  let index2 = Math.floor(Math.random() * moves.length);
  
  while(index1 == index2){
    index2 = Math.floor(Math.random() * moves.length);
  }
  
  let moveSet = `
    <div>Move: ${moves[index1].move.name}</div>
    <div>Move: ${moves[index2].move.name}</div>
  `
  return moveSet;
}