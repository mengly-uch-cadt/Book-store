<template>
    <h1>{{ title }}</h1>
    <h1>{{ counter.count }}</h1>
    <h1>{{ counter.doubleCount }}</h1>
    <v-btn @click="increment">
        click me
    </v-btn>
    <v-btn variant="tonal" class="ml-4" @click="$router.push(btnRoute)">
        {{ btnText }}
    </v-btn>
</template>
<script setup>
import { useCounterStore } from '../stores/counter'
const counter = useCounterStore()

// props from parent component
const props = defineProps({
    title: String,
    btnText: String,
    btnRoute: String
})

const increment = () => {
    counter.incrementStore()
}

</script>