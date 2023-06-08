<template>
  <section>
    <div class="mx-4 flex flex-wrap md:flex-nowrap">
      <div class="mb-6 col-span-1 w-full lg:w-[20%] md:mr-6 md:min-w-[300px]">
        <div
          class="bg-gray-600 py-3 px-4 rounded-lg flex justify-around items-center"
        >
          <input
            type="text"
            v-model="busqueda"
            @input="actualizarBusqueda"
            placeholder="Buscar..."
            class="bg-gray-700 rounded-md outline-none pl-2 ring-indigo-700 w-full mr-2 p-2"
          />
          <span
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              /></svg
          ></span>
        </div>
        <div class="bg-gray-600 rounded-md">
          <h1
            class="text-center text-xl mt-2 py-2 text-white uppercase font-semibold"
          >
            Filtro Busqueda
          </h1>
          <div class="rounded-md list-none text-center p-2">
            <VueMultiselect
              class="cursor-pointer text-gray-600"
              v-model="selectedOption"
              :options="options"
              :searchable="false"
              :close-on-select="true"
              :show-labels="false"
              :allow-empty="false"
              @select="seleccionarOpcion"
            >
            </VueMultiselect>
          </div>
        </div>
      </div>
      <div class="bg-gray-900 flex items-center justify-center">
        <div
          class="bg-gray-800 w-full flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10 p-6 rounded-2xl"
        >
          <!-- Content -->
          <div class="w-full flex-1 px-2 sm:px-0">
            <div class="flex justify-between items-center gap-8 mb-4">
              <h3 class="text-3xl font-extralight text-white/50">
                {{
                  this.selectedOption == "Jugadores"
                    ? this.busqueda != ""
                      ? "Jugadores buscados"
                      : "Jugadores más recientes"
                    : this.busqueda != ""
                    ? "Colecciones buscadas"
                    : "Colecciones con más Juegos"
                }}
              </h3>
              <div class="inline-flex items-center space-x-2">
                <div
                  class="bg-gray-900 text-white/50 p-2 rounded-md hover:text-white smooth-hover cursor-pointer"
                  @click="cambiarFilaColumna('Personalizada', true)"
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
                  @click="cambiarFilaColumna('Personalizada', false)"
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
              class="overflow-x-auto pb-[14px] flex flex-row flex-wrap flex-auto xmb-10 sm:mb-0 mt-2 gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-grow"
              id="flexPersonalizada"
            >
              <p v-if="ArrayFiltrado.length <= 0">
                No se encuentran resultados
              </p>
              <template v-if="this.selectedOption == 'Jugadores'">
                <template
                  v-for="jugador in ArrayFiltrado.slice(0, 3)"
                  :key="jugador.id"
                >
                  <div
                    class="relative min-w-[280px] max-w-[280px] break-words bg-gray-900 text-white  w-full shadow-lg rounded-xl mb-16 mt-16"
                  >
                    <div class="px-6">
                      <div class="flex flex-wrap justify-center">
                        <div class="w-full flex justify-center">
                          <div class="relative">
                            <img
                              :src="
                                jugador.foto_perfil
                                  ? 'data:image/jpeg;base64,' +
                                    jugador.foto_perfil
                                  : 'https://flowbite.com/docs/images/examples/image-2@2x.jpg'
                              "
                              class="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px] min-h-[150px] object-cover"
                              style="width: 150px; height: 150px"
                            />
                          </div>
                        </div>
                        <div class="w-full text-center mt-20">
                          <div class="flex justify-center lg:pt-4 pt-8 pb-0">
                            <div class="p-3 text-center">
                              <span
                                class="text-xl font-bold block uppercase tracking-wide "
                                >3,360</span
                              >
                              <span class="text-sm text-slate-400">Photos</span>
                            </div>
                            <div class="p-3 text-center">
                              <span
                                class="text-xl font-bold block uppercase tracking-wide "
                                >2,454</span
                              >
                              <span class="text-sm text-slate-400"
                                >Followers</span
                              >
                            </div>

                            <div class="p-3 text-center">
                              <span
                                class="text-xl font-bold block uppercase tracking-wide "
                                >{{ jugador.num_juegos }}</span
                              >
                              <span class="text-sm text-slate-400"
                                >Terminados</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <router-link
                        :to="{
                          name: 'profile',
                          params: {
                            id: jugador.id ? jugador.id : 1,
                          },
                        }"
                        class="text-center mt-2"
                      >
                        <h3
                          class="text-2xl  font-bold leading-normal mb-1"
                        >
                          @{{ jugador.usuario }}
                        </h3>
                        <div class="text-md mt-0 mb-2 text-slate-300 font-bold">
                          <i
                            class="fas fa-map-marker-alt mr-2 text-slate-300 opacity-100"
                          ></i
                          >{{ jugador.nombre }} {{ jugador.apellidos }},
                          {{ conseguirEdad(jugador.fecha_nac) }}
                        </div>
                        <div
                          class="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase"
                        >
                          <i
                            class="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"
                          ></i
                          >Unido el {{ formattedFechaReg(jugador.fecha_reg) }}
                        </div>
                      </router-link>
                      <div
                        class="mt-6 py-6 border-t border-slate-200 text-center"
                      >
                        <div class="flex flex-wrap justify-center">
                          <div class="w-full px-4">
                            <a
                              @click="seguirJugador"
                              href="javascript:;"
                              class="font-normal  hover:text-slate-400"
                              >Seguir</a
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </template>

                <template v-if="this.selectedOption == 'Colecciones'">
                  <template
                    v-for="coleccion in ArrayFiltrado"
                    :key="coleccion.id_coleccion"
                  >
                    <router-link
                      :to="{
                        name: 'collection',
                        params: {
                          id:
                            coleccion && coleccion.id_coleccion
                              ? coleccion.id_coleccion
                              : 1,
                        },
                      }"
                    >
                      <div
                        class="juegos_p mb-4 max-w-[300px] min-w-[300px] h-full relative group bg-gray-900 py-10 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover"
                      >
                        <img
                          :src="
                            coleccion.foto_coleccion
                              ? 'data:image/jpeg;base64,' +
                                coleccion.foto_coleccion
                              : 'https://cdn.dribbble.com/users/1868020/screenshots/10055960/media/b868eae80cd2d17052965ef1bd130c02.jpg?compress=1&resize=400x300&vertical=top'
                          "
                          alt="Imagen de la colección"
                          class="rounded hover:opacity-75 transition ease-in-out duration-150 w-[364px] h-[152px] object-cover"
                        />

                        <h4
                          class="text-white text-2xl font-bold capitalize text-center"
                        >
                          {{ coleccion ? coleccion.nombre : "-" }}
                        </h4>

                        <div class="flex flex-nowrap mt-4 md:mt-0">
            <p>
              Creado el {{ formattedFechaReg(coleccion.fecha_creacion) }}
            </p>
           
          </div>
         
                        <p class="text-gray-400 text-center">
                          {{
                            coleccion && coleccion.descripcion
                              ? coleccion.descripcion.length > 50
                                ? coleccion.descripcion.slice(0, 50) + "..."
                                : coleccion.descripcion
                              : ""
                          }}
                        </p>
                        <router-link
              :to="{
                name: 'profile',
                params: {
                  id:
                    coleccion && coleccion.id_usuario
                      ? coleccion.id_usuario
                      : 1,
                },
              }"
              class="flex flex-nowrap cursor-pointer"
            >
              <img
                class="w-8 h-8 mb-2 rounded-full object-cover mt-2"
                :src="getFotoPerfil(coleccion.id_usuario)"
                alt="user photo"
              />
              <p class="ms-1 mt-2">@{{ coleccion.usuario }}</p>
            </router-link>
                        <p
                          class="absolute top-2 text-white/20 inline-flex items-center text-xs"
                        >
                          {{ coleccion.num_juegos }} Juegos
                          <span
                            class="ml-2 w-2 h-2 block bg-green-500 rounded-full group-hover:animate-pulse"
                          ></span>
                        </p>
                      </div>
                    </router-link>
                  </template>
                </template>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import moment from 'moment';
import VueMultiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Cookies from 'js-cookie';

export default {
  components: { VueMultiselect},

  data() {
    return {
      busqueda: '',
      jugadores: "",
      colecciones: '',
      selectedOption: 'Jugadores',
      options: ['Jugadores', 'Colecciones']
    };
  },
  mounted() {
    //agregar que estamos en el inicio de color azul en el navbar
    document.getElementById("menuSocial").classList.add("bg-blue-700", "md:text-blue-500");
    this.conseguirJugadores();
    this.conseguirColecciones();
  },
  computed: {
  ArrayFiltrado() {
    const searchTerm = this.busqueda?.toLowerCase() || '';

    if (this.selectedOption === 'Jugadores') {
      if (Array.isArray(this.jugadores)) {
        return this.jugadores.filter(
          jugador => jugador.usuario.toLowerCase().includes(searchTerm)
        );
      } else {
        return [];
      }
    } else if (this.selectedOption === 'Colecciones') {
      if (Array.isArray(this.colecciones)) {
        return this.colecciones.filter(
          coleccion => coleccion.nombre.toLowerCase().includes(searchTerm)
        );
      } else {
        return [];
      }
    } else {
      return [];
    }
  },
},
  methods: {
    async conseguirJugadores() {
      await axios
          .post(
            "https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/conseguirJugadores.php",
            {

            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response);
            if (response.data !== "Errornull") {
              const jsonData = JSON.stringify(response.data);
              this.jugadores = JSON.parse(jsonData);
              console.log(this.jugadores);
            }
          })
          .catch((error) => {
            console.error(error);
          });
    },
    getFotoPerfil(id) {
      if (this.jugadores.length> 0){
      const jugador = this.jugadores.find(jugador => jugador.id == id);

    if (jugador && jugador.foto_perfil) {
      return 'data:image/jpeg;base64,' + jugador.foto_perfil;
    } else {
      return 'https://flowbite.com/docs/images/examples/image-2@2x.jpg';
    }
  }
    },
    seguirJugador() {
      if (Cookies.get("isLoggedIn")) {
        console.log("a");
      } else {
        toast.warning('¡Debes iniciar sesión para realizar esta acción!', { 
  position: toast.POSITION.TOP_CENTER, 
  theme: 'dark',
  autoClose: 2000,
  closeOnClick: true,
  pauseOnHover: false,
});
      }
    },
    async conseguirColecciones() {
      await axios
          .post(
            "https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/conseguirTodasLasColeccionesPersonalizadas.php",
            {

            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response);
            if (response.data !== "Errornull") {
              const jsonData = JSON.stringify(response.data);
              this.colecciones = JSON.parse(jsonData);
              console.log(this.colecciones);
            }
          })
          .catch((error) => {
            console.error(error);
          });
    },
    actualizarBusqueda(event) {
      this.busqueda = event.target.value.toLowerCase();
      this.jugadoresFiltrados;
    },
    conseguirEdad(fecha_nac) {
      const fechaNacimiento = new Date(fecha_nac);
      const fechaActual = new Date();
      // Calcula la diferencia en milisegundos entre la fecha actual y la fecha de nacimiento
      const diferenciaMilisegundos = fechaActual - fechaNacimiento;

      // Calcula la edad en años redondeando hacia abajo
      const edad = Math.floor(
        diferenciaMilisegundos / (1000 * 60 * 60 * 24 * 365)
      );

      return edad;
    },
    formattedFechaReg(fecha_reg) {
      const myMoment = moment; // Asigna moment a una nueva variable
      if (fecha_reg) {
        return myMoment(fecha_reg).format("D MMMM YYYY");
      } else {
        return "-";
      }
    }
  }
};
</script>
