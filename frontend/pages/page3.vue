<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
const response = ref<{ title: string; content: string } | undefined>(undefined);

console.log(authStore.getToken(), "asdasd");

onMounted(async () => {
  try {
    const data = await authStore.fetchData("page3");

    response.value = data;
  } catch (e) {
    console.error(e);
  }
});
</script>

<template>
  <div class="container">
    <div class="title">{{ response ? response.title : "" }}</div>
    <div class="article" v-if="response" v-html="response.content"></div>
    <p><NuxtLink href="/" class="home-button">Back to Home</NuxtLink></p>
    <LoginOut />
  </div>
</template>
