<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFavorites } from '../store/favorites'

const router = useRouter()
const { isFavorite, toggleFavorite } = useFavorites()
const pokemonList = ref([])

const fetchPokemon = async () => {
  try {
    const response = await fetch('https://tyradex.app/api/v1/pokemon')
    const data = await response.json()
    pokemonList.value = data
  } catch (error) {
    console.error("Erreur lors de la récupération des pokémons :", error)
  }
}

const goToDetails = (pokemon) => {
  router.push({ name: 'details', params: { id: pokemon.pokedex_id } })
}

onMounted(() => {
  fetchPokemon()
})
</script>

<template>
  <div class="homepage">
    <div class="container">
      <!-- Liste des Pokémon -->
      <div 
        v-for="pokemon in pokemonList" 
        :key="pokemon.pokedex_id" 
        class="pokemon-card"
        @click="goToDetails(pokemon)"
      >
        <div class="card-header">
          <span class="number">#{{ pokemon.pokedex_id }}</span>
          <button 
            class="favorite-btn" 
            :class="{ active: isFavorite(pokemon.pokedex_id) }"
            @click.stop="toggleFavorite(pokemon)"
          >
            {{ isFavorite(pokemon.pokedex_id) ? '★' : '☆' }}
          </button>
        </div>
        <div class="img-wrapper">
          <img :src="pokemon.sprites.regular" :alt="pokemon.name.fr" loading="lazy" />
        </div>
        <div class="info">
          <h3>{{ pokemon.name.fr }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.homepage {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1.5rem;
}

.pokemon-card {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.favorite-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #ccc;
  transition: color 0.2s, transform 0.2s;
  padding: 0;
  line-height: 1;
}

.favorite-btn.active {
  color: #ffca28;
}

.favorite-btn:hover {
  transform: scale(1.2);
}

.pokemon-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.pokemon-card img {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.number {
  color: #888;
  font-size: 0.9rem;
}

.info h3 {
  margin: 0.5rem 0 0;
  font-size: 1.1rem;
  color: #333;
}
</style>