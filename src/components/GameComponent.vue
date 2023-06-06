<script setup>
import { ref } from "vue";
import { Tabs, Tab } from "flowbite-vue";

const activeTab = ref("first");
</script>

<template>
  <div
    class="bg-black background"
    v-bind:style="{
      'background-image': 'url(' + game.background_image_additional + ')',
    }"
  ></div>

  <div
    id="cuerpo"
    class="cuerpo flex flex-wrap absolute top-52 lg:ms-40 justify-center text-center md:text-left md:justify-start"
  >
    <div class="caratula">
      <img
        :src="obtenerImagen"
        :alt="game.name"
        style="width: 264px; height: 352px; object-fit: cover"
        class="rounded"
      />

      <button
        class="mt-4 group rounded-2xl bg-blue-700 lg:h-12 font-bold text-lg text-white relative overflow-hidden"
        style="width: 100%"
        id="cerrarValoracionModal"
        :disabled="!isLoggedIn"
        v-if="!ya_valorado"
        @click="toggleValorarModal"
      >
        Escribir una reseña
        <div
          class="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/30 rounded-2xl"
        ></div>
      </button>

      <button
        class="mt-4 group rounded-2xl bg-red-700 lg:h-12 font-bold text-lg text-white relative overflow-hidden"
        style="width: 100%"
        v-if="ya_valorado"
        @click="toggleEliminarModal"
      >
        Borrar tu reseña
        <div
          class="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/30 rounded-2xl"
        ></div>
      </button>

      <div class="flex mt-2 collections flex-wrap" style="width: 100%">
        <button class="btn bg-gray-900" @click="agregarColeccionPredeterminada('Quiero')" :disabled="!isLoggedIn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 inline-block mr-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Quiero
          <font-awesome-icon icon="fa-solid fa-check" class="text-green-500 invisible" id="checkQuiero"></font-awesome-icon>
        </button>

        <button class="btn bg-gray-900" @click="agregarColeccionPredeterminada('Jugando')">
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
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
            />
          </svg>

          Jugando
          <font-awesome-icon icon="fa-solid fa-check" class="text-green-500 invisible" id="checkJugando"></font-awesome-icon>
        </button>

        <button class="btn bg-gray-900" @click="agregarColeccionPredeterminada('Terminado')">
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
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          Terminado
          <font-awesome-icon icon="fa-solid fa-check" class="text-green-500 invisible" id="checkTerminado"></font-awesome-icon>
        </button>
      </div>
    </div>

    <div class="ms-5 mt-6 md:w-[800px] 2xl:w-[1100px]">
      <div class="info-basica lg:w-2xl">
        <h1 ref="gameTitle" class="font font-bold text-6xl" style="word-wrap: break-word" :class="{'lg:text-6xl': isMultiLine === 1 || isMultiLine === 2, 'lg:text-5xl': isMultiLine >= 3}">          
          {{ game.name }}
        </h1>
        <p class="mt-8 text-xl text-gray-300">
          {{ game.released? formatReleaseDate(game.released): "Proximamente..." }}
        </p>
        <p class="mt-8 text-xl text-gray-300 italic">
          {{ game.publishers && game.publishers.length !==0? game.publishers.map((publisher) => publisher.name).join(", "): "-" }}
        </p>
      </div>

      <div class="descripcion-y-mas  flex flex-wrap mt-6" :class="{'lg:mt-24': isMultiLine === 1, 'lg:mt-10': isMultiLine === 2, 'lg:mt-16': isMultiLine === 3}">
        <tabs variant="underline" v-model="activeTab" class="p-5 lg:w-[47rem]">
          <!-- class appends to content DIV for all tabs -->
          <tab name="first" title="Detalles" class="detalles">
            <div v-html="game.description"></div>
          </tab>
          <tab name="second" title="Añadir a">
            Elige una colección
            <VueMultiselect :custom-label="customLabel" class="cursor-pointer text-gray-600" v-model="selectedOption" :options="options" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" @select="seleccionarOpcion">
              <template v-slot="{ option }">
    <img :src="option.imagen" alt="Option Image" class="option-image" />
    <span v-html="option.label"></span>
  </template>
  <template v-slot:option="{ option }">
    <img :src="option.imagen" alt="Option Image2" class="option-image" />
    <span v-html="option.label"></span>
  </template>
            </VueMultiselect>
            <button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 mt-2">Nueva coleccion</button>

</tab>
          <tab name="third" title="Compartir"> Lorem... </tab>
        </tabs>
        <div
          class="valoraciones flex flex-wrap bg-gray-950 ms-4 mt-2 p-2 border-l-2 border-red-500 border-solid lg:h-48"
        >
          <div class="app_rating text-center">
            <div class="circle_app_rating m-auto">{{this.nota_rating}}</div>
            <p>
              Basado en {{ this.valoraciones.length? this.valoraciones.length: 0 }} <br />
              reseñas de miembros
            </p>
          </div>

          <div class="rawg_rating ms-8 mt-14 text-center">
            <div class="circle_global_rating m-auto">
              {{ game.metacritic !== null ? game.metacritic : "N/A" }}
            </div>

            <p>Basado en {{ game.ratings_count }} <br />reseñas de RAWG</p>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="screenshots.results && screenshots.results.length > 3"
      class="capturas text-center"
    >
      <h1 class="font-bold text-xl mt-6  2xl:mt-0">Capturas de pantalla</h1>
      <div class="container mx-auto px-5 py-2 lg:px-80 lg:pt-8">
        <div class="-m-1 flex flex-wrap md:-m-2">
          <div class="flex w-1/2 flex-wrap">
            <div v-if="trailers.results && trailers.results.length > 0">
              <div class="w-full p-1 md:p-2">
                <video
                  width="320"
                  height="240"
                  controls
                  class="block h-full w-full rounded-lg object-cover object-center"
                >
                  <source
                    :src="trailers.results[0].data.max"
                    type="video/mp4"
                  />
                  Tu navegador no soporta el elemento video.
                </video>
              </div>
            </div>

            <div class="w-full p-1 md:p-2" v-if="screenshots.results[0]">
              <img
                alt="captura 1"
                class="block h-full w-full rounded-lg object-cover object-center hover:opacity-75 tansition easy-in-out duration-150 cursor-pointer"
                :src="screenshots.results[0].image"
                @click="selectImage(1)"
              />
            </div>

            <div class="w-1/2 p-1 md:p-2" v-if="screenshots.results[1]">
              <img
                alt="Captura 2"
                class="block h-full w-full rounded-lg object-cover object-center hover:opacity-75 tansition easy-in-out duration-150 cursor-pointer"
                :src="screenshots.results[1].image"
                @click="selectImage(3)"
              />
            </div>

            <div class="w-1/2 p-1 md:p-2" v-if="screenshots.results[2]">
              <img
                alt="Captura 3"
                class="block h-full w-full rounded-lg object-cover object-center hover:opacity-75 tansition easy-in-out duration-150 cursor-pointer"
                :src="screenshots.results[2].image"
                @click="selectImage(4)"
              />
            </div>
          </div>
          <div
            class="flex w-1/2 flex-wrap"
            v-if="screenshots.results.length > 3"
          >
            <div class="w-full p-1 md:p-2" v-if="screenshots.results[3]">
              <img
                alt="Captura 4"
                class="block h-full w-full rounded-lg object-cover object-center hover:opacity-75 tansition easy-in-out duration-150 cursor-pointer"
                :src="screenshots.results[3].image"
                @click="selectImage(2)"
              />
            </div>
            <div
              class="w-1/2 p-1 md:p-2"
              v-if="screenshots.results[4] && screenshots.results.length !== 5"
            >
              <img
                alt="Captura 5"
                class="block h-full w-full rounded-lg object-cover object-center hover:opacity-75 tansition easy-in-out duration-150 cursor-pointer"
                :src="screenshots.results[4].image"
                @click="selectImage(5)"
              />
            </div>
            <div
              class="w-full p-1 md:p-2"
              v-if="screenshots.results[4] && screenshots.results.length === 5"
            >
              <img
                alt="Captura 5"
                class="block h-full w-full rounded-lg object-cover object-center hover:opacity-75 tansition easy-in-out duration-150 cursor-pointer"
                :src="screenshots.results[4].image"
                @click="selectImage(5)"
              />
            </div>
            <div class="w-1/2 p-1 md:p-2" v-if="screenshots.results[5]">
              <img
                alt="Captura 6"
                class="block h-full w-full rounded-lg object-cover object-center hover:opacity-75 tansition easy-in-out duration-150 cursor-pointer"
                :src="screenshots.results[5].image"
                @click="selectImage(6)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="
        screenshots.results &&
        screenshots.results.length <= 3 &&
        screenshots.results.length != 2
      "
      class="capturas text-center"
    >
      <h1 class="font-bold text-xl">Capturas de pantalla</h1>
      <div class="container mx-auto px-5 py-2 lg:px-80 lg:pt-8">
        <div class="-m-1 flex flex-wrap md:-m-2">
          <div class="flex w-2/3 flex-wrap mx-auto">
            <div v-if="trailers.results && trailers.results.length > 0">
              <div class="w-full p-1 md:p-2">
                <video
                  width="320"
                  height="240"
                  controls
                  class="block h-full w-full rounded-lg object-cover object-center"
                >
                  <source
                    :src="trailers.results[0].data.max"
                    type="video/mp4"
                  />
                  Tu navegador no soporta el elemento video.
                </video>
              </div>
            </div>

            <div class="w-full p-1 md:p-2" v-if="screenshots.results[0]">
              <img
                alt="captura 1"
                class="block h-full w-full rounded-lg object-cover object-center hover:opacity-75 tansition easy-in-out duration-150 cursor-pointer"
                :src="screenshots.results[0].image"
                @click="selectImage(1)"
              />
            </div>

            <div class="w-1/2 p-1 md:p-2" v-if="screenshots.results[1]">
              <img
                alt="Captura 2"
                class="block h-full w-full rounded-lg object-cover object-center hover:opacity-75 tansition easy-in-out duration-150 cursor-pointer"
                :src="screenshots.results[1].image"
                @click="selectImage(2)"
              />
            </div>

            <div class="w-1/2 p-1 md:p-2" v-if="screenshots.results[2]">
              <img
                alt="Captura 3"
                class="block h-full w-full rounded-lg object-cover object-center hover:opacity-75 tansition easy-in-out duration-150 cursor-pointer"
                :src="screenshots.results[2].image"
                @click="selectImage(3)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="
        screenshots.results &&
        screenshots.results.length <= 3 &&
        screenshots.results.length == 2
      "
      class="capturas text-center"
    >
      <h1 class="font-bold text-xl">Capturas de pantalla</h1>
      <div class="container mx-auto px-5 py-2 lg:px-80 lg:pt-8">
        <div class="-m-1 flex flex-wrap md:-m-2">
          <div class="flex w-2/3 flex-wrap mx-auto">
            <div v-if="trailers.results && trailers.results.length > 0">
              <div class="w-full p-1 md:p-2">
                <video
                  width="320"
                  height="240"
                  controls
                  class="block h-full w-full rounded-lg object-cover object-center"
                >
                  <source
                    :src="trailers.results[0].data.max"
                    type="video/mp4"
                  />
                  Tu navegador no soporta el elemento video.
                </video>
              </div>
            </div>

            <div class="w-1/2 p-1 md:p-2" v-if="screenshots.results[0]">
              <img
                alt="captura 1"
                class="block h-full w-full rounded-lg object-cover object-center hover:opacity-75 tansition easy-in-out duration-150 cursor-pointer"
                :src="screenshots.results[0].image"
                @click="selectImage(1)"
              />
            </div>

            <div class="w-1/2 p-1 md:p-2" v-if="screenshots.results[1]">
              <img
                alt="Captura 2"
                class="block h-full w-full rounded-lg object-cover object-center hover:opacity-75 tansition easy-in-out duration-150 cursor-pointer"
                :src="screenshots.results[1].image"
                @click="selectImage(2)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="
        this.valoraciones &&
        this.valoraciones.length &&
        this.valoraciones.length > 0
      "
      class="md:w-1/2 mx-auto mt-8 p-3"
    >
      <h3 class="text-3xl font-bold">Reseñas:</h3>
      <article
        v-for="valoracion in valoraciones"
        :key="valoracion.id"
        class="border-4 border-gray-700 rounded-lg p-3 mb-4"
      >
        <!-- Generar el perfil de la reseña y guardarlo en un objeto reactivo para luego seguir usandolo -->
        <template v-if="!perfilesUsuarios[valoracion.id_usuario]">
          <span v-if="obtenerPerfilUsuario(valoracion.id_usuario)"></span>
        </template>
        <template v-else> </template>

        <router-link
          :to="{
            name: 'profile',
            params: {
              id:
                perfilesUsuarios[valoracion.id_usuario] &&
                perfilesUsuarios[valoracion.id_usuario].id
                  ? perfilesUsuarios[valoracion.id_usuario].id
                  : 1,
            },
          }"
        >
          <div class="flex items-center mb-4 space-x-4">
            <img
              class="w-10 h-10 rounded-full object-cover"
              :src="conseguirFoto(valoracion.id_usuario)"
              alt=""
            />
            <div class="space-y-1 font-medium dark:text-white">
              <p v-if="perfilesUsuarios[valoracion.id_usuario]">
                @{{ perfilesUsuarios[valoracion.id_usuario].usuario }}
                <time
                  datetime="2014-08-16 19:00"
                  class="block text-sm text-gray-500 dark:text-gray-400"
                  v-if="perfilesUsuarios[valoracion.id_usuario].fecha_reg"
                >
                  Unido en
                  {{
                    moment(
                      perfilesUsuarios[valoracion.id_usuario]?.fecha_reg
                    ).format("MMMM YYYY")
                  }}</time
                >
              </p>
            </div>
          </div>
        </router-link>
        <div class="flex items-center mb-1">
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            v-if="valoracion.puntuacion >= 20"
          >
            <title>First star</title>
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            ></path>
          </svg>
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            v-if="valoracion.puntuacion >= 40"
          >
            <title>Second star</title>
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            ></path>
          </svg>
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            v-if="valoracion.puntuacion >= 60"
          >
            <title>Third star</title>
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            ></path>
          </svg>
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            v-if="valoracion.puntuacion >= 80"
          >
            <title>Fourth star</title>
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            ></path>
          </svg>
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            v-if="valoracion.puntuacion == 100"
          >
            <title>Fifth star</title>
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            ></path>
          </svg>
        </div>
        <footer class="mb-5 text-sm text-gray-500 dark:text-gray-400">
          <p>
            Valorado el
            <time datetime="2017-03-03 19:00">
              {{
                moment(valoracion?.fecha_publicacion).format("D MMMM YYYY")
              }}</time
            >
          </p>
        </footer>
        <p
          class="mb-2 text-gray-500 dark:text-gray-400"
          v-if="perfilesUsuarios[valoracion.id_usuario]"
        >
          {{ valoracion.texto }}
        </p>
      </article>
    </div>
  </div>

  <!-- Modal toggle -->
  <button
    id="btnGaleriaModal"
    style="display: none"
    class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    type="button"
    @click="toggleGaleriaModal"
  >
    Toggle modal imagen
  </button>

  <!-- Main modal -->
  <div
    id="galeria-modal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative w-full md:h-full">
      <!-- Modal content -->
      <div class="relative bg-transparent rounded-lg shadow dark:bg-gray-700 md:h-full !important">
        <!-- Modal header -->
        <div
          class="flex items-start justify-between rounded-t dark:border-gray-600"
        >
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="toggleGaleriaModal"
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
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="relative w-full md:h-full lg:pl-24 lg:pr-24">
          <!-- Carousel wrapper -->
          <div
            class="relative h-56 overflow-hidden rounded-lg md:h-full"
          >
            <!-- Item 1 -->
            <div
              class="hidden duration-700 ease-in-out"
              id="carousel-item-1"
            >
              <img
                alt="captura 1"
                class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                v-if="
                screenshots.results &&
                screenshots.results.length > 0 &&
                screenshots.results[0]"
                :src="screenshots.results[0].image"
              />
              <img
                alt="captura 1"
                class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                v-if="
                screenshots.results &&
                screenshots.results.length == 1 &&
                screenshots.results[0]"
                :src="screenshots.results[0].image"
              />
            </div>
            <!-- Item 2 -->
            <div id="carousel-item-2" class="hidden duration-700 ease-in-out">
              <img
                alt="Captura 2"
                class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                v-if="
                screenshots.results &&
                screenshots.results.length > 0 &&
                screenshots.results[3]"
                :src="screenshots.results[3].image"
              />
            </div>
            <!-- Item 3 -->
            <div id="carousel-item-3" class="hidden duration-700 ease-in-out">
              <img
                alt="Captura 3"
                class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                v-if="
                screenshots.results &&
                screenshots.results.length > 0 &&
                screenshots.results[1]"
                :src="screenshots.results[1].image"
              />
            </div>
            <!-- Item 4 -->
            <div id="carousel-item-4" class="hidden duration-700 ease-in-out">
              <img
                alt="Captura 4"
                class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                v-if="
                screenshots.results &&
                screenshots.results.length > 0 &&
                screenshots.results[2]"
                :src="screenshots.results[2].image"
              />
            </div>
            <!-- Item 5 -->
            <div id="carousel-item-5" class="hidden duration-700 ease-in-out">
              <img
                alt="Captura 5"
                class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                v-if="
                screenshots.results &&
                screenshots.results.length > 0 &&
                screenshots.results[4]"
                :src="screenshots.results[4].image"
              />
            </div>
            <!-- Item 6 -->
            <div id="carousel-item-6" class="hidden duration-700 ease-in-out">
              <img
                alt="Captura 6"
                class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                v-if="
                screenshots.results &&
                screenshots.results.length > 0 &&
                screenshots.results[5]"
                :src="screenshots.results[5].image"
              />
            </div>
          </div>
          <!-- Slider indicators -->
          <div
            class="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2"
          >
            <button
              id="carousel-indicator-1"
              type="button"
              class="w-3 h-3 rounded-full"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              id="carousel-indicator-2"
              type="button"
              class="w-3 h-3 rounded-full"
              aria-current="false"
              aria-label="Slide 2"
            ></button>
            <button
              id="carousel-indicator-3"
              type="button"
              class="w-3 h-3 rounded-full"
              aria-current="false"
              aria-label="Slide 3"
            ></button>
            <button
              id="carousel-indicator-4"
              type="button"
              class="w-3 h-3 rounded-full"
              aria-current="false"
              aria-label="Slide 4"
            ></button>
            <button
              id="carousel-indicator-5"
              type="button"
              class="w-3 h-3 rounded-full"
              aria-current="false"
              aria-label="Slide 5"
            ></button>
            <button
              id="carousel-indicator-6"
              type="button"
              class="w-3 h-3 rounded-full"
              aria-current="false"
              aria-label="Slide 6"
            ></button>
          </div>
          <!-- Slider controls -->
          <button
            id="data-carousel-prev"
            type="button"
            class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            @click="anteriorImagen"
          >
            <span
              class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
            >
              <svg
                class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
              <span class="hidden">Previous</span>
            </span>
          </button>
          <button
            id="data-carousel-next"
            type="button"
            class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            @click="siguienteImagen"
          >
            <span
              class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
            >
              <svg
                class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
              <span class="hidden">Next</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    id="valoracion-modal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    data-modal-backdrop="static"
  >
    <div class="relative w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="px-6 py-6 lg:px-8">
        <div
          class="min-h-screen bg-transparent py-6 flex flex-col justify-center sm:py-12"
        >
          <div class="py-3 sm:max-w-xl sm:mx-auto">
            <div
              class="bg-gray-600 min-w-1xl flex flex-col rounded-xl shadow-lg"
            >
              <div class="px-12 py-5">
                <h2 class="text-gray-800 text-3xl font-semibold">
                  ¡Tu opinion nos importa!
                </h2>
              </div>
              <div class="bg-gray-600 w-full flex flex-col items-center">
                <div class="flex flex-col items-center py-6 space-y-3">
                  <span class="text-lg text-gray-800"
                    >¿Que tal te pareció el juego?</span
                  >
                  <div class="flex space-x-3">
                    <star-rating
                      @update:rating="setRating"
                      :star-size="40"
                      rounded-corners="true"
                      rating="1"
                    ></star-rating>
                  </div>
                </div>
                <div class="w-3/4 flex flex-col">
                  <textarea
                    rows="3"
                    class="p-4 text-gray-500 bg-gray-300 rounded-xl resize-none focus:ring-gray-800"
                    placeholder="Deja un mensaje, si tu quieres"
                    maxlength="300"
                    @input="estrellaInput"
                    v-model="texto_valoracion"
                  ></textarea>
                  <span class="text-white text-sm"
                    >{{ characterCount }}/300 caracteres</span
                  >
                  <button
                    type="button"
                    class="py-3 my-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    @click="valorar"
                  >
                    Califica Ahora
                  </button>
                </div>
              </div>
              <div class="h-20 flex items-center justify-center">
                <button class="text-white" @click="toggleValorarModal">
                  Mejor después
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--modal para eliminar la reseña-->
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
            ¿Estás seguro de eliminar tu reseña?
          </h3>
          <button
            @click="eliminarValoracion"
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

  <!--
<div class="flex float-right">
      <div class="app_rating text-center">
        <div class="circle_app_rating m-auto">10</div>
        <p>
          Basado en 8000 <br />
          reseñas de miembros
        </p>
      </div>

      <div class="rawg_rating ms-8 mt-14 text-center">
        <div class="circle_global_rating m-auto">92</div>

        <p>Basado en las <br />reseñas de RAWG</p>
      </div>
    </div>
--></template>

<script>
import moment from "moment"; //para calcular distancias entre fechas y formatear fecha y convertir en fecha de moment
import DOMPurify from "dompurify"; //mostrar etiquetas de un html de forma segura, solo los que seleccion, sanitar)
import StarRating from "vue-star-rating"; //para mostrar estrellas de valoracion para reseña
import axios from "axios"; //para usar el php y poder valorar con la bd
import Cookies from "js-cookie"; //para conseguir la id del usuario
import { reactive } from "vue";
import { Modal, Carousel } from "flowbite";
import VueMultiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css';

export default {
  inject: ["$http"], // inyectar la instancia de Axios

  components: {
    StarRating, VueMultiselect
  },

  data() {
    return {
      game: {},
      screenshots: {},
      trailers: {},
      characterCount: 0,
      valoracion: 20,
      texto_valoracion: "",
      valoraciones: [],
      perfilesUsuarios: reactive({}), // Objeto reactivo para almacenar los perfiles de usuario
      ya_valorado: false,
      modal_valorar: "",
      modal_eliminar: "",
      modal_galeria: "",
      carousel: "",
      nota_rating: "N/A",
      isMultiLine: 1,
      selectedOption: '',
      options: [],
    };
  },

  mounted() {
    //desbugear menu movil en caso de que lo abras con el menu
    setTimeout(() => {
        if (document.getElementById("mobile-menu-2") && document.getElementById("cuerpo")) 
        if (document.getElementById("mobile-menu-2").classList.contains("hidden")) {
          document.getElementById("cuerpo").classList.add("absolute");
        } else {
          document.getElementById("cuerpo").classList.remove("absolute");
        }
              }, 0.1);

    this.conseguirJuego(this.$route.params.id).then(() => {
    this.$nextTick(() => {
      const gameTitleHeight = this.$refs.gameTitle.offsetHeight;
      const lineHeight = parseInt(window.getComputedStyle(this.$refs.gameTitle).lineHeight);
      const numLines = Math.floor(gameTitleHeight / lineHeight);

      this.isMultiLine = numLines;
      console.log(this.isMultiLine);
    });
  });
    this.conseguirCapturas(this.$route.params.id)
  .then(() => {
    //hacer el carousel funcional
    this.configurarCarousel();
  });
    
    this.conseguirTrailers(this.$route.params.id);
    if (Cookies.get("isLoggedIn"))
      this.comprobarValoracion(
        JSON.parse(Cookies.get("isLoggedIn")).id,
        this.$route.params.id
      );
    this.conseguirColeccionesPersonalizadas();
    this.conseguirValoraciones(this.$route.params.id);


    //hacer los modales funcionales
    this.configurarGaleriaModal();
    this.configurarValorarModal();
    this.configurarEliminarModal();
    this.comprobarColeccionesPredeterminadas();
    
    

  },

  methods: {
    async conseguirJuego(IDJuego) {
      const url = `/games/${IDJuego}`;
      const response = await this.$http.get(url);
      this.game = response.data;
    },
    customLabel (option) {
      return `<span>${option.nombre} - ${option.id}`
    },
    async conseguirColeccionesPersonalizadas() {
        await axios
          .post(
            "https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/conseguirColeccionesPersonalizadas.php",
            {
              id_usuario: JSON.parse(Cookies.get("isLoggedIn")).id,
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
              let coleccionesPersonalizadas = JSON.parse(jsonData);

              for (let coleccion in coleccionesPersonalizadas) {
                console.log(coleccionesPersonalizadas[coleccion].nombr);
                this.options.push({ id: coleccionesPersonalizadas[coleccion].id_coleccion, nombre: coleccionesPersonalizadas[coleccion].nombre, imagen: coleccionesPersonalizadas[coleccion]? coleccionesPersonalizadas[coleccion].foto_coleccion: 'https://cdn.dribbble.com/users/1868020/screenshots/10055960/media/b868eae80cd2d17052965ef1bd130c02.jpg?compress=1&resize=400x300&vertical=top' });
              }
            } 
          })
          .catch((error) => {
            console.error(error);
          });
    },

    async comprobarColeccionesPredeterminadas() {
      if (Cookies.get("isLoggedIn")) {
        await axios
        .post(
          "https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/comprobarColeccionesPredeterminadas.php",
          {
            id_usuario: JSON.parse(Cookies.get("isLoggedIn")).id,
            id_juego: this.$route.params.id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.data === "Quiero") {
            if (document.getElementById("checkQuiero").classList.contains("invisible"))
              document.getElementById("checkQuiero").classList.remove("invisible");
          } else if (response.data === "Jugando") {
            if (document.getElementById("checkJugando").classList.contains("invisible"))
              document.getElementById("checkJugando").classList.remove("invisible");
          } else if (response.data === "Terminado") {
            if (document.getElementById("checkTerminado").classList.contains("invisible"))
              document.getElementById("checkTerminado").classList.remove("invisible");
          }
        })
        .catch((error) => {
          console.error(error);
        });
      }
    },

    agregarColeccion(nombre) {
      axios
        .post(
          "https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/agregarColeccion.php",
          {
            nombre: nombre,
            id_usuario: JSON.parse(Cookies.get("isLoggedIn")).id,
            id_juego: this.$route.params.id,
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
            // se ha podido registrar :)
            location.reload();
          } else {
            // Las credenciales son incorrectas
            console.log("error");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    agregarColeccionPredeterminada(nombre) {
      axios
        .post(
          "https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/agregarColeccionPredeterminada.php",
          {
            nombre: nombre,
            id_usuario: JSON.parse(Cookies.get("isLoggedIn")).id,
            id_juego: this.$route.params.id,
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
            // se ha podido registrar :)
            let invisible = false;
              if (!document.getElementById("check" + nombre).classList.contains("invisible")) {
                invisible = true;
              }
              document.getElementById("checkQuiero").classList.add("invisible");
              document.getElementById("checkJugando").classList.add("invisible");
              document.getElementById("checkTerminado").classList.add("invisible");
          
              document.getElementById("check" + nombre).classList.remove("invisible");

              if (invisible) 
              document.getElementById("check" + nombre).classList.add("invisible");
          } else {
            // Las credenciales son incorrectas
            console.log("error");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    async eliminarValoracion() {
      document.getElementById("cancelarEliminarModal").click();
      await axios
        .post(
          "https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/eliminarValoracion.php",
          {
            id_usuario: JSON.parse(Cookies.get("isLoggedIn")).id,
            id_juego: this.$route.params.id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.data === "OK") {
            location.reload();
          } else {
            console.log("error");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    toggleValorarModal() {
      this.modal_valorar.toggle();
    },
    toggleEliminarModal() {
      this.modal_eliminar.toggle();
    },
    toggleGaleriaModal() {
      this.modal_galeria.toggle();
    },
    anteriorImagen() {
      this.carousel.prev();
    },
    siguienteImagen(){
      this.carousel.next();
    },

    configurarCarousel() {
      var items = '';
      console.log(this.screenshots.results.length);
      if (this.screenshots.results.length >= 6) {
      items = [
        {
          position: 0,
          el: document.getElementById("carousel-item-1"),
        },
        {
          position: 1,
          el: document.getElementById("carousel-item-2"),
        },
        {
          position: 2,
          el: document.getElementById("carousel-item-3"),
        },
        {
          position: 3,
          el: document.getElementById("carousel-item-4"),
        },
        {
          position: 4,
          el: document.getElementById("carousel-item-5"),
        },
        {
          position: 5,
          el: document.getElementById("carousel-item-6"),
        },
      ];
      }

      if (this.screenshots.results.length === 5) {
      items = [
        {
          position: 0,
          el: document.getElementById("carousel-item-1"),
        },
        {
          position: 1,
          el: document.getElementById("carousel-item-2"),
        },
        {
          position: 2,
          el: document.getElementById("carousel-item-3"),
        },
        {
          position: 3,
          el: document.getElementById("carousel-item-4"),
        },
        {
          position: 4,
          el: document.getElementById("carousel-item-5"),
        },
      ];
      }

      if (this.screenshots.results.length === 4) {
      items = [
        {
          position: 0,
          el: document.getElementById("carousel-item-1"),
        },
        {
          position: 1,
          el: document.getElementById("carousel-item-2"),
        },
        {
          position: 2,
          el: document.getElementById("carousel-item-3"),
        },
        {
          position: 3,
          el: document.getElementById("carousel-item-4"),
        },
      ];
      }

      if (this.screenshots.results.length === 3) {
      items = [
        {
          position: 0,
          el: document.getElementById("carousel-item-1"),
        },
        {
          position: 1,
          el: document.getElementById("carousel-item-3"),
        },
        {
          position: 2,
          el: document.getElementById("carousel-item-4"),
        },
      ];
      }

      if (this.screenshots.results.length === 2) {
      items = [
        {
          position: 0,
          el: document.getElementById("carousel-item-1"),
        },
        {
          position: 1,
          el: document.getElementById("carousel-item-3"),
        },
      ];
      }

      if (this.screenshots.results.length === 1) {
      items = [
        {
          position: 0,
          el: document.getElementById("carousel-item-1"),
        },
        {
          position: 1,
          el: document.getElementById("carousel-item-2"),
        },
      ];
      }


      var options = '';
      if (this.screenshots.results.length >= 6) {
       options = {
        defaultPosition: 1,
        interval: 3000,

        indicators: {
          activeClasses: "bg-white dark:bg-gray-800",
          inactiveClasses:
            "bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800",
          items: [
            {
              position: 0,
              el: document.getElementById("carousel-indicator-1"),
            },
            {
              position: 1,
              el: document.getElementById("carousel-indicator-2"),
            },
            {
              position: 2,
              el: document.getElementById("carousel-indicator-3"),
            },
            {
              position: 3,
              el: document.getElementById("carousel-indicator-4"),
            },
            {
              position: 4,
              el: document.getElementById("carousel-indicator-5"),
            },
            {
              position: 5,
              el: document.getElementById("carousel-indicator-6"),
            },
          ],
        },
        
      

        // callback functions
        onNext: () => {},
        onPrev: () => {},
        onChange: () => {},
      };
    }
    if (this.screenshots.results.length === 5) {
       options = {
        defaultPosition: 1,
        interval: 3000,

        indicators: {
          activeClasses: "bg-white dark:bg-gray-800",
          inactiveClasses:
            "bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800",
          items: [
            {
              position: 0,
              el: document.getElementById("carousel-indicator-1"),
            },
            {
              position: 1,
              el: document.getElementById("carousel-indicator-2"),
            },
            {
              position: 2,
              el: document.getElementById("carousel-indicator-3"),
            },
            {
              position: 3,
              el: document.getElementById("carousel-indicator-4"),
            },
            {
              position: 4,
              el: document.getElementById("carousel-indicator-5"),
            },
          ],
        },
        
      

        // callback functions
        onNext: () => {},
        onPrev: () => {},
        onChange: () => {},
      };
    }

    if (this.screenshots.results.length === 4) {
       options = {
        defaultPosition: 1,
        interval: 3000,

        indicators: {
          activeClasses: "bg-white dark:bg-gray-800",
          inactiveClasses:
            "bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800",
          items: [
            {
              position: 0,
              el: document.getElementById("carousel-indicator-1"),
            },
            {
              position: 1,
              el: document.getElementById("carousel-indicator-2"),
            },
            {
              position: 2,
              el: document.getElementById("carousel-indicator-3"),
            },
            {
              position: 3,
              el: document.getElementById("carousel-indicator-4"),
            },
          ],
        },
        
      

        // callback functions
        onNext: () => {},
        onPrev: () => {},
        onChange: () => {},
      };
    }
    if (this.screenshots.results.length === 3) {
       options = {
        defaultPosition: 1,
        interval: 3000,

        indicators: {
          activeClasses: "bg-white dark:bg-gray-800",
          inactiveClasses:
            "bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800",
          items: [
            {
              position: 0,
              el: document.getElementById("carousel-indicator-1"),
            },
            {
              position: 1,
              el: document.getElementById("carousel-indicator-2"),
            },
            {
              position: 2,
              el: document.getElementById("carousel-indicator-3"),
            },
          ],
        },
        
      

        // callback functions
        onNext: () => {},
        onPrev: () => {},
        onChange: () => {},
      };
    }

    if (this.screenshots.results.length === 2) {
       options = {
        defaultPosition: 1,
        interval: 3000,

        indicators: {
          activeClasses: "bg-white dark:bg-gray-800",
          inactiveClasses:
            "bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800",
          items: [
            {
              position: 0,
              el: document.getElementById("carousel-indicator-1"),
            },
            {
              position: 1,
              el: document.getElementById("carousel-indicator-2"),
            }
          ],
        },
        
      

        // callback functions
        onNext: () => {},
        onPrev: () => {},
        onChange: () => {},
      };
    }

    if (this.screenshots.results.length === 1) {
      document.getElementById("data-carousel-next").classList.add("hidden");
      document.getElementById("data-carousel-prev").classList.add("hidden");
      document.getElementById("carousel-indicator-1").classList.add("hidden");


       options = {
        defaultPosition: 0,
        interval: 3000,

        indicators: {
          activeClasses: "bg-white dark:bg-gray-800",
          inactiveClasses:
            "bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800",
          items: [
            {
              position: 0,
              el: document.getElementById("carousel-indicator-1"),
            },
          ],
        },

        // callback functions
        onNext: () => {},
        onPrev: () => {},
        onChange: () => {},
      };
    }

      this.carousel = new Carousel(items, options);
    },

    async comprobarValoracion(id_usuario, id_juego) {
      await axios
        .post(
          "https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/comprobarValoracion.php",
          {
            id_usuario: id_usuario,
            id_juego: id_juego,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.data === "OK") {
            this.ya_valorado = true;
          } else {
            console.log("error");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    async conseguirCapturas(IDJuego) {
      const url2 = `/games/${IDJuego}/screenshots`;
      const response2 = await this.$http.get(url2);
      this.screenshots = response2.data;
    },

    async conseguirTrailers(IDJuego) {
      const url3 = `/games/${IDJuego}/movies`;
      const response3 = await this.$http.get(url3);
      this.trailers = response3.data;
    },
    configurarGaleriaModal() {
      // set the modal menu element
      const targetEl = document.getElementById("galeria-modal");

      // options with default values
      const options = {
        placement: "center",
        backdropClasses:
          "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40",
        onHide: () => {},
        onShow: () => {},
        onToggle: () => {},
      };

      this.modal_galeria = new Modal(targetEl, options);
    },
    configurarValorarModal() {
      // set the modal menu element
      const targetEl = document.getElementById("valoracion-modal");

      // options with default values
      const options = {
        placement: "center",
        backdropClasses:
          "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40",
        onHide: () => {},
        onShow: () => {},
        onToggle: () => {},
      };

      this.modal_valorar = new Modal(targetEl, options);
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
    async conseguirValoraciones(IDJuego) {
      await axios
        .post(
          "https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/conseguirValoraciones.php",
          {
            id_juego: IDJuego,
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
            this.valoraciones = JSON.parse(jsonData);
            let suma_nota = 0;
            for (var valoracion of this.valoraciones) {
              suma_nota += parseInt(valoracion.puntuacion);
                          }
            console.log(suma_nota) ;
            this.nota_rating = Math.round(suma_nota / this.valoraciones.length);
          } else {
            console.log("error");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async obtenerPerfilUsuario(id_usuario) {
      if (!this.perfilesUsuarios[id_usuario]) {
        await this.conseguirPerfil(id_usuario)
          .then((perfil) => {
            if (!this.perfilesUsuarios[perfil.id]) {
            this.perfilesUsuarios = {
              ...this.perfilesUsuarios,
              [id_usuario]: perfil,
            };
          }
          })
          .catch((error) => {
            console.log(error)
          });
      }
    },
    conseguirFoto(id_usuario) {
      if (this.perfilesUsuarios[id_usuario]) {
        if (this.perfilesUsuarios[id_usuario].foto_perfil)
          return (
            "data:image/jpeg;base64," +
            this.perfilesUsuarios[id_usuario].foto_perfil
          );
        else return "https://flowbite.com/docs/images/examples/image-2@2x.jpg";
      }
    },

    conseguirPerfil(id_usuario) {
      return new Promise((resolve, reject) => {
        axios
          .post(
            "https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/conseguirPerfilConFoto.php",
            {
              id: id_usuario,
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

              resolve(JSON.parse(jsonData));
            } else {
              resolve(JSON.parse(""));
            }
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    },

    formatReleaseDate(dateString) {
      const date = moment(dateString);
      const formattedDate = date.format("MMM DD, YYYY");
      const yearsAgo = date.fromNow(true);
      return `${formattedDate} (${yearsAgo} ago)`;
    },

    setRating(rating) {
      if (rating === 1) this.valoracion = 20;
      else if (rating === 2) this.valoracion = 40;
      else if (rating === 3) this.valoracion = 60;
      else if (rating === 4) this.valoracion = 80;
      else if (rating === 5) this.valoracion = 100;
    },
    estrellaInput(event) {
      this.characterCount = event.target.value.length;
    },
    valorar() {
      document.getElementById("cerrarValoracionModal").click();
      axios
        .post(
          "https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/agregarValoracion.php",
          {
            id_juego: this.$route.params.id,
            id_usuario: JSON.parse(Cookies.get("isLoggedIn")).id,
            texto: this.texto_valoracion,
            puntuacion: this.valoracion,
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
            // se ha podido registrar :)
            location.reload();
          } else {
            // Las credenciales son incorrectas
            console.log("error");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    selectImage(index) {
      var boton = "";
      //abrir modal con el boton
      var modalButton = document.getElementById("btnGaleriaModal");
      if (modalButton) {
        modalButton.click();
      }

      //seleccionar imagen correspondiente segun el index
      if (index == 1)
        boton = document.getElementById('carousel-indicator-1')
      else if (index == 2)
      boton = document.getElementById('carousel-indicator-2')
      else if (index == 3)
      boton = document.getElementById('carousel-indicator-3')
      else if (index == 4)
      boton = document.getElementById('carousel-indicator-4')
      else if (index == 5)
      boton = document.getElementById('carousel-indicator-5')
      else if (index == 6)
      boton = document.getElementById('carousel-indicator-6')

      if (boton) {
        boton.click();
      }
    },

    sanitizeHtml(html) {
      return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ["br", "p"], // aquí se especifican las etiquetas permitidas
      });
    },
  },
  beforeRouteUpdate(to, from, next) {
    setTimeout(() => {
      window.location.reload();
    }, 100);

    next();
  },

  computed: {
    obtenerImagen() {
      // Si la imagen está disponible en el objeto game, se devuelve su URL.

      if (this.game.background_image) {
        return this.game.background_image;
      }

      // De lo contrario, se devuelve una imagen por defecto.
      return "https://via.placeholder.com/264x352";
    },
    isLoggedIn() {
      return Cookies.get("isLoggedIn") !== undefined;
    },
  },
};
</script>

<style>
.background {
  filter: blur(2px) brightness(40%);
  height: 400px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.circle_app_rating {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: green;
  color: white;
  font-size: 24px;
  font-weight: bold;
  border: 2px solid white;
}

.circle_global_rating {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 2%;
  background-color: green;
  color: white;
  font-size: 24px;
  font-weight: bold;
  border: 2px solid white;
}

.btn {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  padding: 10px 10px;
}
.btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease-in-out;
}

.detalles p {
  margin-bottom: 20px;
}
</style>
