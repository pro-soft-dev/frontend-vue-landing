<script setup lang="ts">
import { useCounterStore } from '../stores/counter'

const counter = useCounterStore()
</script>

<template>
  <main>
    <h1>Home View</h1>
    <div>Count is: {{ counter.count }}</div>
    <button @click="counter.increment()">Increment</button>
  </main>
</template>