<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useFavorites } from '../store/favorites'

const route = useRoute()
const { isFavorite, toggleFavorite } = useFavorites()
const pokemon = ref(null)
const loading = ref(true)
const error = ref(null)

const fetchPokemonDetails = async (id) => {
  loading.value = true
  error.value = null
  try {
    const response = await fetch(`https://tyradex.app/api/v1/pokemon/${id}`)
    if (!response.ok) throw new Error('Pokémon non trouvé')
    const data = await response.json()
    pokemon.value = data
  } catch (err) {
    console.error("Erreur lors de la récupération des détails :", err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPokemonDetails(route.params.id)
})

watch(() => route.params.id, (newId) => {
  if (newId) fetchPokemonDetails(newId)
})
</script>

<template>
  <div class="details-page">
    <div v-if="loading" class="status">Chargement...</div>
    <div v-else-if="error" class="status error">{{ error }}</div>
    <div v-else-if="pokemon" class="pokemon-detail">
      <div class="header">
        <div class="name-section">
          <h1>{{ pokemon.name.fr }}</h1>
          <button 
            class="favorite-btn" 
            :class="{ active: isFavorite(pokemon.pokedexId) }"
            @click="toggleFavorite(pokemon)"
          >
            {{ isFavorite(pokemon.pokedexId) ? '★' : '☆' }}
          </button>
        </div>
        <span class="pokedex-id">N° {{ pokemon.pokedexId }}</span>
      </div>

      <div class="content">
        <div class="image-section">
          <img :src="pokemon.sprites.regular" :alt="pokemon.name.fr" class="main-image" />
          <div class="types" v-if="pokemon.types">
            <span v-for="type in pokemon.types" :key="type.name" class="type-badge">
              <img :src="type.image" :alt="type.name" v-if="type.image" class="type-icon" />
              {{ type.name }}
            </span>
          </div>
        </div>

        <div class="info-section">
          <div class="stats" v-if="pokemon.stats">
            <h3>Statistiques</h3>
            <ul>
              <li><strong>PV:</strong> <span>{{ pokemon.stats.hp }}</span></li>
              <li><strong>Attaque:</strong> <span>{{ pokemon.stats.atk }}</span></li>
              <li><strong>Défense:</strong> <span>{{ pokemon.stats.def }}</span></li>
              <li><strong>Attaque Spéciale:</strong> <span>{{ pokemon.stats.spe_atk }}</span></li>
              <li><strong>Défense Spéciale:</strong> <span>{{ pokemon.stats.spe_def }}</span></li>
              <li><strong>Vitesse:</strong> <span>{{ pokemon.stats.vit }}</span></li>
            </ul>
          </div>

          <div class="resistances" v-if="pokemon.resistances">
            <h3>Résistances</h3>
            <div class="resistance-grid">
              <div v-for="res in pokemon.resistances" :key="res.name" class="res-item" :class="{ weak: res.multiplier > 1, strong: res.multiplier < 1 }">
                {{ res.name }}: x{{ res.multiplier }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.details-page {
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.status {
  text-align: center;
  font-size: 1.5rem;
  padding: 3rem;
}

.error {
  color: #ef5350;
}

.pokemon-detail {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid #eee;
  padding-bottom: 1rem;
}

.name-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.favorite-btn {
  background: none;
  border: none;
  font-size: 2rem;
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
  transform: scale(1.1);
}

.header h1 {
  margin: 0;
  color: #333;
}

.pokedex-id {
  font-size: 1.5rem;
  color: #888;
  font-weight: bold;
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

@media (max-width: 600px) {
  .content {
    grid-template-columns: 1fr;
  }
}

.main-image {
  width: 100%;
  max-width: 300px;
  height: auto;
  display: block;
  margin: 0 auto;
}

.types {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
}

.type-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f0f0f0;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  font-weight: bold;
}

.type-icon {
  width: 20px;
  height: 20px;
}

.stats h3, .resistances h3 {
  color: #ef5350;
  margin-bottom: 1rem;
  border-left: 4px solid #ef5350;
  padding-left: 0.5rem;
}

.stats ul {
  list-style: none;
  padding: 0;
}

.stats li {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px dashed #eee;
}

.resistance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.5rem;
}

.res-item {
  font-size: 0.8rem;
  padding: 0.25rem;
  border-radius: 4px;
  text-align: center;
  background: #f9f9f9;
}

.weak {
  background: #ffebee;
  color: #c63030;
}

.strong {
  background: #e8f5e9;
  color: #2e7d32;
}
</style>