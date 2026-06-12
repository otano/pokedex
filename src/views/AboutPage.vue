<script setup>
import HelloWorld from '../components/HelloWorld.vue'
</script>

<template>
  <div class="about-page">
    <div class="card">
      <h1>À propos de ce Pokédex</h1>

      <section>
        <h2>
          <span class="icon">⚡</span> Vue.js
        </h2>
        <p>
          Application construite avec <strong>Vue 3</strong> et <strong>Vite</strong>,
          utilisant le système de composants monofichiers (SFC),
          <strong>Vue Router</strong> pour la navigation et un store réactif
          pour la persistance des favoris.
        </p>
        <ul>
          <li>Composants réactifs avec <code>&lt;script setup&gt;</code></li>
          <li>Routing SPA avec <code>vue-router</code></li>
          <li>Store réactif partagé (composable + <code>localStorage</code>)</li>
          <li>Appels API asynchrones avec <code>fetch</code></li>
        </ul>
      </section>

      <section>
        <h2>
          <span class="icon">📦</span> Tyradex API
        </h2>
        <p>
          Les données des Pokémon sont fournies par l'API ouverte
          <a href="https://tyradex.app" target="_blank">Tyradex</a>.
          Aucune base de données locale — l'application interroge l'API
          en temps réel pour afficher la liste et les détails.
        </p>
      </section>

      <section class="project-info">
        <h2>
          <span class="icon">🎓</span> Projet EPSI
        </h2>
        <p>
          Réalisé dans le cadre du cours <strong>Framework JavaScript — Vue 3</strong>
          à l'<strong>EPSI</strong>. L'objectif est de découvrir l'écosystème Vue
          à travers une application concrète.
        </p>
      </section>

      <div class="hello-wrapper">
        <HelloWorld />
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  min-height: 100vh;
  padding: 2rem;
  box-sizing: border-box;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 700px;
  margin: 0 auto;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  position: relative;
  padding-bottom: 4rem;
}

h1 {
  margin: 0 0 1.5rem;
  color: #333;
  font-size: 1.6rem;
  border-bottom: 2px solid #eee;
  padding-bottom: 0.75rem;
}

section {
  margin-bottom: 1.5rem;
}

h2 {
  color: #ef5350;
  font-size: 1.2rem;
  margin: 0 0 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.icon {
  font-size: 1.1rem;
}

p {
  margin: 0;
  color: #555;
  line-height: 1.6;
}

ul {
  margin: 0.5rem 0 0;
  padding-left: 1.2rem;
  color: #555;
}

li {
  margin-bottom: 0.3rem;
}

code {
  background: #f0f0f0;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-size: 0.9em;
}

a {
  color: #ef5350;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.hello-wrapper {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
}
</style>
