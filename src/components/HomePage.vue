<script setup>
import { ref, onMounted } from 'vue'

const pokemonList = ref([])
const selectedPokemon = ref(null)
const isModalOpen = ref(false)

const fetchPokemon = async () => {
  try {
    const response = await fetch('https://tyradex.app/api/v1/pokemon')
    const data = await response.json()
    // L'API retourne un tableau de tous les pokémons
    pokemonList.value = data
  } catch (error) {
    console.error("Erreur lors de la récupération des pokémons :", error)
  }
}

const openModal = (pokemon) => {
  selectedPokemon.value = pokemon
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedPokemon.value = null
}

onMounted(() => {
  fetchPokemon()
})
</script>

<template>
  <div class="homepage">
    <nav class="title-bar">
      <h1>Pokédex Vue.js</h1>
    </nav>

    <div class="container">
      <!-- Liste des Pokémon -->
      <div 
        v-for="pokemon in pokemonList" 
        :key="pokemon.pokedexId" 
        class="pokemon-card"
        @click="openModal(pokemon)"
      >
        <div class="img-wrapper">
          <img :src="pokemon.sprites.regular" :alt="pokemon.name.fr" loading="lazy" />
        </div>
        <div class="info">
          <span class="number">#{{ pokemon.pokedexId }}</span>
          <h3>{{ pokemon.name.fr }}</h3>
        </div>
      </div>
    </div>

    <!-- Modale de détails -->
    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content" v-if="selectedPokemon">
        <button class="close-btn" @click="closeModal">&times;</button>
        
        <div class="modal-header">
          <h2>{{ selectedPokemon.name.fr }}</h2>
          <span class="modal-id">N° {{ selectedPokemon.pokedexId }}</span>
        </div>

        <div class="modal-body">
          <img :src="selectedPokemon.sprites.regular" :alt="selectedPokemon.name.fr" class="modal-image" />
          
          <div class="types" v-if="selectedPokemon.types">
            <span v-for="type in selectedPokemon.types" :key="type.name" class="type-badge">
              {{ type.name }}
            </span>
          </div>

          <div class="stats" v-if="selectedPokemon.stats">
            <h3>Statistiques</h3>
            <ul>
              <li><strong>PV:</strong> {{ selectedPokemon.stats.hp }}</li>
              <li><strong>Attaque:</strong> {{ selectedPokemon.stats.atk }}</li>
              <li><strong>Défense:</strong> {{ selectedPokemon.stats.def }}</li>
              <li><strong>Atq. Spé:</strong> {{ selectedPokemon.stats.spe_atk }}</li>
              <li><strong>Déf. Spé:</strong> {{ selectedPokemon.stats.spe_def }}</li>
              <li><strong>Vitesse:</strong> {{ selectedPokemon.stats.vit }}</li>
            </ul>
          </div>
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

.title-bar {
  background-color: #ef5350;
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.title-bar h1 {
  margin: 0;
  font-size: 1.5rem;
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
  display: block;
  margin-top: 0.5rem;
}

.info h3 {
  margin: 0.5rem 0 0;
  font-size: 1.1rem;
  color: #333;
}

/* Styles de la Modale */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  width: 90%;
  max-width: 450px;
  position: relative;
  text-align: center;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-image {
  width: 150px;
  height: 150px;
  object-fit: contain;
  margin: 1rem 0;
}

.type-badge {
  display: inline-block;
  background: #eee;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  margin: 0 0.25rem;
  font-weight: bold;
  color: #555;
}

.stats ul {
  list-style: none;
  padding: 0;
  text-align: left;
  margin-top: 1.5rem;
  background: #fafafa;
  padding: 1rem;
  border-radius: 8px;
}

.stats li {
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
}
</style>