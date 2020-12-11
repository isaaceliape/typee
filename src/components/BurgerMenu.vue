<template>
  <div
    class="BuggerMenu"
    v-on="$listeners"
  >
    <div class="bar" />
    <div class="bar" />
    <div class="bar" />
  </div>
</template>

<style lang="scss" scoped>
  .BuggerMenu {
    padding: 5px;
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
    .bar {
      height: 3px;
      width: 30px;
      background-color: gray;
      margin-bottom: 3px;
    }
  }
</style>