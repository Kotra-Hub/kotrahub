<!-- src\views\Login.vue -->
<template>
  <v-app>
    <v-main class="d-flex align-center justify-center background-picture">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6" lg="4" xl="3">
            <v-card class="pa-5 pa-sm-6 pa-md-7 rounded-xl elevation-12" :style="{
              background: `rgba(255,255,255)`,
              backdropFilter: 'blur(8px)',
              borderRadius: '24px !important',
              maxWidth: '440px',
              margin: '0 auto'
            }">
              <v-card-text class="pa-0">
                <!-- Logo -->
                <div class="d-flex justify-center mb-3">
                  <div class="logo-wrapper">
                    <img src="@/assets/images/kotra.png" alt="Kotra" class="logo-image" />
                  </div>
                </div>

                <!-- Wordmark -->
                <div class="text-center mb-1">
                  <span class="text-h5 font-weight-black" :style="{
                    color: themeColors.kotraText,
                    letterSpacing: '-0.5px',
                    fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)'
                  }">KOTRA</span>
                  <span class="text-h5 font-weight-black" :style="{
                    color: themeColors.hubText,
                    letterSpacing: '-0.5px',
                    fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)'
                  }">HUB</span>
                </div>
                <p class="text-center text-subtitle-2 font-weight-medium mb-4" :style="{
                  color: themeColors.textMuted,
                  fontSize: 'clamp(0.7rem, 1vw, 0.8rem)'
                }">Unified Digital Ecosystem</p>

                <!-- STEP 1: Credentials -->
                <div v-if="loginStep === 1">
                  <v-text-field v-model="loginUsername" label="Username" variant="outlined" density="comfortable"
                    class="mb-2" prepend-inner-icon="mdi-account" rounded="lg" :bg-color="themeColors.bgLight"
                    hide-details :color="themeColors.primary">
                  </v-text-field>

                  <v-text-field v-model="loginPassword" :type="showPassword ? 'text' : 'password'" label="Password"
                    variant="outlined" density="comfortable" class="mb-3" prepend-inner-icon="mdi-lock"
                    :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="showPassword = !showPassword" @keyup.enter="verifyCredentials" rounded="lg"
                    :bg-color="themeColors.bgLight" hide-details :color="themeColors.primary">
                  </v-text-field>

                  <div class="d-flex flex-column ga-2">
                    <v-btn block size="large" rounded="lg" :color="themeColors.primary" variant="flat"
                      class="text-white font-weight-bold" :style="{
                        height: '44px',
                        textTransform: 'none',
                        letterSpacing: '0.3px',
                        fontSize: '0.9rem'
                      }" @click="loginWithout2FA">
                      Sign In
                    </v-btn>

                    <div class="d-flex align-center ga-2 py-0">
                      <v-divider :color="themeColors.border"></v-divider>
                      <span class="text-caption font-weight-medium text-uppercase" :style="{
                        color: themeColors.textMuted,
                        letterSpacing: '0.5px',
                        fontSize: '0.7rem'
                      }">or</span>
                      <v-divider :color="themeColors.border"></v-divider>
                    </div>

                    <v-btn block size="large" rounded="lg" variant="outlined" :style="{
                      height: '44px',
                      textTransform: 'none',
                      letterSpacing: '0.3px',
                      borderColor: themeColors.primary,
                      color: themeColors.primary,
                      fontSize: '0.9rem'
                    }" @click="verifyCredentials">
                      <v-icon start size="18">mdi-shield-lock</v-icon>
                      Sign In with 2FA
                    </v-btn>
                  </div>

                  <!-- Warning Section -->
                  <v-alert class="mt-3" density="compact" variant="tonal" color="warning" rounded="lg"
                    style="font-size: 0.75rem;">
                    <div class="d-flex align-center ga-2">
                      <v-icon size="16" color="warning">mdi-alert</v-icon>
                      <span>After 3 consecutive failed attempts, your account will be temporarily locked.</span>
                    </div>
                  </v-alert>

                  <!-- Info Badges -->
                  <div class="mt-4 d-flex justify-space-around ga-2">
                    <div class="text-center">
                      <v-avatar size="36" :color="themeColors.primaryBg" class="mb-1" style="border-radius: 10px;">
                        <v-icon :color="themeColors.primary" size="16">mdi-lock</v-icon>
                      </v-avatar>
                      <div class="text-caption font-weight-bold" :style="{
                        color: themeColors.textSecondary,
                        fontSize: '0.55rem',
                        lineHeight: '1.2'
                      }">Secure Access</div>
                      <div class="text-caption" :style="{
                        color: themeColors.textMuted,
                        fontSize: '0.5rem',
                        lineHeight: '1.1'
                      }">Data Protected</div>
                    </div>

                    <div class="text-center">
                      <v-avatar size="36" :color="themeColors.primaryBg" class="mb-1" style="border-radius: 10px;">
                        <v-icon :color="themeColors.primary" size="16">mdi-clock-outline</v-icon>
                      </v-avatar>
                      <div class="text-caption font-weight-bold" :style="{
                        color: themeColors.textSecondary,
                        fontSize: '0.55rem',
                        lineHeight: '1.2'
                      }">24/7 Access</div>
                      <div class="text-caption" :style="{
                        color: themeColors.textMuted,
                        fontSize: '0.5rem',
                        lineHeight: '1.1'
                      }">Anywhere</div>
                    </div>

                    <div class="text-center">
                      <v-avatar size="36" :color="themeColors.primaryBg" class="mb-1" style="border-radius: 10px;">
                        <v-icon :color="themeColors.primary" size="16">mdi-headset</v-icon>
                      </v-avatar>
                      <div class="text-caption font-weight-bold" :style="{
                        color: themeColors.textSecondary,
                        fontSize: '0.55rem',
                        lineHeight: '1.2'
                      }">Support</div>
                      <div class="text-caption" :style="{
                        color: themeColors.textMuted,
                        fontSize: '0.5rem',
                        lineHeight: '1.1'
                      }">24/7 Help</div>
                    </div>
                  </div>
                </div>

                <!-- STEP 2: Two-Factor Authentication -->
                <div v-else-if="loginStep === 2">
                  <div class="d-flex align-center justify-center ga-2 mb-3">
                    <v-icon size="22" :color="themeColors.primary">mdi-shield-lock</v-icon>
                    <span class="text-subtitle-1 font-weight-medium"
                      :style="{ color: themeColors.textSecondary }">Two-Factor Authentication</span>
                  </div>
                  <p class="text-center text-body-2 mb-4" :style="{ color: themeColors.textMuted }">
                    Enter the 6-digit verification code sent to your email
                  </p>
                  <div class="d-flex justify-center ga-2 mb-4">
                    <v-otp-input ref="otpInputRef" v-model="otpCode" :length="6" type="number" variant="outlined"
                      density="comfortable" :bg-color="themeColors.bgLight" style="width: 100%; max-width: 320px;"
                      @update:model-value="onOtpComplete" :color="themeColors.textLight">
                    </v-otp-input>
                  </div>

                  <v-btn block size="large" rounded="lg" :color="themeColors.primary" variant="flat"
                    class="text-white font-weight-bold" :style="{
                      height: '44px',
                      textTransform: 'none',
                      letterSpacing: '0.3px',
                      fontSize: '0.9rem'
                    }" @click="verify2FA">
                    Sign In
                  </v-btn>

                  <div class="d-flex align-center justify-center ga-3 mt-3">
                    <v-btn variant="text" size="small" :color="themeColors.primary" :disabled="resendTimer > 0"
                      @click="resendCode" :style="{
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        textTransform: 'none',
                        minWidth: 'auto'
                      }">
                      Resend code
                      <span v-if="resendTimer > 0" :style="{ color: themeColors.textMuted }">({{ resendTimer }}s)</span>
                    </v-btn>
                    <span :style="{ color: themeColors.border }">|</span>
                    <v-btn variant="text" size="small" color="grey" @click="loginStep = 1"
                      style="font-size: 0.75rem; text-transform: none; min-width: auto;">
                      Back
                    </v-btn>
                  </div>
                </div>

                <!-- Loading Overlay -->
                <LoadingOverlay v-model="pageLoading" :message="pageLoadingMessage" />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useTheme } from 'vuetify'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import LoadingOverlay from '@/components/LoadingOverlay.vue'

const router = useRouter()
const { login } = useAuth()

// Define emits
const emit = defineEmits<{
  (e: 'login-success', user: { username: string; name: string; role: string; email: string; department: string }): void
}>()

// Theme
const theme = useTheme()
const themeColors = computed(() => theme.current.value.colors)

// Data
const loginUsername = ref('kp.digital')
const loginPassword = ref('kp@123')
const showPassword = ref(false)
const loginStep = ref(1)
const otpCode = ref('')
const generatedCode = ref('')
const resendTimer = ref(0)
const pageLoading = ref(false)
const pageLoadingMessage = ref('Preparing Kotra Hub...')
const otpInputRef = ref<any>(null)
let pageLoaderTimeout: ReturnType<typeof setTimeout> | null = null

const focusOtpInput = () => {
  const attempts = [0, 50, 150, 300]
  attempts.forEach(delay => {
    setTimeout(() => {
      if (otpInputRef.value) {
        const inputs = otpInputRef.value.$el?.querySelectorAll('input')
        if (inputs && inputs.length > 0) {
          inputs[0].focus()
          inputs[0].select()
        }
      }
    }, delay)
  })
}

watch(loginStep, (newStep, oldStep) => {
  if (newStep === 2 && oldStep === 1) {
    focusOtpInput()
  }
})

// Methods
const loginWithout2FA = () => {
  if (loginUsername.value.trim() !== 'kp.digital' || loginPassword.value.trim() !== 'kp@123') {
    showAlert('Invalid username or password')
    return
  }
  performLogin()
}

const verifyCredentials = () => {
  if (loginUsername.value.trim() !== 'kp.digital' || loginPassword.value.trim() !== 'kp@123') {
    showAlert('Invalid username or password')
    return
  }
  loginStep.value = 2
  sendTwoFactorCode()
}

const sendTwoFactorCode = () => {
  const code = Math.floor(100000 + Math.random() * 900000)
  generatedCode.value = String(code)
  showAlert(`2FA code ${generatedCode.value} has been sent.`)

  resendTimer.value = 30
  const interval = setInterval(() => {
    resendTimer.value--
    if (resendTimer.value <= 0) {
      clearInterval(interval)
    }
  }, 1000)
  otpCode.value = ''
}

const onOtpComplete = () => {
  if (otpCode.value.length === 6) {
    verify2FA()
  }
}

const verify2FA = () => {
  if (otpCode.value.length !== 6) {
    showAlert('Please enter a valid 6-digit verification code.')
    return
  }
  if (otpCode.value === generatedCode.value) {
    performLogin()
  } else {
    showAlert('Invalid verification code. Please try again.')
    otpCode.value = ''
    focusOtpInput()
  }
}

const resendCode = () => {
  if (resendTimer.value === 0) {
    sendTwoFactorCode()
    setTimeout(() => focusOtpInput(), 100)
  }
}

const performLogin = () => {
  showPageLoader('Signing in to Kotra Hub...')
  setTimeout(() => {
    hidePageLoader(550)
    login({
      name: 'KP Digital',
      role: 'IT Executive',
      email: 'kp.digital@kotrapharma.com',
    })
    router.push({ name: 'dashboard' })
  }, 500)
}

const showAlert = (message: string) => {
  alert(message)
}

const showPageLoader = (message: string = 'Loading page...') => {
  pageLoadingMessage.value = message
  pageLoading.value = true
  if (pageLoaderTimeout) {
    clearTimeout(pageLoaderTimeout)
    pageLoaderTimeout = null
  }
}

const hidePageLoader = (delay: number = 450) => {
  if (pageLoaderTimeout) clearTimeout(pageLoaderTimeout)
  pageLoaderTimeout = setTimeout(() => {
    pageLoading.value = false
    pageLoaderTimeout = null
  }, delay)
}
</script>

<style scoped>
.background-picture {
  background-image: url('@/assets/images/login-kotra-building-bg.jpg');
  background-size: cover;
  background-position: center;
}

.v-otp-input :deep(.v-field__input) {
  justify-content: center;
  gap: 8px;
}

.v-otp-input :deep(.v-field__input input) {
  width: 40px !important;
  height: 48px !important;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 700;
}

.border-top {
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.logo-wrapper {
  width: min(70px, 14vw);
  height: min(70px, 14vw);
  max-width: 90px;
  max-height: 90px;
  min-width: 50px;
  min-height: 50px;
  border-radius: max(12px, min(2.5vw, 18px));
  overflow: hidden;
  box-shadow: 0 3px 16px rgba(0, 0, 0, 0.06);
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

@media (max-width: 400px) {
  .logo-wrapper {
    width: 50px;
    height: 50px;
    border-radius: 10px;
  }
}

@media (min-width: 401px) and (max-width: 600px) {
  .logo-wrapper {
    width: 58px;
    height: 58px;
    border-radius: 12px;
  }
}

@media (min-width: 601px) and (max-width: 960px) {
  .logo-wrapper {
    width: 65px;
    height: 65px;
    border-radius: 14px;
  }
}

@media (min-width: 961px) and (max-width: 1264px) {
  .logo-wrapper {
    width: 70px;
    height: 70px;
    border-radius: 15px;
  }
}

@media (min-width: 1265px) {
  .logo-wrapper {
    width: 78px;
    height: 78px;
    border-radius: 16px;
  }
}

@media (max-width: 600px) {
  .v-card {
    padding: 20px 16px !important;
    border-radius: 20px !important;
  }
}

.v-alert :deep(.v-alert__prepend) {
  margin-right: 6px !important;
}

.v-alert :deep(.v-icon) {
  font-size: 16px !important;
}
</style>
