<template>
  <div class="login-container">
    <h2>Connexion</h2>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Mot de passe" />
    <button @click="login">Se connecter</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const authStore = useAuthStore();
const router = useRouter();

const login = async () => {
  await authStore.login(email.value, password.value);
  if (authStore.token) router.push("/dashboard");
};
</script>
