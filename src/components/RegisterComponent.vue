<template>
  <div
    class="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5"
  >
    <div
      class="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden max-w-[1000px]"
    >
      <div class="md:flex w-full">
        <div class="hidden md:block w-1/2 bg-indigo-500 foto"></div>
        <div class="w-full md:w-1/2 py-10 px-5 md:px-10">
          <div class="text-center mb-10">
            <h1 class="font-bold text-3xl text-gray-900">REGISTRAR</h1>
            <p>Introduzca tu información para registrarse</p>
          </div>
          <div>
            <form @submit.prevent="submitForm">
              <div class="flex -mx-3">
                <div class="w-1/2 px-3 mb-5">
                  <label for="" class="text-xs font-semibold px-1"
                    >Nombre</label
                  >
                  <div class="flex">
                    <div
                      class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
                    >
                      <font-awesome-icon icon="fa-regular fa-user"></font-awesome-icon>
                    </div>
                    <input
                      type="text"
                      class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="John"
                      required v-model="nombre"
                      id="inputNombre"
                    />
                  </div>
                  <div id="error-message-nombre" class="text-red-500 hidden"></div>

                </div>
                <div class="w-1/2 px-3 mb-5">
                  <label for="" class="text-xs font-semibold px-1"
                    >Apellidos</label
                  >
                  <div class="flex">
                    <div
                      class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
                    >
                      <font-awesome-icon icon="fa-regular fa-user"></font-awesome-icon>
                    </div>
                    <input
                      type="text"
                      class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="Smith"
                      required v-model="apellidos"
                      id="inputApellidos"
                    />
                  </div>
                  <div id="error-message-apellidos" class="text-red-500 hidden"></div>
                </div>
              </div>
              


              <div class="flex -mx-3">
                <div class="w-full px-3 mb-5">
                  <label for="" class="text-xs font-semibold px-1"
                    >Usuario</label
                  >
                  <div class="flex">
                    <div
                      class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
                    >
                      <font-awesome-icon icon="fa-regular fa-address-card"></font-awesome-icon>
                    </div>
                    <input
                      type="user"
                      class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="johnsmith"
                      required v-model="usuario"
                      id="inputUsuario"
                      @blur.self="comprobarUserRegistrado"
                      @input="usuario = $event.target.value.toLowerCase()"
                    />
                  </div>
                  <div id="error-message-user" class="text-red-500 hidden"></div>
                </div>
              </div>
              <div class="flex -mx-3">
                <div class="w-full px-3 mb-4">
                  <label for="" class="text-xs font-semibold px-1"
                    >Fecha de nacimiento</label
                  >
                  <div class="relative max-w-sm">
                    <div
                      class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                    >
                      <svg
                        aria-hidden="true"
                        class="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Selecciona fecha"
                      required 
                      @changeDate="handleFechaNacChange" readonly
                      id="inputFecha"

                    />
                  </div>
                  <div id="error-message-fecha" class="text-red-500 hidden"></div>
                </div>
              </div>
              <fieldset class="mb-12">
    <legend class="sr-only">Géneros</legend>
    <label for="" class="text-xs font-semibold px-1">Género</label>
    <div class="generos flex">
      <div class="flex items-center mb-4">
        <input
          id="country-option-1"
          type="radio"
          name="countries"
          value="Masculino"
          v-model="genero" checked
          class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          for="country-option-1"
          class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Masculino
        </label>
      </div>

      <div class="ms-4 flex items-center mb-4">
        <input
          id="country-option-2"
          type="radio"
          name="countries"
          value="Femenino"
          v-model="genero"
          class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          for="country-option-2"
          class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Femenino
        </label>
      </div>

      <div class="ms-4 flex items-center mb-4">
        <input
          id="country-option-3"
          type="radio"
          name="countries"
          value="Otros"
          v-model="genero"
          class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          for="country-option-3"
          class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Otros
        </label>
      </div>
    </div>
  </fieldset>
              <div class="flex -mx-3 mb-3">
                <div class="w-full px-2 pr-20 mb-5">
                  <label for="" class="text-xs font-semibold px-1"
                    >Imagen de Perfil</label
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
                    class="max-h-[200px] max-w-[290px] mt-2 md:px-0 md:max-w-md rounded-lg shadow-xl dark:shadow-gray-800"
                    :src="selectedImage"
                    alt="image description"
                  />
                </div>
              </div>

              <div class="flex -mx-3">
                <div class="w-full px-3 mb-5">
                  <label for="" class="text-xs font-semibold px-1">Email</label>
                  <div class="flex">
                    <div
                      class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
                    >
                      <font-awesome-icon icon="fa-regular fa-envelope"></font-awesome-icon>
                    </div>
                    <input
                      type="email"
                      class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="johnsmith@example.com" v-model="email"
                      id="inputEmail"
                      required
                      @blur.self="comprobarEmailRegistrado"
                    />
                  </div>
                  <div id="error-message-email" class="text-red-500 hidden"></div>
                </div>
              </div>
              <div class="flex -mx-3">
                <div class="w-1/2 px-3 mb-5">
                  <label for="" class="text-xs font-semibold px-1"
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
                          @click="togglePasswordVisibility(true)"
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
                        placeholder="************" v-model="password"
                        @input="comprobarPass"
                      />
                    </div>
                  </div>
                </div>
                <div class="w-1/2 px-3 mb-5">
                    <label for="" class="text-xs font-semibold px-1"
                    >Repetir Contraseña</label
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
                          @click="togglePasswordVisibility(false)"
                        >
                          <font-awesome-icon icon="fa-solid fa-eye" v-show="showPassword2"></font-awesome-icon>
                          <font-awesome-icon
                            icon="fa-solid fa-eye-slash"
                            v-show="!showPassword2"
                          ></font-awesome-icon
                        ></label>
                      </div>
                      <input
                        class="appearance-none border-2 rounded-lg w-full py-3 px-3 leading-tight border-gray-200 focus:outline-none focus:border-indigo-500 focus:bg-white text-gray-700 pr-16 font-mono js-password2"
                        id="inputConfirmPass"
                        type="password"
                        autocomplete="off"
                        placeholder="************" v-model="confirmPassword"
                        @input="comprobarPass"
                      />
                    </div>
                  </div>
                </div>
                
              </div>
              <div class="flex -mx-3">
  <div class="w-full px-3 mb-12">
    <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
      Requisitos de contraseña:
    </h2>
    <ul class="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
      <li class="flex items-center">
        <font-awesome-icon :icon="iconCaracter" :class="iconCaracterClass" id="c_caracteres"></font-awesome-icon>
        Al menos 8 caracteres
      </li>
      <li class="flex items-center">
        <font-awesome-icon :class="iconMayusculaClass" :icon="iconMayuscula" id="c_mayuscula"></font-awesome-icon>
        Al menos una letra mayúscula
      </li>
      <li class="flex items-center">
        <font-awesome-icon :class="iconEspecialClass" :icon="iconEspecial" id="c_especial"></font-awesome-icon>
        Al menos un carácter especial, ej., ! @ # ?
      </li>
      <li class="flex items-center">
        <font-awesome-icon :class="iconCoincidirClass" :icon="iconCoincidir" id="c_coincidir"></font-awesome-icon>
        Deben de coincidir
      </li>
    </ul>
  </div>
</div>

              <div class="flex -mx-3">
                <div class="w-full px-3 mb-5">
                  <button
                    class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                  >
                    REGISTRARSE
                  </button>
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
import axios from 'axios';
import moment from 'moment';
import Datepicker from 'flowbite-datepicker/Datepicker';
import Compressor from 'compressorjs';


export default {
  data() {
    return {
      nombre: "",
      apellidos: "",
      usuario: "",
      email: "",
      fecha_nac: "",
      password: "",
      confirmPassword: "",
      genero: 'masculino', 
      selectedImage: "https://flowbite.com/docs/images/examples/image-2@2x.jpg",
      foto:"",
      showPassword: false,
      showPassword2: false,
      icono_caracter: false,
      icono_mayuscula: false,
      icono_especial: false,
      icono_coincidir: false,
    };
  },
  computed: {
    iconCaracter() {
  if (this.icono_caracter)
    return "fa-solid fa-circle-check";
  else
    return "fa-solid fa-circle-xmark";
},
iconCaracterClass() {
  if (this.icono_caracter)
    return "fw-4 mr-1.5 text-green-500";
  else
    return "w-4 mr-1.5";
},
iconMayuscula() {
  if (this.icono_mayuscula)
    return "fa-solid fa-circle-check";
  else
    return "fa-solid fa-circle-xmark";
},
iconMayusculaClass() {
  if (this.icono_mayuscula)
    return "fw-4 mr-1.5 text-green-500";
  else
    return "w-4 mr-1.5";
},
iconEspecial() {
  if (this.icono_especial)
    return "fa-solid fa-circle-check";
  else
    return "fa-solid fa-circle-xmark";
},
iconEspecialClass() {
  if (this.icono_especial)
    return "fw-4 mr-1.5 text-green-500";
  else
    return "w-4 mr-1.5";
},
iconCoincidir() {
  if (this.icono_coincidir)
    return "fa-solid fa-circle-check";
  else
    return "fa-solid fa-circle-xmark";
},
iconCoincidirClass() {
  if (this.icono_coincidir)
    return "fw-4 mr-1.5 text-green-500";
  else
    return "w-4 mr-1.5";
},
  },
  mounted(){
    const datepickerEl = document.getElementById('inputFecha');
new Datepicker(datepickerEl, {
    autohide: true,
});
  },
  methods: {
    submitForm() {
      this.validateForm().then(todoCorrecto => {
    if (todoCorrecto) {
        this.saveImageToDatabase();
        // Los campos son válidos, procede con el envío del formulario
        axios.post('https://www.ieslamarisma.net/proyectos/2023/javiergarcia/php/registrar.php', {
            nombre: this.nombre,
            apellidos: this.apellidos,
            usuario: this.usuario,
            email: this.email,
            fecha_nac: this.fecha_nac,
            pass: this.password,
            genero: this.genero.toLowerCase(),
            foto: this.foto,
    }, {
     headers: {
    'Content-Type': 'application/json'
    }
    })
        .then(response => {
            console.log(response.data)
          // Manejar la respuesta del servidor
          if (response.data === 'OK') {
            // se ha podido registrar :)
            this.$router.replace({ name: 'login' }).then(() => {
  this.$nextTick(() => {
    var toastSuccess = document.getElementById('toast-success');
    if (toastSuccess) {
      toastSuccess.classList.remove('hidden');
    }
    window.scrollTo(0, 0); // Desplazarse hacia arriba de la página
  });
});
                
          } else {
            // Las credenciales son incorrectas
           console.log("error");
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
    handleFechaNacChange(event) {
    const fecha = moment(event.target.value);
    const fechaMoment = moment(fecha, "DD/MM/YYYY");  
    const fechaBD = fechaMoment.format("YYYY-MM-DD");
      this.fecha_nac = fechaBD;
    },
    comprobarUserRegistrado() {

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
    },
    comprobarEmailRegistrado() {
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
      const base64Image = this.selectedImage.split(',')[1];
      this.foto = base64Image;
      
    },
    togglePasswordVisibility(pass) {
        var password = "";
    if (pass) {
      password = document.querySelector(".js-password");
      
      if (password.type === "password") password.type = "text";
      else password.type = "password";

      this.showPassword = !this.showPassword;
    } else {
    password = document.querySelector(".js-password2");
      
      if (password.type === "password") password.type = "text";
      else password.type = "password";

      this.showPassword2 = !this.showPassword2;
    }

    },
    comprobarPass() {

     let coincidir = false;
     let caracteres = false;
     let mayuscula = false;
     let especial = false;

     if (this.password.length < 8) {
           this.icono_caracter= false;

            caracteres =false;
        
     } else {
            this.icono_caracter= true;
            caracteres = true;
        
     }

     if (!/[A-Z]/.test(this.password)) {
      this.icono_mayuscula= false;
            mayuscula = false;
        
     } else {
      this.icono_mayuscula= true;
        
            mayuscula = true;
        
     }

     if (!/[!@#$%^&*(),.?":{}|<>]/.test(this.password)) {
            this.icono_especial= false;

            
            especial = false;
       
     } else {
           this.icono_especial= true;
            especial=true;
        
     }

     if (this.password != this.confirmPassword) {
        
      this.icono_coincidir= false;

            
            coincidir = false;
        
     } else {
        
      this.icono_coincidir= true;
            coincidir=true;
        
     }
   
     if (coincidir && caracteres && mayuscula && especial) 
        return true;
     else
        return false;
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
      }else {
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
      if (this.usuario.trim() === "") {
        const error = document.getElementById('error-message-user');
        error.classList.remove('hidden');
        error.textContent = "El usuario no puede estar vacio"

        const input = document.getElementById('inputUsuario');
        input.classList.remove('border-gray-200', 'focus:border-indigo-500');
        input.classList.add('border-red-600', 'focus:border-red-500', 'focus:ring-red-500');
        
        correcto = false;
      } else if (this.usuario.trim().length <4 ) {
        const error = document.getElementById('error-message-user');
        error.classList.remove('hidden');
        error.textContent = "El usuario debe tener al menos 4 caracteres"

        const input = document.getElementById('inputUsuario');
        input.classList.remove('border-gray-200', 'focus:border-indigo-500');
        input.classList.add('border-red-600', 'focus:border-red-500', 'focus:ring-red-500');
        correcto = false;
      } 
    
      const fechaLimite = new Date();
      fechaLimite.setFullYear(fechaLimite.getFullYear() - 3);
      console.log(fechaLimite + " - " + fechaLimite.getTime() +  new Date(this.fecha_nac).getTime() > fechaLimite.getTime());
      
      //fecha Nacimiento
      if (this.fecha_nac.trim() === "") {
        const error = document.getElementById('error-message-fecha');
        error.classList.remove('hidden');
        error.textContent = "Debes seleccionar una fecha"

        const input = document.getElementById('inputFecha');
        input.classList.remove('border-gray-200', 'focus:border-indigo-500');
        input.classList.add('border-red-600', 'focus:border-red-500', 'focus:ring-red-500');
        
        correcto = false;
      }else if (new Date(this.fecha_nac).getTime() > fechaLimite.getTime()) {
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

      //Contraseña
      if (!this.comprobarPass()) {
        const input = document.getElementById('inputPass');
        input.classList.remove('border-gray-200', 'focus:border-indigo-500');
        input.classList.add('border-red-600', 'focus:border-red-500', 'focus:ring-red-500');
        
        const input2 = document.getElementById('inputConfirmPass');
        input2.classList.remove('border-gray-200', 'focus:border-indigo-500');
        input2.classList.add('border-red-600', 'focus:border-red-500', 'focus:ring-red-500');

        correcto = false;
      } else {
        const input = document.getElementById('inputPass');
        if (input.classList.contains('border-red-600')) {
        // Realiza las acciones correspondientes
        input.classList.remove('border-red-600', 'focus:border-red-500', 'focus:ring-red-500');
        input.classList.add('border-gray-200', 'focus:border-indigo-500');
        }
        const input2 = document.getElementById('inputConfirmPass');
        if (input2.classList.contains('border-red-600')) {
        // Realiza las acciones correspondientes
        input2.classList.remove('border-red-600', 'focus:border-red-500', 'focus:ring-red-500');
        input2.classList.add('border-gray-200', 'focus:border-indigo-500');
        }
      }
      const promesaUsuario = this.comprobarUserRegistrado()
      .then(usuarioEncontrado => {
        if (usuarioEncontrado) {
          console.log("encontrado user");
          correcto = false;
        }
      })
      .catch(error => {
        console.error(error);
        // Manejar el error si ocurre
        reject(error);
      });

    const promesaEmail = this.comprobarEmailRegistrado()
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

    Promise.all([promesaUsuario, promesaEmail])
      .then(() => {
        console.log("retorno el correct gucci");
        console.log(correcto)
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
  });
}
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
