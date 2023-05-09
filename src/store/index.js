import { createStore, createLogger } from "vuex"

const storage = {
    fetch() {
        const arr = [];
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                const itemJson = localStorage.getItem(localStorage.key(i))
                if (itemJson) {
                    arr.push(JSON.parse(itemJson))
                }
            }
        }
        return arr;
    }
}

export const store = createStore({
    plugins: process.env.NODE_ENV === 'development' ?
        [createLogger()] : [],
    state: {
        todoItems: storage.fetch()
    },
    mutations: {
        addTodo(state, todoItemStr) {
            const todoItemObj = { completed: false, item: todoItemStr };
            localStorage.setItem(todoItemStr, JSON.stringify(todoItemObj));
            state.todoItems.push(todoItemObj);      
        },
        removeTodo(state, payload) {
            const {todoItem:{item}, index} = payload
            localStorage.removeItem(item)
            state.todoItems.splice(index, 1)      
        },
        toggleTodo(state, payload) {
            const {todoItem:{item, completed}, index} = payload
            state.todoItems[index].completed = !completed;
      
            localStorage.removeItem(item);
            localStorage.setItem(item, JSON.stringify(state.todoItems[index]));
      
        }
    },    
})