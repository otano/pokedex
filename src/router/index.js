import { createRouter, createWebHistory } from 'vue-router'
import PokeList from '../views/PokeList.vue'
import PokeDetails from '../views/PokeDetails.vue'
import FavoritesView from '../views/FavoritesView.vue'
import HelloWorld from '../components/HelloWorld.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: PokeList
        },
        {
            path: '/pokemon/:id',
            name: 'details',
            component: PokeDetails,
            props: true
        },
        {
            path: '/favorites',
            name: 'favorites',
            component: FavoritesView
        },
        {
            path: '/about',
            name: 'about',
            component: HelloWorld,
            props: { msg: "À propos de ce Pokédex" }
        }
    ]
})

export default router