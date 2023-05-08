<template>
    <div>
        <ul>
            <li v-for="(item,idx) in todoItems" :key="idx" >
                {{ item }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
const todoItems = ref([])

//life cycle method
onBeforeMount(() => {
    console.log('mounted in the composition api!')
    if (localStorage.length > 0) {
        for (var i = 0; i < localStorage.length; i++) {
            const storageValue = localStorage.key(i)
            todoItems.value.push(storageValue)
        }
    }
    console.log(todoItems.value)
})

</script>

<style scoped></style>