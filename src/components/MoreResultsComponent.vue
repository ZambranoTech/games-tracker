<template>
    <h3 class="text-center md:text-start uppercase text-yellow-500 font-semibold text-lg">RESULTADOS DE LA BUSQUEDA: {{ this.$route.params.busqueda }}</h3>
      <div class="grid sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 lg:grid-cols-3 gap-8 ">
        <GameItem v-for="game in this.games" :key="game.id" :game="game" class="mx-auto"/>
    </div>


</template>
<script>
import GameItem from './items/GameItem.vue';

export default {
    inject: ["$http"], // inyectar la instancia de Axios

  components: { GameItem },
  data() {
    return {
      games: [],
      paginaActual: 1, // Variable para el número de página actual
      gameIds: new Set(),
    };
  },
  async mounted() {
    console.log(this.$route.params.busqueda);
    const url = `/games?search="` + this.$route.params.busqueda + '""';
      const response = await this.$http.get(url);

       // Crear un objeto para almacenar los juegos únicos
      const uniqueGames = [];

      // Filtrar los juegos y agregarlos al objeto utilizando su ID como clave
      response.data.results.forEach(game => {
  if (!this.gameIds.has(game.id)) {
    uniqueGames.push(game);
    this.gameIds.add(game.id);
  }
});
      this.games = uniqueGames;
      window.addEventListener('scroll', this.handleScroll);
  },
  beforeRouteUpdate(to, from, next) {
    setTimeout(() => {
                window.location.reload();
              }, 100);
    
    next();
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  methods: {
    handleScroll() {
      const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollBottom = scrollTop + windowHeight;

    if (scrollBottom >= documentHeight -1) { // Ajuste de tolerancia de 1 píxel
      this.cargarMasJuegos();
    }
  },
  async cargarMasJuegos() {
    this.paginaActual++; // Incrementa el número de página actual
    const url = `/games?search=` + this.$route.params.busqueda + "&page=" + this.paginaActual;
    console.log(url);
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
  
};
</script>