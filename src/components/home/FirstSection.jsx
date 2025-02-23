export const FirstSection = () => {
  return (
    <section className="bg-gray-900 text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Prolink Comunicaciones
            <span className="sm:block"> Internet de alta velocidad</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Ofrecemos servicios de internet por fibra óptica y por
            RadioFrecuencia en la ciudad de Cúcuta y su área metropolitana.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded-sm border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:ring-3 focus:outline-hidden sm:w-auto"
              href="https://api.whatsapp.com/send?phone=573122821189&text=Hola%2C+quiero+saber+mas+sobre+el+Internet+de+alta+de+Velocidad+de+Prolink%21"
              target="_blank"
              rel="noreferrer"
            >
              Cotiza tu plan
            </a>

            <a
              className="block w-full rounded-sm border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:ring-3 focus:outline-hidden sm:w-auto"
              href="https://api.whatsapp.com/send?phone=573122821189&text=Hola%2C+quiero+saber+mas+sobre+el+Internet+de+alta+de+Velocidad+de+Prolink%21"
              target="_blank"
              rel="noreferrer"
            >
              Envianos un mensaje
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
