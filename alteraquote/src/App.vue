<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <div>
    <header>
      <nav>
        <router-link to="/">PCB Quoting Tool</router-link>
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<style scoped>
header {
  background-color: #007bff;
  padding: 1rem;
  text-align: center;
  color: white;
}

nav a {
  color: white;
  text-decoration: none;
  margin: 0 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

nav a:hover {
  background-color: #0056b3;
}

nav a.router-link-exact-active {
  background-color: #0056b3;
}
</style>
