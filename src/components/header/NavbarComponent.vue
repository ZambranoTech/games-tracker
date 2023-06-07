<template>
  <nav class="border-gray-200">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <router-link :to="{ name: 'home' }" class="flex items-center">
        <img
          src="../../assets/images/logo2.png"
          class="h-12 mr-3"
          alt="Flowbite Logo"
        />
        <span class="self-center text-2xl font-semibold whitespace-nowrap"
          >Games Tracker</span
        >
      </router-link>
      <div class="flex items-center md:order-2">
        <div class="flex md:order-2">
          <button
            type="button"
            data-collapse-toggle="mobile-menu-2"
            aria-controls="navbar-search"
            aria-expanded="false"
            class="md:hidden text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
            @click="quitarAbsolute"
          >
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Search</span>
          </button>
          <div class="relative hidden md:block">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span class="sr-only">Search icon</span>
            </div>
            <input
              type="search"
              id="search-navbar"
              class="block w-full p-2 pl-10 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Buscar..."
              @input="buscar"
              v-model="searchQuery"
              @keyup.enter="goToGame"
            />
            <div
              v-if="search_games.length >= 1"
              class="absolute z-50 max-w-sm w-[600px] p-3 pl-4 items-center bg-gray-600 rounded-lg mt-2"
            >
              <router-link
                v-for="game in search_games.slice(0, 4)"
                :key="game.id"
                :to="{ name: 'game', params: { id: game.id } }"
                class="flex mb-4 hover:bg-gray-500 cursor-pointer rounded-lg p-2"
                @click="limpiarBusqueda"
              >
                <div class="mr-4 py-8">
                  <div
                    class="h-9 w-20 rounded-sm flex items-center justify-center text-3xl"
                  >
                    <img
                      :src="obtenerImagen(game)"
                      alt="juego"
                      style="width: 200px; height: 100px; object-fit: cover"
                      class="rounded"
                    />
                  </div>
                </div>
                <div>
                  <div
                    class="font-bold text-lg text max-w-5xl"
                    style="word-wrap: break-word"
                  >
                    {{ game.name }}
                  </div>
                  <div class="text-xs text-white">
                    <span class="mr-2">{{
                game.genres?.map((genre) => genre.name).join(", ")
              }}</span>
              <span class="mr-2"
                ><div class="flex">
                  <p class="mt-2">
                    {{
                      game.metacritic !== null ? game.metacritic + "%" : "N/A"
                    }}
                  </p>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-4 h-4 ms-1 mt-2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        stroke="currentColor"
                        class="text-yellow-500 fill-current"
                      />
                    </svg>
                  </div></div
              ></span>
                  </div>
                </div>
              </router-link>
              <div v-if="search_games.length > 5">
                <router-link
                  :to="{
                    name: 'results',
                    params: { busqueda: searchQuery || 'hola' },
                  }"
                  @click="limpiarBusqueda"
                >
                  <button
                    type="button"
                    class="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    Más resultados
                  </button>
                </router-link>
              </div>
            </div>
          </div>

          <router-link :to="{ name: 'login' }">
            <button
              type="button"
              v-if="!isLoggedIn"
              class="sm:block hidden ms-6 text-white lg:ms-2 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Acceder <i class="ms-1 fa-solid fa-right-to-bracket"></i>
            </button>
          </router-link>

          <button
            v-if="isLoggedIn"
            type="button"
            class="sm:flex hidden ms-2 items-center text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span class="sr-only">Open user menu</span>
            <div class="flex items-center">
              <img
                class="w-10 h-10 rounded-full object-cover"
                :src="foto_perfil"
                alt="user photo"
              />
              <span class="ml-2 pr-2">{{ this.usuario.usuario }}</span>
            </div>
          </button>

          <!-- Dropdown menu -->

          <div
            class="z-50 hidden my-4 text-base list-none divide-y rounded-lg shadow bg-gray-700 divide-gray-600"
            id="user-dropdown"
          >
            <div class="px-4 py-3">
              <span class="block text-sm text-white"
                >{{ this.usuario.nombre }} {{ this.usuario.apellidos }}</span
              >
              <span class="block text-sm truncate text-gray-400">{{
                this.usuario.email
              }}</span>
            </div>
            <ul class="py-2" aria-labelledby="user-menu-button">
              <li>
                <router-link
                  :to="{
                    name: 'profile',
                    params: {
                      id: this.usuario && this.usuario.id ? this.usuario.id : 1,
                    },
                  }"
                  class="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
                  >Perfil</router-link
                >
              </li>
              <li>
                <router-link
                  :to="{
                    name: 'collections',
                    params: {
                      id: this.usuario && this.usuario.id ? this.usuario.id : 1,
                    },
                  }"
                  class="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
                  >Mis colecciones</router-link>
              </li>
              <li>
                <p
                  @click="cerrarSesion"
                  class="cursor-pointer block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
                >
                  Cerrar Sesión
                </p>
              </li>
            </ul>
          </div>
        </div>

        <button
          data-collapse-toggle="mobile-menu-2"
          type="button"
          class="inline-flex items-center p-2 ml-1 text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
          aria-controls="mobile-menu-2"
          aria-expanded="false"
          @click="quitarAbsolute"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div
        class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="mobile-menu-2"
      >
        <div class="relative mt-3 md:hidden">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <svg
              class="w-5 h-5 text-gray-500"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="search-navbar"
            class="block w-full p-2 pl-10 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search..."
            @input="buscar"
            v-model="searchQuery"
            @keydown="checkEnterKey"
          />
        </div>
        <router-link
          v-for="game in search_games.slice(0, 4)"
          :key="game.id"
          :to="{ name: 'game', params: { id: game.id } }"
          class="md:hidden flex mb-4 hover:bg-gray-500 cursor-pointer rounded-lg p-2"
          @click="limpiarBusqueda"
        >
          <div class="mr-4 py-8">
            <div
              class="h-9 w-20 rounded-sm flex items-center justify-center text-3xl"
            >
              <img
                :src="obtenerImagen(game)"
                alt="juego"
                style="width: 200px; height: 100px; object-fit: cover"
                class="rounded"
              />
            </div>
          </div>
          <div>
            <div
              class="font-bold text-lg text max-w-5xl"
              style="word-wrap: break-word"
            >
              {{ game.name }}
            </div>
            <div class="text-xs text-white">
              <span class="mr-2">{{
                game.genres?.map((genre) => genre.name).join(", ")
              }}</span>
              <span class="mr-2"
                ><div class="flex">
                  <p class="mt-2">
                    {{
                      game.metacritic !== null ? game.metacritic + "%" : "N/A"
                    }}
                  </p>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-4 h-4 ms-1 mt-2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        stroke="currentColor"
                        class="text-yellow-500 fill-current"
                      />
                    </svg>
                  </div></div
              ></span>
            </div>
          </div>
        </router-link>
        <div v-if="search_games.length > 5" class="md:hidden">
          <router-link
            :to="{
              name: 'results',
              params: { busqueda: searchQuery || 'hola' },
            }"
            @click="limpiarBusqueda"
          >
            <button
              type="button"
              class="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Más resultados
            </button>
          </router-link>
        </div>
        <ul
          class="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700"
        >
          <li>
            <router-link :to="{ name: 'home' }"
            class="block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent md:p-0 md:hover:text-blue-500"
            aria-current="page"
            id="menuInicio"
            >
              Inicio
            </router-link>
          </li>
          <li>

            <router-link :to="{ name: 'social' }"
              href="#"
              class="block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent md:p-0 md:hover:text-blue-500"
              id="menuSocial"
              >Social</router-link
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent md:p-0 md:hover:text-blue-500"
              >Sobre Nosotros</a
            >
          </li>
          
        </ul>
        <router-link :to="{ name: 'login' }">
          <button
            type="button"
            v-if="!isLoggedIn"
            class="md:hidden mt-2 text-white lg:ms-2 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Acceder <i class="ms-1 fa-solid fa-right-to-bracket"></i>
          </button>
        </router-link>
        <button
          v-if="isLoggedIn"
          type="button"
          class="md:hidden mt-2 flex text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-600"
          id="user-menu-button"
          aria-expanded="false"
          data-dropdown-toggle="user-dropdown"
          data-dropdown-placement="bottom"
        >
          <span class="sr-only">Open user menu</span>
          <img
            class="w-10 h-10 rounded-full object-cover"
            :src="foto_perfil"
            alt="user photo"
          />
          <p class="md:hidden ms-2 mt-2 pr-2">{{ this.usuario.usuario }}</p>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import Cookies from "js-cookie";
import axios from "axios";

export default {
  inject: ["$http"], // inyectar la instancia de Axios

  computed: {
    isLoggedIn() {
      return Cookies.get("isLoggedIn") !== undefined;
    },
    obtenerImagen() {
      return function (game) {
        // Si la imagen está disponible en el objeto game, se devuelve su URL.
        if (game.background_image) {
          return game.background_image;
        }
        // De lo contrario, se devuelve una imagen por defecto.
        return "https://via.placeholder.com/264x352";
      };
    },
  },

  data() {
    return {
      usuario: {},
      foto_perfil: "https://flowbite.com/docs/images/examples/image-2@2x.jpg",
      search_games: [],
      searchQuery: "",
    };
  },

  mounted() {
    if (Cookies.get("isLoggedIn") !== undefined) {
      this.usuario = JSON.parse(Cookies.get("isLoggedIn"));
      this.cargarFotoPerfil();
    }
  },

  methods: {
    cerrarSesion() {
      Cookies.remove("isLoggedIn");
      window.location.reload();
    },
    checkEnterKey(event) {
      if (event.key === "Enter" || event.keyCode === 13 || event.which === 13) {
        // Verificar si se presionó la tecla Enter o se hizo clic en el botón "Enviar"
        this.goToGame();
      }
    },
    goToGame() {
      if (this.searchQuery.trim() !== "") {
        // Realizar la acción de enlace de router aquí
        const busqueda = this.searchQuery ? this.searchQuery : "hola";
        this.$router.push({
          name: "results",
          params: { busqueda: busqueda },
        });
        this.limpiarBusqueda();
      }
    },
    quitarAbsolute() {
      setTimeout(() => {
        if (
          document.getElementById("mobile-menu-2") &&
          document.getElementById("cuerpo")
        )
          if (
            document
              .getElementById("mobile-menu-2")
              .classList.contains("hidden")
          ) {
            document.getElementById("cuerpo").classList.add("absolute");
          } else {
            document.getElementById("cuerpo").classList.remove("absolute");
          }
      }, 0.1);
    },
    limpiarBusqueda() {
      this.searchQuery = "";
      this.search_games = [];
      if (
        !document.getElementById("mobile-menu-2").classList.contains("hidden")
      ) {
        document.getElementById("mobile-menu-2").classList.add("hidden");
      }
    },
    async buscar(event) {
      this.search_games = [];
      // Tu lógica o llamada a la función aquí
      await this.obtenerJuegosPorBusqueda(event.target.value);
      if (event.target.value === "") this.search_games = [];
    },

    async obtenerJuegosPorBusqueda(juego) {
      const url = `/games?search="` + juego + '""';
      const response = await this.$http.get(url);

      this.search_games = response.data.results;
    },
    cargarFotoPerfil() {
      axios
        .post(
          "https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/conseguirImagen.php",
          {
            id: this.usuario.id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          // Manejar la respuesta del servidor
          if (response.data !== "" && response.data !== "Error") {
            this.foto_perfil = "data:image/jpeg;base64," + response.data;
          } else {
            // Las credenciales son incorrectas
            this.foto_perfil =
              "https://flowbite.com/docs/images/examples/image-2@2x.jpg";
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
