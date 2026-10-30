import React, { useState } from 'react';

export default function Reservations({ user, existingReservations, onAddReservation, tables }) {
  const [selectedTable, setSelectedTable] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [dish, setDish] = useState('Lomo Saltado'); // Estado para el plato seleccionado

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTable || !date || !time) {
      alert('Por favor complete todos los campos y seleccione una mesa.');
      return;
    }

    const newReservation = {
      id: Date.now(),
      clientName: user ? user.name : 'Cliente Anónimo',
      date: date,
      time: time,
      tableId: selectedTable,
      dish: dish // Guardamos el plato elegido
    };

    onAddReservation(newReservation);
    alert(`¡Reserva confirmada con éxito para la ${selectedTable} con consumo de ${dish}!`);
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Reserva de Mesas y Consumo Previo</h2>
      
      <div className="row g-4">
        {/* Formulario de Reserva */}
        <div className="col-12 col-md-6">
          <div className="card shadow p-4">
            <h4 className="mb-3">📅 Nueva Reserva</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Cliente</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={user ? user.name : ''} 
                  disabled 
                />
              </div>

              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">Fecha</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    required 
                  />
                </div>
                <div className="col">
                  <label className="form-label">Hora</label>
                  <input 
                    type="time" 
                    className="form-control" 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              {/* NUEVO: Selector de platos de la carta */}
              <div className="mb-3">
                <label className="form-label">🍽️ Plato Destacado / Consumo previo</label>
                <select 
                  className="form-select" 
                  value={dish} 
                  onChange={(e) => setDish(e.target.value)}
                >
                  <option value="Lomo Saltado">Lomo Saltado</option>
                  <option value="Ceviche Mixto">Ceviche Mixto</option>
                  <option value="Ají de Gallina">Ají de Gallina</option>
                  <option value="Arroz con Pato">Arroz con Pato</option>
                  <option value="Causa Rellena">Causa Rellena</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Mesa Seleccionada:</label>
                <input 
                  type="text" 
                  className="form-control fw-bold text-success" 
                  value={selectedTable || 'Ninguna mesa seleccionada'} 
                  readOnly 
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-dark w-100 fw-bold"
                style={{ backgroundColor: '#4a2c2a', borderColor: '#4a2c2a' }}
              >
                Confirmar y reservar {selectedTable ? selectedTable : 'Mesa'}
              </button>
            </form>
          </div>
        </div>

        {/* Selección visual de Mesas */}
        <div className="col-12 col-md-6">
          <div className="card shadow p-4">
            <h4 className="mb-3">Seleccionar Mesa</h4>
            <p className="small text-muted">Haz clic en una mesa disponible:</p>
            <div className="d-flex flex-column gap-3">
              {tables.map((t) => (
                <div 
                  key={t.id} 
                  className={`p-3 border rounded d-flex justify-content-between align-items-center ${
                    selectedTable === t.id ? 'border-danger bg-light' : ''
                  }`}
                  style={{ cursor: t.status === 'Disponible' ? 'pointer' : 'not-allowed', opacity: t.status === 'Disponible' ? 1 : 0.6 }}
                  onClick={() => {
                    if (t.status === 'Disponible') setSelectedTable(t.id);
                  }}
                >
                  <div>
                    <strong>{t.id}</strong>
                    <div className="small text-muted">Capacidad: {t.capacity} asientos</div>
                  </div>
                  <span className={`badge ${t.status === 'Disponible' ? 'bg-success' : 'bg-danger'}`}>
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}