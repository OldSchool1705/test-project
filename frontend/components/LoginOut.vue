<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
const router = useRouter();

const loginOut = () => {
  router.push({ path: "/login" });
  authStore.removeToken();
};
</script>

<template>
  <button @click="loginOut" class="login-button">Log out</button>
</template>
