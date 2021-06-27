<template>
  <span
    class="Letter"
    :class="statuses"
  >
    {{ text }}
  </span>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
    },
    statuses: {
      type: Array,
    }
  }  
}
</script>

<style lang="scss" scoped>
.Letter {
  position: relative;
  display: inline-block;
  color: #80808063;

  &.success {
    color: black;

    &.space:before {
      color: black;
    }
  }
  &.error {
    color: white;
    background-color: red;

    &.space {
      opacity: 1;
      color: white;
    }
  }
  &.active {
    &.space {
      animation: blink 600ms steps(1, start) infinite;
      &.error:before {
        color: red;
        opacity: 1;
      }
    }
  }
  &.active {
    animation: blink 600ms steps(1, start) infinite;
  }
  &.space {
    color: gray;
    opacity: 0.3;
  }
}

</style>