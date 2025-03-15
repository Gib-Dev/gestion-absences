import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/DashboardView.vue";
import AbsencesView from "@/views/AbsencesView.vue";

const routes = [
  { path: "/", component: LoginView },
  { path: "/dashboard", component: DashboardView },
  { path: "/absences", component: AbsencesView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
