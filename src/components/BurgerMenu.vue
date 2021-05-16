<template>
  <div
    class="BuggerMenu"
    v-on="$attrs"
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
    display: inline-block;
    border-radius: 3px;
    
    &:hover {
      background-color: black;
      .bar {
        background-color: white;
      }
    }
    .bar {
      height: 3px;
      width: 30px;
      background-color: var(--line-default);
      margin-bottom: 3px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>