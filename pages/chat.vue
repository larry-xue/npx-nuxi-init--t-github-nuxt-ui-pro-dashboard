<template>
  <UDashboardPanelContent class="pb-8">
    <UDashboardSection title="Chat" description="AI chat bot powered by Cloudflare Worker AI">
      <template #links>
        <UFormGroup label="" name="model" class="w-100">
          <USelect v-model="state.model" :options="['gpt-3.5-turbo', 'gpt-4']" @update:model-value="onChange">
          </USelect>
        </UFormGroup>
      </template>
    </UDashboardSection>

    <UDivider class="mb-4" />

    <div class="w-full h-full">
      content area
    </div>

    <UForm :state="state" :validate="validate" :validate-on="['submit']" @submit="onSubmit"
      class="flex gap-1 flex-nowrap w-full box-border">
      <UFormGroup label="" name="input" class="shrink w-full">
        <UTextarea autoresize :rows="1" v-model="state.temperature" @update:model-value="onChange" />
      </UFormGroup>
      <UFormGroup label="" name="output" class="shrink-0 w-auto">
        <UButton type="submit" color="black" label="Send" class="w-full" />
      </UFormGroup>
    </UForm>
  </UDashboardPanelContent>
</template>

<script setup>
import { ref } from 'vue'

const state = ref({
  model: 'gpt-3.5-turbo',
  temperature: 0
})

const isInviteModalOpen = ref(false)

function validate() {
  return state.value
}

function onChange() {
  console.log(state.value)
}

async function onSubmit(event) {
  // Do something with data
  console.log(event.data)
}
</script>