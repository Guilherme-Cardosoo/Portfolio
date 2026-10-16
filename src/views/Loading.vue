<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const loadingText = ref('Carregando...')
const isReady = ref(false)
const isLeaving = ref(false)

onMounted(() => {
  setTimeout(() => {
    loadingText.value = 'Pronto!'
    isReady.value = true
  }, 1000)
})

const enter = () => {
  isLeaving.value = true

  setTimeout(() => {
    router.push('/home')
  }, 850)
}
</script>

<template>
  <div
    id="loading-screen"
    :class="{ hide: isLeaving }"
  >
    <h1 id="loading-text">
      {{ loadingText }}
    </h1>

    <div
      v-if="!isReady"
      class="spinner"
    ></div>

    <button
      v-else
      id="enter-btn"
      @click="enter"
    >
      Entrar
    </button>
  </div>
</template>

<style scoped>
#loading-screen {
  position: fixed;
  inset: 0;
  background: radial-gradient(
    circle at top left,
    #07bfcf 0%,
    #0559d6 40%,
    #0a0f3d 100%
  );

  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  font-family: 'Inter', sans-serif;
  z-index: 9999;
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 0.8s ease,
    transform 0.8s ease;
}

#loading-screen.hide {
  opacity: 0;
  transform: translateY(-20px);
  pointer-events: none;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #999;
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

#enter-btn {
  padding: 10px 25px;
  background: transparent;
  color: #fff;
  border: 2px solid #fff;
  cursor: pointer;
  font-size: 28px;
  font-weight: 200;
  animation: fadeIn 0.8s ease forwards;
  transition:
    background 0.5s,
    box-shadow 0.5s,
    transform 0.5s;
}

#enter-btn:hover {
  background: rgba(255, 255, 255, 0.103);
  border-color: #fff;
  box-shadow: 0 0 12px #fff;
  transform: scale(1.05);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>