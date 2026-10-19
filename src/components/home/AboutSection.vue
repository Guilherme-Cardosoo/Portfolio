<template>
  <section id="sobre" class="about-preview">
    <div class="about-layout">
      <div class="about-content">
        <div class="about-copy">
          <p>
            Me chamo <strong>Guilherme Cardoso</strong>, tenho
            <strong>22 anos</strong> e atualmente curso
            <strong>Sistemas de Informação</strong> no IFC.
          </p>

          <p>
            Sou apaixonado por tecnologia, principalmente por
            <strong>desenvolvimento web</strong>.
          </p>

          <p>
            Também tenho interesse em <strong>web design</strong>, onde busco
            aprofundar meus conhecimentos sobre interfaces e tendências do mercado.
          </p>
        </div>

        <RouterLink to="/sobre" class="about-button">
          <span>Ver mais</span>
        </RouterLink>
      </div>

      <div class="about-photo-wrapper">
        <div class="about-photo-frame">
          <img
            src="/src/assets/img/teste.jpeg"
            alt="Foto de Guilherme Cardoso"
            class="about-photo"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-preview {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 115px 5vw 60px;
}

.about-layout {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: stretch;
  gap: clamp(28px, 5vw, 75px);
}

.about-content {
  width: 100%;
  max-width: 540px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.about-eyebrow {
  display: inline-flex;
  align-items: center;
  margin-bottom: 32px;
  color: rgba(255, 255, 255, 0.68);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
}

.about-eyebrow::before {
  content: '';
  width: 24px;
  height: 2px;
  margin-right: 12px;
  background: #83dcff;
  border-radius: 2px;
}

.about-copy {
  width: 100%;
}

.about-content p {
  margin: 0 0 24px;
  color: rgba(255, 255, 255, 0.82);
  font-size: clamp(17px, 1.45vw, 20px);
  font-weight: 400;
  line-height: 1.8;
}

.about-content p:last-child {
  margin-bottom: 0;
}

.about-content strong {
  color: #fff;
  font-weight: 600;
}

.about-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 35px;
  padding: 13px 22px;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.075);
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 10px;
  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    transform 0.25s ease;
}

.about-button:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

.about-photo-wrapper {
  width: 100%;
  min-width: 0;
  display: flex;
  align-items: stretch;
  justify-content: center;
}

.about-photo-frame {
  position: relative;
  width: 100%;
  max-width: 390px;
  min-height: 100%;
  overflow: hidden;
  border-radius: 26px;
  border: 1px solid rgba(131, 220, 255, 0.24);
  background: rgba(255, 255, 255, 0.035);
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.18),
    0 0 35px rgba(68, 160, 255, 0.07);
}

.about-photo {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 440px;
  object-fit: cover;
  object-position: center 35%;
  transition: transform 0.5s ease;
}

.about-photo-frame:hover .about-photo {
  transform: scale(1.035);
}

@media (max-width: 800px) {
  .about-preview {
    padding: 105px 6vw 55px;
  }

  .about-layout {
    grid-template-columns: minmax(0, 1fr);
    gap: 32px;
  }

  .about-content {
    max-width: 600px;
    margin: 0 auto;
  }

  .about-eyebrow {
    margin-bottom: 24px;
  }

  .about-content p {
    font-size: 17px;
    line-height: 1.75;
    margin-bottom: 18px;
  }

  .about-button {
    margin-top: 27px;
  }

  .about-photo-wrapper {
    display: none;
  }

  .about-photo-frame {
    width: min(100%, 340px);
    min-height: 0;
    aspect-ratio: 3 / 4;
  }

  .about-photo {
    min-height: 0;
    height: 100%;
  }
}

@media (max-width: 480px) {
  .about-preview {
    padding: 95px 22px 45px;
  }

  .about-layout {
    gap: 28px;
  }

  .about-content p {
    font-size: 16px;
    line-height: 1.7;
  }

  .about-eyebrow {
    font-size: 12px;
    letter-spacing: 2.5px;
    margin-bottom: 20px;
  }

  .about-button {
    padding: 12px 19px;
    font-size: 15px;
  }

  .about-photo-frame {
    width: min(100%, 290px);
    border-radius: 22px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-button,
  .about-button svg,
  .about-photo {
    transition: none;
  }
}
</style>
