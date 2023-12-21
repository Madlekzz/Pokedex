function obtenerPokemons() {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=1292')
    .then(function (response) {
        console.log(response.data.results);

        var output = "";
        var numero_pokemon = "";

        response.data.results.forEach(element => {
            var nombre_pokemon = element.name.charAt(0).toUpperCase() + element.name.slice(1);
            numero_pokemon = element.url.slice(34, -1);
            output += `
            <a id="pokemon" href="http://127.0.0.1:5500/pokemon.html?name=${element.name}"><li><b>${numero_pokemon}</b>${nombre_pokemon}</li></a>
            `
        });
        document.querySelector(".lista").innerHTML = output; 
    })
    .catch(function (error) {
        console.log(error);
    });
}