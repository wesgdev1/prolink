import { useEffect, useRef } from "react";
import "./FirstSection.css";

export const FirstSection = () => {
  const sectionRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    // Crear partículas flotantes
    const createParticles = () => {
      if (!particlesRef.current) return;

      for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.animationDelay = Math.random() * 20 + "s";
        particle.style.animationDuration = Math.random() * 3 + 2 + "s";
        particlesRef.current.appendChild(particle);
      }
    };

    createParticles();

    // Efecto parallax en scroll
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const scrollY = window.scrollY;
      const rate = scrollY * -0.5;
      sectionRef.current.style.transform = `translate3d(0, ${rate}px, 0)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="hero-section mt-10" ref={sectionRef}>
      {/* Fondo animado con gradientes */}
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="gradient-orb orb-4"></div>
      </div>

      {/* Partículas flotantes */}
      <div className="particles-container" ref={particlesRef}></div>

      {/* Grid animado de fondo */}
      <div className="grid-background"></div>

      {/* Overlay con textura */}
      <div className="hero-overlay"></div>

      {/* Contenido principal */}
      <div className="hero-content">
        <div className="hero-inner">
          {/* Badge animado */}
          <div className="hero-badge">
            <div className="badge-glow"></div>
            <span className="badge-text">
              <span className="badge-icon">⚡</span>
              Líder en Conectividad
            </span>
          </div>

          {/* Título principal con efecto de escritura */}
          <h1 className="hero-title">
            <span className="title-line-1">
              <span className="company-name">Prolink</span>
              <span className="company-suffix">Comunicaciones</span>
            </span>
            <span className="title-line-2">
              <span className="highlight-word">Internet</span>
              <span className="normal-word">de</span>
              <span className="highlight-word">Alta</span>
              <span className="highlight-word">Velocidad</span>
            </span>
          </h1>

          {/* Descripción con efecto de aparición */}
          <p className="hero-description">
            <span className="description-highlight">Fibra óptica</span> y
            <span className="description-highlight"> RadioFrecuencia</span> de
            última generación en{" "}
            <span className="location-highlight">Cúcuta</span>y su área
            metropolitana.
          </p>

          {/* Estadísticas impresionantes */}
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Clientes Satisfechos</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime Garantizado</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Soporte Técnico</div>
            </div>
          </div>

          {/* Botones de acción futuristas */}
          <div className="hero-buttons">
            <a
              className="btn-primary"
              href="https://api.whatsapp.com/send?phone=573122821189&text=Hola%2C+quiero+saber+mas+sobre+el+Internet+de+alta+de+Velocidad+de+Prolink%21"
              target="_blank"
              rel="noreferrer"
            >
              <span className="btn-bg"></span>
              <span className="btn-text">
                <svg
                  className="btn-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                Cotiza tu Plan
              </span>
            </a>

            <a
              className="btn-secondary"
              href="https://api.whatsapp.com/send?phone=573122821189&text=Hola%2C+quiero+saber+mas+sobre+el+Internet+de+alta+de+Velocidad+de+Prolink%21"
              target="_blank"
              rel="noreferrer"
            >
              <span className="btn-bg"></span>
              <span className="btn-text">
                <svg
                  className="btn-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Contáctanos
              </span>
            </a>
          </div>

          {/* Indicador de velocidad animado */}
          <div className="speed-indicator">
            <div className="speed-label">Velocidad de conexión</div>
            <div className="speed-bar">
              <div className="speed-fill"></div>
              <div className="speed-glow"></div>
            </div>
            <div className="speed-text">
              <span className="speed-number">500</span>
              <span className="speed-unit">Mbps</span>
            </div>
          </div>
        </div>
      </div>

      {/* Flecha de scroll animada */}
      <div className="scroll-indicator">
        <div className="scroll-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};
