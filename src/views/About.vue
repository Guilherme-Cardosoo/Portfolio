<template>
  <div class="about-page">

    <header class="about-navbar">
      <div class="about-navbar-container">
        <span class="logo">
          Guilherme Cardoso
        </span>
        <RouterLink to="/home#sobre" class="back-button">
          Voltar
        </RouterLink>
      </div>
    </header>


    <main class="about-main">
      <section class="about-panel">
        <div class="about-content">
          <h1>Um pouco mais sobre mim</h1>

          <p>
            Nessa altura do campeonato você já deve saber que eu me chamo Guilherme.
            Já que você veio até aqui, vou usar esta página para falar um pouco mais sobre mim
            e sobre como vejo o desenvolvimento web.
            Meu principal objetivo como desenvolvedor é traduzir ideias em código, sempre buscando
            criar interfaces modernas, acessíveis e funcionais.
          </p>

          <p>
            As pessoas costumam me descrever como uma pessoa muito calma às vezes, calma até demais.
            Junto com isso, também posso dizer que sou bastante paciente na maioria das situações.
            Mesmo sendo alguém totalmente caseiro, gosto de descobrir lugares e coisas novas,
            seja aprendendo algo diferente, conhecendo novas pessoas e lugares diferentes.
          </p>

          <p>
            Comecei a estudar programação em 2021 por meio de vídeos na internet, em sua grande maioria gratuitos.
            Em 2022 finalizei o ensino médio e, em 2023, iniciei a faculdade de Sistemas de Informação na Uniasselvi.
            Por se tratar de um curso 100% EAD, acabei não me adaptando e, em 2024,
            me transferi para o IFC, onde continuo estudando atualmente.
          </p>

          <p>
            Como desenvolvedor, sempre penso em como o usuário vai enxergar um site ou aplicação
            no primeiro contato. Gosto de dar atenção ao impacto visual inicial, mantendo a organização das
            informações, a sutileza dos elementos e a simplicidade na navegação.
            Acredito que interfaces bem construídas não precisam ser complexas para serem eficientes.
          </p>

        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>

.about-page {
  min-height: 100vh;
  background: linear-gradient(
    to bottom,
    #07bfcf 0%,
    #0559d6 35%,
    #0a0f3d 100%
  );

  color: #fff;
}

.about-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.about-navbar-container {
  width: 100%;
  box-sizing: border-box;
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

.back-button {
  position: relative;
  color: rgba(255, 255, 255, 0.88);
  font-size: 20px;
  font-weight: 400;
  text-decoration: none;
  transition:
    color 0.3s ease,
    transform 0.3s ease;
}

.back-button::after {
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

.back-button:hover {
  color: #fff;
  transform: translateY(-1px);
}

.back-button:hover::after {
  width: 100%;
}

.about-main {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 140px 30px 70px;
}

.about-panel {
  width: 100%;
  max-width: 1000px;
  box-sizing: border-box;
  padding: 60px;
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.11);
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.15);

  animation: aboutEnter 0.8s ease-out both;
}

.about-content h1 {
  margin: 0 0 40px;
  font-size: clamp(38px, 5vw, 60px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -1px;
  color: #fff;
}

.about-content p {
  margin: 0 0 25px;
  font-size: 19px;
  font-weight: 400;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.82);
}

.about-content p:last-child {
  margin-bottom: 0;
}

@keyframes aboutEnter {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1350px) {

  .about-navbar-container {
    padding: 18px 24px;
  }

  .logo {
    font-size: 21px;
  }

}

@media (max-width: 700px) {

  .about-navbar-container {
    padding: 18px 20px;
  }

  .logo {
    font-size: 20px;
  }

  .back-button {
    padding: 8px 16px;
    font-size: 16px;
  }

  .about-main {
    padding: 110px 20px 40px;
  }

  .about-panel {
    padding: 40px 28px;
    border-radius: 16px;
  }

  .about-content h1 {
    margin-bottom: 30px;
    font-size: 38px;
  }

  .about-content p {
    font-size: 18px;
    line-height: 1.65;
  }

}
</style>