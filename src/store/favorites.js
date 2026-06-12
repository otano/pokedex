import { ref, watch } from 'vue'

const favorites = ref(JSON.parse(localStorage.getItem('pokedex-favorites')) || [])

export function useFavorites() {
    const isFavorite = (pokemonId) => {
        return favorites.value.some(p => p.pokedexId === pokemonId)
    }

    const addFavorite = (pokemon) => {
        if (!isFavorite(pokemon.pokedexId)) {
            favorites.value.push(pokemon)
        }
    }

    const removeFavorite = (pokemonId) => {
        favorites.value = favorites.value.filter(p => p.pokedexId !== pokemonId)
    }

    const toggleFavorite = (pokemon) => {
        if (isFavorite(pokemon.pokedexId)) {
            removeFavorite(pokemon.pokedexId)
        } else {
            addFavorite(pokemon)
        }
    }

    const clearFavorites = () => {
        favorites.value = []
    }

    return {
        favorites,
        isFavorite,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        clearFavorites
    }
}

// Persistance
watch(favorites, (newFavorites) => {
    localStorage.setItem('pokedex-favorites', JSON.stringify(newFavorites))
}, { deep: true })
