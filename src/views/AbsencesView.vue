<template>
  <div>
    <h2>Gestion des Absences</h2>
    <button @click="ajouterAbsence">Ajouter une absence</button>
    <table>
      <tr v-for="absence in absences" :key="absence.id">
        <td>{{ absence.nom }}</td>
        <td>{{ absence.date }}</td>
        <td>
          <button @click="supprimerAbsence(absence.id)">Supprimer</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const absences = ref([]);

const chargerAbsences = async () => {
  const res = await axios.get("http://localhost:5000/api/absences");
  absences.value = res.data;
};

const supprimerAbsence = async (id) => {
  await axios.delete(`http://localhost:5000/api/absences/${id}`);
  chargerAbsences();
};

onMounted(chargerAbsences);
</script>
