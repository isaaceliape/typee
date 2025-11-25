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
    transition: background-color 0.3s ease;
    
    &:hover {
      background-color: var(--button-hover-bg);
      .bar {
        background-color: var(--button-hover-text);
      }
    }
    .bar {
      height: 3px;
      width: 30px;
      background-color: var(--text-color);
      margin-bottom: 3px;
      transition: background-color 0.3s ease;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>