import { Service } from "./Service";

export const Services = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Fondo con overlay mejorado */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("https://res.cloudinary.com/dppqkypts/image/upload/v1701964129/Dise%C3%B1o_sin_t%C3%ADtulo_14_j0uubt.png")`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/85 via-blue-900/80 to-purple-900/85 backdrop-blur-sm" />

      {/* Elementos decorativos */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
      <div
        className="absolute top-40 left-20 w-32 h-32 bg-green-400/20 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-20 right-1/4 w-24 h-24 bg-blue-400/20 rounded-full blur-xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Título mejorado */}
        <div className="text-center mb-16">
          <div className="inline-block p-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-6">
            <div className="bg-gray-900 rounded-full px-6 py-2">
              <span className="text-white text-sm font-medium tracking-wider uppercase">
                Tecnología Premium
              </span>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            SERVICIOS DE
            <span className="block bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              FIBRA ÓPTICA
            </span>
          </h2>

          <p className="text-green-100 text-lg max-w-2xl mx-auto leading-relaxed">
            La velocidad más rápida y confiable del mercado. Experimenta
            internet sin límites con nuestra infraestructura de fibra óptica de
            última generación.
          </p>
        </div>

        {/* Grid de servicios mejorado */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          <div className="transform hover:scale-105 transition-all duration-300">
            <Service
              img={
                "https://res.cloudinary.com/dppqkypts/image/upload/v1701294367/Blue_and_Yellow_Modern_Internet_Services_Provider_Promotion_Instagram_Post_dwakut.png"
              }
              title={"Plan Familia"}
              description={"Hasta 500 megas de internet"}
              price={"$ 79.900"}
              priceNormal={"$150.000"}
            />
          </div>

          <div
            className="transform hover:scale-105 transition-all duration-300"
            style={{ animationDelay: "0.1s" }}
          >
            <Service
              img={
                "https://res.cloudinary.com/dppqkypts/image/upload/v1701963754/Copia_de_Blue_and_Yellow_Modern_Internet_Services_Provider_Promotion_Instagram_Post_2_e9htbp.png"
              }
              title={"Plan Profesional"}
              description={"Hasta 300 megas de internet"}
              price={"$ 69.900"}
              priceNormal={"$140.000"}
            />
          </div>

          <div
            className="transform hover:scale-105 transition-all duration-300"
            style={{ animationDelay: "0.2s" }}
          >
            <Service
              img={
                "https://res.cloudinary.com/dppqkypts/image/upload/v1701963747/Copia_de_Blue_and_Yellow_Modern_Internet_Services_Provider_Promotion_Instagram_Post_1_dj9wft.png"
              }
              title={"Plan Hogar"}
              description={"Hasta 100 megas de internet"}
              price={"$ 55.900"}
              priceNormal={"$80.000"}
            />
          </div>
        </div>

        {/* Ventajas adicionales */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl mb-3">🚀</div>
              <h4 className="text-white font-semibold mb-2">Súper Velocidad</h4>
              <p className="text-green-100 text-sm">
                Hasta 500 Mbps simétricos
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl mb-3">💎</div>
              <h4 className="text-white font-semibold mb-2">Calidad Premium</h4>
              <p className="text-green-100 text-sm">
                Sin cortes ni interrupciones
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl mb-3">🔧</div>
              <h4 className="text-white font-semibold mb-2">Soporte 24/7</h4>
              <p className="text-green-100 text-sm">
                Atención técnica especializada
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
