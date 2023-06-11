<template>
    <section class="mx-4 mb-4">
      
      <div
          class="bg-gray-700 py-3 px-4 rounded-lg flex justify-around items-center mb-4"
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

        <div class="bg-gray-900 flex items-center justify-center">
          <div
            class="bg-gray-800 w-full flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10 p-6 rounded-2xl"
          >
            <!-- Content -->
            <div class="w-full flex-1 px-2 sm:px-0">
              <div class="flex items-center mb-4">
                <h3 class="text-3xl font-extralight text-white/50">
                  Seguidores de
                </h3>
                <router-link
              :to="{
                name: 'profile',
                params: {
                  id:
                    this.perfil.id
                      ? this.perfil.id
                      : 1,
                },
              }"
              class="ms-4 mt-4 flex flex-nowrap cursor-pointer"
            >
              <img
                class="w-8 h-8 mb-2 rounded-full object-cover"
                :src="foto_perfil"
                alt="user photo"
              />
              <p class="ms-1">@{{ this.perfil.usuario }}</p>
            </router-link>
              </div>
  
              <div
                class="overflow-x-auto pb-[14px] flex flex-row flex-wrap flex-auto xmb-10 sm:mb-0 mt-2 gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-grow"
                id="flexPersonalizada"
              >
                <p v-if="ArrayFiltrado.length <= 0">
                  No se encuentran resultados
                </p>
                  <template
                    v-for="jugador in ArrayFiltrado"
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
                              <router-link :to="{
                          name: 'followers',
                          params: {
                            id: jugador ? jugador.id : 1,
                          },
                        }" class="p-3 text-center">
                                <span
                                  class="text-xl font-bold block uppercase tracking-wide "
                                  >{{ jugador.num_seguidores? jugador.num_seguidores : "" }}</span
                                >
                                <span class="text-sm text-slate-400">Seguidores</span>
                              </router-link>
                              <router-link :to="{
                          name: 'follows',
                          params: {
                            id: jugador ? jugador.id : 1,
                          },
                        }" class="p-3 text-center">
                                <span
                                  class="text-xl font-bold block uppercase tracking-wide "
                                  >{{ jugador.num_seguidos? jugador.num_seguidos : "" }}</span
                                >
                                <span class="text-sm text-slate-400"
                                  >Seguidos</span
                                >
                              </router-link>
  
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
                                @click="seguirEliminarJugador(jugador.id)"
                                href="javascript:;"
                                class="font-normal  hover:text-slate-400"
                                :id="jugador.id"
                                >  {{ isLoggedIn && isLoggedIn.id != jugador.id? jugadorSeguido(jugador.id) ? 'Dejar de seguir' : 'Seguir' : !isLoggedIn? jugadorSeguido(jugador.id)?  'Dejar de seguir' : 'Seguir' : "" }}</a
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template> 
              </div>
            </div>
          </div>
        </div>
    </section>
  </template>
  
  <script>
  import axios from "axios";
  import moment from 'moment';
  import 'moment/locale/es';
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';
  import Cookies from 'js-cookie';
  
  export default {
  
    data() {
      return {
        jugadoresSeguidores: [],
        seguidos: [],
        isLoggedIn: '',
        busqueda: '',
        perfil: '',
        foto_perfil: 'https://flowbite.com/docs/images/examples/image-2@2x.jpg',
      };
    },

  beforeRouteUpdate(to, from, next) {
    setTimeout(() => {
      window.location.reload();
    }, 100);

    next();
  },

 
    mounted() {
      //agregar que estamos en el inicio de color azul en el navbar
      this.isLoggedIn = Cookies.get('isLoggedIn') ? JSON.parse(Cookies.get('isLoggedIn')) : null
      this.conseguirPerfil();
      this.obtenerImagenPerfil();
      this.conseguirjugadoresSeguidores();
    },
    computed: {
    jugadorSeguido() {
      return (jugadorId) => {
        return this.seguidos.some((seguido) => seguido.seguidoID.toString() === jugadorId.toString());
      };
    },
    ArrayFiltrado() {
    const searchTerm = this.busqueda?.toLowerCase() || '';

    if (Array.isArray(this.jugadoresSeguidores)) {
        return this.jugadoresSeguidores.filter(
          jugador => jugador.usuario.toLowerCase().includes(searchTerm)
        );
      } else {
        return [];
      }
    },
  },
    methods: {
      async conseguirjugadoresSeguidores() {
        await axios
            .post(
              "https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/obtenerJugadoresSeguidores.php",
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
              console.log(response);
              if (response.data !== "Errornull") {
                const jsonData = JSON.stringify(response.data);
                this.jugadoresSeguidores = JSON.parse(jsonData);
  
                this.comprobarSeguidos();
              }
            })
            .catch((error) => {
              console.error(error);
            });
      },
      async obtenerImagenPerfil() {
      await axios
        .post(
          "https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/conseguirImagen.php",
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
      conseguirPerfil() {
      return new Promise((resolve, reject) => {
        axios
          .post(
            "https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/conseguirPerfil.php",
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
            if (response.data !== "Errornull") {
              const jsonData = JSON.stringify(response.data);
              this.perfil = JSON.parse(jsonData);

              resolve(true); // Resuelve la promesa con true si se cumple la condición
            } else {
              reject(false); // Rechaza la promesa con false si no se cumple la condición
            }
          })
          .catch((error) => {
            console.error(error);
            reject(false); // Rechaza la promesa con false en caso de error
          });
      });
    },
      async comprobarSeguidos() {
      if (Cookies.get("isLoggedIn"))
      await axios.post(
            "https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/obtenerSeguidos.php",
            {
              id: JSON.parse(Cookies.get("isLoggedIn")).id,
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
              this.seguidos = JSON.parse(jsonData);
            } 
          })
          .catch((error) => {
            console.error(error);
          });
    },
      
      async seguirEliminarJugador(id_seguido) {
        if (Cookies.get("isLoggedIn")) {
          await axios
          .post(
            "https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/agregarEliminarSeguido.php",
            {
              id_seguidor: JSON.parse(Cookies.get("isLoggedIn")).id,
              id_seguido: id_seguido,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            // Manejar la respuesta del servidor
            console.log(response.data);
            if (response.data === "Insertado") {
              // se ha podido registrar :)
              document.getElementById(id_seguido).textContent = "Dejar de Seguir";
            }  else if (response.data === "Eliminado") {
              document.getElementById(id_seguido).textContent = "Seguir";
            }else {
              // Las credenciales son incorrectas
              console.log("error");
            }
          })
          .catch((error) => {
            console.error(error);
          });
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
      actualizarBusqueda(event) {
        this.busqueda = event.target.value.toLowerCase();
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
          return myMoment(fecha_reg).format("D [de] MMMM [de] YYYY");
        } else {
          return "-";
        }
      }
    }
  };
  </script>
  