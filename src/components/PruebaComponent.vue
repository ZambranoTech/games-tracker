<template>
  <!-- Modal toggle -->
  <button
    data-modal-target="valoracion-modal"
    data-modal-toggle="valoracion-modal"
    class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    type="button"
  >
    Toggle modal
  </button>

  <!-- Main modal -->
  <div
    id="defaultModal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal body -->
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
                    @input="handleInput"
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
                <button class="text-white" data-modal-hide="valoracion-modal">
                  Mejor después
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <article>
      <div class="flex items-center mb-4 space-x-4">
        <img
          class="w-10 h-10 rounded-full"
          src="/docs/images/people/profile-picture-5.jpg"
          alt=""
        />
        <div class="space-y-1 font-medium dark:text-white">
          <p>
            Jese Leos
            <time
              datetime="2014-08-16 19:00"
              class="block text-sm text-gray-500 dark:text-gray-400"
              >Joined on August 2014</time
            >
          </p>
        </div>
      </div>
      <div class="flex items-center mb-1">
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
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
        >
          <title>Fifth star</title>
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          ></path>
        </svg>
        <h3 class="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
          Thinking to buy another one!
        </h3>
      </div>
      <footer class="mb-5 text-sm text-gray-500 dark:text-gray-400">
        <p>
          Reviewed in the United Kingdom on
          <time datetime="2017-03-03 19:00">March 3, 2017</time>
        </p>
      </footer>
      <p class="mb-2 text-gray-500 dark:text-gray-400">
        This is my third Invicta Pro Diver. They are just fantastic value for
        money. This one arrived yesterday and the first thing I did was set the
        time, popped on an identical strap from another Invicta and went in the
        shower with it to test the waterproofing.... No problems.
      </p>
      <p class="mb-3 text-gray-500 dark:text-gray-400">
        It is obviously not the same build quality as those very expensive
        watches. But that is like comparing a Citroën to a Ferrari. This watch
        was well under £100! An absolute bargain.
      </p>
      <a
        href="#"
        class="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
        >Read more</a
      >
      <aside>
        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
          19 people found this helpful
        </p>
        <div
          class="flex items-center mt-3 space-x-3 divide-x divide-gray-200 dark:divide-gray-600"
        >
          <a
            href="#"
            class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >Helpful</a
          >
          <a
            href="#"
            class="pl-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            >Report abuse</a
          >
        </div>
      </aside>
    </article>
  </div>
</template>
<script>
import StarRating from "vue-star-rating";
import axios from "axios";

export default {
  components: {
    StarRating,
  },
  data() {
    return {
      characterCount: 0,
      valoracion: 20,
      texto_valoracion: "",
    };
  },
  methods: {
    setRating(rating) {
      if (rating === 1) this.valoracion = 20;
      else if (rating === 2) this.valoracion = 40;
      else if (rating === 3) this.valoracion = 60;
      else if (rating === 4) this.valoracion = 80;
      else if (rating === 5) this.valoracion = 100;

      console.log(this.valoracion);
    },
    handleInput(event) {
      this.characterCount = event.target.value.length;
    },
    valorar() {
      axios
        .post(
          "https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/agregarValoracion.php",
          {
            id_juego: 795632,
            id_usuario: 83,
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
          console.log(response.data);
          // Manejar la respuesta del servidor
          if (response.data === "OK") {
            // se ha podido registrar :)
            this.$router.replace({ name: "login" }).then(() => {
              this.$nextTick(() => {
                var toastSuccess = document.getElementById("toast-success");
                if (toastSuccess) {
                  toastSuccess.classList.remove("hidden");
                }
                window.scrollTo(0, 0); // Desplazarse hacia arriba de la página
              });
            });
          } else {
            // Las credenciales son incorrectas
            console.log("error");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
