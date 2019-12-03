<template>
  <transition name="toast-slide">
    <div :class="['toast', context]">{{ message }}</div>
  </transition>
</template>

<script>
export default {
  name: "Toast",
  props: ["message", "context"]
};
</script>
<style lang="scss" scoped>
.toast {
  display: flex;
  justify-content: center;
  position: fixed;
  width: 50%;
  padding: 1.5em;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-size: 1.2em;
  font-weight: 500;
  text-align: left;
  &.error {
    background-color: #ef5753;
  }
  &.success {
    background-color: #51d88a;
  }
}
.toast-slide-enter,
.toast-slide-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.6s;
}
</style>
