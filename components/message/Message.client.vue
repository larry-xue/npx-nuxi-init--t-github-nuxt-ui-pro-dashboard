<template>
  <div class="flex items-start p-3 w-full" :class="{
    'flex-row-reverse': isMe
  }">
    <UAvatar class="mr-3" v-if="!isMe" :src="isMe ? message.from.avatar : botAvatar" :alt="message.from.name"
      size="lg" />
    <div class="flex flex-col w-full" :class="{
      'flex-row-reverse': isMe
    }">
      <p class="text-sm text-gray-400" :class="{
        'text-right': isMe
      }">
        {{ message.from.name }}
      </p>
      <div class="flex" :class="{ ' justify-end': isMe }">
        <p :ref="(el) => (bodyRef = el)"
          class=" w-fit max-w-full text-left break-words text-sm text-gray-700 dark:text-gray-300 dark:bg-gray-800 bg-gray-50 p-3 rounded-lg"
          v-html="message.body">
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export type MessageProps = {
  message: {
    from: {
      name: string
      avatar?: string
    }
    body: string
  }
  isMe: boolean
}

const botAvatar = ref('https://i.pravatar.cc/128?u=0')
const bodyRef = ref()

const props = defineProps({
  message: {
    type: Object,
    required: true,
    default: () => ({
      from: {
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/128?u=0',
      },
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    })
  },
  isMe: {
    type: Boolean,
    default: false
  }
})

const message = computed(() => props.message)

onMounted(() => {
  nextTick(() => {
    bodyRef.value?.scrollIntoView({ behavior: 'smooth' })
  })
})
</script>