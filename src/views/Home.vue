<template>
  <div class="home">
    <Header/>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {
    Header: () => import("@/components/Header.vue"),
    // Loader: () => import("@/components/Loader.vue"),
    // Toast: () => import("@/components/Toast.vue"),
    // Footer: () => import("@/components/Footer.vue")
  }
};
</script>
