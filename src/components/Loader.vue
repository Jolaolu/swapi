<template>
  <div class="loading"></div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.loading {
  border: 1rem solid #f3f3f3; /* Light grey */
  border-top: 1rem solid #3498db; /* Blue */
  border-radius: 100%;
  width: 7rem;
  height: 7rem;
  animation: spin 2s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
