import { Service } from "./Service";

export const ServicesRadio = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Fondo con overlay mejorado */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("https://res.cloudinary.com/dppqkypts/image/upload/v1701964129/Dise%C3%B1o_sin_t%C3%ADtulo_14_j0uubt.png")`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-purple-900/80 to-blue-900/85 backdrop-blur-sm" />

      {/* Elementos decorativos */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
      <div
        className="absolute top-40 right-20 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-20 left-1/4 w-24 h-24 bg-purple-400/20 rounded-full blur-xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Título mejorado */}
        <div className="text-center mb-16">
          <div className="inline-block p-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6">
            <div className="bg-gray-900 rounded-full px-6 py-2">
              <span className="text-white text-sm font-medium tracking-wider uppercase">
                Conectividad Avanzada
              </span>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            SERVICIOS POR
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              RADIOFRECUENCIA
            </span>
          </h2>

          <p className="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed">
            Tecnología inalámbrica de última generación para llevar internet de
            alta velocidad a todos los rincones de tu hogar o negocio.
          </p>
        </div>

        {/* Grid de servicios mejorado */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          <div className="transform hover:scale-105 transition-all duration-300">
            <Service
              img={
                "https://res.cloudinary.com/dppqkypts/image/upload/v1740339025/imagesBlog/pro3_goruf6.png"
              }
              title={"Plan 5 Megas"}
              description={"Ideal para conectar entre 1 a 3 dispositivos"}
              price={"$ 49.800"}
              priceNormal={"$55.000"}
            />
          </div>

          <div
            className="transform hover:scale-105 transition-all duration-300"
            style={{ animationDelay: "0.1s" }}
          >
            <Service
              img={
                "https://res.cloudinary.com/dppqkypts/image/upload/v1740339180/imagesBlog/pro4_topjhl.png"
              }
              title={"Plan 8 Megas"}
              description={"Ideal para conectar entre 3 a 5 dispositivos"}
              price={"$78.900"}
              priceNormal={"$100.000"}
            />
          </div>

          <div
            className="transform hover:scale-105 transition-all duration-300"
            style={{ animationDelay: "0.2s" }}
          >
            <Service
              img={
                "https://res.cloudinary.com/dppqkypts/image/upload/v1740339026/imagesBlog/pro1_ylwc20.png"
              }
              title={"Plan 10 Megas"}
              description={"Ideal para conectar entre 5 a 7 dispositivos"}
              price={"$ 98.200"}
              priceNormal={"$120.000"}
            />
          </div>
        </div>

        {/* Ventajas adicionales */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl mb-3">📡</div>
              <h4 className="text-white font-semibold mb-2">
                Cobertura Amplia
              </h4>
              <p className="text-blue-100 text-sm">
                Sin limitaciones de cableado
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="text-white font-semibold mb-2">
                Instalación Rápida
              </h4>
              <p className="text-blue-100 text-sm">
                Servicio activo en 24 horas
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl mb-3">🛡️</div>
              <h4 className="text-white font-semibold mb-2">
                Conexión Estable
              </h4>
              <p className="text-blue-100 text-sm">99.9% de disponibilidad</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
