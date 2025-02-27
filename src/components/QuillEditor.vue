<template>
  <div ref="editor" class="min-h-[200px] max-h-[300px] overflow-auto border border-gray-300"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

const editor = ref(null)
const emit = defineEmits(['update:modelValue'])

onMounted(() => {
  if (editor.value) {
    const quill = new Quill(editor.value, {
      theme: 'snow',
      placeholder: 'Enter Description Here...',
      modules: {
        toolbar: [
          ['bold', 'italic'],
          ['blockquote'],
          [{ align: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ direction: 'rtl' }],
          ['link']
        ],
      }
    })

    quill.on('text-change', () => {
      emit('update:modelValue', quill.root.innerHTML)
    })
  }
})
</script>

<style scoped>
@import 'quill/dist/quill.snow.css';
</style>