<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)

const closeMenu = () => {
  menuOpen.value = false
}
</script>

<template>
  <header class="navbar">
    <div class="navbar-container">

      <span class="logo">
        Guilherme Cardoso
      </span>

      <nav
        class="nav-links"
        :class="{ open: menuOpen }"
      >
        <a
          href="#inicio"
          @click="closeMenu"
        >
          Início
        </a>

        <a
          href="#sobre"
          @click="closeMenu"
        >
          Sobre
        </a>

        <a
          href="#habilidades"
          @click="closeMenu"
        >
          Habilidades
        </a>

        <a
          href="#projetos"
          @click="closeMenu"
        >
          Projetos
        </a>

        <a
          href="#servicos"
          @click="closeMenu"
        >
          Serviços
        </a>

        <a
          href="#contato"
          @click="closeMenu"
        >
          Contato
        </a>
      </nav>

      <button
        class="menu-button"
        :class="{ active: menuOpen }"
        type="button"
        aria-label="Abrir menu"
        :aria-expanded="menuOpen"
        @click="menuOpen = !menuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

    </div>
  </header>
</template>

<style scoped>

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  padding: 0;
  z-index: 1000;
}

.navbar-container {
  width: 100%;
  max-width: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 22vh;
  background: rgba(255, 255, 255, 0.10);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-bottom: 1px solid rgba(255, 255, 255, 0.28);
  backdrop-filter: blur(22px);
  box-shadow:
    0 8px 30px rgba(0, 0, 0, 0.18);
}

.logo {
  color: #fff;
  font-size: 25px;
  font-weight: 600;
  letter-spacing: 1px;
  white-space: nowrap;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 44px;
}

.nav-links a {
  position: relative;
  color: rgba(255, 255, 255, 0.88);
  font-size: 20px;
  font-weight: 400;
  text-decoration: none;
  transition:
    color 0.3s ease,
    transform 0.3s ease;
}

.nav-links a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0;
  height: 1px;
  background: #fff;
  border-radius: 10px;
  transition: width 0.5s ease;
}

.nav-links a:hover {
  color: #fff;
  transform: translateY(-1px);
}

.nav-links a:hover::after {
  width: 100%;
}

.menu-button {
  display: none;
  width: 44px;
  height: 44px;
  padding: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.menu-button span {
  width: 25px;
  height: 2px;
  background: #fff;
  border-radius: 2px;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}


.menu-button.active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.menu-button.active span:nth-child(2) {
  opacity: 0;
}

.menu-button.active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}


@media (max-width: 1350px) {

  .navbar {
    padding: 0;
  }

  .navbar-container {
    padding: 18px 24px;
  }

  .nav-links {
    gap: 25px;
  }

  .nav-links a {
    font-size: 16px;
  }

  .logo {
    font-size: 21px;
  }
}


@media (max-width: 800px) {

  .navbar {
    padding: 0;
  }

  .navbar-container {
    padding: 18px 24px;
  }

  .logo {
    font-size: 21px;
  }

  .menu-button {
    display: flex;
  }

.nav-links {
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  right: 0;
  margin: 0 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0;
  background: rgba(15, 30, 65, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-bottom: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 15px;
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.25);
    
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease,
    transform 0.3s ease;
}

  .nav-links.open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .nav-links a {
    padding: 15px 5px;
    font-size: 18px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .nav-links a:last-child {
    border-bottom: none;
  }

  .nav-links a::after {
    display: none;
  }
}

@media (max-width: 400px) {

  .logo {
    font-size: 21px;
  }

  .navbar-container {
    padding: 18px 24px;
  }
}

</style>

