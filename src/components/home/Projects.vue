
<script setup>
import { ref, computed } from 'vue'

import projeto01 from '../../assets/img/Projetos/Snaply.png'
import projeto02 from '../../assets/img/Projetos/Snaply.png'

const projects = [
  {
    number: '01',
    name: 'Snaply',
    description:
      'Snaply é uma rede social desenvolvida como projeto acadêmico.',
    technologies: ['Vue.js', 'Django', 'PostgreSQL'],
    image: projeto01,
    projectUrl: 'https://snaply-wheat.vercel.app/',
    githubUrl: 'https://github.com/Guilherme-Cardosoo/Snaply'
  },
  {
    number: '02',
    name: 'WebManager',
    description:
      'WebManager é uma ferramenta desenvolvida para auxiliar no modo carreira treinador nos jogos da franquia EA FC/FIFA.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: projeto02,
    projectUrl: '#',
    githubUrl: '#'
  }
]

const currentIndex = ref(0)
const direction = ref('next')

const currentProject = computed(() => projects[currentIndex.value])

const hasMultipleProjects = computed(() => projects.length > 1)

const showPrevious = computed(() => currentIndex.value > 0)

const nextProject = () => {
  if (!hasMultipleProjects.value) return

  direction.value = 'next'
  currentIndex.value = (currentIndex.value + 1) % projects.length
}

const previousProject = () => {
  if (!showPrevious.value) return

  direction.value = 'previous'
  currentIndex.value = (currentIndex.value - 1 + projects.length) % projects.length
}
</script>

<template>
  <section id="projetos" class="projects-section">
    <div
      class="projects-background"
      :style="{ backgroundImage: `url('${currentProject.image}')` }"
    ></div>

    <div class="projects-overlay"></div>

    <div class="projects-container">
      <Transition
        :name="direction === 'next' ? 'project-next' : 'project-previous'"
        mode="out-in"
      >
        <div :key="currentProject.number" class="project-content">
          <div class="project-info">
            <h3>{{ currentProject.name }}</h3>

            <p class="project-description">
              {{ currentProject.description }}
            </p>

            <div class="project-technologies">
              <span
                v-for="technology in currentProject.technologies"
                :key="technology"
              >
                {{ technology }}
              </span>
            </div>

            <div class="project-actions">
              <a
                v-if="currentProject.projectUrl !== '#'"
                :href="currentProject.projectUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="project-button primary"
              >
                Ver projeto <span>↗</span>
              </a>

              <a
                v-else
                href="#"
                class="project-button primary disabled"
                aria-disabled="true"
                @click.prevent
              >
                Ver projeto <span>↗</span>
              </a>

              <a
                v-if="currentProject.githubUrl !== '#'"
                :href="currentProject.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="project-button secondary"
              >
                Ver código <span>↗</span>
              </a>

              <a
                v-else
                href="#"
                class="project-button secondary disabled"
                aria-disabled="true"
                @click.prevent
              >
                Ver código <span>↗</span>
              </a>
            </div>
          </div>

          <div class="project-preview">
            <div class="preview-frame">
              <img
                :src="currentProject.image"
                :alt="`Prévia do projeto ${currentProject.name}`"
              />
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <button
      v-if="hasMultipleProjects && showPrevious"
      class="project-navigation previous"
      type="button"
      aria-label="Projeto anterior"
      @click="previousProject"
    >
      <span>←</span>
    </button>

    <button
      v-if="hasMultipleProjects"
      class="project-navigation next"
      type="button"
      aria-label="Próximo projeto"
      @click="nextProject"
    >
      <span>→</span>
    </button>

    <div class="project-counter" aria-label="Progresso dos projetos">
      <span class="current">{{ currentProject.number }}</span>
      <span class="separator">/</span>
      <span>{{ String(projects.length).padStart(2, '0') }}</span>
    </div>
  </section>
</template>

<style scoped>
.projects-section {
  position: relative;
  isolation: isolate;
  width: 100%;
  min-height: 680px;
  height: 100vh;
  height: 100svh;
  overflow: hidden;
  display: flex;
  align-items: center;
  color: white;
  padding: 48px 0 64px;
}

.projects-background {
  position: absolute;
  z-index: -2;
  inset: -60px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  filter: blur(30px);
  transform: scale(1.08);
  transition:
    opacity 0.8s ease,
    transform 1s cubic-bezier(0.22, 1, 0.36, 1);
}

.projects-overlay {
  position: absolute;
  z-index: -1;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(5, 10, 30, 0.95) 0%,
    rgba(5, 10, 30, 0.86) 45%,
    rgba(5, 10, 30, 0.78) 100%
  );
}

.projects-container {
  position: relative;
  z-index: 1;
  width: min(1120px, calc(100% - 180px));
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 0;
}

.project-content {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  align-items: center;
  gap: clamp(32px, 5vw, 75px);
}

.project-info {
  min-width: 0;
  max-width: 500px;
}

.project-info h3 {
  margin: 0 0 22px;
  font-size: clamp(34px, 3.7vw, 54px);
  line-height: 1.08;
  font-weight: 600;
  letter-spacing: -1.5px;
  overflow-wrap: anywhere;
}

.project-description {
  margin: 0;
  max-width: 480px;
  font-size: 15px;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.72);
}

.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 25px;
}

.project-technologies span {
  padding: 6px 12px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.13);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
  transition:
    background 0.35s ease,
    border-color 0.35s ease,
    color 0.35s ease;
}

.project-technologies span:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.22);
  color: white;
}

.project-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 30px;
}

.project-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-width: 140px;
  padding: 12px 19px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  text-decoration: none;
  transition:
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    background 0.35s ease,
    border-color 0.35s ease,
    box-shadow 0.35s ease;
}

.project-button span {
  font-size: 15px;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.project-button:hover {
  transform: translateY(-2px);
}

.project-button:hover span {
  transform: translate(2px, -2px);
}

.project-button.primary {
  background: white;
  color: #080d24;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.project-button.primary:hover {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
}

.project-button.secondary {
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: white;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.project-button.secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.3);
}

.project-button.disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.project-preview {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 0;
  perspective: 1200px;
}

.preview-frame {
  position: relative;
  width: 100%;
  max-width: 610px;
  border-radius: 14px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.4);
  transform: translateY(0) scale(1);
  transition:
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.7s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.5s ease;
}

.preview-frame:hover {
  transform: translateY(-7px) scale(1.012);
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow: 0 40px 90px rgba(0, 0, 0, 0.5);
}

.preview-frame::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0.07),
    transparent 35%,
    transparent 70%,
    rgba(255, 255, 255, 0.03)
  );
  opacity: 0;
  transition: opacity 0.7s ease;
}

.preview-frame:hover::after {
  opacity: 1;
}

.preview-frame img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.preview-frame:hover img {
  transform: scale(1.015);
}

.project-navigation {
  position: absolute;
  z-index: 5;
  top: 50%;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: white;
  cursor: pointer;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  transition:
    background 0.45s ease,
    border-color 0.45s ease,
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.45s ease;
}

.project-navigation span {
  font-size: 22px;
  line-height: 1;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.project-navigation:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.28);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  transform: translateY(-50%) scale(1.06);
}

.project-navigation.previous {
  left: clamp(10px, 2vw, 30px);
}

.project-navigation.next {
  right: clamp(10px, 2vw, 30px);
}

.project-counter {
  position: absolute;
  z-index: 5;
  right: clamp(18px, 3vw, 40px);
  bottom: clamp(18px, 3vw, 28px);
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.4);
}

.project-counter .current {
  color: white;
}

.project-counter .separator {
  opacity: 0.3;
}

/* Transições entre projetos */
.project-next-enter-active,
.project-next-leave-active,
.project-previous-enter-active,
.project-previous-leave-active {
  transition:
    opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.project-next-enter-from {
  opacity: 0;
  transform: translateX(28px) scale(0.985);
}

.project-next-leave-to {
  opacity: 0;
  transform: translateX(-28px) scale(0.985);
}

.project-previous-enter-from {
  opacity: 0;
  transform: translateX(-28px) scale(0.985);
}

.project-previous-leave-to {
  opacity: 0;
  transform: translateX(28px) scale(0.985);
}


/* Notebooks e tablets na horizontal */
@media (max-width: 1050px) {
  .projects-container {
    width: calc(100% - 112px);
  }

  .project-content {
    gap: 28px;
  }

  .project-info h3 {
    font-size: clamp(27px, 3.5vw, 38px);
  }

  .project-actions {
    gap: 8px;
  }

  .project-button {
    padding-inline: 12px;
  }
}

/* Tablets e celulares */
@media (max-width: 800px) {
  .projects-section {
    height: auto;
    min-height: 100vh;
    min-height: 100svh;
    overflow: clip;
    padding: 100px 0 76px;
  }

  .projects-container {
    width: calc(100% - 96px);
    max-width: 620px;
    margin-inline: auto;
    padding: 0;
  }

  .project-content {
    grid-template-columns: minmax(0, 1fr);
    gap: clamp(22px, 4vw, 32px);
  }

  .project-info {
    max-width: none;
  }

  .project-info h3 {
    font-size: clamp(30px, 5vw, 40px);
    margin-bottom: 14px;
  }

  .project-description {
    max-width: 100%;
    font-size: clamp(12px, 1.8vw, 14px);
  }

  .project-technologies {
    margin-top: 18px;
  }

  .project-actions {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    margin-top: 22px;
  }

  .project-button {
    width: 100%;
    padding: 12px 8px;
    font-size: 11px;
  }

  .project-preview {
    width: 100%;
  }

  .preview-frame {
    width: 100%;
    max-width: none;
  }

  /* As setas ficam fora da área do conteúdo */
  .project-navigation {
    top: 24px;
    bottom: auto;
    transform: none;
  }

  .project-navigation.previous {
    left: 16px;
  }

  .project-navigation.next {
    right: 16px;
  }

  .project-counter {
    right: 18px;
    bottom: 18px;
    transform: none;
  }
}

/* Celulares */
@media (max-width: 480px) {
  .projects-section {
    padding: 82px 0 70px;
  }

  .projects-container {
    width: calc(100% - 48px);
  }

  .project-content {
    gap: 22px;
  }

  .project-info h3 {
    font-size: clamp(28px, 7.5vw, 34px);
    letter-spacing: -0.8px;
  }

  .project-description {
    font-size: 12px;
    line-height: 1.7;
  }

  .project-technologies {
    gap: 6px;
    margin-top: 16px;
  }

  .project-technologies span {
    font-size: 10px;
    padding: 5px 9px;
  }

  .project-actions {
    gap: 8px;
    margin-top: 20px;
  }

  .project-button {
    gap: 5px;
    padding: 11px 5px;
    font-size: 10px;
  }

  .project-navigation {
    width: 36px;
    height: 36px;
    top: 20px;
  }

  .project-navigation.previous {
    left: 12px;
  }

  .project-navigation.next {
    right: 12px;
  }

  .project-counter {
    font-size: 10px;
    bottom: 16px;
    right: 16px;
  }
}

/* Celulares estreitos */
@media (max-width: 350px) {
  .projects-container {
    width: calc(100% - 40px);
  }

  .project-actions {
    grid-template-columns: minmax(0, 1fr);
  }

  .project-button {
    padding: 11px;
    font-size: 11px;
  }
}

/* Respeita a preferência por movimento reduzido */
@media (prefers-reduced-motion: reduce) {
  .projects-background,
  .project-button,
  .project-navigation,
  .preview-frame,
  .preview-frame img,
  .project-technologies span,
  .project-next-enter-active,
  .project-next-leave-active,
  .project-previous-enter-active,
  .project-previous-leave-active {
    transition: none;
  }
}
</style>
