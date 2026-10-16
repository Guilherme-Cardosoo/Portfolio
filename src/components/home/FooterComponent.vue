<template>
  <footer class="portfolio-footer">
    <p class="footer-phrase">
      Entre linhas de código e pixels, também existe arte.
    </p>

    <p class="footer-copyright">
      © {{ new Date().getFullYear() }} · Guilherme Cardoso
    </p>
  </footer>
</template>

<style scoped>
.portfolio-footer {
  position: relative;
  width: 100%;
  padding: 28px 7vw 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-sizing: border-box;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-phrase {
  margin: 0;
  color: rgba(235, 244, 255, 0.78);
  font-size: 0.9rem;
  line-height: 1.6;
  letter-spacing: 0.01em;
}

.footer-copyright {
  margin: 0;
  color: rgba(235, 244, 255, 0.45);
  font-size: 0.78rem;
  line-height: 1.5;
}

@media (max-width: 620px) {
  .portfolio-footer {
    padding: 24px 7vw 28px;
    gap: 8px;
  }

  .footer-phrase {
    max-width: 320px;
    font-size: 0.82rem;
  }

  .footer-copyright {
    font-size: 0.74rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .portfolio-footer {
    scroll-behavior: auto;
  }
}
</style>
```