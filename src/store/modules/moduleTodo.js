import axios from "axios"
import http from "@/common/http-common"

export const moduleTodo = {
    namespaced: true,
    state: () => ({
        todoItems: []
    }),
    actions: {
        loadTodoItems({ commit }) {
            http
                .get('/todos')
                .then(r => r.data)
                .then(items => {
                    commit('setTodoItems', items)
                })
                .catch(error => {
                    if (axios.isAxiosError(error)) {
                        console.error(error?.response?.status +
                            ' : ' + error.message)
                    } else {
                        console.error(error);
                    }
                });
        }, //loadTodoItems
        removeTodo({ commit }, payload) {
            http
                .delete(`/todos/${payload.id}`)
                .then(r => r.data)
                .then(items => {
                    commit('setTodoItems', items)
                })
        }, //removeTodo
        addTodo({ commit }, payload) {
            http
                .post(`/todos`, payload)
                .then(r => r.data)
                .then(items => {
                    commit('setTodoItems', items)
                })
        }, //addTodo
        toggleTodo({ commit }, payload) {
            http
                .patch(`/todos/${payload.id}`, payload)
                .then(r => r.data)
                .then(items => {
                    commit('setTodoItems', items)
                })
        }, //toggleTodo
        clearTodo({ commit }) {
            http
                .delete('/todos')
                .then(r => r.data)
                .then(items => {
                    commit('setTodoItems', items)
                })
        }, //clearTodo
    },
    mutations: {
        setTodoItems(state, items) {
            state.todoItems = items;
        },
        addTodo(state, todoItemStr) {
            const todoItemObj = { completed: false, item: todoItemStr };
            localStorage.setItem(todoItemStr, JSON.stringify(todoItemObj));
            state.todoItems.push(todoItemObj);
        },
        removeTodo(state, payload) {
            const { todoItem: { item }, index } = payload
            localStorage.removeItem(item)
            state.todoItems.splice(index, 1)
        },
        toggleTodo(state, payload) {
            const { todoItem: { item, completed }, index } = payload
            state.todoItems[index].completed = !completed;

            localStorage.removeItem(item);
            localStorage.setItem(item, JSON.stringify(state.todoItems[index]));
        },
        clearTodo(state) {
            localStorage.clear()
            state.todoItems = []
        }
    },
}