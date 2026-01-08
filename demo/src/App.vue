<script setup lang="ts">
  import { capitalize } from 'jalutils/string'
</script>

<template>
  <h1>{{ capitalize('you did it!') }}</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
  <p>Run <code>pnpm build</code> to build the project and analyze the bundle.</p>
</template>

<style scoped></style>
