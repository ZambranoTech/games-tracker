<template>
  <template v-if="eresPropietario">
  <div class="mt-8 flex items-center justify-center">
    <div
      class="bg-gray-800 w-full flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10 p-6 my-2 mx-4 rounded-2xl"
    >
      <div class="-mx-3 md:w-[80%]">
        <div class="px-3 mb-5">
          <label for="" class="text-xs font-semibold px-1">Nombre</label>
          <div class="flex text-gray-900">
            <div
              class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
            >
              <font-awesome-icon icon="fa-solid fa-gamepad" />
            </div>
            <input
              type="text"
              class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              placeholder="Escriba un nombre"
              required
              v-model="nombre"
              maxlength="30"
              :disabled="desactivar_nombre"
              id="inputNombre"
            />
          </div>
          <div id="error-message-nombre" class="text-red-500 hidden"></div>
        </div>
        <div>
          <div class="px-3 mb-5">
            <label
              for="message"
              class="block mb-2 text-sm font-medium text-white"
              >Descripción</label
            >
            <textarea
              id="message"
              rows="4"
              v-model="descripcion"
              :disabled="desactivar_descripcion"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Deja tu descripción, si tu quieres"
              maxlength="300"
              @input="contarCaracteresDescripcion"
            ></textarea>
            <span class="text-white text-sm"
                    >{{ characterCount }}/300 caracteres</span
                  >
          </div>
        </div>
        <div class="px-3 mb-5 w-[75%] md:w-1/2">
          <label for="default-search">Agregar Juegos</label>
          <div class="relative mt-2">
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
            </div>
            <input
              type="search"
              id="default-search"
              class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Buscar juegos..."
              @input="buscar"
              required
            />
            <div
              v-if="search_games.length >= 1"
              class="absolute z-50 max-w-lg w-full p-3 pl-4 items-center bg-gray-600 rounded-lg mt-2 overflow-y-scroll max-h-[540px]"
            >
              <div
                v-for="game in this.search_games"
                :key="game.id"
                class="flex mb-4 hover:bg-gray-500 cursor-pointer rounded-lg p-2"
              >
                <div class="mr-4 py-8">
                  <div
                    class="h-9 w-20 rounded-sm flex items-center justify-center text-3xl"
                  >
                    <img
                      :src="obtenerImagenJuegoBusqueda(game)"
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
                  <div class="text-xs text-gray-500">
                    <button
                      type="button"
                      class="w-16 h-12 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      @click="agregarJuegoBusqueda(game)"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex -mx-3 mb-3">
        <div class="w-full px-2 pr-20 mb-5">
          <label for="" class="text-xs font-semibold px-1"
            >Imagen de Coleccion</label
          >
          <div class="flex">
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              @change="handleImageChange"
            />
          </div>
          <img
            id="previewImage"
            class="bg-black max-h-[200px] max-w-[290px] mt-2 md:px-0 md:max-w-md rounded-lg shadow-xl dark:shadow-gray-800"
            :src="selectedImage"
            alt="image description"
          />
        </div>
      </div>
    </div>
  </div>

  <div>
    <div class="mt-8 flex items-center justify-center">
      <div
        class="bg-gray-700 w-full flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10 p-6 my-2 mx-4 rounded-2xl"
      >
        <!-- Content -->
        <div class="w-full flex-1 px-2 sm:px-0">
          <div class="flex justify-between items-center">
            <h3 class="text-3xl font-extralight text-white/50">
              {{ this.juegosEnColeccion && this.juegosEnColeccion.length? this.juegosEnColeccion.length: '0' }} Juegos
            </h3>
            <div class="inline-flex items-center space-x-2">
              <div
                class="bg-gray-900 text-white/50 p-2 rounded-md hover:text-white smooth-hover cursor-pointer"
                @click="cambiarFilaColumna(true)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
              </div>
              <div
                class="bg-gray-900 text-white/50 p-2 rounded-md hover:text-white smooth-hover cursor-pointer"
                @click="cambiarFilaColumna(false)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </div>

              <div
                class="bg-gray-900 text-white/50 p-2 rounded-md hover:text-white smooth-hover"
                @click="eliminarJuegoColeccion()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            class="overflow-x-auto pb-[14px] flex flex-row flex-nowrap md:flex-wrap flex-auto xmb-10 sm:mb-0 mt-2 gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-grow"
            id="flexColeccion"
          >
            <template v-if="juegos_cargados">
              <template v-for="juego in juegosEnColeccion" :key="juego.id">
                  <div
                    class="mb-4 max-w-[300px] min-w-[300px] w-full relative group bg-gray-900 py-10 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover"
                    @click="seleccionarJuego(juego.id)"
                    >
                    <img
                      :src="obtenerImagen(juego.id)"
                      style="
                        width: 264px;
                        height: 152px;
                        object-fit: cover;
                        padding: calc((152px - 100%) / 2)
                          calc((264px - 100%) / 2);
                      "
                      class="rounded hover:opacity-75 transition ease-in-out duration-150"
                    />

                    <h4
                      class="text-white text-2xl font-bold capitalize text-center"
                    >
                      {{ juego ? juego.name : "-" }}
                    </h4>
                    <div class="flex">
                      <p>
                        {{
                          juego && juego.released
                            ? juego.released
                            : "Proximamente..."
                        }}
                      </p>
                      <div class="ms-4 flex">
                        <p>
                          {{
                            juego && juego.metacritic
                              ? juego.metacritic + "%"
                              : "N/A"
                          }}
                        </p>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6 ms-1"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                            stroke="currentColor"
                            class="text-yellow-500 fill-current"
                          />
                        </svg>
                      </div>
                    </div>
                    <p class="text-gray-400 text-center">
                      {{
                        juego
                          ? juego.genres?.map((genre) => genre.name).join(", ")
                          : "-"
                      }}
                    </p>
                    <div
                      class="absolute top-2 left-4 text-white/20 inline-flex items-center text-xs"
                    >
                      <input
                        :id="juego.id"
                        :value="juego.id"
                        type="checkbox"
                        class="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                      />
                    </div>
                  </div>
              </template>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
  <template v-if="juegos_cargados">
    <div class="flex -mx-3">
      <div class="w-full px-3 mb-5">
        <button
          class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
          @click="guardarCambios"
        >
          Guardar Estos Cambios
        </button>
      </div>
    </div>
  </template>
</template>
</template>

<script>
//import moment from 'moment';
import axios from "axios";
import { reactive } from "vue";
import Cookies from "js-cookie";
import navigationCount from "../logica/navigationCount";
import Compressor from 'compressorjs';


export default {
  inject: ["$http"], // inyectar la instancia de Axios

  data() {
    return {
      infoColeccion: [],
      juegosColecciones: reactive({}), // Objeto reactivo para almacenar los juegos de las colecciones
      selectedImage:
        "https://cdn.dribbble.com/users/1868020/screenshots/10055960/media/b868eae80cd2d17052965ef1bd130c02.jpg?compress=1&resize=400x300&vertical=top",
      search_games: [],
      juegosEnColeccion: [],
      juegos_cargados: false,
      nombre: "",
      descripcion: "",
      desactivar_nombre: false,
      desactivar_descripcion: false,
      nombre_coleccion: "",
      descripcion_coleccion: "",
      foto_coleccion: "",
      id_juegosColeccion: [],
      characterCount: 0,
      eresPropietario: false,
      haCambiadoDeImagen: false,
    };
  },

  computed: {
    obtenerImagenJuegoBusqueda() {
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
  beforeRouteLeave(to, from, next) {
    const unsavedChanges = this.comprobarSiHasRealizadoCambios();
    
    if (unsavedChanges) {
      const confirmMessage = '¿Estás seguro de que quieres salir sin haber guardado los cambios?';

      if (confirm(confirmMessage)) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  },

  created() {
  window.addEventListener('beforeunload', this.handleBeforeUnload);
  window.addEventListener('unload', this.handleUnload);
},

beforeUnmount() {
  window.removeEventListener('beforeunload', this.handleBeforeUnload);
  window.removeEventListener('unload', this.handleUnload);
},

  mounted() {
    this.conseguirInformacionColeccion().then(async () => {
      this.comprobarSiEresPropietario();
      this.nombre = this.infoColeccion[0].nombre;
      this.obtenerImagenColeccion();
      
      if (this.infoColeccion[0].personalizada === "0" && this.infoColeccion[0].nombre === 'Quiero') {
        this.descripcion =
          "Lista de juegos que quiere " + this.infoColeccion[0].nombre_usuario;
        this.desactivar_nombre = true;
        this.desactivar_descripcion = true;
      } else if (this.infoColeccion[0].personalizada === "0" && this.infoColeccion[0].nombre === 'Jugando' ) {
        this.descripcion =
          "Lista de juegos que está jugando " + this.infoColeccion[0].nombre_usuario;
        this.desactivar_nombre = true;
        this.desactivar_descripcion = true;
      } else if (this.infoColeccion[0].personalizada === "0" && this.infoColeccion[0].nombre === 'Terminado' ) {
        this.descripcion =
          "Lista de juegos que ha terminado " + this.infoColeccion[0].nombre_usuario;
        this.desactivar_nombre = true;
        this.desactivar_descripcion = true;
      } else {
        this.descripcion = this.infoColeccion[0]?.descripcion;
        this.characterCount = this.descripcion?.length;
      }
      if (this.infoColeccion[0] && this.infoColeccion[0].id_juego) {
      for (let coleccion in this.infoColeccion) {
        await this.obtenerJuegoColeccion(
          this.infoColeccion[coleccion].id_juego
        );
      }
      }
      this.juegos_cargados = true;
    });
  },

  methods: {
    async conseguirInformacionColeccion() {
      await axios
        .post(
          "https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/conseguirInformacionColeccion.php",
          {
            id_coleccion: this.$route.params.id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.data !== "Errornull") {
            const jsonData = JSON.stringify(response.data);
            this.infoColeccion = JSON.parse(jsonData);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    handleBeforeUnload(event) {
    const unsavedChanges = this.comprobarSiHasRealizadoCambios();

    if (unsavedChanges) {
      event.returnValue = '¿Estás seguro de que quieres salir sin haber guardado los cambios?';
    }
  },

  handleUnload() {
    // Realizar acciones de limpieza o guardar datos si es necesario
  },
    comprobarSiEresPropietario() {
      if (Cookies.get("isLoggedIn")) {
        const id_usuario_coleccion = this.infoColeccion[0].id_usuario;
        const isLoggedIn = JSON.parse(Cookies.get("isLoggedIn"));
        if (id_usuario_coleccion === isLoggedIn.id) {
          this.eresPropietario = true;
        } else {
          this.eresPropietario = false;
        }
      } else {
        // El código cuando la cookie 'isLoggedIn' no está presente
      }
    },
    comprobarSiHasRealizadoCambios() {
      const idsJuegosEnColeccion = [];
    const idsQueEstabanEnColeccion = [];

      //ids de los juegos presentes en la pagina
      for (const juego in this.juegosEnColeccion) {
        idsJuegosEnColeccion.push(String(this.juegosEnColeccion[juego].id));
      }

      //ids de los juegos antes de modificar en la pagina
      for (const juego2 in this.infoColeccion) {
        idsQueEstabanEnColeccion.push(this.infoColeccion[juego2].id_juego);
      }

      const idsJuegosEnColeccionString = JSON.stringify(idsJuegosEnColeccion);
      const idsQueEstabanEnColeccionString = JSON.stringify(
        idsQueEstabanEnColeccion
      );
      console.log(idsJuegosEnColeccionString);
      console.log(idsQueEstabanEnColeccionString);
      console.log("si " + this.haCambiadoDeImagen);
      if (this.infoColeccion[0].personalizada == '1')
      if (idsJuegosEnColeccionString === idsQueEstabanEnColeccionString && this.infoColeccion[0].nombre == this.nombre &&  this.infoColeccion[0].descripcion == this.descripcion && !this.haCambiadoDeImagen || idsQueEstabanEnColeccionString === '[null]' && idsJuegosEnColeccionString === "[]" && this.infoColeccion[0].nombre == this.nombre &&  this.infoColeccion[0].descripcion == this.descripcion && !this.haCambiadoDeImagen) {
        return false;
      } else {
        return true;
      }
      else if (this.infoColeccion[0].personalizada == '0')
      if (idsJuegosEnColeccionString === idsQueEstabanEnColeccionString  && !this.haCambiadoDeImagen || idsQueEstabanEnColeccionString === '[null]' && idsJuegosEnColeccionString === "[]"  && !this.haCambiadoDeImagen) {
        console.log("Hola");
        return false;
      } else {
        return true;
      }
    },
    eliminarJuegoColeccion() {
    // Obtener todos los elementos <input> de tipo checkbox que estén marcados
const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

// Obtener los valores de los checkboxes seleccionados utilizando el método map
const values = Array.from(checkboxes).map((checkbox) => checkbox.value);
console.log(values);



  for (let id_seleccionado in values) {
    delete this.juegosColecciones[parseInt(values[id_seleccionado])];
  }

  for (let id in this.juegosEnColeccion) {
    console.log(String(this.juegosEnColeccion[id].id));
    for (let id_seleccionado in values) {
      console.log(String(values[id_seleccionado]));
       if (String(this.juegosEnColeccion[id].id) === String(values[id_seleccionado])) {
        this.juegosEnColeccion.splice(id, 1);
       }
      }
  }
},
contarCaracteresDescripcion(event) {
  this.characterCount = event.target.value.length;
},
    seleccionarJuego(id) {
      if (document.getElementById(id).checked)
      document.getElementById(id).checked = false;
      else
      document.getElementById(id).checked = true;
    },
    guardarCambios() {
      
      const idsJuegosEnColeccion = [];
      const idsQueEstabanEnColeccion = [];

      //ids de los juegos presentes en la pagina
      for (const juego in this.juegosEnColeccion) {
        idsJuegosEnColeccion.push(String(this.juegosEnColeccion[juego].id));
      }

      //ids de los juegos antes de modificar en la pagina
      for (const juego2 in this.infoColeccion) {
        idsQueEstabanEnColeccion.push(this.infoColeccion[juego2].id_juego);
      }

      const idsJuegosEnColeccionString = JSON.stringify(idsJuegosEnColeccion);
      const idsQueEstabanEnColeccionString = JSON.stringify(
        idsQueEstabanEnColeccion
      );

      var idsAlReves = this.juegosEnColeccion.map(function(juego) {
      return juego.id;
      }).reverse();
      
      const count = navigationCount.count;
      const id = this.$route.params;

      if (idsJuegosEnColeccionString !== idsQueEstabanEnColeccionString) {
        this.guardarJuegos(idsAlReves).then(() => {
          if (this.infoColeccion[0].personalizada === "0") {
            this.nombre_coleccion = this.infoColeccion[0].nombre;
            this.descripcion_coleccion = null;
          } else {
            this.nombre_coleccion = this.nombre;
            this.descripcion_coleccion = this.descripcion;
          }
          this.guardarInfoBasicaColeccion().then(() => {
            if (count > 1) 
              this.$router.go(-1);
             else 
            this.$router.replace({ name: 'collection', params: { id } });
            
        });
        });
      } else {
        if (this.infoColeccion[0].personalizada === "0") {
        this.nombre_coleccion = this.infoColeccion[0].nombre;
        this.descripcion_coleccion = null;
        this.guardarInfoBasicaColeccion().then(() => {
          if (count > 1) 
              this.$router.go(-1);
             else 
            this.$router.replace({ name: 'collection', params: { id } });
        });
      } else {
        this.nombre_coleccion = this.nombre;
        this.descripcion_coleccion = this.descripcion;
        this.guardarInfoBasicaColeccion().then(() => {
          if (count > 1) 
              this.$router.go(-1);
             else 
            this.$router.replace({ name: 'collection', params: { id } });
        });
      }
      }
       
    },
    async obtenerImagenColeccion() {
      await axios
        .post(
          "https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/conseguirImagenColeccion.php",
          {
            id: this.$route.params.id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.data !== "Errornull" && response.data !== "") {
            console.log("correcto");
            this.selectedImage = "data:image/jpeg;base64," + response.data;
          }
        })
        .catch((error) => {
          console.error(error);
        });
      // Si la imagen está disponible en el objeto game, se devuelve su URL.
    },
    saveImageToDatabase() {
      // Obtener la imagen en formato base64
      const base64Image = this.selectedImage.split(",")[1];
      this.foto_coleccion = base64Image;
    },
    async guardarInfoBasicaColeccion() {
      this.saveImageToDatabase();
      // Los campos son válidos, procede con el envío del formulario
      await axios
        .post(
          "https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/editarColeccion.php",
          {
            id: this.$route.params.id,
            nombre: this.nombre_coleccion,
            descripcion: this.descripcion_coleccion,
            foto: this.foto_coleccion,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          // Manejar la respuesta del servidor
          if (response.data === "OK") {
            // se ha podido modificar :)
            console.log("agregado");
          } else {
            // Las credenciales son incorrectas
            console.log("error no se pudo editar");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    async guardarJuegos(idsJuegos) {
      // Los campos son válidos, procede con el envío del formulario
      await axios
        .post(
          "https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/editarJuegosColeccion.php",
          {
            id: this.infoColeccion[0].id_coleccion,
            juegos: idsJuegos,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          // Manejar la respuesta del servidor
          if (response.data === "OK") {
            // se ha podido guardar :)
           
          } else {
            // Las credenciales son incorrectas
            console.log("error no se pudo editar");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    agregarJuegoBusqueda(game) {
      if (this.juegos_cargados && !this.juegosColecciones[game.id]) {
        this.juegosColecciones = {
          ...this.juegosColecciones,
          [game.id]: game,
        };
        this.juegosEnColeccion.unshift(game);
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
    handleImageChange(event) {
    this.haCambiadoDeImagen = true;
  const file = event.target.files[0];
  if (file) {
    const maxSize = 1024 * 1024; // 1 MB en bytes

    const options = {
      maxWidth: 1024, // Ancho máximo de la imagen comprimida
      maxHeight: 1024, // Altura máxima de la imagen comprimida
      quality: 0.8, // Calidad de compresión (valor entre 0 y 1)
      mimeType: 'image/jpeg' // Tipo MIME de la imagen comprimida
    };

    new Compressor(file, {
      ...options,
      success: (compressedFile) => {
        if (compressedFile.size <= maxSize) {
          const reader = new FileReader();

          reader.onload = (event) => {
            this.selectedImage = event.target.result;
            // Aquí puedes enviar this.selectedImage a tu base de datos en base64
          };

          reader.readAsDataURL(compressedFile);
        } else {
          console.log('La imagen comprimida excede el tamaño máximo permitido de 1 MB.');
        }
      },
      error(err) {
        console.log('Error al comprimir la imagen:', err.message);
      }
    });
  }
},
    cambiarFilaColumna(esUnaFila) {
      if (esUnaFila) {
        document.getElementById("flexColeccion").classList.remove("flex-wrap");
        document
          .getElementById("flexColeccion")
          .classList.remove("md:flex-wrap");
        document.getElementById("flexColeccion").classList.add("flex-nowrap");
        document
          .getElementById("flexColeccion")
          .classList.add("overflow-x-scroll");
      } else {
        document.getElementById("flexColeccion").classList.add("flex-wrap");
        document
          .getElementById("flexColeccion")
          .classList.remove("flex-nowrap");
        document
          .getElementById("flexColeccion")
          .classList.remove("overflow-x-scroll");
      }
    },
    obtenerImagen(id_juego) {
      // Si la imagen está disponible en el objeto game, se devuelve su URL.
      if (
        this.juegosColecciones[id_juego] &&
        this.juegosColecciones[id_juego].background_image
      ) {
        return this.juegosColecciones[id_juego].background_image;
      }
      // De lo contrario, se devuelve una imagen por defecto.
      return "https://via.placeholder.com/364x252";
    },
    async obtenerJuegoColeccion(id_coleccion) {
      if (!this.juegosColecciones[id_coleccion]) {
        await this.conseguirJuego(id_coleccion)
          .then((juego) => {
            if (!this.juegosColecciones[juego.id]) {
              console.log(juego.name);
              this.juegosEnColeccion.push(juego);
              this.juegosColecciones = {
                ...this.juegosColecciones,
                [id_coleccion]: juego,
              };
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    async conseguirJuego(IDJuego) {
      const url = `/games/${IDJuego}`;
      const response = await this.$http.get(url);
      return response.data;
    },
  },
};
</script>

<style>
button {
  background-color: aquamarine;
}
</style>
