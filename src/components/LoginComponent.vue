<template>
  <div
    id="toast-success"
    class="hidden flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 mx-auto"
    role="alert"
  >
    <div
      class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200"
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
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <span class="sr-only">Check icon</span>
    </div>
    <div class="ml-3 text-sm font-normal">Registrado correctamente.</div>
    <button
      type="button"
      class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
      data-dismiss-target="#toast-success"
      aria-label="Close"
      @click="cerrarRegistrado"
    >
      <span class="sr-only">Close</span>
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
    </button>
  </div>

  <div
    class="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5"
  >
    <div
      class="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden max-w-[1000px]"
    >
      <div class="md:flex w-full">
        <div class="hidden md:block w-1/2 bg-indigo-500 foto"></div>
        <div class="w-full md:w-1/2 py-10 px-5 md:px-10">
          <div class="text-center mb-10">
            <h1 class="font-bold text-3xl text-gray-900">Iniciar Sesión</h1>
            <p>Introduzca tu información para iniciar sesión</p>
          </div>
          <div>
            <form @submit.prevent="verificarCredenciales">
              <div class="flex -mx-3">
                <div class="w-full px-3 mb-5">
                  <label for="" class="text-xs font-semibold px-1"
                    >Usuario/email</label
                  >
                  <div class="flex">
                    <div
                      class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
                    >
                      <font-awesome-icon icon="fa-regular fa-envelope"></font-awesome-icon>
                    </div>
                    <input
                      type="text"
                      @input="hideErrorMessage"
                      v-model="usuario"
                      class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="johnsmith/johnsmith@example.com"
                    />
                  </div>
                </div>
              </div>
              <div class="flex -mx-3">
                <div class="w-full px-3 mb-12">
                  <label for="" class="text-xs font-semibold px-1"
                    >Contraseña</label
                  >
                  <div class="flex">
                    <div
                      class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
                    >
                      <font-awesome-icon icon="fa-solid fa-lock"></font-awesome-icon>
                    </div>
                    <input
                      type="password"
                      @input="hideErrorMessage"
                      v-model="contrasena"
                      class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="************"
                    />
                  </div>
                  <div id="error-message" class="text-red-500 invisible">
                    Usuario o contraseña incorrectos
                  </div>
                  <div class="flex items-start mb-6">
                    <div class="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                        required
                      />
                    </div>
                    <label
                      for="remember"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >Recuerdame</label
                    >
                  </div>
                </div>
              </div>

              <div class="-mx-3">
                <div class="w-full px-3 mb-5">
                  <button
                    type="submit"
                    class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                  >
                    Iniciar Sesión
                  </button>
                </div>
                <div class="w-full px-3 mb-5 text-center mt-2">
                  <p>
                    ¿No tienes una cuenta? <br /><router-link
                      :to="{ name: 'register' }"
                      class="text-blue-500 cursor-pointer"
                      >Regístrate</router-link
                    >
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- BUY ME A BEER AND HELP SUPPORT OPEN-SOURCE RESOURCES -->
  <div class="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
    <div>
      <a
        title="Buy me a beer"
        href="https://www.buymeacoffee.com/scottwindon"
        target="_blank"
        class="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12"
      >
        <img
          class="object-cover object-center w-full h-full rounded-full"
          src="https://i.pinimg.com/originals/60/fd/e8/60fde811b6be57094e0abc69d9c2622a.jpg"
        />
      </a>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import navigationCount from "../logica/navigationCount";

const expirationDays = 7;
const expirationDate = new Date();
expirationDate.setDate(expirationDate.getDate() + expirationDays);

import axios from "axios";

export default {
  data() {
    return {
      usuario: "",
      contrasena: "",
    };
  },
  methods: {
    verificarCredenciales() {
      // Realizar una solicitud HTTP POST a tu archivo PHP de verificación
      axios
        .post(
          "https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/login.php",
          {
            usuario: this.usuario,
            contrasena: this.contrasena,
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
          if (response.data !== "Errornull") {
            // Las credenciales son válidas, realizar acciones adicionales
            // Convertir los datos a JSON y guardar en una cookie
            const jsonData = JSON.stringify(response.data);
            Cookies.set("isLoggedIn", jsonData, { expires: expirationDate });

            // Acceder al contador
            const count = navigationCount.count;

            // Utilizar el contador para verificar si anteriormente visitaste algún componente de la página
            if (count > 1) {
              this.$router.go(-1);
              setTimeout(() => {
                window.location.reload();
              }, 100);
            } else {
              this.$router.replace({ name: "home" }).then(() => {
                window.location.reload();
              });
            }
          } else {
            // Las credenciales son incorrectas
            document
              .getElementById("error-message")
              .classList.remove("invisible");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    cerrarRegistrado() {
      document.getElementById("toast-success").classList.add("hidden");    
    },
    hideErrorMessage() {
      const errorMessage = document.getElementById("error-message");

      if (!errorMessage.classList.contains("invisible")) {
        errorMessage.classList.add("invisible");
      }
    },
  },
};
</script>

<style>
.foto {
  filter: blur(0px) brightness(40%);
  background-image: url("https://i.pinimg.com/originals/45/a0/9a/45a09a4e7aa31256f99794e81d2b4628.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
