import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaHeartbeat, FaUserMd, FaHospital } from "react-icons/fa";
import Footer from "../components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="margin-login-register">
        {/* Header with banner image */}
        <header className="text-center mb-5 header-banner">
          {/* <img
            src="https://source.unsplash.com/1600x900/?healthcare"
            alt="Policlínico San Antonio"
            className="header-image"
          /> */}
          <h1 className="display-4">Policlínico San Antonio</h1>
          <p className="lead">Brindando cuidado de salud de calidad</p>
        </header>

        <div className="container flex-grow-1">
          {/* Main Content */}
          <main>
            <section className="row text-center">
              <div className="col-md-4 mb-4">
                <div className="card service-card">
                  <div className="card-body">
                    <FaHeartbeat className="icon mb-3" />
                    <h2 className="card-title">Servicios Médicos</h2>
                    <p className="card-text">
                      Consulta general, exámenes y más.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card service-card">
                  <div className="card-body">
                    <FaUserMd className="icon mb-3" />
                    <h2 className="card-title">Especialistas</h2>
                    <p className="card-text">
                      Accede a médicos especialistas en diversas áreas.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card service-card">
                  <div className="card-body">
                    <FaHospital className="icon mb-3" />
                    <h2 className="card-title">Atención de Emergencias</h2>
                    <p className="card-text">
                      Atención inmediata para emergencias.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials Section */}
            {/* <section className="testimonials text-center mt-5">
              <h2 className="display-4">Lo que dicen nuestros pacientes</h2>
              <div className="row">
                <div className="col-md-4 mb-4">
                  <div className="testimonial-card">
                    <p>
                      "El mejor servicio médico que he recibido. Los doctores
                      son muy atentos."
                    </p>
                    <cite>- Juan Pérez</cite>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="testimonial-card">
                    <p>
                      "Excelente atención en emergencias. Recomiendo totalmente
                      el policlínico."
                    </p>
                    <cite>- María López</cite>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="testimonial-card">
                    <p>
                      "Servicios médicos de alta calidad y personal muy
                      profesional."
                    </p>
                    <cite>- Pedro Fernández</cite>
                  </div>
                </div>
              </div>
            </section> */}

            {/* Call to Action and News Sections */}
            {/* <section className="row mt-5">
              <div className="col-md-6 mb-4">
                <div className="news">
                  <h2 className="display-4">Últimas Noticias</h2>
                  <div className="row">
                    <div className="col-md-12 mb-4">
                      <div className="news-card">
                        <h3 className="news-title">Nueva unidad de atención</h3>
                        <p className="news-summary">
                          Inauguramos una nueva unidad para mejorar la atención de
                          emergencias.
                        </p>
                        <a href="/news/unit" className="btn btn-link">
                          Leer más
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="cta text-center">
                  <h2 className="display-4">¿Necesitas una cita?</h2>
                  <p className="lead">
                    Contáctanos hoy mismo para agendar tu consulta.
                  </p>
                  <a href="/contact" className="btn btn-primary">
                    Agendar Cita
                  </a>
                </div>
              </div>
            </section> */}

            {/* Carousel Section */}
            <section className="carousel mt-5">
              <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src="https://static.wixstatic.com/media/7869d1_268f38d3905e496587cb7de41a74ad11~mv2.jpg/v1/fill/w_640,h_374,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/7869d1_268f38d3905e496587cb7de41a74ad11~mv2.jpg"
                      className="d-block w-100"
                      alt="Consulta médica"
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <h5>Consulta Médica</h5>
                      <p>Consulta con médicos generales y especialistas.</p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://ceso.cl/wp-content/uploads/2024/02/WhatsApp-Image-2023-12-19-at-13.51.33-1024x684.jpeg"
                      className="d-block w-100"
                      alt="Exámenes médicos"
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <h5>Exámenes Médicos</h5>
                      <p>Realiza tus exámenes con tecnología de punta.</p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://d2lcsjo4hzzyvz.cloudfront.net/blog/wp-content/uploads/2021/08/26182000/Urgencias.jpg"
                      className="d-block w-100"
                      alt="Atención de Emergencias"
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <h5>Atención de Emergencias</h5>
                      <p>Respuesta inmediata y eficaz en situaciones críticas.</p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://www.emagister.com/blog/wp-content/uploads/2020/10/diagnostico-por-imagen-1-rayos-x.jpg"
                      className="d-block w-100"
                      alt="Diagnóstico por Imágenes"
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <h5>Diagnóstico por Imágenes</h5>
                      <p>Tecnología avanzada para un diagnóstico preciso.</p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://adars.org.do/wp-content/uploads/2024/02/La-Importancia-de-la-Atencion-Primaria-en-Salud-APS-scaled.jpg"
                      className="d-block w-100"
                      alt="Atención Primaria"
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <h5>Atención Primaria</h5>
                      <p>Cuidado integral desde el primer contacto.</p>
                    </div>
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </section>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
