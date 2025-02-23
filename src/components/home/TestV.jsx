import React from "react";

export const TestV = () => {
  return (
    <section className="relative bg-[url(https://res.cloudinary.com/dppqkypts/image/upload/v1740340462/imagesBlog/iStock-1472198351-2048x1152_woimhf.jpg)] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
            Verifica la velocidad de tu internet con{" "}
            <strong className="block font-extrabold text-white">
              {" "}
              SpeedTest
            </strong>
          </h1>

          <p className="mt-4 max-w-lg text-white sm:text-xl/relaxed">
            recuerda hacer el test estando cerca del router y sin interferencias
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <a
              href="https://www.speedtest.net/es"
              className="block w-full rounded-sm bg-gradient-to-r from-green-300 via-blue-500 to-purple-600px-12 py-3 text-sm font-medium text-white shadow-sm hover: focus:ring-3 focus:outline-hidden sm:w-auto"
            >
              Realizar Test de Velocidad
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
