<template>
<button v-bind:class="classObject"
  v-on:click="$emit('click')">
  <slot></slot>
</button>
</template>

<script>
export default {
  props: ['className', 'theme'],
  computed: {
    classObject: function () {
      return {
        btn: true,
        'btn--state--progress': this.theme === 'progress',
        'btn--state--break': this.theme === 'break',
      };
    }
  },
}
</script>

<style scoped>
.btn {
  width: 200px;
  padding: 10px;
  background-color: transparent;
  color: white;
  border-radius: 5px;
  transition: all .3s;
  border: 1px solid white;
  outline: 0;
}

.btn--state--progress:hover {
  background-color: var(--red-color-dark);
}

.btn--state--break:hover {
  background-color: var(--green-color-dark);
}
</style>
