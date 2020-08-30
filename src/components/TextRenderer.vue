<template>
  <div class="TextRenderer">
    {{ getText }}
  </div>
</template>

<script>
export default {
  name: 'TextRenderer',
  props: {
    letters: {
      type: Array,
      default: () => ['a'],
    },
  },
  computed: {
    getText() {
      return this.letters
        .map(({ text, status, active, type }) => {
          const activeClass = active ? ' active' : ''
          const typeClass = type === 'space' ? ' isSpace' : ''
          return `<span class='${status}${activeClass}${typeClass}'>${text}</span>`;
        })
        .join('');
    },
  }
}
</script>
<style scoped>
  renderText {
    border: 0;
    margin: 50px auto 15px auto;
    display: block;
    font-size: 30px;
    line-height: 1.2em;
    width: 80vw;
    height: auto;
    max-width: 800px;
    color: gray;
  }

  .renderText span {
    position: relative;
  }

  .renderText.disableTyping .active {
    animation: none;
    color: gray;
  }

</style>
