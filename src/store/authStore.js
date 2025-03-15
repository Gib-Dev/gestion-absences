import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: null,
  }),
  actions: {
    async login(email, password) {
      try {
        const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
        this.token = res.data.token;
        localStorage.setItem("token", this.token);
      } catch (error) {
        console.error("Erreur de connexion", error);
      }
    },
    logout() {
      this.token = null;
      localStorage.removeItem("token");
    },
  },
});
