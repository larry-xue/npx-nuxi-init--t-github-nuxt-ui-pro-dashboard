<template>
  <UDashboardPanelContent class="pb-8">
    <UDashboardSection title="Chat" description="AI chat bot powered by Cloudflare Worker AI">
      <template #links>
        <UFormGroup label="" name="model" class="w-100">
          <USelect v-model="state.model" :options="['gpt-3.5-turbo', 'gpt-4']">
          </USelect>
        </UFormGroup>
      </template>
    </UDashboardSection>

    <UDivider class="mb-4" />

    <div class="w-full h-full overflow-x-hidden overflow-y-auto">
      <div v-for="msg in messages" :ref="(el) => messageBoxRef = el">
        <Message :is-me="msg.isMe" :message="msg.message" />
      </div>
    </div>

    <UForm :state="state" :validate-on="['submit']" class="flex gap-1 flex-nowrap w-full box-border">
      <UFormGroup label="" name="input" class="shrink w-full">
        <UTextarea autoresize :rows="1" @keyup.enter="sendMessage" v-model="state.message" :maxrows="10"
          placeholder="Type a message..." :ref="(el) => textareaRef = el" />
      </UFormGroup>
      <UFormGroup label="" name="output" class="shrink-0 w-auto flex items-end">
        <UButton @click="sendMessage" color="black" label="Send" class="w-full" />
      </UFormGroup>
    </UForm>
  </UDashboardPanelContent>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { MessageProps } from '@/components/message/Message.client.vue';
const toast = useToast()

const state = ref({
  model: 'gpt-3.5-turbo',
  message: ''
})
const messageBoxRef = ref<Element | ComponentPublicInstance>()
const textareaRef = ref<Element | ComponentPublicInstance>()

const messages = ref<MessageProps[]>([
  {
    isMe: false,
    message: {
      from: {
        name: 'You',
        avatar: 'https://i.pravatar.cc/300'
      },
      body: 'Hello, how can I help you today?'
    }
  }
])

function sendMessage() {
  if (!state.value.message) {
    // notify
    return toast.add({
      title: 'Notification',
      description: 'Please enter a message.',
      color: 'gray',
      icon: 'i-heroicons-exclamation-circle',
      timeout: 3000,
    })
  }
  messages.value.push({
    isMe: true,
    message: {
      from: {
        name: 'Me',
      },
      body: state.value.message.replace(/\n/g, '<br>')
    }
  })
  state.value.message = ''
  nextTick(() => {
    // scroll into view
    // (messageBoxRef.value as Element).scrollTo(;
  })
}
</script>