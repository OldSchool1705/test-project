import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: process.client ? localStorage.getItem("token") || "" : "",
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
      if (process.client) {
        localStorage.setItem("token", token);
      }
    },
    getRouter() {
      const { currentRoute } = useRouter();

      return currentRoute.value.fullPath;
    },
    getToken() {
      let token;
      if (process.client) {
        token = localStorage.getItem("token");
      }
      return token;
    },
    removeToken() {
      this.token = "";
      if (process.client) {
        localStorage.setItem("token", "");
      }
    },
    async fetchData(page: string) {
      try {
        const token = this.getToken();

        const getResponse = await fetch(`http://localhost:8000/pages/${page}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!getResponse.ok) {
          throw new Error("Error fetching data");
        }

        return await getResponse.json();
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  },
});
