import React from 'react';

export default function Menu() {
  const platos = [
    { id: 1, nombre: 'Bife de Chorizo', categoria: 'Especialidad', peso: '350 Gramos', precio: 'S/ 57.00', img: '/image/Bife de chorizo.PNG' },
    { id: 2, nombre: 'Lomo Saltado', categoria: 'Plato de Fondo', peso: 'Porción Personal', precio: 'S/ 38.00', img: '/image/Lomo saltado.PNG' },
    { id: 3, nombre: 'Ceviche Mixto', categoria: 'Mariscos', peso: 'Porción Personal', precio: 'S/ 42.00', img: '/image/Ceviche mixto.PNG' },
    { id: 4, nombre: 'Tomahawk Prime', categoria: 'Especialidad', peso: '800 Gramos', precio: 'S/ 120.00', img: '/image/Tomahawk prime.PNG' },
  ];

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="display-6 fw-bold">Nuestra Carta y Especialidades</h2>
        <p className="text-muted">Sabor & Estilo — Gastronomía de Alto Nivel</p>
      </div>

      <div className="row g-4">
        {platos.map((plato) => (
          <div key={plato.id} className="col-12 col-md-6 col-lg-3">
            <div className="card shadow-sm h-100 overflow-hidden border-0">
              <div style={{ height: '180px', overflow: 'hidden' }}>
                <img 
                  src={plato.img} 
                  alt={plato.nombre} 
                  className="w-100 h-100" 
                  style={{ objectFit: 'cover' }} 
                />
              </div>
              <div className="card-body p-3">
                <span className="badge bg-secondary mb-2">{plato.categoria}</span>
                <h5 className="card-title mb-1 fw-bold">{plato.nombre}</h5>
                <p className="small text-muted mb-2">{plato.peso}</p>
                <div className="fw-bold fs-5 text-dark">{plato.precio}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}