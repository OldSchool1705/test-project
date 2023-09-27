<template>
  <form @submit.prevent="login">
    <div class="container">
      <div class="title">Authentication</div>
      <input
        v-model="username"
        type="text"
        class="input-field"
        placeholder="Username"
      />
      <input
        v-model="password"
        type="password"
        class="input-field"
        placeholder="Password"
      />
      <button type="submit" class="login-button">Login</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useLocalStorage } from "@vueuse/core";

const username = ref("");
const password = ref("");
const router = useRouter();

const token = useLocalStorage("token", ""); 

const login = async () => {
  try {
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: username.value,
        password: password.value,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const newToken = data.token;

      router.push("/");
      token.value = newToken;
    } else {
      console.error("Ошибка авторизации");
    }
  } catch (error) {
    console.error("Ошибка авторизации:", error);
  }
};
</script>
