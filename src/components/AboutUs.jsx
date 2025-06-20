import { ParrafoStyled } from "./StyledComponents";
import "./AboutUs.css";

export const AboutUs = () => {
  return (
    <section className="about-section">
      {/* Transición suave desde la sección anterior */}
      <div className="section-transition">
        <div className="transition-gradient"></div>
        <div className="transition-pattern"></div>
      </div>

      {/* Contenido principal */}
      <div className="about-content">
        {/* Elementos decorativos de fondo */}
        <div className="decorative-orbs">
          <div className="orb orb-blue"></div>
          <div className="orb orb-purple"></div>
          <div className="orb orb-pink"></div>
          <div className="orb orb-cyan"></div>
        </div>

        <div className="content-container">
          <div className="about-header">
            {/* Badge de sección */}
            <div className="section-badge">
              <div className="badge-glow"></div>
              <span className="badge-text">
                <span className="badge-icon">🏢</span>
                Nuestra Historia
              </span>
            </div>

            <h2 className="about-title">
              <span className="title-main">¿QUIÉNES</span>
              <span className="title-accent">SOMOS?</span>
            </h2>

            <div className="title-underline">
              <div className="underline-gradient"></div>
              <div className="underline-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>

          {/* Tarjeta de contenido mejorada */}
          <div className="content-card">
            <div className="card-glow"></div>
            <div className="card-background"></div>

            <ParrafoStyled className="about-text">
              <div className="text-highlight-container">
                <strong className="company-highlight">ProLink</strong>
                <div className="highlight-underline"></div>
              </div>{" "}
              es una empresa líder en el sector de las telecomunicaciones,
              dedicada a proporcionar servicios de internet y fibra óptica de
              vanguardia. Nos enorgullece ser pioneros en la entrega de
              soluciones tecnológicas innovadoras que conectan comunidades,
              negocios y hogares, creando un puente hacia un futuro digital más
              rápido y eficiente.
              <div className="text-section">
                <div className="section-icon">🎯</div>
                <div className="section-content">
                  Nuestro <span className="keyword objective">objetivo</span> es
                  ofrecer un servicio de calidad, con la mejor tecnología y la
                  mejor atención al cliente, para que nuestros usuarios puedan
                  disfrutar de una experiencia única.
                </div>
              </div>
              <div className="text-section">
                <div className="section-icon">🚀</div>
                <div className="section-content">
                  Nuestra <span className="keyword mission">misión</span> es
                  brindar un servicio de internet de alta velocidad, confiable y
                  de calidad, para que nuestros clientes puedan disfrutar de una
                  experiencia única.
                </div>
              </div>
              <div className="text-section">
                <div className="section-icon">👁️</div>
                <div className="section-content">
                  Nuestra <span className="keyword vision">visión</span> es ser
                  la empresa líder en el sector de las telecomunicaciones,
                  ofreciendo servicios de internet y fibra óptica de vanguardia.
                </div>
              </div>
            </ParrafoStyled>

            {/* Elementos interactivos */}
            <div className="card-features">
              <div className="feature-item">
                <div className="feature-icon">💡</div>
                <span>Innovación</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <span>Velocidad</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🛡️</div>
                <span>Confiabilidad</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🤝</div>
                <span>Compromiso</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
