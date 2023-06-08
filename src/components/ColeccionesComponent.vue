<template>
  <div class="">
    <div class="p-1 shadow mt-4">

      <template v-if="this.coleccionesPersonalizadas.length > 0">
        <div class="bg-gray-900 mt-8 flex items-center justify-center">
          <div
            class="bg-gray-800 w-full flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10 p-6 my-2 mx-4 rounded-2xl"
          >
            <!-- Content -->
            <div class="w-full flex-1 px-2 sm:px-0">
              <div class="flex justify-between items-center">
                <h3 class="text-3xl font-extralight text-white/50">
                  Colecciones Personalizadas
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
              <template v-if="eresPropietario">
              <div @click="toggleColeccionModal" class="group max-w-[300px] min-w-[300px]  bg-gray-900/30 py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/40 hover:smooth-hover">
          <a class="bg-gray-900/70 text-white/50 group-hover:text-white group-hover:smooth-hover flex w-20 h-20 rounded-full items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </a>
            Crear una Coleccion Personalizada
        </div>
        </template>
                <template
                  v-for="coleccion in coleccionesPersonalizadas"
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
                      <p>Creado el {{coleccion && coleccion.fecha_creacion? formattedFechaReg(coleccion.fecha_creacion) : "-" }}</p>

                      <p class="text-gray-400 text-center">
                        {{
                          coleccion && coleccion.descripcion
                            ? coleccion.descripcion.length > 50
                              ? coleccion.descripcion.slice(0, 50) + "..."
                              : coleccion.descripcion
                            : ""
                        }}
                      </p>

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
              </div>
            </div>
          </div>
        </div>
      </template>


      <template v-if="this.coleccionesPredeterminadas.length > 0">
        <div class="bg-gray-900 mt-8 flex items-center justify-center">
          <div
            class="bg-gray-800 w-full flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10 p-6 my-2 mx-4 rounded-2xl"
          >
            <!-- Content -->
            <div class="w-full flex-1 px-2 sm:px-0">
              <div class="flex justify-between items-center">
                <h3 class="text-3xl font-extralight text-white/50">
                  Colecciones Predeterminadas
                </h3>
                <div class="inline-flex items-center space-x-2">
                  <div
                    class="bg-gray-900 text-white/50 p-2 rounded-md hover:text-white smooth-hover cursor-pointer"
                    @click="cambiarFilaColumna('Predeterminada', true)"
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
                    @click="cambiarFilaColumna('Predeterminada', false)"                  
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
                id="flexPredeterminada"
              >
                <template
                  v-for="coleccion in coleccionesPredeterminadas"
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
                      class="juegos_p2 mb-4 max-w-[300px] min-w-[300px] h-full relative group bg-gray-900 py-10 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover"
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
                      <p>Creado el {{coleccion && coleccion.fecha_creacion? formattedFechaReg(coleccion.fecha_creacion) : "-" }}</p>

                      <p class="text-gray-400 text-center">
                        {{
                          coleccion && coleccion.descripcion
                            ? coleccion.descripcion.length > 50
                              ? coleccion.descripcion.slice(0, 50) + "..."
                              : coleccion.descripcion
                            : ""
                        }}
                      </p>

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
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>

  <!--Modal para agregar nueva coleccion-->
  <div
    id="coleccion-modal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    data-modal-backdrop="static"
  >
  <div class="relative w-full max-w-md max-h-full">
      <div class="relative bg-gray-800 rounded-lg shadow dark:bg-gray-700">
        <button
          type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          @click="toggleColeccionModal"
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
        <div class="p-6">
          <h3 class="mb-5 text-lg font-normal text-gray-200 dark:text-gray-40 text-center">
            Crear Coleccion
          </h3>
          <div class="-mx-3">
        <div class="px-3 mb-5">
          <label for="" class="text-xs font-semibold px-1">Nombre</label>
          <div class="flex text-gray-900">
            <div
              class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center mx-auto"
            >
              <font-awesome-icon icon="fa-solid fa-gamepad" />
            </div>
            <input
              type="text"
              class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              placeholder="Escriba un nombre"
              required
              v-model="nombre_coleccion"
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
              v-model="descripcion_coleccion"
              :disabled="desactivar_descripcion"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Deja tu descripción, si tu quieres"
              maxlength="300"
              @input="contarCaracteresDescripcion"
            ></textarea>
            <span class="text-white text-sm"
                    >{{ characterCount2 }}/300 caracteres</span
                  >
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
              ref="fileInput"
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
      <button type="button" class="focus:outline-none text-white w-full bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 mt-2" @click="agregarColeccionPersonalizada()">Añadir nueva Coleccion</button>

        </div>

        
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import { Modal } from "flowbite";
import Cookies from "js-cookie";
import Compressor from 'compressorjs';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import moment from 'moment';

export default {
  inject: ["$http"], // inyectar la instancia de Axios
  data() {
    return {
      coleccionesPersonalizadas: [],
      coleccionesPredeterminadas: [],
      modal_coleccion: '',
      characterCount2: 0,
      foto_coleccion: '',
      eresPropietario: false,
      selectedImage: 'https://cdn.dribbble.com/users/1868020/screenshots/10055960/media/b868eae80cd2d17052965ef1bd130c02.jpg?compress=1&resize=400x300&vertical=top',
      nombre_coleccion: '',
      descripcion_coleccion: '',

    };
  },
  
  mounted() {
    this.configurarColeccionModal();
    this.comprobarSiEresPropietario();
    this.conseguirColeccionesPersonalizadas();
    this.conseguirColeccionesPredeterminadas();
  },

  beforeRouteUpdate(to, from, next) {
    setTimeout(() => {
      window.location.reload();
    }, 100);

    next();
  },


  methods: {
    cambiarFilaColumna(nombreColeccion, esUnaFila) {
      if (nombreColeccion === "Personalizada") {
        if (esUnaFila) {
          document
            .getElementById("flexPersonalizada")
            .classList.remove("flex-wrap");
          document
            .getElementById("flexPersonalizada")
            .classList.add("flex-nowrap");
          document
            .getElementById("flexPersonalizada")
            .classList.add("overflow-x-scroll");
          let juegosElements = document.getElementsByClassName("juegos_p");
          for (let i = 0; i < juegosElements.length; i++) {
            juegosElements[i].classList.add("min-w-[300px]");
          }
        } else {
          document
            .getElementById("flexPersonalizada")
            .classList.add("flex-wrap");
          document
            .getElementById("flexPersonalizada")
            .classList.remove("flex-nowrap");
          document
            .getElementById("flexPersonalizada")
            .classList.remove("overflow-x-scroll");
          let juegosElements2 = document.getElementsByClassName("juegos_p");
          for (let e = 0; e < juegosElements2.length; e++) {
            juegosElements2[e].classList.remove("min-w-[300px]");
          }
        }
      } else if (nombreColeccion === "Predeterminada") {
        if (esUnaFila) {
          document
            .getElementById("flexPredeterminada")
            .classList.remove("flex-wrap");
          document
          .getElementById("flexPredeterminada")
            .classList.add("flex-nowrap");
          document
          .getElementById("flexPredeterminada")
            .classList.add("overflow-x-scroll");
          let juegosElements = document.getElementsByClassName("juegos_p2");
          for (let i = 0; i < juegosElements.length; i++) {
            juegosElements[i].classList.add("min-w-[300px]");
          }
        } else {
          document
          .getElementById("flexPredeterminada")
            .classList.add("flex-wrap");
          document
          .getElementById("flexPredeterminada")
            .classList.remove("flex-nowrap");
          document
          .getElementById("flexPredeterminada")
            .classList.remove("overflow-x-scroll");
          let juegosElements2 = document.getElementsByClassName("juegos_p2");
          for (let e = 0; e < juegosElements2.length; e++) {
            juegosElements2[e].classList.remove("min-w-[300px]");
          }
        }
      }
    },
    formattedFechaReg(fecha_reg) {
      const myMoment = moment; // Asigna moment a una nueva variable
      if (fecha_reg) {
        return myMoment(fecha_reg).format("D [de] MMMM [de] YYYY");
      } else {
        return "-";
      }
    },
    comprobarSiEresPropietario() {
      if (Cookies.get("isLoggedIn")) {
        const id_usuario_colecciones = this.$route.params.id;
        const isLoggedIn = JSON.parse(Cookies.get("isLoggedIn"));
        if (id_usuario_colecciones === isLoggedIn.id) {
          this.eresPropietario = true;
        } else {
          this.eresPropietario = false;
        }
      } else {
        // El código cuando la cookie 'isLoggedIn' no está presente
      }
    },
   
    async agregarColeccionPersonalizada() {
      if (this.nombre_coleccion.trim() !== ""){
      this.saveImageToDatabase();
      // Los campos son válidos, procede con el envío del formulario
      await axios
        .post(
          "https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/agregarColeccionPersonalizada.php",
          {
            id_usuario: JSON.parse(Cookies.get('isLoggedIn')).id,
            nombre: this.nombre_coleccion,
            descripcion: this.descripcion_coleccion,
            foto: this.foto_coleccion
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(async (response) => {
          console.log(response.data);
          // Manejar la respuesta del servidor
          if (response.data === "OK") {
            // se ha podido modificar :)
            this.toggleColeccionModal();
            toast.success('¡La Coleccion se ha creado correctamente y se ha insertado el juego!', { 
  position: toast.POSITION.TOP_CENTER, 
  theme: 'dark',
  autoClose: 2000,
  closeOnClick: true,
  pauseOnHover: false,
  
});   
            this.$refs.fileInput.value = null
            this.options = [];
            this.nombre_coleccion = '';
            this.descripcion_coleccion = '';
            this.selectedImage = 'https://cdn.dribbble.com/users/1868020/screenshots/10055960/media/b868eae80cd2d17052965ef1bd130c02.jpg?compress=1&resize=400x300&vertical=top';
            this.foto_coleccion = '';
            await this.conseguirColeccionesPersonalizadas();
           
          } else {
            // Las credenciales son incorrectas
            toast.warning('¡Debes de añadir al menos un nombre!', { 
  position: toast.POSITION.TOP_CENTER, 
  theme: 'dark',
  autoClose: 2000,
  closeOnClick: true,
  pauseOnHover: false,
});
          }
        })
        .catch((error) => {
          console.error(error);
        });
      } else {
        toast.warning('¡Debes introducir un nombre valido!', { 
  position: toast.POSITION.TOP_CENTER, 
  theme: 'dark',
  autoClose: 2000,
  closeOnClick: true,
  pauseOnHover: false,
});
      }
    },
  configurarColeccionModal() {
      // set the modal menu element
      const targetEl = document.getElementById("coleccion-modal");

      // options with default values
      const options = {
        placement: "center",
        backdropClasses:
          "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40",
        onHide: () => {},
        onShow: () => {},
        onToggle: () => {},
      };

      this.modal_coleccion = new Modal(targetEl, options);
    },

    async conseguirColeccionesPersonalizadas() {
      await axios
        .post(
          "https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/conseguirColeccionesPersonalizadas.php",
          {
            id_usuario: this.$route.params.id,
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
            this.coleccionesPersonalizadas = JSON.parse(jsonData);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    async conseguirColeccionesPredeterminadas() {
      await axios
        .post(
          "https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/conseguirColeccionesPredeterminadas.php",
          {
            id_usuario: this.$route.params.id,
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
            this.coleccionesPredeterminadas = JSON.parse(jsonData);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    handleImageChange(event) {
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

    saveImageToDatabase() {
      // Obtener la imagen en formato base64
      const base64Image = this.selectedImage.split(",")[1];
      this.foto_coleccion = base64Image;
    },
    
    toggleColeccionModal() {
      this.modal_coleccion.toggle();
    },

   
  },
};
</script>
<style>
.truncate-2-lines {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
