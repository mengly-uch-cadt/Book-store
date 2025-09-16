import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  // State
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  // Action to increment the count
  function incrementStore() {
    count.value++
  }

  return { count, doubleCount, incrementStore }
})
