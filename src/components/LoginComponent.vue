<template>
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
                  <label for="" class="text-xs font-semibold "
                    >Contraseña</label
                  >
                  <div class="flex">
                    <div class="relative w-full">
                      <div
                        class="absolute inset-y-0 right-0 flex items-center px-2"
                      >
                        <input
                          class="hidden js-password-toggle"
                          id="toggle"
                          type="checkbox"
                        />
                        <label
                          class="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label"
                          for="toggle"
                          @click="togglePasswordVisibility()"
                        >
                          <font-awesome-icon icon="fa-solid fa-eye" v-show="showPassword"></font-awesome-icon>
                          <font-awesome-icon
                            icon="fa-solid fa-eye-slash"
                            v-show="!showPassword"
                          ></font-awesome-icon
                        ></label>
                      </div>
                      <input
                        class="appearance-none border-2 rounded-lg w-full py-3 px-3 leading-tight border-gray-200 focus:outline-none focus:border-indigo-500 focus:bg-white text-gray-700 pr-16 font-mono js-password"
                        id="inputPass"
                        type="password"
                        autocomplete="off"
                        placeholder="************"
                        @input="hideErrorMessage"
                        v-model="contrasena"
                      />
                    </div>
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
// eslint-disable-next-line no-unused-vars
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const expirationDays = 7;
const expirationDate = new Date();
expirationDate.setDate(expirationDate.getDate() + expirationDays);

import axios from "axios";

export default {
  data() {
    return {
      usuario: "",
      contrasena: "",
      showPassword: false,
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
    togglePasswordVisibility() {
      var password = document.querySelector(".js-password");
      
      if (password.type === "password") password.type = "text";
      else password.type = "password";

      this.showPassword = !this.showPassword;
    
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
