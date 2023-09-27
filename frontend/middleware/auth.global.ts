import { useAuthStore } from "../stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (to.path !== `/login` && authStore.getToken() === "") {
    return navigateTo("/login");
  }

  if (to.path === `/login` && authStore.getToken() !== "") {
    console.log(authStore.getToken());
    
    return navigateTo("/");
  }
});
