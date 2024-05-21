<script setup lang="ts">
const team = {
  label: 'Cloudflare Worker AI',
  avatar: {
    src: 'https://avatars.githubusercontent.com/u/48818060?v=4'
  }
}
</script>

<template>
  <UButton color="gray" variant="ghost" class="w-full">
    <UAvatar :src="team.avatar.src" size="2xs" />

    <span class="truncate text-gray-900 dark:text-white font-semibold">{{ team.label }}</span>
  </UButton>
</template>
