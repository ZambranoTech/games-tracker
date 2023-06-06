import {createRouter, createWebHistory} from 'vue-router'

//componentes
import Detail from '../components/DetailComponent'
import Games from '../components/GamesComponent'
import Game from '../components/GameComponent.vue'
import ProfileComponent from '../components/ProfileComponent.vue'
import LoginComponent from '../components/LoginComponent.vue'
import RegisterComponent from '../components/RegisterComponent.vue'
import MoreResultsComponent from '../components/MoreResultsComponent.vue'
import PruebaComponent from '../components/PruebaComponent.vue'
import ColeccionComponent from '../components/ColeccionComponent.vue'
import ColeccionEditarComponent from '../components/ColeccionEditarComponent.vue'
import navigationCount from '../logica/navigationCount.js';


//definir objetos rutas
const routes = [
    {
        path: '/', component: Games, name:"home"
    }, {
        path: '/detalles', component: Detail, name:"detail"
    }, {
        path: '/juego/:id', component: Game, name:"game"
    }, {
        path: '/login', component: LoginComponent, name:"login"
    },
    {
        path: '/register', component: RegisterComponent, name:"register"
    },
    {
        path: '/perfil/:id', component: ProfileComponent, name:"profile"
    },
    {
        path: '/resultados/:busqueda', component: MoreResultsComponent, name:"results"
    },
    {
        path: '/PruebaComponent/', component: PruebaComponent, name:"prueba"
    },
    {
        path: '/coleccion/:id', component: ColeccionComponent, name:"collection"
    },
    {
        path: '/coleccion/editar/:id', component: ColeccionEditarComponent, name:"editCollection"
    },
]


//crear objeto rutas de vue router -- objeto de VR
const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    navigationCount.increment();
    next();
  });

  

export default router;