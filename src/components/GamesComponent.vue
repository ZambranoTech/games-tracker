<template>
      <div class="flex">
      <VueMultiselect  class="w-[65%] lg:w-[18%]  cursor-pointer text-gray-600" v-model="selectedOption" :options="options" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" @select="seleccionarOpcion">
      </VueMultiselect>

      <VueMultiselect  class="ml-2 w-[35%] lg:w-[13%] cursor-pointer" v-model="selectedOptionPlataforma" :options="optionsPlataforma" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" @select="seleccionarOpcion">
      </VueMultiselect>
    </div>

      <div class="grid sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 lg:grid-cols-3 gap-8 ">
        <GameItem v-for="game in games" :key="game.id" :game="game" class="mx-auto md:mx-0"/>
    </div>
   
  </template>

  <script>
  import GameItem from './items/GameItem.vue';
  import VueMultiselect from 'vue-multiselect'
  import 'vue-multiselect/dist/vue-multiselect.css';

export default {
  components: { GameItem, VueMultiselect},
  inject: ['$http'], // inyectar la instancia de Axios

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  data() {
    return {
      games: [],
      options: ['Popularidad', 'Relevancia', 'Recientes', 'Fecha de lanzamiento', 'Nombre'],
      optionsPlataforma: [
        'Plataformas',
        'PC',
        'PlayStation',
        'Xbox',
        'iOS',
        'Android',
        'Apple Macintosh',
        'Linux',
        'Nintendo',
        'SEGA',
        'Web'
      ],      
      selectedOption: 'Popularidad',
      selectedOptionPlataforma: 'Plataformas',
      plataforma: '',
      paginaActual: 1, // Variable para el número de página actual
      gameIds: new Set(),

    };
  },
  methods: {
    async seleccionarOpcion() {
      this.paginaActual = 1;
      this.games = [];
      this.gameIds= new Set();

// Obtén el elemento con la clase "multiselect__single"
var elemento = document.getElementsByClassName("multiselect__single")[0];

// Establece el texto por defecto
elemento.innerHTML = "Ordenado por: <b>" + this.selectedOption + "</b>";
console.log(this.selectedOption);

if (this.selectedOptionPlataforma === 'Plataformas') {
  this.plataforma = "";
} else if (this.selectedOptionPlataforma === 'PC') 
  this.plataforma = "&parent_platforms=1";
else if (this.selectedOptionPlataforma === 'PlayStation') 
  this.plataforma = "&parent_platforms=2";

  else if (this.selectedOptionPlataforma === 'Xbox') 
  this.plataforma = "&parent_platforms=3";

  else if (this.selectedOptionPlataforma === 'iOS') 
  this.plataforma = "&parent_platforms=4";

  else if (this.selectedOptionPlataforma === 'Android') 
  this.plataforma = "&parent_platforms=8";

  else if (this.selectedOptionPlataforma === 'Apple Macintosh') 
  this.plataforma = "&parent_platforms=5";

  else if (this.selectedOptionPlataforma === 'Linux') 
  this.plataforma = "&parent_platforms=6";

  else if (this.selectedOptionPlataforma === 'Nintendo') 
  this.plataforma = "&parent_platforms=7";

  else if (this.selectedOptionPlataforma === 'SEGA') 
  this.plataforma = "&parent_platforms=11";

  else if (this.selectedOptionPlataforma === 'Web') 
  this.plataforma = "&parent_platforms=14";

  let juegosFiltrados = "";

if (this.selectedOption === 'Popularidad') {
      // Filtremos los juegos por popularidad

    const url = `/games/lists/main?discover=true&ordering=-added&page_size=40&page=1` + this.plataforma;
    const response = await this.$http.get(url);

    juegosFiltrados = response.data.results;

 } else if (this.selectedOption === 'Relevancia') {
       // Filtremos los juegos por Relevancia
  const url = `/games/lists/main?discover=true&ordering=-relevance&page_size=40&page=1` + this.plataforma;
    const response = await this.$http.get(url);
    juegosFiltrados = response.data.results;
 }
 else if (this.selectedOption === 'Recientes') {
     // Filtremos los juegos por Recientes

  const url = `/games/lists/main?discover=true&ordering=-created&page_size=40&page=1` + this.plataforma;
    const response = await this.$http.get(url);

    juegosFiltrados = response.data.results;

 } else if (this.selectedOption === 'Fecha de lanzamiento') {
   // Filtremos los juegos por Fecha de lanzamiento
    const url = `/games/lists/main?discover=true&ordering=-released&page_size=40&page=1` + this.plataforma;
    const response = await this.$http.get(url);
    juegosFiltrados = response.data.results;


 } else if (this.selectedOption === 'Nombre') {
   // Filtremos los juegos por nombre
  const url = `/games/lists/main?discover=true&ordering=name&page_size=40&page=1` + this.plataforma;
    const response = await this.$http.get(url);

   
    juegosFiltrados = response.data.results;
 }

 // Crear un objeto para almacenar los juegos únicos
 const uniqueGames = [];

// Filtrar los juegos y agregarlos al objeto utilizando su ID como clave
juegosFiltrados.forEach(game => {
  if (!this.gameIds.has(game.id)) {
    uniqueGames.push(game);
    this.gameIds.add(game.id);
  }
});
this.games = uniqueGames;

  
    },
    handleScroll() {
      const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollBottom = scrollTop + windowHeight;

    if (scrollBottom >= documentHeight - 1) { // Ajuste de tolerancia de 1 píxel
      this.cargarMasJuegos();
    }
  },
    async cargarMasJuegos() {
    this.paginaActual++; // Incrementa el número de página actual
    const url = `/games/lists/main?discover=true&ordering=-added&page_size=40&page=${this.paginaActual}${this.plataforma}`;
    const response = await this.$http.get(url);
    const nuevosJuegos = response.data.results;
    console.log(nuevosJuegos);
    // Crear un objeto para almacenar los juegos únicos
 const uniqueGames = [];
// Filtrar los juegos y agregarlos al objeto utilizando su ID como clave
nuevosJuegos.forEach(game => {
  if (!this.gameIds.has(game.id)) {
    uniqueGames.push(game);
    this.gameIds.add(game.id);
  }
});

    this.games = [...this.games, ...uniqueGames]; // Agrega los nuevos juegos al array existente
  },

  },

  async mounted() {
    //agregar que estamos en el inicio de color azul en el navbar
    document.getElementById("menuInicio").classList.add("bg-blue-700", "md:text-blue-500");


    // Obtén el elemento con la clase "multiselect__single"
var elemento = document.getElementsByClassName("multiselect__single")[0];

// Establece el texto por defecto
elemento.innerHTML = "Ordenado por: <b>" + this.selectedOption + "</b>";

// Filtremos los juegos por popularidad
const url = `/games/lists/main?discover=true&ordering=-added&page_size=40&page=1`;
    const response = await this.$http.get(url);

    const juegosFiltrados = response.data.results;


    // Crear un objeto para almacenar los juegos únicos
 const uniqueGames = [];

// Filtrar los juegos y agregarlos al objeto utilizando su ID como clave
juegosFiltrados.forEach(game => {
  if (!this.gameIds.has(game.id)) {
    uniqueGames.push(game);
    this.gameIds.add(game.id);
  }
});

this.games = uniqueGames;

window.addEventListener('scroll', this.handleScroll);
  }
  
}
</script>
<style>
.multiselect__single {
  white-space: nowrap;
  font-size: 93%;
  overflow: hidden;
  text-overflow: ellipsis;
  color:white;
  background-color: rgba(31, 41, 55, var(--tw-text-opacity));

}

.multiselect__tags {
  background-color: rgba(31, 41, 55, var(--tw-text-opacity));
  border-color: rgba(17, 24, 39,  var(--tw-text-opacity));;
}

.multiselect__content-wrapper {
  color: white;
  background-color: rgba(31, 41, 55, var(--tw-text-opacity));
  border-color: rgba(17, 24, 39,  var(--tw-text-opacity));;
}
</style>
