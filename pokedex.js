const myOl$$ = document.querySelector('#pokedex')



//creo la peticion a la api
const traerPokemon = async () => {
    let pokemons = []
    for (let i = 1; i <= 151; i++) {
        const response = await fetch ([`https://pokeapi.co/api/v2/pokemon/${i}`])
        const respuesta = await response.json()
        pokemons.push({name: respuesta.name,
            image: respuesta.sprites['front_default'],
            type: respuesta.types.map((type) => type.type.name).join(', '),
            id: respuesta.id})
        
    }
    return pokemons
}
console.log(traerPokemon())
// dibujo los objetos
const pintar = (pokemons) => {
    myOl$$.innerHTML = ''
    for (let pokemon of pokemons){
        let newLi = document.createElement('li')
        newLi.className = 'card'
        newLi.innerHTML = `
        <p>${pokemon.id}</p>
        <h3 class='card-title'>${pokemon.name} </h3>
        <img src='${pokemon.image}'>
        <p class='card'>${pokemon.type} </p>`
        myOl$$.appendChild(newLi)
        }
}
// consigo pintar el buscador
const drawInput = (pokemons) => {
    const input$$ = document.querySelector('input');
    input$$.addEventListener('input', () => buscador(input$$.value, pokemons));
}
const buscador = (filtro, array) => {
    let pokemonsFiltrados = array.filter((pokemons) => pokemons.name.toLowerCase().includes(filtro.toLowerCase()));
    pintar(pokemonsFiltrados);
}
//llamo a la api
const init = async () => {
    const pokemons = await traerPokemon()
    const pintarPokemons = pintar(pokemons)
    drawInput(pokemons)
    pintar(pokemons)

}
init()


