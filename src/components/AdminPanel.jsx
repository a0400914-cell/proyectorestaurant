import React from 'react';

export default function AdminPanel({ reservations, tables, setTables }) {
  // Función para cambiar el estado de las mesas de forma interactiva
  const cambiarEstadoMesa = (id, nuevoEstado) => {
    setTables(tables.map(t => t.id === id ? { ...t, status: nuevoEstado } : t));
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>📊 Panel de Control y Administración</h2>
          <p className="text-muted">Gestión centralizada de reservas y control de mesas en tiempo real</p>
        </div>
        <span className="badge bg-danger fs-6 px-3 py-2">Modo Administrador</span>
      </div>

      <div className="row g-4">
        {/* Control Operativo de Mesas Sincronizado */}
        <div className="col-12 col-lg-5">
          <div className="card shadow p-4">
            <h4 className="mb-3">⚙️ Estado Operativo de Mesas</h4>
            <div className="d-flex flex-column gap-3">
              {tables.map((mesa) => (
                <div key={mesa.id} className="d-flex align-items-center justify-content-between p-3 border rounded-3 bg-white">
                  <div>
                    <strong>{mesa.id}</strong>
                    <div className="small text-muted">Capacidad: {mesa.capacity} asientos</div>
                  </div>
                  <select 
                    className="form-select form-select-sm w-auto fw-bold"
                    value={mesa.status}
                    onChange={(e) => cambiarEstadoMesa(mesa.id, e.target.value)}
                  >
                    <option value="Disponible">🟢 Disponible</option>
                    <option value="Ocupada">🔴 Ocupada</option>
                    <option value="Reservada">🟡 Reservada</option>
                    <option value="Mantenimiento">🟠 Mantenimiento</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reporte de Reservas Dinámico */}
        <div className="col-12 col-lg-7">
          <div className="card shadow p-4">
            <h4 className="mb-3">📑 Reporte de Reservas y Consumos</h4>
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Cliente</th>
                    <th>Mesa</th>
                    <th>Fecha / Hora</th>
                    <th>Consumo Previo</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center text-muted py-3">No hay reservas registradas todavía.</td>
                    </tr>
                  ) : (
                    reservations.map((r) => (
                      <tr key={r.id}>
                        <td><strong>{r.clientName}</strong></td>
                        <td><span className="badge bg-secondary">{r.tableId}</span></td>
                        <td>{r.date} {r.time}</td>
                        <td><span className="text-primary fw-bold">{r.dish || 'Lomo Saltado'}</span></td>
                        <td><span className="badge bg-success">Confirmada</span></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}