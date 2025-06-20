import { Col, Image, Row } from "react-bootstrap";
import { ButtonInfo2 } from "./profile/StyledComponentsProfile";
import { useNavigate } from "react-router-dom";

export const Payments = () => {
  const navigate = useNavigate();
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <Row className="items-center">
          <Col md={5} className="mb-8 md:mb-0">
            <div className="text-center md:text-right">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-lg opacity-20"></div>
                <Image
                  src="https://res.cloudinary.com/dppqkypts/image/upload/v1701398326/paga-tu-factura-home_extraLargeThumb_spdkmn.webp"
                  rounded
                  className="relative z-10 shadow-2xl hover:scale-105 transition-transform duration-300"
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                    borderRadius: "24px",
                    border: "3px solid rgba(255, 255, 255, 0.5)",
                  }}
                />
              </div>
            </div>
          </Col>

          <Col md={7}>
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50">
              <div className="mb-8">
                <div className="inline-block p-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
                  <div className="bg-white rounded-full px-4 py-1">
                    <span className="text-blue-600 text-sm font-medium tracking-wider uppercase">
                      Métodos de pago
                    </span>
                  </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6">
                  ¿CÓMO PUEDES PAGAR?
                </h2>
              </div>

              <div className="space-y-6 mb-8">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200/50">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-500 text-white rounded-full p-2 flex-shrink-0">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Cuenta Bancolombia
                      </h4>
                      <p className="text-gray-600">
                        Cuenta Ahorros:{" "}
                        <span className="font-mono font-bold text-blue-600">
                          590-702655-53
                        </span>
                      </p>
                      <p className="text-gray-600">
                        Prolink Comunicaciones SAS
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200/50">
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-500 text-white rounded-full p-2 flex-shrink-0">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Información Fiscal
                      </h4>
                      <p className="text-gray-600">
                        NIT:{" "}
                        <span className="font-mono font-bold text-purple-600">
                          901029001-2
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">💡</div>
                  <p className="text-gray-700 leading-relaxed">
                    Si requieres asesoría o tienes dudas al momento de elegir
                    algunos de nuestros planes, no dudes en contactarnos.
                    Estamos aquí para ayudarte.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <ButtonInfo2
                  onClick={() => navigate("/contacto")}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-none"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    border: "none",
                    borderRadius: "16px",
                    padding: "1rem 2rem",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background =
                      "linear-gradient(135deg, #2563eb, #7c3aed)";
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 12px 40px rgba(59, 130, 246, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background =
                      "linear-gradient(135deg, #3b82f6, #8b5cf6)";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow =
                      "0 8px 32px rgba(59, 130, 246, 0.3)";
                  }}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span>¡Solicitar información!</span>
                  </span>
                </ButtonInfo2>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};
