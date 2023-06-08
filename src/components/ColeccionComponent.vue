<template>
  <div>
    <div class="bg-gray-900 mt-8 flex items-center justify-center">
      <div
        class="bg-gray-800 w-full flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10 p-6 my-2 mx-4 rounded-2xl"
      >
        <img
          :src="foto_coleccion"
          class="h-40 w-56 rounded-lg mx-auto object-cover "
        />

        <!-- Content -->
        <div class="w-full flex-1 px-2 sm:px-0">
          <div class="flex justify-between items-center">
            <h3 class="text-3xl text-white/80 font-semibold">
              {{ this.infoColeccion[0]?.nombre }}
            </h3>
            <div class="inline-flex items-center space-x-2">
              <template v-if="eresPropietario">
                <router-link
                  :to="{
                    name: 'editCollection',
                    params: {
                      id: this.$route.params.id,
                    },
                  }"
                  class="bg-gray-900 text-white/50 p-2 rounded-md hover:text-white smooth-hover"
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
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </router-link>

                <div
                class="bg-gray-900 text-white/50 p-2 rounded-md hover:text-white smooth-hover cursor-pointer"
                @click="toggleEliminarModal()"
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
              </template>
            </div>
          </div>
          <div class="flex flex-nowrap mt-4 md:mt-0">
            <p class="text-gray-400 mr-2">
              Creado el {{ formattedFechaCreacion }} por
            </p>
            <router-link
              :to="{
                name: 'profile',
                params: {
                  id:
                    infoColeccion[0] && infoColeccion[0].id_usuario
                      ? infoColeccion[0].id_usuario
                      : 1,
                },
              }"
              class="flex flex-nowrap cursor-pointer"
            >
              <img
                class="w-8 h-8 mb-2 rounded-full object-cover"
                :src="foto_perfil"
                alt="user photo"
              />
              <p class="ms-1">@{{ this.infoColeccion[0]?.usuario }}</p>
            </router-link>
          </div>
          <p id="descripcion">{{ this.infoColeccion[0]?.descripcion }}</p>
        </div>
      </div>
    </div>
  </div>

  <div class="pr-8 pl-8 md:pl-12 md:pr-12">
    <div class="mt-2 flex items-center justify-center">
      <div
        class="bg-gray-700 w-full flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10 p-6 my-2 mx-4 rounded-2xl"
      >
      <div class="w-full flex-1 px-2 sm:px-0">
        <div class="flex justify-between items-center">
          <h3 class="text-3xl font-extralight text-white/50 "> {{ this.infoColeccion[0] && this.infoColeccion[0].id_juego? this.infoColeccion.length: '0' }} Juegos</h3>
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
          </div>
        </div>
        <div
          class="overflow-x-scroll md:overflow-auto pb-[14px] flex flex-row flex-nowrap md:flex-wrap flex-auto xmb-10 sm:mb-0 mt-2 gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-grow"
          id="flexColeccion"
        >
          <template
            v-for="coleccion in infoColeccion"
            :key="coleccion.id_coleccion"
          >
            <template v-if="!juegosColecciones[coleccion.id_juego] && this.infoColeccion[0] && this.infoColeccion[0].id_juego">
              <span v-if="obtenerJuegoColeccion(coleccion.id_juego)"></span>
            </template>
            <template v-else> </template>
            <template v-if="this.infoColeccion[0] && this.infoColeccion[0].id_juego">
            <router-link
              :to="{
                name: 'game',
                params: {
                  id:
                    this.juegosColecciones[coleccion.id_juego] &&
                    this.juegosColecciones[coleccion.id_juego].id
                      ? this.juegosColecciones[coleccion.id_juego].id
                      : 1,
                },
              }"
            >
              <div
                class="juegos mb-4 max-w-[300px] h-full w-full relative group bg-gray-900 py-10 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover"
              >
                <img
                  :src="obtenerImagen(coleccion.id_juego)"
    
                  class="rounded hover:opacity-75 transition ease-in-out duration-150 w-[364px] h-[152px] object-cover"
                />

                <h4
                  class="text-white text-2xl font-bold capitalize text-center"
                >
                  {{
                    this.juegosColecciones[coleccion.id_juego]
                      ? this.juegosColecciones[coleccion.id_juego].name
                      : "-"
                  }}
                </h4>
                <div class="flex">
                  <p>
                    {{
                      this.juegosColecciones[coleccion.id_juego] &&
                      this.juegosColecciones[coleccion.id_juego].released
                        ? this.juegosColecciones[coleccion.id_juego].released
                        : "Proximamente..."
                    }}
                  </p>
                  <div class="ms-4 flex">
                    <p>
                      {{
                        this.juegosColecciones[coleccion.id_juego] &&
                        this.juegosColecciones[coleccion.id_juego].metacritic
                          ? this.juegosColecciones[coleccion.id_juego]
                              .metacritic + "%"
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
                    this.juegosColecciones[coleccion.id_juego]
                      ? this.juegosColecciones[coleccion.id_juego].genres
                          ?.map((genre) => genre.name)
                          .join(", ")
                      : "-"
                  }}
                </p>
                <div
                  class="absolute top-2 left-4 text-white/20 inline-flex items-center text-xs"
                ></div>
              </div>
            </router-link>
          </template>
          </template>
        </div>
      </div>
      </div>
    </div>
  </div>

  <!--modal para eliminar la coleccion-->
<div
id="eliminar-modal"
tabindex="-1"
class="modal-open fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
>
<div class="relative w-full max-w-md max-h-full">
  <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
    <button
      type="button"
      class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
      @click="toggleEliminarModal"
    >
      <svg
        aria-hidden="true"
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <span class="sr-only">Cerrar modal</span>
    </button>
    <div class="p-6 text-center">
      <svg
        aria-hidden="true"
        class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
        ¿Estás seguro de eliminar esta coleccion?
      </h3>
      <button
        @click="eliminarColeccion"
        type="button"
        class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
      >
        Si, estoy seguro
      </button>
      <button
        @click="toggleEliminarModal"
        type="button"
        class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        id="cancelarEliminarModal"
        >
        No, cancelar
      </button>
    </div>
  </div>
</div>
</div>

</template>

<script>
//import moment from 'moment';
import axios from "axios";
import { reactive } from "vue";
import Cookies from "js-cookie";
import moment from "moment";
import { Modal } from "flowbite";
import navigationCount from "../logica/navigationCount";


export default {
  inject: ["$http"], // inyectar la instancia de Axios

  data() {
    return {
      infoColeccion: "",
      juegosColecciones: reactive({}), // Objeto reactivo para almacenar los juegos de las colecciones
      eresPropietario: false,
      foto_perfil: 'https://flowbite.com/docs/images/examples/image-2@2x.jpg',
      foto_coleccion: "https://cdn.dribbble.com/users/1868020/screenshots/10055960/media/b868eae80cd2d17052965ef1bd130c02.jpg?compress=1&resize=400x300&vertical=top",
      modal_eliminar: ''
    };
  },

  
  mounted() {

    this.conseguirColecciones()
      .then(() => {
        this.obtenerImagenColeccion();
        // Se cumple la condición
        this.cambiarFilaColumna(false);
        this.comprobarSiEresPropietario();
        this.obtenerImagenPerfil();

        if (this.infoColeccion[0].personalizada === "0" && this.infoColeccion[0].nombre === 'Quiero') {
          document.getElementById("descripcion").textContent =
          "Lista de juegos que quiere " + this.infoColeccion[0].nombre_usuario;

      } else if (this.infoColeccion[0].personalizada === "0" && this.infoColeccion[0].nombre === 'Jugando' ) {
        document.getElementById("descripcion").textContent =
          "Lista de juegos que está jugando " + this.infoColeccion[0].nombre_usuario;

      } else if (this.infoColeccion[0].personalizada === "0" && this.infoColeccion[0].nombre === 'Terminado' ) {
        document.getElementById("descripcion").textContent = "Lista de juegos que ha terminado " + this.infoColeccion[0].nombre_usuario;

      } else {
        this.descripcion = this.infoColeccion[0]?.descripcion;
      }
      })
      .catch(() => {
        // No se cumple la condición (credenciales incorrectas o error)
        // Realizar acciones adicionales aquí
      });
      this.configurarEliminarModal();
  },
  computed: {
    formattedFechaCreacion() {
      const myMoment = moment; // Asigna moment a una nueva variable
      if (this.infoColeccion[0]?.fecha_creacion) {
        return myMoment(new Date(this.infoColeccion[0].fecha_creacion)).format(
          "D [de] MMMM [de] YYYY"
        );
      } else {
        return "-";
      }
    },
  },

  methods: {
    async conseguirColecciones() {
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
    obtenerID() {
      if (Cookies.get("isLoggedIn") !== undefined) {
        return JSON.parse(Cookies.get("isLoggedIn")).id;
      }
      return -1;
    },
    async eliminarColeccion() {
      await axios
        .post(
          "https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/eliminarColeccion.php",
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
          console.log(response.data);
          if (response.data == "OK" ) {
            this.toggleEliminarModal();
            // Acceder al contador
            const count = navigationCount.count;
            if (count > 1) {
              this.$router.go(-1);
            } else {
            const isLoggedIn = Cookies.get("isLoggedIn");
            const id = isLoggedIn ? JSON.parse(isLoggedIn).id : 1;
            this.$router.replace({ name: 'profile', params: { id } });
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    beforeRouteUpdate(to, from, next) {
    setTimeout(() => {
      window.location.reload();
    }, 100);

    next();
  },
  toggleEliminarModal() {
      this.modal_eliminar.toggle();
    },
  configurarEliminarModal() {
      // set the modal menu element
      const targetEl = document.getElementById("eliminar-modal");

      // options with default values
      const options = {
        placement: "center",
        backdropClasses:
          "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40",
        onHide: () => {},
        onShow: () => {},
        onToggle: () => {},
      };

      this.modal_eliminar = new Modal(targetEl, options);
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

          var juegosElements = document.getElementsByClassName("juegos");
for (var i = 0; i < juegosElements.length; i++) {
  juegosElements[i].classList.add("min-w-[300px]");
}
      } else {
        document.getElementById("flexColeccion").classList.add("flex-wrap");
        document
          .getElementById("flexColeccion")
          .classList.remove("flex-nowrap");
        document
          .getElementById("flexColeccion")
          .classList.remove("overflow-x-scroll");
          var juegosElements2 = document.getElementsByClassName("juegos");
for (var e = 0; e < juegosElements2.length; e++) {
  juegosElements2[e].classList.remove("min-w-[300px]");
}
      }
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
    async obtenerImagenPerfil() {
      await axios
        .post(
          "https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/conseguirImagen.php",
          {
            id: this.infoColeccion[0].id_usuario,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.data !== "Errornull" && response.data !== "" ) {
            this.foto_perfil = "data:image/jpeg;base64," + response.data;
          }
        })
        .catch((error) => {
          console.error(error);
        });
      // Si la imagen está disponible en el objeto game, se devuelve su URL.
      
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
          if (response.data !== "Errornull" && response.data !== "" ) {
            console.log("correcto");
            this.foto_coleccion= "data:image/jpeg;base64," + response.data;
          }
        })
        .catch((error) => {
          console.error(error);
        });
      // Si la imagen está disponible en el objeto game, se devuelve su URL.
      
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
      if (!this.juegosColecciones[id_coleccion]){
      await this.conseguirJuego(id_coleccion)
          .then((juego) => {
            if (!this.juegosColecciones[juego.id]){
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
