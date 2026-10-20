<script setup>
const contacts = [
  {
    name: 'LinkedIn',
    description: 'Vamos nos conectar',
    url: 'https://www.linkedin.com/in/dev-cardoso/',
    type: 'linkedin',
  },
  {
    name: 'GitHub',
    description: 'Explore meus projetos',
    url: 'https://github.com/Guilherme-Cardosoo',
    type: 'github',
  },
  {
    name: 'E-mail',
    description: 'Entre em contato comigo',
    url: 'mailto:guilherme.cardooso04@gmail.com',
    type: 'email',
  },
]
</script>


<template>
  <section id="contato" class="contact">
    <div class="contact-glow"></div>

    <div class="contact-content">
      <h2 class="contact-title">
        Vamos <span>conversar?</span>
      </h2>

      <p class="contact-subtitle">
        Entre em contato e me acompanhe através das plataformas abaixo
      </p>

      <div class="contact-cards">
        <a
          v-for="contact in contacts"
          :key="contact.type"
          :href="contact.url"
          class="contact-card"
          :class="contact.type"
          :target="contact.type === 'email' ? undefined : '_blank'"
          :rel="contact.type === 'email' ? undefined : 'noopener noreferrer'"
          :aria-label="`${contact.name}: ${contact.description}`"
        >
          <div class="background-icon" aria-hidden="true">
            <svg
              v-if="contact.type === 'linkedin'"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V8.98h3.42v1.57h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.28ZM5.34 7.42a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.03H3.56V8.98h3.56v11.47ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z"
              />
            </svg>

            <svg
              v-else-if="contact.type === 'github'"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.3-1.24-1.64-1.24-1.64-1.02-.7.08-.69.08-.69 1.12.08 1.7 1.15 1.7 1.15 1 1.7 2.62 1.2 3.26.92.1-.72.39-1.2.71-1.48-2.48-.28-5.08-1.24-5.08-5.5 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.12 2.96.71.78 1.14 1.77 1.14 2.99 0 4.27-2.61 5.22-5.1 5.5.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"
              />
            </svg>

            <svg
              v-else
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          </div>

          <div class="card-content">
            <span class="card-label">CONECTE-SE</span>
            <h3>{{ contact.name }}</h3>
            <p>{{ contact.description }}</p>
          </div>

          <div class="card-bottom-line"></div>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  position: relative;
  isolation: isolate;
  min-height: calc(100svh - 180px);
  box-sizing: border-box;
  padding: 25px 8vw 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: #fff;
  scroll-margin-top: 80px;
}

.contact-glow {
  position: absolute;
  z-index: -1;
  top: 15%;
  left: 50%;
  width: min(750px, 90vw);
  height: 400px;
  transform: translateX(-50%);
  background: radial-gradient(
    ellipse,
    rgba(30, 144, 255, 0.16),
    rgba(0, 190, 255, 0.05) 45%,
    transparent 72%
  );

  filter: blur(35px);
  pointer-events: none;
}

.contact-content {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.contact-title {
  margin: 0;
  font-size: clamp(2.4rem, 5vw, 4rem);
  line-height: 1.1;
  font-weight: 600;
  letter-spacing: -0.045em;
  text-align: center;
  background: linear-gradient(
    110deg,
     #8be5ff 0%,
     #419bff 25%,
     #d1f4ff 50%,
     #419bff 75%,
     #8be5ff 100%);

  background-size: 250% 100%;
  background-position: 0% 50%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textWave 4s ease-in-out infinite alternate;
}

.contact-subtitle {
  max-width: 530px;
  margin: 22px 0 0;
  color: rgba(235, 244, 255, 0.7);
  font-size: 1rem;
  line-height: 1.8;
  text-align: center;
}

.contact-cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  width: 100%;
  min-height: 195px;
  margin-top: 36px;
}

.contact-card {
  --accent: #1684e8;
  --icon-color: #1684e8;
  --line-color: #1684e8;
  position: relative;
  isolation: isolate;
  min-width: 0;
  min-height: 225px;
  padding: 28px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 22px;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.085),
    rgba(255, 255, 255, 0.025)
  );

  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
  color: #fff;
  text-decoration: none;
  box-shadow: 0 15px 35px rgba(0, 10, 40, 0.14);
  transition:
    transform 0.35s cubic-bezier(0.2, 0.75, 0.25, 1),
    border-color 0.35s ease,
    background 0.35s ease,
    box-shadow 0.35s ease;
}

.contact-card.linkedin {
  --accent: #1684e8;
  --icon-color: #1684e8;
  --line-color: #1684e8;
}

.contact-card.github {
  --accent: #b9d2ff;
  --icon-color: #e4edff;
  --line-color: #dce8ff;
}

.contact-card.email {
  --accent: #ff6b63;
  --icon-color: #ff6b63;
  --line-color: #ff766d;
}

.background-icon {
  position: absolute;
  z-index: 1;
  left: -115px;
  top: 50%;
  width: 245px;
  height: 245px;
  transform: translateY(-50%);
  color: var(--icon-color);
  opacity: 0.22;
  pointer-events: none;
  transition:
    left 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.4s ease,
    filter 0.4s ease;
}

.background-icon svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
  filter: drop-shadow(0 0 12px var(--accent));
}

.contact-card::before {
  content: '';
  position: absolute;
  z-index: 0;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(5, 16, 49, 0.08) 0%,
    rgba(5, 16, 49, 0.38) 48%,
    rgba(5, 16, 49, 0.78) 100%
  );

  pointer-events: none;
}

.card-content {
  position: relative;
  z-index: 2;
  width: 100%;
  padding-top: 85px;
}

.card-label {
  display: inline-block;
  margin-bottom: 10px;
  color: var(--icon-color);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.18em;
}

.card-content h3 {
  margin: 0 0 8px;
  color: #fff;
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.card-content p {
  margin: 0;
  color: rgba(235, 244, 255, 0.7);
  font-size: 0.85rem;
  line-height: 1.6;
}

.card-bottom-line {
  position: absolute;
  z-index: 3;
  right: 24px;
  bottom: 0;
  left: 24px;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--line-color),
    transparent
  );

  opacity: 0;
  transition: opacity 0.35s ease;
}


.contact-card:hover {
  transform: translateY(-4px) scale(1.015);
  border-color: color-mix(in srgb, var(--accent) 35%, transparent);
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.10),
    rgba(255, 255, 255, 0.035)
  );
  box-shadow: 0 18px 38px rgba(0, 8, 35, 0.2);
}

.contact-card:hover .background-icon {
  left: 24px;
  opacity: 0.3;
  filter: drop-shadow(0 0 15px var(--accent));
}

.contact-card:hover .card-bottom-line {
  opacity: 0.75;
}

.contact-card:focus-visible {
  outline: 2px solid #83dfff;
  outline-offset: 5px;
}

@media (max-width: 850px) {
  .contact {
    min-height: auto;
    padding: 105px 6vw 40px;
    scroll-margin-top: 70px;
  }

  .contact-cards {
    gap: 16px;
    margin-top: 36px;
  }
}

@media (max-width: 620px) {
  .contact {
    padding: 100px 6vw 40px;
  }

  .contact-cards {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .contact-card {
    min-height: 150px;
    padding: 22px;
  }

  .card-content {
    padding-top: 55px;
  }
}

@keyframes textWave {
  0% {
    background-position: 0% 50%;
  }

  100% {
    background-position: 100% 50%;
  }
}
</style>

