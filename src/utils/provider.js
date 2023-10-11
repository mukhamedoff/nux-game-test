const providerUrl = 'https://jsonplaceholder.typicode.com'

class Provider {
  constructor(url) {
    this.url = url;
    this.todos = []
  }

  async getUsers() {
    try {
      const response = await fetch(this.url + '/users')
      const jsonResponse = await response.json()
      return jsonResponse
    } catch (error) {
      console.log(error)
      return []
    }
  }

  async getTodos() {
    try {
      const response = await fetch(this.url + '/todos');
      const jsonResponse = await response.json();
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      this.todos = jsonResponse.map(item => ({...item, favorit: favorites.includes(item.id)}));
      return this.todos
    } catch (error) {
      console.log(error)
      return []
    }
  }

  get todoList() {
    return this.todos;
  }

  async addTodo(userId, title){
    try {
      const response = await fetch(this.url + '/todos', {
        method: 'POST',
        body: JSON.stringify({
          title,
          userId,
          completed: false
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      });
      const jsonResponse = await response.json();
      this.todos.push(jsonResponse)
      return jsonResponse
    } catch (error) {
      console.log(error)
      return false
    }
  }
}

export default new Provider(providerUrl)