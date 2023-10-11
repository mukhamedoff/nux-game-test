<template>
  <div class="home">
    <h1 class="home-title">User data and Todo list</h1>
    <div class="home-user">
      ID: {{ user.id }}<br>
      name: {{ user.name }}<br>
      email: {{ user.email }}<br>
      phone: {{ user.phone }}<br>
    </div>
    <div class="home-create">
      <span><b>Create todo:</b></span>
      <span class="klin"></span>
      <label>
        <span>UserId:</span>
        <select v-model="newUserId">
          <option
            v-for="(filterUser, index) in filterUserOptions"
            :key="index"
            :value="filterUser">{{filterUser}}</option>
        </select>
      </label>
      <span class="klin"></span>
      <label>
        <span>Title</span>
        <input type="text" v-model="newTitle">
      </label>
      <span class="klin"></span>
      <button
        @click="addTodo"
        class="green-button"
        :class="{'green-button--disabled': newTitle.length < 2}"
        :disabled="newTitle.length < 2"
      >Add</button>
    </div>
    <div class="home-todos">
      <div class="home-todos-filter">
        <label style="margin-right:">
          <span>Type</span>
          <select v-model="filterType">
            <option
              v-for="(filterType, index) in filterTypeOptions"
              :key="index"
              :value="filterType.value">{{filterType.label}}</option>
          </select>
        </label>
        <label>
          <span>User</span>
          <select v-model="filterUser">
            <option value="0">All</option>
            <option
              v-for="(filterUser, index) in filterUserOptions"
              :key="index"
              :value="filterUser">{{filterUser}}</option>
          </select>
        </label>
        <label>
          <span>Text</span>
          <input type="text" v-model="searchText">
        </label>
      </div>
      <div><b>Items: {{ todos.length }}</b></div><br>
      <div v-if="todos.length">
        <Todo
          v-for="todo in todos"
          :key="todo.id"
          :item="todo"
          @update="onUpdateFavorites"
        />
      </div>
      <div v-else>Nothing founded</div>
    </div>
  </div>
</template>

<script>
import Provider from '@/utils/provider'
import Todo from '@/components/Todo.vue'
export default {
  name: 'Home',
  components: {
    Todo
  },
  data() {
    return {
      todos: [],
      todosDefault: [],
      filterType: 'all',
      filterTypeOptions: [
        {
          value: 'all',
          label: 'All'
        },
        {
          value: 'completed',
          label: 'Completed'
        },
        {
          value: 'uncompleted',
          label: 'Uncompleted'
        },
        {
          value: 'favorites',
          label: 'Favorites'
        }
      ],
      filterUser: 0,
      searchText: '',
      newTitle: '',
      newUserId: 1,
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    filterUserOptions() {
      const set = new Set(this.todosDefault.map(todo => todo.userId));
      return Array.from(set);
    }
  },
  watch: {
    searchText(nValue) {
      if (nValue.length > 2 || nValue.length === 0) {
        this.filterList()
      } else {
        this.todos = []
      }
    },
    filterType() {
      this.filterList()
    },
    filterUser() {
      this.filterList()
    }
  },
  async created() {
    this.todosDefault = Provider.todoList.length ? Provider.todoList : await Provider.getTodos();
    this.todos = [...this.todosDefault]
  },
  methods: {
    filterList() {
      let items = [...this.todosDefault];
      items = this.filterByType(items);
      items = this.filterByUser(items);
      items = this.filterByText(items);
      this.todos = items
    },
    filterByType(items) {
      if (this.filterType === 'favorites') {
        const favorites = localStorage.getItem('favorites') || []
        if (favorites) {
          return items.filter(item => favorites.includes(item.id))
        } else {
          return []
        }
      }
      if (this.filterType === 'completed') {
        return items.filter(item => item.completed)
      }
      if (this.filterType === 'uncompleted') {
        return items.filter(item => !item.completed)
      }
      return items
    },
    filterByUser(items) {
      if (Number(this.filterUser)) {
        return items.filter(item => item.userId === this.filterUser)
      }
      return items
    },
    filterByText(items) {
      if (this.searchText === 0) {
        return items
      } else {
        return items.filter(item => item.title.toLowerCase().includes(this.searchText))
      }
    },
    async addTodo() {
      await Provider.addTodo(this.newUserId, this.newTitle)
    },
    onUpdateFavorites() {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      this.todosDefault = this.todosDefault.map(item => {
        return {
          ...item,
          favorit: favorites.includes(item.id)
        }
      });
      this.filterList()
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/varaibles';
  .home{
    padding: 30px 20px;
    background-color: $card-bg-color;
    &-title{
      text-align: center;
      margin-bottom: 20px;
    }
    &-user{
      margin-bottom: 20px;
    }
    &-create{
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }
    &-todos{
      &-filter{
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
      }
    }
  }
  .klin{
    margin: 10px;
  }
</style>
