<script setup>
import Navbar from '../components/Navbar.vue'
import Hero from '../components/home/Hero.vue'
import SkillsGlobe from '../components/home/SkillsGlobe.vue'
</script>

<template>
  <div class="home">
    <Navbar />

    <main>
      <!-- HERO -->
      <Hero />

      <!-- SOBRE -->
      <section id="sobre" class="about-preview">
        <div class="about-content">
          <p>
            Me chamo <strong>Guilherme Cardoso</strong>, tenho
            <strong>21 anos</strong> e atualmente curso
            <strong>Sistemas de Informação</strong> no IFC.
          </p>

          <p>
            Sou apaixonado por tecnologia, principalmente por
            <strong>desenvolvimento web</strong>, focando em interfaces
            responsivas e acessíveis.
          </p>

          <p>
            Também tenho interesse em <strong>web design</strong>, onde busco
            aprofundar meus conhecimentos sobre interfaces e tendências do mercado.
          </p>

          <RouterLink to="/sobre" class="about-button">
            Ver mais
          </RouterLink>
        </div>
      </section>

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
      <section id="projetos" class="section">
        <h2>Projetos</h2>
      </section>

      <!-- SERVIÇOS -->
      <section id="servicos" class="section">
        <h2>Serviços</h2>
      </section>

      <!-- CONTATO -->
      <section id="contato" class="section">
        <h2>Contato</h2>
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

/* =========================
   SOBRE
========================= */

.about-preview {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 120px 30px 60px;
  box-sizing: border-box;
}

.about-content {
  position: relative;

  width: 100%;
  max-width: 1000px;
  min-height: 450px;

  padding: 55px 60px 90px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background: rgba(255, 255, 255, 0.055);

  border: 1px solid rgba(255, 255, 255, 0.11);
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);

  border-radius: 20px;

  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);

  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.15);
}

.about-content p {
  margin: 0 0 22px;

  max-width: 850px;

  font-size: 20px;
  font-weight: 400;
  line-height: 1.7;

  color: rgba(255, 255, 255, 0.82);
}

.about-content p:last-of-type {
  margin-bottom: 0;
}

.about-content strong {
  color: #fff;
  font-weight: 600;
}

.about-button {
  position: absolute;

  bottom: 30px;
  left: 35px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 12px 25px;

  color: #fff;

  font-size: 17px;
  font-weight: 500;

  text-decoration: none;

  background: rgba(255, 255, 255, 0.08);

  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  transition:
    background 0.3s ease,
    transform 0.3s ease,
    border-color 0.3s ease;
}

.about-button:hover {
  background: rgba(255, 255, 255, 0.15);

  border-color: rgba(255, 255, 255, 0.35);

  transform: translateY(-2px);
}

/* =========================
   HABILIDADES
========================= */

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

/* =========================
   OUTRAS SEÇÕES
========================= */

.section {
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 120px 30px 60px;

  box-sizing: border-box;
}

.section h2 {
  margin: 0;

  color: #fff;

  font-size: clamp(32px, 5vw, 64px);
}

/* =========================
   RESPONSIVO
========================= */

@media (max-width: 700px) {
  .about-preview {
    padding: 100px 20px 50px;
  }

  .about-content {
    min-height: 500px;

    padding: 40px 30px 90px;

    border-radius: 16px;
  }

  .about-content p {
    font-size: 18px;
    line-height: 1.6;
  }

  .about-button {
    left: 30px;
    bottom: 25px;

    font-size: 16px;
  }

  .skills-section {
    padding: 100px 20px 50px;
  }

  .skills-header h2 {
    font-size: clamp(38px, 12vw, 52px);
  }

  .skills-header p {
    font-size: 16px;
  }

  .section {
    padding: 100px 20px 50px;
  }
}
</style>