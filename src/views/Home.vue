```vue
<script setup>
import Navbar from '../components/Navbar.vue'
import Hero from '../components/home/Hero.vue'
import AboutSection from '../components/home/AboutSection.vue'
import SkillsGlobe from '../components/home/SkillsGlobe.vue'
import ProjectsSection from '../components/home/Projects.vue'
import ServicesSection from '../components/home/Services.vue'
import Contact from '../components/home/Contact.vue'
import FooterComponent from '../components/home/FooterComponent.vue'
</script>

<template>
  <div class="home">
    <Navbar />

    <main>
      <Hero />

      <!-- SOBRE -->
      <AboutSection />

      <!-- HABILIDADES -->
      <section id="habilidades" class="skills-section">
        <div class="skills-header">
          <div>
            <h2>Habilidades</h2>
            <p>
              Explore minhas habilidades e conhecimentos.
            </p>
          </div>
        </div>

        <SkillsGlobe />
      </section>

      <!-- PROJETOS -->
      <section>
        <ProjectsSection />
      </section>

      <!-- SERVIÇOS -->
      <section id="servicos" class="section">
        <ServicesSection />
      </section>

      <!-- CONTATO -->
      <section id="contato" class="section">
        <Contact />
        <FooterComponent />
      </section>
    </main>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
}

main {
  width: 100%;
}

/* HABILIDADES */
.skills-section {
  min-height: 100vh;
  padding: 120px 30px 60px;
  box-sizing: border-box;
}

.skills-header {
  max-width: 1100px;
  margin: 0 auto;
}

.section-number {
  display: block;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.4);
  font-size: 14px;
  letter-spacing: 2px;
}

.skills-header h2 {
  margin: 0;
  color: #fff;
  font-size: clamp(40px, 6vw, 64px);
  font-weight: 700;
  line-height: 1.1;
}

.skills-header p {
  margin: 15px 0 0;
  color: rgba(255, 255, 255, 0.65);
  font-size: 18px;
  line-height: 1.6;
}

/* SECTIONS GERAIS */
.section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 30px 60px;
  box-sizing: border-box;
}

/* CONTATO */
section#contato.section {
  flex-direction: column;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 0;
  gap: 12px;
}

/* RESPONSIVIDADE DAS HABILIDADES */
@media (max-width: 1000px) {
  .skills-globe {
    height: 520px;
  }

  .skill-panel {
    right: 2%;
    width: 250px;
    padding: 22px;
  }

  .skill-panel h3 {
    font-size: 25px;
  }

  .skill-panel p {
    font-size: 14px;
  }
}

@media (max-width: 800px) {
  .skills-globe {
    height: 620px;
  }

  .skill-panel {
    right: 50%;
    top: auto;
    bottom: 10px;
    width: min(85%, 380px);
    padding: 20px;
    transform: translateX(50%);
  }

  .skill-panel-enter-from,
  .skill-panel-leave-to {
    transform: translate(50%, 20px);
  }

  .globe-hint {
    bottom: 180px;
  }
}

@media (max-width: 780px) {
  .skills-globe {
    height: 520px;
  }

  .skill-panel {
    bottom: 5px;
    width: calc(100% - 30px);
    padding: 18px;
    border-radius: 15px;
  }

  .skill-type {
    font-size: 11px;
  }

  .skill-panel h3 {
    margin-bottom: 8px;
    font-size: 22px;
  }

  .skill-panel p {
    font-size: 13px;
    line-height: 1.5;
  }

  .close-button {
    margin-top: 14px;
    padding: 7px 14px;
    font-size: 13px;
  }

  .globe-hint {
    bottom: 155px;
    font-size: 12px;
  }
}

@media (max-width: 550px) {
  .skills-globe {
    height: 450px;
  }

  .skill-panel {
    width: calc(100% - 20px);
    padding: 15px;
  }

  .skill-panel h3 {
    font-size: 20px;
  }

  .skill-panel p {
    font-size: 12px;
  }

  .globe-hint {
    bottom: 145px;
  }
}

@media (max-width: 450px) {
  .skills-globe {
    height: 390px;
  }

  .skill-panel {
    width: calc(100% - 16px);
    padding: 13px;
  }

  .skill-type {
    font-size: 10px;
  }

  .skill-panel h3 {
    margin-bottom: 6px;
    font-size: 18px;
  }

  .skill-panel p {
    font-size: 11px;
    line-height: 1.45;
  }

  .close-button {
    margin-top: 10px;
    padding: 6px 12px;
    font-size: 12px;
  }

  .globe-hint {
    bottom: 135px;
    font-size: 11px;
  }
}
</style>
```