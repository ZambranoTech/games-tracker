<template>
  <div class="">
    <div class="p-6 shadow mt-24">
      <div class="grid grid-cols-1 md:grid-cols-3">
        <div class="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 text-center order-last md:order-first mt-20 md:mt-0">
          <router-link
                        :to="{
                          name: 'followers',
                          params: {
                            id: this.$route.params.id ? this.$route.params.id : 1,
                          },
                        }">
            <p class="font-bold text-gray-200 text-xl">{{ this.seguidores? this.seguidores : "-"}}</p>
            <p class="text-gray-400 mb-4 md:mb-0">Seguidores</p>
          </router-link>
          <router-link
                        :to="{
                          name: 'follows',
                          params: {
                            id: this.$route.params.id ? this.$route.params.id : 1,
                          },
                        }">
            <p class="font-bold text-gray-200 text-xl">{{this.seguidos? this.seguidos : "-"}}</p>
            <p class="text-gray-400 mb-4 md:mb-0">Seguidos</p>
          </router-link>
          <div v-bind:class="{ 'cursor-pointer': existeTerminado }" @click="scrollToAnchor('terminado')">
            <p class="font-bold text-gray-200 text-xl">{{ this.coleccionesPredeterminadas.filter(coleccion => coleccion.nombre === "Terminado").length }}</p>
            <p class="text-gray-400">Terminados</p>
          </div>
        </div>
        <div class="relative">
          <img :src="this.foto_perfil"
            class="object-cover w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500" />
        </div>

        <div class="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
          <button v-if="this.$route.params.id === obtenerID"
            class="text-white mx-auto py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
            @click="toggleEditarModal">
            Editar Perfil
          </button>

          <button @click="seguirEliminarJugador" v-if="this.$route.params.id !== obtenerID"
            id="btnSeguir"
          class="mx-auto text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
            Seguir
          </button>
        </div>
      </div>

      <div class="mt-20 text-center border-b pb-12">
        <h2 class="text-2xl mb-2">@{{ this.perfil.usuario }}</h2>
        <h1 class="text-4xl font-medium text-gray-200">
          {{ this.perfil.nombre }} {{ this.perfil.apellidos }},
          <span class="font-light text-gray-300">{{
            conseguirEdad()
          }}</span>
        </h1>
        <p class="mb-5 text-sm text-gray-500 dark:text-gray-400 mt-2">Unido el {{ formattedFechaReg }}</p>
      </div>

      <template v-if="this.coleccionesPersonalizadas.length >0">
        <div class="bg-gray-900 mt-8 flex items-center justify-center">
          <div
            class="bg-gray-800 w-full flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10  p-6 my-2 mx-4 rounded-2xl">
            <!-- Content -->
            <div class="w-full flex-1 px-2 sm:px-0">
              <div class="flex justify-between items-center">
                <h3 class="text-3xl font-extralight text-white/50">Colecciones Personalizadas</h3>
                <div class="inline-flex items-center space-x-2">
                  <div class="bg-gray-900 text-white/50 p-2 rounded-md hover:text-white smooth-hover cursor-pointer"  @click="cambiarFilaColumna('Personalizada', true)">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
            <div class="bg-gray-900 text-white/50 p-2 rounded-md hover:text-white smooth-hover cursor-pointer" @click="cambiarFilaColumna('Personalizada', false)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </div>
                  
        

                </div>
              </div>

              <div
                class="overflow-x-auto pb-[14px] flex flex-row flex-nowrap flex-auto xmb-10 sm:mb-0 mt-2 gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-grow" id="flexPersonalizada">
                <template v-for="(coleccion) in coleccionesPersonalizadas" :key="coleccion.id_coleccion">
                    <router-link :to="{
                      name: 'collection',
                      params: {
                        id:
                        coleccion &&
                        coleccion.id_coleccion
                            ? coleccion.id_coleccion
                            : 1,
                      },
                    }">  
                    <div
                      class="juegos_p mb-4 max-w-[300px] min-w-[300px] h-full  relative group bg-gray-900 py-10 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
                      <img :src="coleccion.foto_coleccion ? 'data:image/jpeg;base64,' + coleccion.foto_coleccion : 'https://cdn.dribbble.com/users/1868020/screenshots/10055960/media/b868eae80cd2d17052965ef1bd130c02.jpg?compress=1&resize=400x300&vertical=top'" alt="Imagen de la colección"
                      class="rounded hover:opacity-75 transition ease-in-out duration-150 w-[364px] h-[152px] object-cover" />

                      <h4 class="text-white text-2xl font-bold capitalize text-center">{{
                        coleccion ? coleccion.nombre : "-"
                      }}</h4>
                                            <p>Creado el {{coleccion && coleccion.fecha_creacion? formattedFechaCreacion(coleccion.fecha_creacion) : "-" }}</p>

                       <p class="text-gray-400 text-center">{{ coleccion && coleccion.descripcion ? (coleccion.descripcion.length > 50 ? coleccion.descripcion.slice(0, 50) + '...' : coleccion.descripcion) : '' }}</p>

                        <p class="absolute top-2 text-white/20 inline-flex items-center text-xs">{{ coleccion.num_juegos }} Juegos <span class="ml-2 w-2 h-2 block bg-green-500 rounded-full group-hover:animate-pulse"></span></p>

                    </div>

                  </router-link>
                  </template>


              </div>

            </div>
          </div>
        </div>
      </template>

      <template v-if="existeQuiero">
        <div class="bg-gray-900 mt-8 flex items-center justify-center">
          <div
            class="bg-gray-800 w-full flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10  p-6 my-2 mx-4 rounded-2xl">
            <!-- Content -->
            <div class="w-full flex-1 px-2 sm:px-0">
              <div class="flex justify-between items-center">
                <h3 class="text-3xl font-extralight text-white/50">Quiero - {{ this.coleccionesPredeterminadas.filter(coleccion => coleccion.nombre === "Quiero").length }}</h3>
                <div class="inline-flex items-center space-x-2">
                  <div class="bg-gray-900 text-white/50 p-2 rounded-md hover:text-white smooth-hover cursor-pointer"  @click="cambiarFilaColumna('Quiero', true)">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
            <div class="bg-gray-900 text-white/50 p-2 rounded-md hover:text-white smooth-hover cursor-pointer" @click="cambiarFilaColumna('Quiero', false)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </div>
                  
                  <router-link :to="{
                      name: 'collection',
                      params: {
                        id: (this.coleccionesPredeterminadas && this.coleccionesPredeterminadas.find(c => c.nombre === 'Quiero'))? this.coleccionesPredeterminadas.find(c => c.nombre === 'Quiero').id_coleccion : 1,
                      },
                    }"
                    class="bg-gray-900 text-white/50 p-2 rounded-md hover:text-white smooth-hover"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
</svg>
                </router-link>  

                </div>
              </div>

              <div
                class="overflow-x-auto pb-[14px] flex flex-row flex-nowrap flex-auto xmb-10 sm:mb-0 mt-2 gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-grow" id="flexQuiero">
                <template v-for="(coleccion) in coleccionesPredeterminadas" :key="coleccion.id_coleccion">
                  <template v-if="coleccion.nombre === 'Quiero'">
                    <template v-if="!juegosColecciones[coleccion.id_juego]">
                      <span v-if="obtenerJuegoColeccion(coleccion.id_juego)"></span>
                    </template>
                    <template v-else> </template>
                    <router-link :to="{
                      name: 'game',
                      params: {
                        id:
                        this.juegosColecciones[coleccion.id_juego] &&
                        this.juegosColecciones[coleccion.id_juego].id
                            ? this.juegosColecciones[coleccion.id_juego].id
                            : 1,
                      },
                    }">  
                   <div
                      class="juegos_q mb-4 max-w-[300px] min-w-[300px] h-full  relative group bg-gray-900 py-10 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
                      <img :src="obtenerImagen(coleccion.id_juego)"
                      
                      class="rounded hover:opacity-75 transition ease-in-out duration-150 w-[364px] h-[152px] object-cover" />

                      <h4 class="text-white text-2xl font-bold capitalize text-center">{{
                        this.juegosColecciones[coleccion.id_juego] ? this.juegosColecciones[coleccion.id_juego].name : "-"
                      }}</h4>
                      <div class="flex">
                        <p>{{ this.juegosColecciones[coleccion.id_juego] && this.juegosColecciones[coleccion.id_juego].released  ?
                          this.juegosColecciones[coleccion.id_juego].released : "Proximamente..." }}</p>
                        <div class="ms-4 flex">
                          <p>{{ this.juegosColecciones[coleccion.id_juego] && this.juegosColecciones[coleccion.id_juego].metacritic ?
                            this.juegosColecciones[coleccion.id_juego].metacritic + '%' : 'N/A' }}</p>

                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6 ms-1">
                            <path stroke-linecap="round" stroke-linejoin="round"
                              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                              stroke="currentColor" class="text-yellow-500 fill-current" />
                          </svg>

                        </div>

                      </div>
                      <p class="text-gray-400 text-center">{{ this.juegosColecciones[coleccion.id_juego] ?
                        this.juegosColecciones[coleccion.id_juego].genres?.map(genre => genre.name).join(', ') : "-" }}</p>
                    </div>
                  </router-link>
                  </template>
                </template>


              </div>

            </div>
          </div>
        </div>
      </template>


      <template v-if="existeJugando">
        <div class="bg-gray-900 mt-8 flex items-center justify-center">
          <div
            class="bg-gray-800 w-full flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10  p-6 my-2 mx-4 rounded-2xl">
            <!-- Content -->
            <div class="w-full flex-1 px-2 sm:px-0">
              <div class="flex justify-between items-center">
                <h3 class="text-3xl font-extralight text-white/50">Jugando - {{ this.coleccionesPredeterminadas.filter(coleccion => coleccion.nombre === "Jugando").length }}</h3>
                <div class="inline-flex items-center space-x-2">
                  <div class="bg-gray-900 text-white/50 p-2 rounded-md hover:text-white smooth-hover cursor-pointer"  @click="cambiarFilaColumna('Jugando', true)">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
            <div class="bg-gray-900 text-white/50 p-2 rounded-md hover:text-white smooth-hover cursor-pointer" @click="cambiarFilaColumna('Jugando', false)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </div>
                  
                  <router-link :to="{
                      name: 'collection',
                      params: {
                        id: (this.coleccionesPredeterminadas && this.coleccionesPredeterminadas.find(c => c.nombre === 'Jugando'))? this.coleccionesPredeterminadas.find(c => c.nombre === 'Jugando').id_coleccion : 1,
                      },
                    }"
                    class="bg-gray-900 text-white/50 p-2 rounded-md hover:text-white smooth-hover"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
</svg>
                </router-link>  

                </div>
              </div>

              <div
                class="overflow-x-auto pb-[14px] flex flex-row flex-nowrap flex-auto xmb-10 sm:mb-0 mt-2 gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-grow" id="flexJugando">
                <template v-for="(coleccion) in coleccionesPredeterminadas" :key="coleccion.id_coleccion">
                  <template v-if="coleccion.nombre === 'Jugando'">
                    <template v-if="!juegosColecciones[coleccion.id_juego]">
                      <span v-if="obtenerJuegoColeccion(coleccion.id_juego)"></span>
                    </template>
                    <template v-else> </template>
                    <router-link :to="{
                      name: 'game',
                      params: {
                        id:
                        this.juegosColecciones[coleccion.id_juego] &&
                        this.juegosColecciones[coleccion.id_juego].id
                            ? this.juegosColecciones[coleccion.id_juego].id
                            : 1,
                      },
                    }">  
                    <div
                      class="juegos_j mb-4 max-w-[300px] min-w-[300px] h-full  relative group bg-gray-900 py-10 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
                      <img :src="obtenerImagen(coleccion.id_juego)"
                      
                      class="rounded hover:opacity-75 transition ease-in-out duration-150 w-[364px] h-[152px] object-cover" />

                      <h4 class="text-white text-2xl font-bold capitalize text-center">{{
                        this.juegosColecciones[coleccion.id_juego] ? this.juegosColecciones[coleccion.id_juego].name : "-"
                      }}</h4>
                      <div class="flex">
                        <p>{{ this.juegosColecciones[coleccion.id_juego] && this.juegosColecciones[coleccion.id_juego].released  ?
                          this.juegosColecciones[coleccion.id_juego].released : "Proximamente..." }}</p>
                        <div class="ms-4 flex">
                          <p>{{ this.juegosColecciones[coleccion.id_juego] && this.juegosColecciones[coleccion.id_juego].metacritic ?
                            this.juegosColecciones[coleccion.id_juego].metacritic + '%' : 'N/A' }}</p>

                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6 ms-1">
                            <path stroke-linecap="round" stroke-linejoin="round"
                              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                              stroke="currentColor" class="text-yellow-500 fill-current" />
                          </svg>

                        </div>

                      </div>
                      <p class="text-gray-400 text-center">{{ this.juegosColecciones[coleccion.id_juego] ?
                        this.juegosColecciones[coleccion.id_juego].genres?.map(genre => genre.name).join(', ') : "-" }}</p>
                    </div>
                  </router-link>
                  </template>
                </template>


              </div>

            </div>
          </div>
        </div>
      </template>

      <template v-if="existeTerminado">
        <div class="bg-gray-900 mt-8 flex items-center justify-center" id="terminado">
          <div
            class="bg-gray-800 w-full flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10  p-6 my-2 mx-4 rounded-2xl">
            <!-- Content -->
            <div class="w-full flex-1 px-2 sm:px-0">
              <div class="flex justify-between items-center">
                <h3 class="text-3xl font-extralight text-white/50">Terminado - {{ this.coleccionesPredeterminadas.filter(coleccion => coleccion.nombre === "Terminado").length }}</h3>
                <div class="inline-flex items-center space-x-2">
                  <div class="bg-gray-900 text-white/50 p-2 rounded-md hover:text-white smooth-hover cursor-pointer"  @click="cambiarFilaColumna('Terminado', true)">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
            <div class="bg-gray-900 text-white/50 p-2 rounded-md hover:text-white smooth-hover cursor-pointer" @click="cambiarFilaColumna('Terminado', false)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </div>
                  
                  <router-link :to="{
                      name: 'collection',
                      params: {
                        id: (this.coleccionesPredeterminadas && this.coleccionesPredeterminadas.find(c => c.nombre === 'Terminado'))? this.coleccionesPredeterminadas.find(c => c.nombre === 'Terminado').id_coleccion : 1,
                      },
                    }"
                    class="bg-gray-900 text-white/50 p-2 rounded-md hover:text-white smooth-hover"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
</svg>
                </router-link>  

                </div>
              </div>

              <div
                class="overflow-x-auto pb-[14px] flex flex-row flex-nowrap flex-auto xmb-10 sm:mb-0 mt-2 gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-grow" id="flexTerminado">
                <template v-for="(coleccion) in coleccionesPredeterminadas" :key="coleccion.id_coleccion">
                  <template v-if="coleccion.nombre === 'Terminado'">
                    <template v-if="!juegosColecciones[coleccion.id_juego]">
                      <span v-if="obtenerJuegoColeccion(coleccion.id_juego)"></span>
                    </template>
                    <template v-else> </template>
                    <router-link :to="{
                      name: 'game',
                      params: {
                        id:
                        this.juegosColecciones[coleccion.id_juego] &&
                        this.juegosColecciones[coleccion.id_juego].id
                            ? this.juegosColecciones[coleccion.id_juego].id
                            : 1,
                      },
                    }">  
                    <div
                      class="juegos_t mb-4 max-w-[300px] min-w-[300px] h-full  relative group bg-gray-900 py-10 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
                      <img :src="obtenerImagen(coleccion.id_juego)"
                      
                      class="rounded hover:opacity-75 transition ease-in-out duration-150 w-[364px] h-[152px] object-cover" />

                      <h4 class="text-white text-2xl font-bold capitalize text-center">{{
                        this.juegosColecciones[coleccion.id_juego] ? this.juegosColecciones[coleccion.id_juego].name : "-"
                      }}</h4>
                      <div class="flex">
                        <p>{{ this.juegosColecciones[coleccion.id_juego] && this.juegosColecciones[coleccion.id_juego].released  ?
                          this.juegosColecciones[coleccion.id_juego].released : "Proximamente..." }}</p>
                        <div class="ms-4 flex">
                          <p>{{ this.juegosColecciones[coleccion.id_juego] && this.juegosColecciones[coleccion.id_juego].metacritic ?
                            this.juegosColecciones[coleccion.id_juego].metacritic + '%' : 'N/A' }}</p>

                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6 ms-1">
                            <path stroke-linecap="round" stroke-linejoin="round"
                              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                              stroke="currentColor" class="text-yellow-500 fill-current" />
                          </svg>

                        </div>

                      </div>
                      <p class="text-gray-400 text-center">{{ this.juegosColecciones[coleccion.id_juego] ?
                        this.juegosColecciones[coleccion.id_juego].genres?.map(genre => genre.name).join(', ') : "-" }}</p>
                    </div>
                  </router-link>
                  </template>
                </template>


              </div>

            </div>
          </div>
        </div>
      </template>


    </div>
  </div>

  <!-- Main modal -->
  <div id="editar-modal" tabindex="-1" aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button type="button" id="btnCerrarModal"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          @click="toggleEditarModal">
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"></path>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="px-6 py-6 lg:px-8">
          <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            Editar Perfil
          </h3>
          <form @submit.prevent="submitForm" class="text-gray-500">
            <div class="flex -mx-3">
              <div class="w-1/2 px-3 mb-5">
                <label for="" class="text-xs font-semibold px-1">Nombre</label>
                <div class="flex">
                  <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <font-awesome-icon icon="fa-solid fa-user" />
                  </div>
                  <input type="text"
                    class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="John" required v-model="nombre" id="inputNombre" />
                </div>
                <div id="error-message-nombre" class="text-red-500 hidden"></div>
              </div>
              <div class="w-1/2 px-3 mb-5">
                <label for="" class="text-xs font-semibold px-1">Apellidos</label>
                <div class="flex">
                  <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <font-awesome-icon icon="fa-regular fa-user"></font-awesome-icon>
                  </div>
                  <input type="text"
                    class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Smith" required v-model="apellidos" id="inputApellidos" />
                </div>
                <div id="error-message-apellidos" class="text-red-500 hidden"></div>
              </div>
            </div>

            <div class="flex -mx-3">
              <div class="w-full px-3 mb-5">
                <label for="" class="text-xs font-semibold px-1">Usuario</label>
                <div class="flex">
                  <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <font-awesome-icon icon="fa-regular fa-address-card"></font-awesome-icon>
                  </div>
                  <input type="user"
                    class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="johnsmith" required v-model="usuario" id="inputUsuario"
                    @blur.self="comprobarUserRegistrado" @input="usuario = $event.target.value.toLowerCase()" />
                </div>
                <div id="error-message-user" class="text-red-500 hidden"></div>
              </div>
            </div>
            <div class="flex -mx-3">
              <div class="w-full px-3 mb-4">
                <label for="" class="text-xs font-semibold px-1">Fecha de nacimiento</label>
                <div class="relative max-w-sm">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                      viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <input type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Selecciona fecha" required v-model="fecha" readonly id="inputFecha"
                    @changeDate="handleFechaNacChange" />
                </div>
                <div id="error-message-fecha" class="text-red-500 hidden"></div>
              </div>
            </div>
            <fieldset class="mb-12">
              <legend class="sr-only">Géneros</legend>
              <label for="" class="text-xs font-semibold px-1">Género</label>
              <div class="generos flex">
                <div class="flex items-center mb-4">
                  <input id="country-option-1" type="radio" name="countries" value="Masculino" v-model="genero" checked
                    class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                  <label for="country-option-1" class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Masculino
                  </label>
                </div>

                <div class="ms-4 flex items-center mb-4">
                  <input id="country-option-2" type="radio" name="countries" value="Femenino" v-model="genero"
                    class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                  <label for="country-option-2" class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Femenino
                  </label>
                </div>

                <div class="ms-4 flex items-center mb-4">
                  <input id="country-option-3" type="radio" name="countries" value="Otros" v-model="genero"
                    class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                  <label for="country-option-3" class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Otros
                  </label>
                </div>
              </div>
            </fieldset>
            <div class="flex -mx-3 mb-3">
              <div class="w-full px-2 pr-20 mb-5">
                <label for="" class="text-xs font-semibold px-1">Imagen de Perfil</label>
                <div class="flex">
                  <input type="file" id="imageInput" accept="image/*" @change="handleImageChange" />
                </div>
                <img id="previewImage"
                  class="max-h-[200px] max-w-[290px] mt-2 md:px-0 md:max-w-md rounded-lg shadow-xl dark:shadow-gray-800"
                  :src="selectedImage" alt="image description" />
              </div>
            </div>

            <div class="flex -mx-3">
              <div class="w-full px-3 mb-5">
                <label for="" class="text-xs font-semibold px-1">Email</label>
                <div class="flex">
                  <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <font-awesome-icon icon="fa-regular fa-envelope"></font-awesome-icon>
                  </div>
                  <input type="email"
                    class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="johnsmith@example.com" v-model="email" id="inputEmail" required
                    @blur.self="comprobarEmailRegistrado" />
                </div>
                <div id="error-message-email" class="text-red-500 hidden"></div>
              </div>
            </div>

            <div class="flex -mx-3">
              <div class="w-full px-3 mb-5">
                <button
                  class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import 'moment/locale/es'; // Importa el idioma español

import axios from "axios";
import Cookies from 'js-cookie';
import { Modal } from 'flowbite';
import Datepicker from 'flowbite-datepicker/Datepicker';
import { reactive } from "vue";
import Compressor from 'compressorjs';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  inject: ["$http"], // inyectar la instancia de Axios
  data() {
    return {
      perfil: {},
      nombre: "",
      fecha: "",
      foto_perfil: "https://flowbite.com/docs/images/examples/image-2@2x.jpg",
      selectedImage: "https://flowbite.com/docs/images/examples/image-2@2x.jpg",
      apellidos: "",
      usuario: "",
      email: "",
      fecha_nac: "",
      genero: "masculino",
      foto: "",
      modal_editar: '',
      coleccionesPersonalizadas: [],
      coleccionesPredeterminadas: [],
      juegosColecciones: reactive({}), // Objeto reactivo para almacenar los juegos de las coleccionesPredeterminadas
      seguidores: 0,
      seguidos: 0,
    };
  },

  mounted() {
    this.conseguirPerfil()
      .then(() => {
        // Se cumple la condición (credenciales válidas)
        this.comprobarSiSigues();
        this.comprobarSeguidores();
        this.comprobarSeguidos();
        this.configurarEditarModal();
        this.cargarEditarPerfil();
        this.obtenerImagenPerfil();
      })
      .catch(() => {
        // No se cumple la condición (credenciales incorrectas o error)
        // Realizar acciones adicionales aquí
      });
    this.conseguirColeccionesPersonalizadas();
    this.conseguirColeccionesPredeterminadas();

    const datepickerEl = document.getElementById('inputFecha');
    new Datepicker(datepickerEl, {
      autohide: true,
    });
  },

  beforeRouteUpdate(to, from, next) {
    setTimeout(() => {
      window.location.reload();
    }, 100);

    next();
  },

  computed: {
    isLoggedIn() {
      return Cookies.get('isLoggedIn') !== undefined;
    },
    obtenerID() {
      if (Cookies.get('isLoggedIn') !== undefined) {
        return JSON.parse(Cookies.get('isLoggedIn')).id;
      }
      return -1;
    },
    existeQuiero() {
      return this.coleccionesPredeterminadas.some(coleccion => coleccion.nombre === 'Quiero');
    },
    existeJugando() {
      return this.coleccionesPredeterminadas.some(coleccion => coleccion.nombre === 'Jugando');
    },
    existeTerminado() {
      return this.coleccionesPredeterminadas.some(coleccion => coleccion.nombre === 'Terminado');
    },
    formattedFechaReg() {
      const myMoment = moment; // Asigna moment a una nueva variable
      if (this.perfil?.fecha_reg) {
        return myMoment(this.perfil.fecha_reg).format("D [de] MMMM [de] YYYY");
      } else {
        return "-";
      }
    },
    
  },

  methods: {
    submitForm() {
      this.validateForm().then(todoCorrecto => {
        console.log(todoCorrecto)
        console.log(this.nombre + " - " + this.apellidos + " - " + this.usuario + " - " + this.fecha_nac + " - " + this.genero + " - " + JSON.parse(Cookies.get('isLoggedIn')).id)
        if (todoCorrecto) {
          this.saveImageToDatabase();
          // Los campos son válidos, procede con el envío del formulario
          axios.post('https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/editarPerfil.php', {
            nombre: this.nombre,
            apellidos: this.apellidos,
            usuario: this.usuario,
            email: this.email,
            fecha_nac: this.fecha_nac,
            genero: this.genero.toLowerCase(),
            foto: this.foto,
            id: JSON.parse(Cookies.get('isLoggedIn')).id,
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(response => {
              console.log(response.data);
              // Manejar la respuesta del servidor
              if (response.data === 'OK') {
                // se ha podido registrar :)

                this.conseguirPerfil()
                  .then(() => {
                    // Se cumple la condición (credenciales válidas)
                    this.obtenerImagenPerfil();
                    this.cargarEditarPerfil();
                  })
                const btnCerrarModal = document.getElementById("btnCerrarModal");
                btnCerrarModal.click();

                toast.success('¡Editado Correctamente!', { 
  position: toast.POSITION.TOP_CENTER, 
  theme: 'dark',
  autoClose: 2000,
  closeOnClick: true,
  pauseOnHover: false,
});
this.$root.$refs.navbarRef.conseguirPerfil();


              } else {
                // Las credenciales son incorrectas
                toast.warning('¡Debes de editar algun campo!', { 
  position: toast.POSITION.TOP_CENTER, 
  theme: 'dark',
  autoClose: 2000,
  closeOnClick: true,
  pauseOnHover: false,
});
              }
            })
            .catch(error => {
              console.error(error);
            });
        }
      })
        .catch(error => {
          console.error(error);
          // Manejar el error si ocurre
        });

    },
   
    formattedFechaCreacion(fecha_creacion) {
      const myMoment = moment; // Asigna moment a una nueva variable
      if (fecha_creacion) {
        return myMoment(fecha_creacion).format("D [de] MMMM [de] YYYY");
      } else {
        return "-";
      }
    },
    cambiarFilaColumna(nombreColeccion, esUnaFila) {
        if (nombreColeccion === 'Quiero') {
            if (esUnaFila) {
            document.getElementById("flexQuiero").classList.remove("flex-wrap"); 
            document.getElementById("flexQuiero").classList.add("flex-nowrap"); 
            document.getElementById("flexQuiero").classList.add("overflow-x-auto"); 
            let juegosElements = document.getElementsByClassName("juegos_q");
for (let i = 0; i < juegosElements.length; i++) {
  juegosElements[i].classList.add("min-w-[300px]");
}
          } else {
            document.getElementById("flexQuiero").classList.add("flex-wrap"); 
            document.getElementById("flexQuiero").classList.remove("flex-nowrap") 
            document.getElementById("flexQuiero").classList.remove("overflow-x-auto") 
            let juegosElements2 = document.getElementsByClassName("juegos_q");
for (let e = 0; e < juegosElements2.length; e++) {
  juegosElements2[e].classList.remove("min-w-[300px]");
}
          }
        }

          if (nombreColeccion === 'Jugando') {
            if (esUnaFila) {
            document.getElementById("flexJugando").classList.remove("flex-wrap"); 
            document.getElementById("flexJugando").classList.add("flex-nowrap"); 
            document.getElementById("flexJugando").classList.add("overflow-x-auto"); 
            let juegosElements = document.getElementsByClassName("juegos_j");
for (let i = 0; i < juegosElements.length; i++) {
  juegosElements[i].classList.add("min-w-[300px]");
}
          } else {
            document.getElementById("flexJugando").classList.add("flex-wrap"); 
            document.getElementById("flexJugando").classList.remove("flex-nowrap"); 
            document.getElementById("flexJugando").classList.remove("overflow-x-auto"); 

            let juegosElements2 = document.getElementsByClassName("juegos_j");
for (let e = 0; e < juegosElements2.length; e++) {
  juegosElements2[e].classList.remove("min-w-[300px]");
}
          }
        }

          if (nombreColeccion === 'Terminado') {
            if (esUnaFila) {
            document.getElementById("flexTerminado").classList.remove("flex-wrap"); 
            document.getElementById("flexTerminado").classList.add("flex-nowrap"); 
            document.getElementById("flexTerminado").classList.add("overflow-x-auto"); 
            let juegosElements = document.getElementsByClassName("juegos_t");
for (let i = 0; i < juegosElements.length; i++) {
  juegosElements[i].classList.add("min-w-[300px]");
}
          } else {
            document.getElementById("flexTerminado").classList.add("flex-wrap"); 
            document.getElementById("flexTerminado").classList.remove("flex-nowrap"); 
            document.getElementById("flexTerminado").classList.remove("overflow-x-auto"); 
            let juegosElements2 = document.getElementsByClassName("juegos_t");
for (let e = 0; e < juegosElements2.length; e++) {
  juegosElements2[e].classList.remove("min-w-[300px]");
}
          }
        }

          
          if (nombreColeccion === 'Personalizada') {
            if (esUnaFila) {
            document.getElementById("flexPersonalizada").classList.remove("flex-wrap"); 
            document.getElementById("flexPersonalizada").classList.add("flex-nowrap"); 
            document.getElementById("flexPersonalizada").classList.add("overflow-x-auto"); 
            let juegosElements = document.getElementsByClassName("juegos_p");
for (let i = 0; i < juegosElements.length; i++) {
  juegosElements[i].classList.add("min-w-[300px]");
}
          } else {
            document.getElementById("flexPersonalizada").classList.add("flex-wrap"); 
            document.getElementById("flexPersonalizada").classList.remove("flex-nowrap"); 
            document.getElementById("flexPersonalizada").classList.remove("overflow-x-auto"); 
            let juegosElements2 = document.getElementsByClassName("juegos_p");
for (let e = 0; e < juegosElements2.length; e++) {
  juegosElements2[e].classList.remove("min-w-[300px]");
}
          }

        }

         
        

        },
        scrollToAnchor(anchor) {
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  },
    obtenerImagen(id_juego) {
      // Si la imagen está disponible en el objeto game, se devuelve su URL.
      if (this.juegosColecciones[id_juego] && this.juegosColecciones[id_juego].background_image) {
        return this.juegosColecciones[id_juego].background_image;
      }
      // De lo contrario, se devuelve una imagen por defecto.
      return 'https://via.placeholder.com/364x252';
    },
    async conseguirColeccionesPredeterminadas() {
      await axios
        .post(
          "https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/conseguirJuegosColeccionesPredeterminadas.php",
          {
            id_usuario: this.$route.params.id
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
            this.coleccionesPredeterminadas = JSON.parse(jsonData);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async comprobarSeguidores() {
      await axios.post(
            "https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/comprobarSeguidores.php",
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
            console.log(response.data + "gg");
            if (response.data !== "Errornull") {
              const jsonData = JSON.stringify(response.data);
              this.seguidores = JSON.parse(jsonData);
              console.log(this.seguidores);
            } 
          })
          .catch((error) => {
            console.error(error);
          });
    },

    async comprobarSeguidos() {
      await axios.post(
            "https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/comprobarSeguidos.php",
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
              this.seguidos = JSON.parse(jsonData);
              console.log(this.seguidos);
            } 
          })
          .catch((error) => {
            console.error(error);
          });
    },
    handleFechaNacChange(event) {
      const fecha = moment(event.target.value);
      const fechaMoment = moment(fecha, "DD/MM/YYYY");
      const fechaBD = fechaMoment.format("YYYY-MM-DD");
      this.fecha_nac = fechaBD;
    },
    configurarEditarModal() {
      // set the modal menu element
      const targetEl = document.getElementById("editar-modal");

      // options with default values
      const options = {
        placement: "center",
        backdropClasses:
          "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40",
        onHide: () => { },
        onShow: () => { },
        onToggle: () => { },
      };

      this.modal_editar = new Modal(targetEl, options);
    },
    toggleEditarModal() {
      this.modal_editar.toggle();
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

    async comprobarSiSigues() {
      if (Cookies.get("isLoggedIn"))
      await axios.post(
            "https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/comprobarSiSigues.php",
            {
              id: JSON.parse(Cookies.get("isLoggedIn")).id,
              id_seguido: this.$route.params.id,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            if (response.data == "Seguido") {
            document.getElementById("btnSeguir").textContent = "Dejar de Seguir";
            document.getElementById("btnSeguir").classList.remove("bg-blue-400");
            document.getElementById("btnSeguir").classList.remove("hover:bg-red-500");

            document.getElementById("btnSeguir").classList.add("bg-red-500");
            document.getElementById("btnSeguir").classList.add("hover:bg-red-600");

            } 
          })
          .catch((error) => {
            console.error(error);
          });
    },

    async seguirEliminarJugador() {
      if (Cookies.get("isLoggedIn")) {
        await axios
        .post(
          "https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/agregarEliminarSeguido.php",
          {
            id_seguidor: JSON.parse(Cookies.get("isLoggedIn")).id,
            id_seguido: this.$route.params.id,
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
            this.comprobarSeguidores();
            // se ha podido registrar :)
            document.getElementById("btnSeguir").textContent = "Dejar de Seguir";
            document.getElementById("btnSeguir").classList.remove("bg-blue-400");
            document.getElementById("btnSeguir").classList.remove("hover:bg-red-500");

            document.getElementById("btnSeguir").classList.add("bg-red-500");
            document.getElementById("btnSeguir").classList.add("hover:bg-red-600");

          }  else if (response.data === "Eliminado") {
            this.comprobarSeguidores();
            document.getElementById("btnSeguir").textContent = "Seguir";
            document.getElementById("btnSeguir").classList.remove("bg-red-500");
            document.getElementById("btnSeguir").classList.remove("hover:bg-red-600");

            document.getElementById("btnSeguir").classList.add("bg-blue-400");
              document.getElementById("btnSeguir").classList.add("hover:bg-red-500");
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
          if (response.data !== "Errornull" && response.data !== "") {
            this.foto_perfil = "data:image/jpeg;base64," + response.data;
            this.selectedImage = "data:image/jpeg;base64," + response.data;
          } 
        })
        .catch((error) => {
          console.error(error);
        });
      // Si la imagen está disponible en el objeto game, se devuelve su URL.
      
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

    comprobarUserRegistrado() {
      if (this.usuario !== this.perfil.usuario) {
        return new Promise((resolve, reject) => {
          axios.post('https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/comprobarUser.php', {
            usuario: this.usuario,
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(response => {
              if (response.data === 'OK') {
                // Usuario encontrado
                const error = document.getElementById('error-message-user');
                error.classList.remove('hidden');
                error.textContent = "Este usuario ya se encuentra registrado"

                const input = document.getElementById('inputUsuario');
                input.classList.remove('border-gray-200', 'focus:border-indigo-500');
                input.classList.add('border-red-600', 'focus:border-red-500', 'focus:ring-red-500');
                resolve(true);
              } else {
                // Usuario no encontrado
                if (this.usuario.length >= 4) {
                  const input = document.getElementById('inputUsuario');
                  // Realiza las acciones correspondientes
                  input.classList.remove('border-red-600', 'focus:border-red-500', 'focus:ring-red-500');
                  input.classList.add('border-gray-200', 'focus:border-indigo-500');
                  const error = document.getElementById('error-message-user');
                  error.classList.add('hidden');
                  error.textContent = ""

                }

                resolve(false);
              }
            })
            .catch(error => {
              console.error(error);
              reject(error);
            });
        });
      } else {
        if (this.usuario.length >= 4) {
                  const input = document.getElementById('inputUsuario');
                  // Realiza las acciones correspondientes
                  input.classList.remove('border-red-600', 'focus:border-red-500', 'focus:ring-red-500');
                  input.classList.add('border-gray-200', 'focus:border-indigo-500');
                  const error = document.getElementById('error-message-user');
                  error.classList.add('hidden');
                  error.textContent = ""

                }
      }
    },

    comprobarEmailRegistrado() {
      if (this.email !== this.perfil.email) {
        return new Promise((resolve, reject) => {
          axios.post('https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/comprobarEmail.php', {
            email: this.email,
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(response => {
              if (response.data === 'OK') {
                // Usuario encontrado
                const error = document.getElementById('error-message-email');
                error.classList.remove('hidden');
                error.textContent = "Este email ya se encuentra registrado"

                const input = document.getElementById('inputEmail');
                input.classList.remove('border-gray-200', 'focus:border-indigo-500');
                input.classList.add('border-red-600', 'focus:border-red-500', 'focus:ring-red-500');
                resolve(true);
              } else {
                // Usuario no encontrado
                const input = document.getElementById('inputEmail');
                if (input.classList.contains('border-red-600')) {
                  // Realiza las acciones correspondientes
                  input.classList.remove('border-red-600', 'focus:border-red-500', 'focus:ring-red-500');
                  input.classList.add('border-gray-200', 'focus:border-indigo-500');
                  const error = document.getElementById('error-message-email');
                  error.classList.add('hidden');
                  error.textContent = ""
                }

                resolve(false);
              }
            })
            .catch(error => {
              console.error(error);
              reject(error);
            });
        });
      } else {
        // Usuario no encontrado
        const input = document.getElementById('inputEmail');
        if (input.classList.contains('border-red-600')) {
          // Realiza las acciones correspondientes
          input.classList.remove('border-red-600', 'focus:border-red-500', 'focus:ring-red-500');
          input.classList.add('border-gray-200', 'focus:border-indigo-500');
          const error = document.getElementById('error-message-email');
          error.classList.add('hidden');
          error.textContent = ""
        }
      }
    },

    conseguirEdad() {
      const fechaNacimiento = new Date(this.perfil.fecha_nac);
      const fechaActual = new Date();
      // Calcula la diferencia en milisegundos entre la fecha actual y la fecha de nacimiento
      const diferenciaMilisegundos = fechaActual - fechaNacimiento;

      // Calcula la edad en años redondeando hacia abajo
      const edad = Math.floor(
        diferenciaMilisegundos / (1000 * 60 * 60 * 24 * 365)
      );

      return edad;
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


      this.foto = base64Image;
    },

    cargarEditarPerfil() {
      this.nombre = this.perfil.nombre;
      this.apellidos = this.perfil.apellidos;
      this.usuario = this.perfil.usuario;
      this.email = this.perfil.email;
      this.fecha_nac = this.perfil.fecha_nac;

      const fecha2 = moment(this.perfil.fecha_nac).format("MM/DD/YYYY");
      this.fecha = fecha2;
      this.genero =
        this.perfil.genero.charAt(0).toUpperCase() +
        this.perfil.genero.slice(1);
    },
    validateForm() {
      return new Promise((resolve, reject) => {

        let correcto = true;
        //nombre
        if (this.nombre.trim() === "") {
          const error = document.getElementById('error-message-nombre');
          error.classList.remove('hidden');
          error.textContent = "El nombre no puede estar vacio"

          const input = document.getElementById('inputNombre');
          input.classList.remove('border-gray-200', 'focus:border-indigo-500');
          input.classList.add('border-red-600', 'focus:border-red-500', 'focus:ring-red-500');

          correcto = false;
        } else {
          const input = document.getElementById('inputNombre');
          if (input.classList.contains('border-red-600')) {
            // Realiza las acciones correspondientes
            input.classList.remove('border-red-600', 'focus:border-red-500', 'focus:ring-red-500');
            input.classList.add('border-gray-200', 'focus:border-indigo-500');
            const error = document.getElementById('error-message-nombre');
            error.classList.add('hidden');
            error.textContent = ""
          }
        }
        //apellidos
        if (this.apellidos.trim() === "") {
          const error = document.getElementById('error-message-apellidos');
          error.classList.remove('hidden');
          error.textContent = "Los apellidos no pueden estar vacio"

          const input = document.getElementById('inputApellidos');
          input.classList.remove('border-gray-200', 'focus:border-indigo-500');
          input.classList.add('border-red-600', 'focus:border-red-500', 'focus:ring-red-500');

          correcto = false;
        } else {
          const input = document.getElementById('inputApellidos');
          if (input.classList.contains('border-red-600')) {
            // Realiza las acciones correspondientes
            input.classList.remove('border-red-600', 'focus:border-red-500', 'focus:ring-red-500');
            input.classList.add('border-gray-200', 'focus:border-indigo-500');
            const error = document.getElementById('error-message-apellidos');
            error.classList.add('hidden');
            error.textContent = ""
          }
        }

        //usuario
        console.log(this.usuario);
        if (this.usuario.trim() === "") {
          const error = document.getElementById('error-message-user');
          error.classList.remove('hidden');
          error.textContent = "El usuario no puede estar vacio"

          const input = document.getElementById('inputUsuario');
          input.classList.remove('border-gray-200', 'focus:border-indigo-500');
          input.classList.add('border-red-600', 'focus:border-red-500', 'focus:ring-red-500');

          correcto = false;
        } else if (this.usuario.trim().length < 4) {
          console.log("gay");
          const error = document.getElementById('error-message-user');
          error.classList.remove('hidden');
          error.textContent = "El usuario debe tener al menos 4 caracteres"

          const input = document.getElementById('inputUsuario');
          input.classList.remove('border-gray-200', 'focus:border-indigo-500');
          input.classList.add('border-red-600', 'focus:border-red-500', 'focus:ring-red-500');
          correcto = false;
        } else {
          const input = document.getElementById('inputUsuario');
          if (input.classList.contains('border-red-600')) {
            // Realiza las acciones correspondientes
            input.classList.remove('border-red-600', 'focus:border-red-500', 'focus:ring-red-500');
            input.classList.add('border-gray-200', 'focus:border-indigo-500');
            const error = document.getElementById('error-message-apellidos');
            error.classList.add('hidden');
            error.textContent = ""
          }
        }


        const fechaLimite = new Date();
        fechaLimite.setFullYear(fechaLimite.getFullYear() - 3);

        //fecha Nacimiento
        if (this.fecha_nac === "") {
          const error = document.getElementById('error-message-fecha');
          error.classList.remove('hidden');
          error.textContent = "Debes seleccionar una fecha"

          const input = document.getElementById('inputFecha');
          input.classList.remove('border-gray-200', 'focus:border-indigo-500');
          input.classList.add('border-red-600', 'focus:border-red-500', 'focus:ring-red-500');

          correcto = false;
        } else if (new Date(this.fecha_nac).getTime() > fechaLimite.getTime()) {
          console.log("gay");
          const error = document.getElementById('error-message-fecha');
          error.classList.remove('hidden');
          error.textContent = "Debes tener mas de 3 años"

          const input = document.getElementById('inputFecha');
          input.classList.remove('border-gray-200', 'focus:border-indigo-500');
          input.classList.add('border-red-600', 'focus:border-red-500', 'focus:ring-red-500');
          correcto = false;
        } else {
          const input = document.getElementById('inputFecha');
          if (input.classList.contains('border-red-600')) {
            // Realiza las acciones correspondientes
            input.classList.remove('border-red-600', 'focus:border-red-500', 'focus:ring-red-500');
            input.classList.add('border-gray-200', 'focus:border-indigo-500');
            const error = document.getElementById('error-message-fecha');
            error.classList.add('hidden');
            error.textContent = ""
          }
        }

        //comprobar Usuario
        const promesaUsuario = this.comprobarUserRegistrado();
        if (this.usuario !== this.perfil.usuario) {
          promesaUsuario
            .then(usuarioEncontrado => {
              if (usuarioEncontrado) {
                correcto = false;
              }
            })
            .catch(error => {
              console.error(error);
              // Manejar el error si ocurre
              reject(error);
            });
        }
        const promesaEmail = this.comprobarEmailRegistrado()
        //comprobar email
        if (this.email !== this.perfil.email) {
          promesaEmail
            .then(EmailEncontrado => {
              if (EmailEncontrado) {
                console.log("encontrado email");
                correcto = false;
              }
            })
            .catch(error => {
              console.error(error);
              // Manejar el error si ocurre
              reject(error);
            });
        }

        if (this.usuario !== this.perfil.usuario || this.email !== this.perfil.email) {
          Promise.all([promesaUsuario, promesaEmail])
            .then(() => {
              if (correcto) {
                resolve(true); // Todos los campos son válidos
              } else {
                resolve(false);
              }
            })
            .catch(error => {
              console.error(error);
              // Manejar el error si ocurre
              reject(error);
            });
        }

        if (this.usuario === this.perfil.usuario && this.email === this.perfil.email) {
          if (correcto) {
            resolve(true); // Todos los campos son válidos
          } else {
            resolve(false);
          }
        }
      });
    }
  },

};
</script>
<style>.truncate-2-lines {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}</style>