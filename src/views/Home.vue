<script setup>
import Navbar from '../components/Navbar.vue'
import Hero from '../components/home/Hero.vue'
</script>

<template>
  <div class="home">

    <Navbar />

    <main>
      <Hero />

      <section id="inicio" class="section">
        <h1>Início</h1>
      </section>

      <section id="sobre" class="section">
        <h2>Sobre</h2>
      </section>

      <section id="habilidades" class="section">
        <h2>Habilidades</h2>
      </section>

      <section id="projetos" class="section">
        <h2>Projetos</h2>
      </section>

      <section id="servicos" class="section">
        <h2>Serviços</h2>
      </section>

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

.section {
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 120px 30px 60px;
}

.section h1,
.section h2 {
  font-size: clamp(32px, 5vw, 64px);
}
</style>