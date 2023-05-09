import { createStore, createLogger } from "vuex"
import http from "@/common/http-common"

export const store = createStore({
    plugins: process.env.NODE_ENV === 'development' ?
        [createLogger()] : [],
    state: {
        todoItems: []
    },
    actions:{

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
        },
        clearTodo(state) {
            localStorage.clear()
            state.todoItems = []
        }
    },    
})