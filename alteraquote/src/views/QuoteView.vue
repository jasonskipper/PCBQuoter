<script setup>
import QuoteForm from '../components/QuoteForm.vue';
</script>

<template>
  <main class="quote-view">
    <QuoteForm />
  </main>
</template>

<style scoped>
.quote-view {
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f1f1f1;
}
</style>
