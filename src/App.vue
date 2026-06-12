<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <header>
    <nav class="navbar">
      <RouterLink to="/">Liste</RouterLink>
      <RouterLink to="/pokemon/1" :class="{ 'router-link-active': route.name === 'details' }">Détails</RouterLink>
      <RouterLink to="/favorites">Favoris</RouterLink>
      <RouterLink to="/about">À propos</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.navbar {
  background-color: #333;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.navbar a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.navbar a:hover {
  background-color: #555;
}

.navbar a.router-link-active {
  background-color: #ef5350; /* Rouge Pokédex */
}
</style>
