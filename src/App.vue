<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput @add:todo="addTodo"></TodoInput>
    <TodoList :propsdata="todoItems" ></TodoList>
    <TodoFooter></TodoFooter>
  </div>
</template>

<script>
import TodoFooter from './components/TodoFooter.vue'
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import { reactive, onBeforeMount } from "vue"

export default {
  name: 'App',
  components: {
    TodoHeader,
    TodoList,
    TodoInput,
    TodoFooter
  },
  setup() {
    const todoItems = reactive([])

    //life cycle method
    onBeforeMount(() => {
      console.log('mounted in the composition api!')
      if (localStorage.length > 0) {
        for (var i = 0; i < localStorage.length; i++) {
          const storageKey = localStorage.key(i)
          const itemJson = localStorage.getItem(storageKey);
          todoItems.push(JSON.parse(itemJson));
        }
      }
    })//onBeforeMount

    const addTodo = (todoItemStr) => {
      const todoItemObj = { completed: false, item: todoItemStr };
      localStorage.setItem(todoItemStr, JSON.stringify(todoItemObj));
      todoItems.push(todoItemObj);
    };//addTodo

    const removeTodo = (todoItem, index) => {
      const { item } = todoItem
      localStorage.removeItem(item)
      todoItems.splice(index, 1)
    }

    return {
      todoItems, addTodo, removeTodo
    }
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  text-align: center;
  background-color: #f6f6f6;
}

input {
  border-style: groove;
  width: 200px;
}

button {
  border-style: groove;
}

.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>
