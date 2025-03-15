<template>
  <div>
    <h1>Tableau de bord</h1>
    <div class="stats">
      <div class="card">Total Absences : {{ stats.absences }}</div>
      <div class="card">Total Retards : {{ stats.retards }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const stats = ref({ absences: 0, retards: 0 });

onMounted(async () => {
  const res = await axios.get("http://localhost:5000/api/stats");
  stats.value = res.data;
});
</script>

<style scoped>
.stats {
  display: flex;
  gap: 20px;
}
.card {
  padding: 20px;
  background: #eee;
  border-radius: 5px;
}
</style>
