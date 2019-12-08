<template>
  <div class="pagination">
    <div class="pagination-buttons__wrapper">
      <button
        class="paginate"
        :disabled="presentPage === 1"
        @click="previousPage()"
      >
        <font-awesome-icon :icon="['fas', 'angle-left']" size="2x" />
      </button>

      <button
        class="paginate"
        :disabled="presentPage === totalPages"
        @click="nextPage()"
      >
        <font-awesome-icon :icon="['fas', 'angle-right']" size="2x" />
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      next: "next",
      previous: "previous",
      presentPage: 1
    };
  },
  props: ["totalPages", "currentPage"],
  methods: {
    nextPage() {
      this.$emit("changing", this.next);
    },
    previousPage() {
      this.$emit("changing", this.previous);
    }
  },
  watch: {
    currentPage: function(newVal) {
      // watch for changes
      return (this.presentPage = newVal);
    }
  }
};
</script>
<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  button {
    font-size: 2rem;
    margin: 0.2em 0;
    padding: 0.5rem 1rem;
    cursor: pointer;
    color: #878790;
    &:disabled {
      cursor: not-allowed;
    }
  }
}
</style>
