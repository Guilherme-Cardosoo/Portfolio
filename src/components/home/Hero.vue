<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const fullText = 'Interfaces limpas, funcionais e modernas'

const displayedText = ref('')

let index = 0
let isDeleting = false
let interval = null
let pauseTimeout = null

const typeEffect = () => {
  if (!isDeleting) {
    displayedText.value = fullText.slice(0, index)
    index++

    if (index > fullText.length) {
      clearInterval(interval)

      pauseTimeout = setTimeout(() => {
        isDeleting = true

        interval = setInterval(typeEffect, 70)
      }, 1500)

      return
    }
  } else {
    displayedText.value = fullText.slice(0, index)
    index--

    if (index < 0) {
      index = 0
      isDeleting = false

      clearInterval(interval)

      pauseTimeout = setTimeout(() => {
        interval = setInterval(typeEffect, 90)
      }, 400)
    }
  }
}

onMounted(() => {
  interval = setInterval(typeEffect, 90)
})

onUnmounted(() => {
  clearInterval(interval)
  clearTimeout(pauseTimeout)
})
</script>

<template>
  <section id="inicio" class="hero">
    <div class="hero-content">
      <h1>
        Construindo experiências 
        <br> 
        para a web
      </h1>

      <p class="typing-text">
        <span>{{ displayedText }}</span>
        <span class="cursor">|</span>
      </p>
    </div>
  </section>
</template>

<style scoped>

.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  box-sizing: border-box;
}

.hero-content {
  width: 100%;
  max-width: 1200px;
  text-align: center;
}

.hero h1 {
  margin: 0;
  font-size: 64px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -1px;
  color: #fff;
}

.typing-text {
  margin: 25px 0 0;
  min-height: 36px;
  font-size: 25px;
  font-weight: 400;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.82);
}

.cursor {
  display: inline-block;
  margin-left: 3px;
  font-weight: 300;
  animation: blink 0.8s infinite;
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }

  51%,
  100% {
    opacity: 0;
  }
}

@media (max-width: 900px) {
  .hero h1 {
    font-size: 50px;
  }

  .typing-text {
    font-size: 22px;
  }
}

@media (max-width: 600px) {
  .hero {
    padding: 0 20px;
  }

  .hero h1 {
    font-size: 38px;
    line-height: 1.15;
  }

  .typing-text {
    margin-top: 18px;
    font-size: 19px;
  }
}

@media (max-width: 400px) {
  .hero h1 {
    font-size: 32px;
  }

  .typing-text {
    font-size: 17px;
  }
}

</style>