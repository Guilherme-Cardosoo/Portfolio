<script setup>
import { ref, computed } from 'vue'

import projeto01 from '../../assets/img/Projetos/Snaply.png'
import projeto02 from '../../assets/img/Projetos/Snaply.png'

const projects = [
  {
    number: '01',
    name: 'Snaply',
    description:
      'Snaply é uma rede social desenvolvida como projeto acadêmico',
    technologies: ['Vue.js', 'Django', 'PostgreSQL'],
    image: projeto01,
    projectUrl: 'https://snaply-wheat.vercel.app/',
    githubUrl: 'https://github.com/Guilherme-Cardosoo/Snaply'
  },

  {
    number: '02',
    name: 'WebManager',
    description:
      'Descrição curta do segundo projeto. Você pode explicar aqui a proposta, as principais funcionalidades e o que foi desenvolvido.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: projeto02,
    projectUrl: '#',
    githubUrl: '#'
  }
]

const currentIndex = ref(0)
const direction = ref('next')

const currentProject = computed(() => {
  return projects[currentIndex.value]
})

const nextProject = () => {
  direction.value = 'next'

  currentIndex.value =
    (currentIndex.value + 1) % projects.length
}

const previousProject = () => {
  direction.value = 'previous'

  currentIndex.value =
    (currentIndex.value - 1 + projects.length) % projects.length
}
</script>

<template>
  <section id="projetos" class="projects-section">

    <div
      class="projects-background"
      :style="{
        backgroundImage: `url('${currentProject.image}')`
      }"
    ></div>

    <div class="projects-overlay"></div>

    <div class="projects-container">
      <div class="projects-header">
        <div>
          <h2>Projetos</h2>
        </div>
      </div>
      <Transition
        :name="direction === 'next' ? 'project-next' : 'project-previous'"
        mode="out-in"
      >
        <div
          :key="currentProject.number"
          class="project-content"
        >
          <div class="project-info">
            <span class="project-number">
              {{ currentProject.number }}
            </span>

            <h3>
              {{ currentProject.name }}
            </h3>

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
                :href="currentProject.projectUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="project-button primary"
              >
                Ver projeto
                <span>↗</span>
              </a>
              <a
                :href="currentProject.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="project-button secondary"
              >
                Ver código
                <span>↗</span>
              </a>
            </div>
          </div>
          <div class="project-preview">
            <div class="preview-frame">
              <img
                :src="currentProject.image"
                :alt="`Preview do projeto ${currentProject.name}`"
              />
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <button
      class="project-navigation previous"
      type="button"
      aria-label="Projeto anterior"
      @click="previousProject"
    >
      <span>←</span>
    </button>

    <button
      class="project-navigation next"
      type="button"
      aria-label="Próximo projeto"
      @click="nextProject"
    >
      <span>→</span>
    </button>

    <div class="project-counter">
      <span class="current">
        {{ currentProject.number }}
      </span>

      <span class="separator">/</span>

      <span>
        {{ String(projects.length).padStart(2, '0') }}
      </span>
    </div>
  </section>
</template>

<style scoped>

.projects-section {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 680px;
  overflow: hidden;
  display: flex;
  align-items: center;
  color: white;
}

.projects-background {
  position: absolute;
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
  inset: 0;
  background:
    linear-gradient(
      90deg,
      rgba(5, 10, 30, 0.95) 0%,
      rgba(5, 10, 30, 0.86) 45%,
      rgba(5, 10, 30, 0.78) 100%
    );

  z-index: 1;
}

.projects-container {
  position: relative;
  z-index: 2;
  width: min(1120px, calc(100% - 180px));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px 0;
}

.projects-header {
  margin-bottom: 45px;
}

.projects-header h2 {
  margin: 0;
  font-size: clamp(38px, 4vw, 54px);
  font-weight: 600;
  letter-spacing: -1.5px;
  line-height: 1;
}

.project-content {
  display: grid;
  grid-template-columns:
    minmax(300px, 0.85fr)
    minmax(400px, 1.15fr);

  align-items: center;
  gap: 75px;
}

.project-info {
  max-width: 500px;
}

.project-number {
  display: inline-block;
  margin-bottom: 16px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 3px;
  color: rgba(255, 255, 255, 0.42);
}

.project-info h3 {
  margin: 0 0 18px;
  font-size: clamp(36px, 3.7vw, 54px);
  line-height: 1.05;
  font-weight: 600;
  letter-spacing: -1.5px;
}

.project-description {
  margin: 0;
  max-width: 480px;
  font-size: 15px;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.68);
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
  color: rgba(255, 255, 255, 0.75);
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

  transition:
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
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
  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.12);
}

.project-button.primary:hover {
  background: rgba(255, 255, 255, 0.9);
  box-shadow:
    0 12px 30px rgba(0, 0, 0, 0.2);
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

.project-preview {
  display: flex;
  justify-content: center;
  align-items: center;
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
  box-shadow:
    0 30px 70px rgba(0, 0, 0, 0.4);

  transform:
    translateY(0)
    scale(1);

  transition:
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.7s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.5s ease;
}

.preview-frame:hover {
  transform:
    translateY(-7px)
    scale(1.012);

  border-color:
    rgba(255, 255, 255, 0.25);

  box-shadow:
    0 40px 90px rgba(0, 0, 0, 0.5);
}

.preview-frame::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(
      120deg,
      rgba(255, 255, 255, 0.07),
      transparent 35%,
      transparent 70%,
      rgba(255, 255, 255, 0.03)
    );

  opacity: 0;
  transition:
    opacity 0.7s ease;
}

.preview-frame:hover::after {
  opacity: 1;
}

.preview-frame img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  transition:
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
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
  transition:
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.project-navigation:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.28);
  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.2);

  transform:
    translateY(-50%)
    scale(1.06);
}

.project-navigation.previous {
  left: 30px;
}

.project-navigation.next {
  right: 30px;
}

.project-navigation.previous:hover span {
  transform: translateX(-3px);
}

.project-navigation.next:hover span {
  transform: translateX(3px);
}

.project-counter {
  position: absolute;
  z-index: 5;
  right: 40px;
  bottom: 28px;
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
  transform:
    translateX(28px)
    scale(0.985);
}

.project-next-leave-to {
  opacity: 0;
  transform:
    translateX(-28px)
    scale(0.985);
}

.project-previous-enter-from {
  opacity: 0;
  transform:
    translateX(-28px)
    scale(0.985);
}

.project-previous-leave-to {
  opacity: 0;
  transform:
    translateX(28px)
    scale(0.985);
}

@media (max-width: 1100px) {

  .projects-container {
    width: min(100% - 140px, 1000px);
  }

  .project-content {
    gap: 50px;
  }

  .project-navigation.previous {
    left: 18px;
  }

  .project-navigation.next {
    right: 18px;
  }

}

@media (max-width: 800px) {

  .projects-section {
    height: auto;

    min-height: 100vh;
  }

  .projects-container {
    width: calc(100% - 80px);

    min-height: 100vh;

    padding: 100px 0 90px;
  }

  .projects-header {
    margin-bottom: 40px;
  }

  .projects-header h2 {
    font-size: 40px;
  }

  .project-content {
    grid-template-columns: 1fr;

    gap: 40px;
  }

  .project-info {
    max-width: none;
  }

  .project-info h3 {
    font-size: 40px;
  }

  .project-description {
    font-size: 14px;
  }

  .project-preview {
    order: 2;
  }

  .preview-frame {
    max-width: 650px;
  }

  .project-navigation {
    width: 46px;
    height: 46px;
  }

  .project-navigation.previous {
    left: 12px;
  }

  .project-navigation.next {
    right: 12px;
  }

  .project-counter {
    right: 25px;

    bottom: 22px;
  }

}

@media (max-width: 550px) {

  .projects-container {
    width: calc(100% - 65px);

    padding-top: 90px;
  }

  .projects-header {
    margin-bottom: 32px;
  }

  .projects-header h2 {
    font-size: 34px;
  }

  .project-info h3 {
    font-size: 32px;
  }

  .project-description {
    font-size: 13px;

    line-height: 1.7;
  }

  .project-technologies {
    margin-top: 20px;
  }

  .project-actions {
    flex-direction: column;

    margin-top: 25px;
  }

  .project-button {
    width: 100%;
  }

  .project-content {
    gap: 30px;
  }

  .project-navigation {
    width: 40px;
    height: 40px;
  }

  .project-navigation span {
    font-size: 18px;
  }

  .project-navigation.previous {
    left: 8px;
  }

  .project-navigation.next {
    right: 8px;
  }

}

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