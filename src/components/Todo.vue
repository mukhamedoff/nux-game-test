<template>
  <div class="todo">
    <div class="todo-id">{{ item.id }}</div>
    <div class="todo-separator"> | </div>
    <div class="todo-title">{{ item.title }}</div>
    <div class="todo-separator"> | </div>
    <div class="todo-done">
      {{ item.completed ? '*' : '#' }}
    </div>
    <div class="todo-separator"> | </div>
    <button
      v-if="!item.favorit"
      @click="addToFav"
    >
      Add to fav
    </button>
    <button
      v-else
      @click="removeFromFav"
    >
      Remove from fav
    </button>
  </div>
</template>

<script>
export default {
  name: 'Todo',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    addToFav() {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      favorites.push(this.item.id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      this.$emit('update')
    },
    removeFromFav() {
      let favorites = JSON.parse(localStorage.getItem('favorites'));
      favorites = favorites.filter(item => item !== this.item.id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      this.$emit('update')
    }
  }
}
</script>

<style scoped lang="scss">
  .todo{
    display: flex;

    &-title{
      flex: 1;
    }
  }
</style>
