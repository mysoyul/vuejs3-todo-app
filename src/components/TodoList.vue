<template>
    <div>

    </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
const todoItems = ref([])
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