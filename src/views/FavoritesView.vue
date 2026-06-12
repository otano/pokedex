<script setup>
import { useRouter } from 'vue-router'
import { useFavorites } from '../store/favorites'

const router = useRouter()
const { favorites, isFavorite, toggleFavorite, clearFavorites } = useFavorites()

const goToDetails = (pokemon) => {
  router.push({ name: 'details', params: { id: pokemon.pokedex_id } })
}
</script>

<template>
  <div class="favorites-page">
    <div class="header-bar">
      <h1>Mes Favoris</h1>
      <button v-if="favorites.length > 0" @click="clearFavorites" class="clear-btn">
        Tout supprimer
      </button>
    </div>

    <div v-if="favorites.length === 0" class="empty-state">
      <p>Vous n'avez pas encore de favoris.</p>
      <RouterLink to="/" class="back-link">Retour à la liste</RouterLink>
    </div>

    <div v-else class="container">
      <div 
        v-for="pokemon in favorites" 
        :key="pokemon.pokedex_id" 
        class="pokemon-card"
        @click="goToDetails(pokemon)"
      >
        <div class="card-header">
          <span class="number">#{{ pokemon.pokedex_id }}</span>
          <button 
            class="favorite-btn active" 
            @click.stop="toggleFavorite(pokemon)"
          >
            ★
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
.favorites-page {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  min-height: 100vh;
  padding: 2rem;
}

.header-bar {
  max-width: 1200px;
  margin: 0 auto 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.clear-btn {
  background-color: #ef5350;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

.clear-btn:hover {
  background-color: #d32f2f;
}

.empty-state {
  text-align: center;
  padding: 4rem;
  background: white;
  border-radius: 20px;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.back-link {
  display: inline-block;
  margin-top: 1rem;
  color: #ef5350;
  text-decoration: none;
  font-weight: bold;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
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
  color: #ffca28;
  transition: transform 0.2s;
  padding: 0;
  line-height: 1;
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
