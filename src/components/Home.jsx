import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container py-4">
      {/* SECCIÓN 1: Bienvenida Principal */}
      <div className="row align-items-center min-vh-75 py-4">
        {/* Columna de Texto de Bienvenida */}
        <div className="col-lg-6 text-center text-lg-start mb-4 mb-lg-0">
          <span className="badge bg-dark text-warning mb-3 px-3 py-2 fs-6 border border-warning">
            ✨ Gastronomía de Alto Nivel
          </span>

          <h1 className="display-4 fw-bold mb-3">
            <span style={{ color: '#8B4513' }}>Restaurante</span> <br />
            <span className="text-danger">Sabor & Estilo</span>
          </h1>

          <p className="lead text-muted mb-4">
            Disfruta de las mejores carnes, cortes selectos y platos marinos preparados con pasión y los más altos estándares de calidad. Reserva tu mesa en segundos y vive una experiencia inolvidable.
          </p>

          <div className="d-flex gap-3 justify-content-center justify-content-lg-start mb-4">
            <Link to="/menu" className="btn btn-dark btn-lg px-4 fw-semibold shadow-sm">
              📖 Ver la Carta
            </Link>
            <Link to="/reservations" className="btn btn-outline-dark btn-lg px-4 fw-semibold shadow-sm">
              🍽️ Reservar Mesa
            </Link>
          </div>

          {/* Insignias Gourmet */}
          <div className="pt-3 border-top d-flex flex-wrap justify-content-center justify-content-lg-start gap-4 text-muted small">
            <div className="d-flex align-items-center gap-2">
              <span className="fs-5">🥩</span>
              <span><strong>Cortes Premium</strong><br />Maduración artesanal</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="fs-5">🍷</span>
              <span><strong>Cava Exclusiva</strong><br />Maridaje perfecto</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="fs-5">⭐</span>
              <span><strong>Experiencia 5★</strong><br />Atención personalizada</span>
            </div>
          </div>
        </div>

        {/* Columna con plato destacado */}
        <div className="col-lg-6 text-center">
          <div className="p-3 bg-white shadow-lg rounded-4 border">
            <img 
              src="/image/Bife de chorizo.PNG" 
              alt="Plato destacado Gourmet" 
              className="img-fluid rounded-3" 
              style={{ maxHeight: '380px', width: '100%', objectFit: 'cover' }}
            />
            <div className="mt-3 text-start px-2 d-flex justify-content-between align-items-center">
              <div>
                <h5 className="fw-bold mb-1 text-dark">Especialidad de la Casa</h5>
                <p className="text-muted small mb-0">Bife de Chorizo a la parrilla con el punto perfecto de cocción.</p>
              </div>
              <span className="badge bg-danger fs-6 px-3 py-2">Chef's Choice 👨‍🍳</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN 2: Experiencia y Ambiente Gourmet */}
      <div className="my-5 pt-4 text-center">
        <h2 className="fw-bold mb-2" style={{ color: '#8B4513' }}>
          Nuestros Ambientes & Gastronomía
        </h2>
        <p className="text-muted mb-4">
          Un espacio diseñado para hacer de cada visita un momento especial.
        </p>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm overflow-hidden h-100 rounded-4">
              <img 
                src="/image/ambiente1.jpg" 
                alt="Ambiente del Restaurante" 
                className="card-img-top"
                style={{ height: '280px', objectFit: 'cover' }}
              />
              <div className="card-body bg-dark text-white p-3 text-start">
                <h5 className="card-title fw-bold text-warning mb-1">Elegancia & Confort</h5>
                <p className="card-text small text-light mb-0">
                  Salones acogedores con iluminación cálida, ideales para cenas románticas o reuniones familiares.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card border-0 shadow-sm overflow-hidden h-100 rounded-4">
              <img 
                src="/image/alta_cocina.jpg" 
                alt="Alta Cocina Gourmet" 
                className="card-img-top"
                style={{ height: '280px', objectFit: 'cover' }}
              />
              <div className="card-body bg-dark text-white p-3 text-start">
                <h5 className="card-title fw-bold text-warning mb-1">Cocina de Autor</h5>
                <p className="card-text small text-light mb-0">
                  Platillos elaborados por chefs reconocidos utilizando ingredientes frescos de la más alta calidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}