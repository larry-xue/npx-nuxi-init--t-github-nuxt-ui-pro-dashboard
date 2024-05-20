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
      <ClientOnly>
        <div v-for="msg in messages" :ref="(el) => messageBoxRef = el">
          <Message :is-me="msg.isMe" :message="msg.message" />
        </div>
      </ClientOnly>
    </div>

    <UForm :state="state" :validate-on="['submit']" class="flex gap-1 flex-nowrap w-full box-border">
      <UFormGroup label="" name="input" class="shrink w-full">
        <UTextarea autoresize :rows="1" @keyup.enter="sendMessage" v-model="state.message" :maxrows="10"
          placeholder="Type a message..." :ref="(el) => textareaRef = el" />
      </UFormGroup>
      <UFormGroup label="" name="output" class="shrink-0 w-auto flex items-end">
        <UButton v-bind:loading="pending" @click="sendMessage" color="black" label="Send" class="w-full" />
      </UFormGroup>
    </UForm>
  </UDashboardPanelContent>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { MessageProps } from '@/components/message/Message.client.vue';
const toast = useToast()
const config = useRuntimeConfig()

const state = ref({
  model: 'gpt-3.5-turbo',
  message: ''
})
const messageBoxRef = ref<Element | ComponentPublicInstance>()
const textareaRef = ref<Element | ComponentPublicInstance>()
const pending = ref(false)

const messages = ref<MessageProps[]>([
  {
    isMe: false,
    message: {
      from: {
        name: 'You',
        avatar: 'https://i.pravatar.cc/300'
      },
      body: 'Hello, how can I help you today?',
    },
    isPending: false
  }
])

const currentChatHistory = ref([])

async function getAiResponse(text: string) {
  const data = await $fetch<{
    inputs: { prompt: string },
    response: { response: string }
  }[]>(
    '/api/chat', {
    method: 'POST',
    body: {
      prompt: text
    }
  })
  console.log(data)
  currentChatHistory.value = data || []
  return data[data.length - 1]?.response?.response || "I'm sorry, I don't have an answer for that."
}

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

  const message = {
    isMe: true,
    message: {
      from: {
        name: 'Me',
      },
      body: state.value.message.replace(/\n/g, '<br>')
    },
    isPending: false
  }
  messages.value.push(message)

  // get ai response
  const botResponse = {
    isMe: false,
    message: {
      from: {
        name: 'Bot',
        avatar: 'https://i.pravatar.cc/300'
      },
      body: '...',
    },
    isPending: true
  }

  messages.value.push(botResponse)

  pending.value = true
  getAiResponse(state.value.message).then((response) => {
    messages.value[messages.value.length - 1].message.body = response
  }).catch((e) => {
    console.log(e)
    botResponse.message.body = "I'm sorry, I don't have an answer for that."
  }).finally(() => {
    pending.value = false
  })

  nextTick(() => {
    // focus textarea
  })

  state.value.message = ''
}
</script>
