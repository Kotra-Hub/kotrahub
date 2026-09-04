<!-- src/components/AiAssistant.vue -->
<template>
  <!-- Trigger button - always fixed to the viewport, no v-menu wrapping -->
  <div
    class="ai-assistant-trigger"
    @click="toggleAssistant"
    @mouseenter="startHoverTimer"
    @mouseleave="cancelHoverTimer"
  >
    <div class="ai-assistant-button">
      <div class="ai-glow" />
      <img
        src="@/assets/images/kpai.png"
        alt="KPAI Assistant"
        class="ai-avatar"
      />
      <span v-if="hasUnread" class="ai-unread-dot" />
    </div>
    <span class="ai-label">
      <v-icon size="12" color="primary">mdi-flash</v-icon>
      KPAI
    </span>
  </div>

  <!-- Card teleported straight to <body>: no transformed ancestor, so
       position: fixed behaves relative to the real viewport -->
  <Teleport to="body">
    <Transition name="ai-fade">
      <div v-if="aiOpen" class="ai-card-wrapper" :style="cardStyle">
        <v-card
          ref="cardRef"
          class="ai-card"
          elevation="24"
          rounded="lg"
        >
          <!-- Draggable Header -->
          <v-card-title class="ai-header pa-3" @mousedown="startDrag" @touchstart="startDrag">
            <div class="d-flex align-center ga-2">
              <img
                src="@/assets/images/kpai.png"
                alt="KPAI"
                class="ai-header-avatar"
              />
              <div class="ai-header-text">
                <span class="ai-header-title">KPAI</span>
                <span class="ai-header-subtitle">
                  <span class="ai-status-dot" /> Online
                </span>
              </div>
            </div>
            <div class="d-flex align-center ga-1">
              <v-btn
                icon="mdi-refresh"
                variant="text"
                size="small"
                title="New chat"
                @click.stop="resetChat"
              />
              <v-btn
                icon="mdi-close"
                variant="text"
                size="small"
                @click.stop="closeAssistant"
              />
            </div>
          </v-card-title>

          <!-- Tabs -->
          <v-tabs
            v-model="activeTab"
            color="primary"
            density="compact"
            class="ai-tabs"
            hide-slider
          >
            <v-tab value="chat">
              <v-icon start size="16">mdi-chat</v-icon>
              Chat
            </v-tab>
            <v-tab value="knowledge">
              <v-icon start size="16">mdi-book</v-icon>
              Knowledge
            </v-tab>
            <v-tab value="support">
              <v-icon start size="16">mdi-ticket</v-icon>
              Support
              <v-chip
                v-if="openTicketCount > 0"
                size="x-small"
                color="primary"
                class="ai-tab-badge"
              >
                {{ openTicketCount }}
              </v-chip>
            </v-tab>
          </v-tabs>

          <v-divider />

          <!-- Content -->
          <v-card-text class="ai-content pa-0">
            <v-window v-model="activeTab">
              <!-- Chat Tab -->
              <v-window-item value="chat">
                <div class="chat-container">
                  <!-- Messages -->
                  <div ref="chatContainer" class="chat-messages">
                    <div
                      v-for="(msg, index) in chatMessages"
                      :key="index"
                      class="chat-message"
                      :class="msg.from === 'user' ? 'message-user' : 'message-ai'"
                    >
                      <v-avatar
                        v-if="msg.from === 'ai'"
                        size="28"
                        class="message-avatar"
                      >
                        <img src="@/assets/images/kpai.png" alt="AI" />
                      </v-avatar>
                      <div class="message-block">
                        <v-sheet
                          class="message-bubble"
                          :color="msg.from === 'user' ? 'primary' : 'surface-variant'"
                          :class="msg.from === 'user' ? 'user-bubble' : 'ai-bubble'"
                        >
                          <span class="message-text">{{ msg.text }}</span>
                        </v-sheet>
                        <span class="message-time" :class="msg.from === 'user' ? 'time-user' : 'time-ai'">
                          {{ msg.time }}
                        </span>
                      </div>
                    </div>

                    <!-- Typing indicator -->
                    <div v-if="aiTyping" class="chat-message message-ai">
                      <v-avatar size="28" class="message-avatar">
                        <img src="@/assets/images/kpai.png" alt="AI" />
                      </v-avatar>
                      <v-sheet class="message-bubble ai-bubble typing-bubble" color="surface-variant">
                        <span class="typing-dot" />
                        <span class="typing-dot" />
                        <span class="typing-dot" />
                      </v-sheet>
                    </div>
                  </div>

                  <!-- Quick replies -->
                  <div v-if="showQuickReplies" class="quick-replies">
                    <v-chip
                      v-for="reply in quickReplies"
                      :key="reply.label"
                      size="small"
                      variant="outlined"
                      color="primary"
                      class="quick-reply-chip"
                      @click="sendQuickReply(reply.value)"
                    >
                      {{ reply.label }}
                    </v-chip>
                  </div>

                  <!-- Input -->
                  <div class="chat-input-container">
                    <v-text-field
                      v-model="chatInput"
                      placeholder="Ask me anything..."
                      variant="outlined"
                      density="compact"
                      hide-details
                      class="chat-input"
                      @keydown.enter="sendChat"
                    >
                      <template #append-inner>
                        <v-btn
                          icon="mdi-send"
                          color="primary"
                          variant="flat"
                          size="small"
                          rounded="lg"
                          class="send-btn"
                          @click="sendChat"
                        />
                      </template>
                    </v-text-field>
                  </div>
                </div>
              </v-window-item>

              <!-- Knowledge Tab -->
              <v-window-item value="knowledge">
                <div class="knowledge-search pa-2">
                  <v-text-field
                    v-model="knowledgeSearch"
                    placeholder="Search knowledge base..."
                    variant="outlined"
                    density="compact"
                    hide-details
                    prepend-inner-icon="mdi-magnify"
                    rounded="lg"
                  />
                </div>
                <v-list class="knowledge-list" density="compact">
                  <v-list-item
                    v-for="item in filteredKnowledgeItems"
                    :key="item.title"
                    @click="handleKnowledgeClick(item)"
                  >
                    <template #prepend>
                      <v-icon color="primary">mdi-book-open-variant</v-icon>
                    </template>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                    <template #append>
                      <v-icon size="16">mdi-chevron-right</v-icon>
                    </template>
                  </v-list-item>
                  <v-list-item v-if="filteredKnowledgeItems.length === 0">
                    <v-list-item-title class="text-medium-emphasis">
                      No results for "{{ knowledgeSearch }}"
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-window-item>

              <!-- Support Tab -->
              <v-window-item value="support">
                <v-list class="support-list" density="compact">
                  <v-list-item
                    v-for="ticket in supportTickets"
                    :key="ticket.id"
                  >
                    <v-list-item-title class="support-ticket-title">
                      {{ ticket.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="support-ticket-meta">
                      {{ ticket.meta }}
                    </v-list-item-subtitle>
                    <template #append>
                      <v-chip
                        size="x-small"
                        :color="getTicketStatusColor(ticket.status)"
                        text-color="white"
                      >
                        {{ ticket.status }}
                      </v-chip>
                    </template>
                  </v-list-item>
                </v-list>

                <div class="support-actions pa-3">
                  <v-btn
                    color="primary"
                    variant="flat"
                    block
                    rounded="lg"
                    size="small"
                    @click="handleReportIssue"
                  >
                    <v-icon start size="16">mdi-plus</v-icon>
                    Report Issue
                  </v-btn>
                </div>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

// Emits
const emit = defineEmits<{
  toggleTheme: []
  logout: []
  navigate: [routeName: string]
}>()

// Router
const router = useRouter()

// State
const aiOpen = ref(false)
const activeTab = ref('chat')
const chatInput = ref('')
const hoverTimer = ref<ReturnType<typeof setTimeout> | null>(null)
const aiTyping = ref(false)
const hasUnread = ref(true)
const knowledgeSearch = ref('')

// Drag state
const cardRef = ref<InstanceType<typeof import('vuetify/components')['VCard']> | null>(null)
const isDragging = ref(false)
const dragOffsetX = ref(0)
const dragOffsetY = ref(0)
const dragPositionX = ref<number | null>(null)
const dragPositionY = ref<number | null>(null)
const cardWidth = ref(480)
const cardHeight = ref(600)

const chatContainer = ref<HTMLDivElement | null>(null)

const formatTime = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

interface ChatMessage {
  from: 'ai' | 'user'
  text: string
  time: string
}

const welcomeMessage = (): ChatMessage => ({
  from: 'ai',
  text: "Hello! I'm KPAI. How can I help? 😊",
  time: formatTime(),
})

const chatMessages = ref<ChatMessage[]>([welcomeMessage()])

// Quick replies shown when the chat is fresh
const quickReplies = [
  { label: '🏠 Dashboard', value: 'dashboard' },
  { label: '👤 Profile', value: 'profile' },
  { label: '🌙 Dark mode', value: 'dark mode' },
  { label: '🎫 Support', value: 'support' },
]

const showQuickReplies = computed(() => chatMessages.value.length <= 1 && !aiTyping.value)

// Knowledge items
const knowledgeItems = ref([
  { title: 'User Manual v3.2', action: 'manual' },
  { title: 'Frequently Asked Questions', action: 'faq' },
  { title: 'How-to Videos', action: 'videos' },
  { title: 'Search Knowledge Base', action: 'search' },
])

const filteredKnowledgeItems = computed(() => {
  const q = knowledgeSearch.value.trim().toLowerCase()
  if (!q) return knowledgeItems.value
  return knowledgeItems.value.filter((item) => item.title.toLowerCase().includes(q))
})

// Support tickets
const supportTickets = ref([
  { id: '#4421', name: 'Login Issue', meta: 'Aug 8 · In Progress', status: 'open' },
  { id: '#4423', name: 'API Timeout', meta: 'Aug 7 · Waiting', status: 'waiting' },
  { id: '#4425', name: 'Data Sync', meta: 'Aug 6 · Closed', status: 'closed' },
])

const openTicketCount = computed(
  () => supportTickets.value.filter((t) => t.status !== 'closed').length
)

// Default anchor: bottom-right, matching the trigger button's corner
const DEFAULT_MARGIN = 16

const cardStyle = computed(() => {
  const baseStyle: Record<string, string | number> = {
    width: `${cardWidth.value}px`,
    height: `${cardHeight.value}px`,
    position: 'fixed',
    zIndex: 2101,
    cursor: isDragging.value ? 'grabbing' : 'default',
  }

  if (dragPositionX.value !== null && dragPositionY.value !== null) {
    return {
      ...baseStyle,
      left: `${dragPositionX.value}px`,
      top: `${dragPositionY.value}px`,
    }
  }

  // Fallback (should rarely be hit — position is set when the panel opens)
  return {
    ...baseStyle,
    right: `${DEFAULT_MARGIN}px`,
    bottom: `${96}px`,
  }
})

// Methods
const positionNearTrigger = () => {
  cardWidth.value = Math.min(480, window.innerWidth - 2 * DEFAULT_MARGIN)
  cardHeight.value = Math.min(600, window.innerHeight - 2 * DEFAULT_MARGIN)

  const trigger = document.querySelector('.ai-assistant-trigger') as HTMLElement | null
  const rect = trigger?.getBoundingClientRect()

  let x: number
  let y: number

  if (rect) {
    // Anchor the card's bottom-right corner near the trigger button
    x = rect.right - cardWidth.value
    y = rect.top - cardHeight.value - 8
  } else {
    x = window.innerWidth - cardWidth.value - DEFAULT_MARGIN
    y = window.innerHeight - cardHeight.value - 96
  }

  x = Math.max(DEFAULT_MARGIN, Math.min(x, window.innerWidth - cardWidth.value - DEFAULT_MARGIN))
  y = Math.max(DEFAULT_MARGIN, Math.min(y, window.innerHeight - cardHeight.value - DEFAULT_MARGIN))

  dragPositionX.value = x
  dragPositionY.value = y
}

const toggleAssistant = () => {
  aiOpen.value = !aiOpen.value
  if (aiOpen.value) {
    hasUnread.value = false
    activeTab.value = 'chat'
    nextTick(() => {
      if (dragPositionX.value === null) positionNearTrigger()
      focusChatInput()
    })
  }
}

const closeAssistant = () => {
  aiOpen.value = false
  isDragging.value = false
}

const resetChat = () => {
  chatMessages.value = [welcomeMessage()]
  knowledgeSearch.value = ''
  activeTab.value = 'chat'
  nextTick(() => focusChatInput())
}

const startHoverTimer = () => {
  hoverTimer.value = setTimeout(() => {
    if (!aiOpen.value) {
      aiOpen.value = true
      hasUnread.value = false
      nextTick(() => {
        if (dragPositionX.value === null) positionNearTrigger()
        focusChatInput()
      })
    }
  }, 500)
}

const cancelHoverTimer = () => {
  if (hoverTimer.value) {
    clearTimeout(hoverTimer.value)
    hoverTimer.value = null
  }
}

const focusChatInput = () => {
  const input = document.querySelector('.chat-input input') as HTMLInputElement
  if (input) {
    setTimeout(() => input.focus(), 50)
  }
}

const scrollChatToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}

const sendQuickReply = (value: string) => {
  chatInput.value = value
  sendChat()
}

const sendChat = () => {
  const msg = chatInput.value.trim()
  if (!msg) return

  chatMessages.value.push({ from: 'user', text: msg, time: formatTime() })
  chatInput.value = ''
  scrollChatToBottom()

  // Process the message
  const response = processUserMessage(msg)

  // Show typing indicator, then the AI response
  aiTyping.value = true
  setTimeout(() => {
    aiTyping.value = false
    chatMessages.value.push({ from: 'ai', text: response.text, time: formatTime() })
    scrollChatToBottom()

    if (response.action) {
      setTimeout(() => {
        response.action?.()
      }, 600)
    }
  }, 500)
}

const processUserMessage = (message: string): { text: string; action?: () => void } => {
  const lower = message.toLowerCase()

  // Navigation commands - map to route names
  const routeMap: Record<string, string> = {
    'dashboard': 'dashboard',
    'home': 'dashboard',
    'main': 'dashboard',
    'profile': 'profile',
    'my profile': 'profile',
    'contacts': 'profile',
    'calendar': 'calendar',
    'tasks': 'tasks',
    'settings': 'settings',
  }

  for (const [key, routeName] of Object.entries(routeMap)) {
    if (lower.includes(key)) {
      return {
        text: `📍 Navigating to ${routeName.charAt(0).toUpperCase() + routeName.slice(1)}...`,
        action: () => router.push({ name: routeName }).catch(() => {
          emit('navigate', routeName)
        })
      }
    }
  }

  // Tab-switching commands
  if (lower.includes('support') || lower.includes('ticket')) {
    return {
      text: '🎫 Here are your support tickets.',
      action: () => { activeTab.value = 'support' }
    }
  }
  if (lower.includes('faq') || lower.includes('knowledge') || lower.includes('manual') || lower.includes('help')) {
    return {
      text: '📚 Opening the Knowledge tab for you.',
      action: () => { activeTab.value = 'knowledge' }
    }
  }

  // Theme commands
  if (lower.includes('dark mode') || lower.includes('darkmode') || lower.includes('dark')) {
    return { text: '🌙 Switching to Dark Mode...', action: () => emit('toggleTheme') }
  }
  if (lower.includes('light mode') || lower.includes('lightmode') || lower.includes('light')) {
    return { text: '☀️ Switching to Light Mode...', action: () => emit('toggleTheme') }
  }

  // Logout command
  if (lower.includes('logout') || lower.includes('sign out') || lower.includes('log out')) {
    return { text: '👋 Logging you out... Goodbye!', action: () => emit('logout') }
  }

  // Clear chat
  if (lower.includes('clear') || lower.includes('reset chat') || lower.includes('erase chat')) {
    resetChat()
    return { text: 'Chat cleared. How can I help you?' }
  }

  // Fallback responses
  const fallbackResponses = [
    "Let me check that for you... 🤔",
    "I'm not sure I understand. Try saying 'Dashboard', 'Profile', or 'Dark mode'",
    "I can help with navigation! Say 'Dashboard' or 'Profile' to get started.",
    "Sure, I can help with that. Try saying 'Dashboard' or 'Profile'.",
    "I'm here to help you navigate Kotra Hub. What would you like to do?",
  ]
  return { text: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)] }
}

const getTicketStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    open: 'warning',
    waiting: 'grey',
    closed: 'success',
  }
  return colors[status] || 'grey'
}

const handleKnowledgeClick = (item: { title: string; action: string }) => {
  const actionMessages: Record<string, string> = {
    manual: '📖 Opening User Manual...',
    faq: '📋 Opening FAQ...',
    videos: '🎬 Opening Videos...',
    search: '🔍 Opening Knowledge Base...',
  }
  activeTab.value = 'chat'
  chatMessages.value.push({
    from: 'ai',
    text: actionMessages[item.action] || `Opening ${item.title}...`,
    time: formatTime(),
  })
  scrollChatToBottom()
}

const handleReportIssue = () => {
  activeTab.value = 'chat'
  chatMessages.value.push({
    from: 'ai',
    text: '🆕 Opening new ticket form. Please describe your issue in detail.',
    time: formatTime(),
  })
  scrollChatToBottom()
}

// Drag functionality
const startDrag = (e: MouseEvent | TouchEvent) => {
  const cardEl = (cardRef.value as any)?.$el as HTMLElement | undefined
  if (!cardEl) return

  const rect = cardEl.getBoundingClientRect()
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

  dragOffsetX.value = clientX - rect.left
  dragOffsetY.value = clientY - rect.top
  isDragging.value = true

  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchmove', onDrag, { passive: false })
  document.addEventListener('touchend', stopDrag)

  e.preventDefault()
}

const onDrag = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return

  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

  let newX = clientX - dragOffsetX.value
  let newY = clientY - dragOffsetY.value

  // Constrain to viewport
  const maxX = window.innerWidth - cardWidth.value
  const maxY = window.innerHeight - cardHeight.value

  newX = Math.max(0, Math.min(newX, maxX))
  newY = Math.max(0, Math.min(newY, maxY))

  dragPositionX.value = newX
  dragPositionY.value = newY

  if ('touches' in e) e.preventDefault()
}

const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', stopDrag)
}

// Click-outside-to-close (v-menu used to give us this for free)
const handleClickOutside = (e: MouseEvent) => {
  if (!aiOpen.value || isDragging.value) return
  const target = e.target as HTMLElement
  if (!target.closest('.ai-card') && !target.closest('.ai-assistant-trigger')) {
    aiOpen.value = false
  }
}

// Watch for tab changes
watch(activeTab, (newTab) => {
  if (newTab === 'chat') {
    setTimeout(() => focusChatInput(), 100)
  }
})

// Keyboard shortcut
const handleKeydown = (e: KeyboardEvent) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    if (!aiOpen.value) {
      aiOpen.value = true
      hasUnread.value = false
      nextTick(() => {
        if (dragPositionX.value === null) positionNearTrigger()
        focusChatInput()
      })
    } else if (activeTab.value === 'chat') {
      focusChatInput()
    }
  }
  if (e.key === 'Escape' && aiOpen.value) {
    aiOpen.value = false
  }
}

// Handle window resize
const handleResize = () => {
  cardWidth.value = Math.min(cardWidth.value, window.innerWidth - 2 * DEFAULT_MARGIN)
  cardHeight.value = Math.min(cardHeight.value, window.innerHeight - 2 * DEFAULT_MARGIN)

  if (dragPositionX.value !== null && dragPositionY.value !== null) {
    const maxX = window.innerWidth - cardWidth.value
    const maxY = window.innerHeight - cardHeight.value
    dragPositionX.value = Math.max(0, Math.min(dragPositionX.value, maxX))
    dragPositionY.value = Math.max(0, Math.min(dragPositionY.value, maxY))
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  document.addEventListener('mousedown', handleClickOutside)
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('mousedown', handleClickOutside)
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', stopDrag)
})
</script>

<style scoped>
.ai-assistant-trigger {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  cursor: pointer;
  user-select: none;
  position: fixed;
  z-index: 2100;
  bottom: 72px;
  right: 16px;
  transition: transform 0.2s ease;
}

.ai-assistant-trigger:hover {
  transform: scale(1.06);
}

.ai-assistant-button {
  position: relative;
  width: 88px;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ai-glow {
  position: absolute;
  inset: 6px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(15, 157, 154, 0.32) 0%, rgba(15, 157, 154, 0) 70%);
  filter: blur(6px);
  animation: pulseGlow 2.4s ease-in-out infinite;
}

.ai-avatar {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 10px 18px rgba(15, 157, 154, 0.35));
  animation: floaty 3s ease-in-out infinite;
}

.ai-unread-dot {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ef4444;
  border: 2px solid white;
  z-index: 2;
}

.ai-label {
  font-size: 10px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 9999px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 4px;
  background: var(--v-theme-surface);
  color: var(--v-theme-darkText);
  border: 1px solid var(--v-theme-borderLight);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

/* Card wrapper - teleported to <body>, so this is the real viewport-fixed box */
.ai-card-wrapper {
  display: block;
}

.ai-fade-enter-active,
.ai-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.ai-fade-enter-from,
.ai-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

/* Card */
.ai-card {
  background: var(--v-theme-surface) !important;
  border-radius: 16px !important;
  overflow: hidden;
  min-height: 300px;
  min-width: 300px;
  height: 100%;
  width: 100%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2) !important;
}

/* Header */
.ai-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px !important;
  min-height: 48px;
  cursor: grab;
  background: var(--v-theme-primaryBg);
  border-bottom: 1px solid var(--v-theme-borderLight);
  user-select: none;
}

.ai-header:active {
  cursor: grabbing;
}

.ai-header-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
  background: var(--v-theme-surface);
}

.ai-header-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.ai-header-title {
  font-weight: 700;
  font-size: 14px;
  color: var(--v-theme-darkText);
}

.ai-header-subtitle {
  font-size: 10px;
  color: var(--v-theme-textMuted);
  display: flex;
  align-items: center;
  gap: 4px;
}

.ai-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--v-theme-success);
}

/* Tabs */
.ai-tabs {
  min-height: 40px;
  background: var(--v-theme-surface);
}

:deep(.ai-tabs .v-tab) {
  text-transform: none;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0;
  min-width: 0;
  flex: 1;
  padding: 6px 8px;
  color: var(--v-theme-textMuted);
}

:deep(.ai-tabs .v-tab--selected) {
  background: transparent;
  color: var(--v-theme-primary);
}

:deep(.ai-tabs .v-tab__text) {
  color: inherit;
}

.ai-tab-badge {
  margin-left: 4px;
  height: 16px !important;
  font-size: 9px !important;
}

/* Chat */
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 350px;
  max-height: calc(100% - 48px);
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--v-theme-background);
  min-height: 200px;
}

.chat-messages::-webkit-scrollbar {
  width: 4px;
}

.chat-messages::-webkit-scrollbar-thumb {
  border-radius: 9999px;
  background: var(--v-theme-borderLight);
}

.chat-message {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.message-user {
  flex-direction: row-reverse;
}

.message-block {
  display: flex;
  flex-direction: column;
  max-width: 80%;
}

.message-user .message-block {
  align-items: flex-end;
}

.message-avatar {
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
}

.message-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.message-bubble {
  padding: 8px 14px;
  border-radius: 12px;
  font-size: 13px;
  line-height: 1.5;
}

.user-bubble {
  border-bottom-right-radius: 4px;
  color: var(--v-theme-on-primary);
}

.ai-bubble {
  border-bottom-left-radius: 4px;
  color: var(--v-theme-darkText);
  background: var(--v-theme-surface-variant) !important;
}

.message-text {
  word-break: break-word;
}

.message-time {
  font-size: 10px;
  color: var(--v-theme-textMuted);
  margin-top: 2px;
  padding: 0 4px;
}

/* Typing indicator */
.typing-bubble {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 14px;
}

.typing-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--v-theme-primary);
  opacity: 0.4;
  animation: typingBounce 1.2s infinite;
}

.typing-dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dot:nth-child(3) { animation-delay: 0.4s; }

/* Quick replies */
.quick-replies {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 16px 4px;
  background: var(--v-theme-background);
}

.quick-reply-chip {
  cursor: pointer;
  color: var(--v-theme-primary) !important;
}

.quick-reply-chip:hover {
  background: var(--v-theme-primaryBg) !important;
}

.chat-input-container {
  padding: 8px 12px 12px;
  border-top: 1px solid var(--v-theme-borderLight);
  background: var(--v-theme-surface);
}

.chat-input {
  flex: 1;
}

:deep(.chat-input .v-field) {
  border-radius: 12px !important;
  background: var(--v-theme-background);
}

:deep(.chat-input .v-field__input) {
  font-size: 13px;
  padding: 8px 12px;
  color: var(--v-theme-darkText);
}

:deep(.chat-input .v-field__input::placeholder) {
  color: var(--v-theme-textMuted);
}

:deep(.chat-input .v-field--focused) {
  border-color: var(--v-theme-primary);
}

/* Send button */
.send-btn {
  min-width: 32px !important;
  width: 32px !important;
  height: 32px !important;
  padding: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

:deep(.send-btn .v-icon) {
  font-size: 18px !important;
}

.knowledge-search {
  border-bottom: 1px solid var(--v-theme-borderLight);
  background: var(--v-theme-surface);
}

.knowledge-list,
.support-list {
  padding: 0;
  background: var(--v-theme-surface);
  max-height: 350px;
  overflow-y: auto;
}

:deep(.knowledge-list .v-list-item),
:deep(.support-list .v-list-item) {
  min-height: 44px;
  border-radius: 8px;
  margin: 2px 4px;
  color: var(--v-theme-darkText);
}

:deep(.knowledge-list .v-list-item:hover),
:deep(.support-list .v-list-item:hover) {
  background: var(--v-theme-primaryBg);
}

:deep(.knowledge-list .v-list-item-title),
:deep(.support-list .v-list-item-title) {
  font-size: 13px;
  font-weight: 500;
  color: var(--v-theme-darkText);
}

.support-ticket-meta {
  font-size: 11px;
  color: var(--v-theme-textMuted);
}

.support-actions {
  border-top: 1px solid var(--v-theme-borderLight);
  background: var(--v-theme-surface);
}

/* Animations */
@keyframes pulseGlow {
  0% { transform: scale(0.85); opacity: 0.7; }
  100% { transform: scale(1.25); opacity: 0; }
}

@keyframes floaty {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

@keyframes typingBounce {
  0%, 60%, 100% { opacity: 0.4; transform: translateY(0); }
  30% { opacity: 1; transform: translateY(-3px); }
}

/* Responsive */
@media (max-width: 768px) {
  .ai-card {
    min-width: auto !important;
    min-height: 300px !important;
  }

  .chat-container {
    min-height: 300px;
    max-height: 60vh;
  }

  .ai-assistant-trigger {
    bottom: 72px;
    right: 12px;
  }

  .ai-assistant-button {
    width: 76px;
    height: 76px;
  }
}
</style>
