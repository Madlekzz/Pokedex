async function mostrarPokemon() {
    // Obtener url de la pagina
    var url = window.location.href;
    console.log(url);
    // Obtener nombre del pokemon
    var name = url.split("=")[1];
    try {
        // Obtener datos del pokemon
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = response.data;
        console.log(data);

        var nombre_pokemon = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        var altura_pokemon = data.height / 10;
        var peso_pokemon = data.weight / 10;
        var front_sprite_pokemon = data.sprites.front_default;
        var back_sprite_pokemon = data.sprites.back_default;
        var habilidades = data.abilities;
        var movimientos = data.moves;
        var encounters = data.location_area_encounters;
        // Mostrar datos del pokemon
        document.querySelector(".top-screen").innerHTML += `
        <img class="pokemon-front-sprite" src="${front_sprite_pokemon}">
        <img class="pokemon-back-sprite" src="${back_sprite_pokemon}">
        `

        document.querySelector(".lista").innerHTML = `
        <li><b>Nombre: ${nombre_pokemon}</b></li>
        <li><b>Altura: ${altura_pokemon}m</b></li>
        <li><b>Peso: ${peso_pokemon}kg</b></li>
        <li><b id="habilidades">Lista de habilidades</b></li>
        <li><b id="movimientos">Lista de movimientos</b></li>
        <li><b id="encounters">Lista de encounters</b></li>
        `;
        // Lista de habilidades
        var lista_habilidades = document.getElementById("habilidades");
        lista_habilidades.addEventListener("click", () => {
            document.querySelector(".lista").innerHTML = "";
            // Mostrar habilidades
        habilidades.forEach(element => {
            document.querySelector(".lista").innerHTML += `
            <li><b>${element.ability.name.charAt(0).toUpperCase() + element.ability.name.slice(1)}</b></li>
            `
        });
        document.querySelector(".lista").innerHTML += `
        <li><b id="menu">Volver a menu del pokemon</b></li>
        `;
        menu();
        })
        lista_habilidades.addEventListener("mouseover", () => {
            lista_habilidades.style.cursor = 'pointer';
        });

        // Lista de movimientos
        var lista_movimientos = document.getElementById("movimientos");
        lista_movimientos.addEventListener("click", () => {
            document.querySelector(".lista").innerHTML = "";
            // Mostrar movimientos
            movimientos.forEach(element => {
            document.querySelector(".lista").innerHTML += `
            <li><b>${element.move.name.charAt(0).toUpperCase() + element.move.name.slice(1)}</b></li>
            `
        });
        document.querySelector(".lista").innerHTML += `
        <li><b id="menu">Volver a menu del pokemon</b></li>
        `;
        menu();
        })
        lista_movimientos.addEventListener("mouseover", () => {
            lista_movimientos.style.cursor = 'pointer';
        });
        // Lista de encounters
        var lista_encounters = document.getElementById("encounters");
        lista_encounters.addEventListener("click", () => {
            document.querySelector(".lista").innerHTML = "";
            // Mostrar encounters
            fetch(encounters)
            .then((response) => response.json())
            .then((data) => {
            for (var i in data) {
                document.querySelector(".lista").innerHTML += `
                <li><b>${data[i].location_area.name}</b></li>
                `
            }
            if (document.querySelector(".lista").innerHTML == ""){
                document.querySelector(".lista").innerHTML = `<b>Este pokemon no puede ser encontrado en la hierba alta.`
            }
            document.querySelector(".lista").innerHTML += `<br><br><li><b id="menu">Volver a menu del pokemon</b></li>`
            menu();
        });
        });
        lista_encounters.addEventListener("mouseover", () =>{
            lista_encounters.style.cursor = 'pointer';
        });
    } catch (error) { 
        console.error(error);
    }
}
function menu() {
    var menu = document.getElementById("menu");
        menu.addEventListener("mouseover", () => {
            menu.style.cursor = 'pointer';
        })
        menu.addEventListener("click", () => {
            location.reload();
        });
}