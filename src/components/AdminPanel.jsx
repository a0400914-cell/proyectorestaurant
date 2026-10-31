import React, { useState } from 'react';

// Platos iniciales enlazados a tus fotos locales dentro de public/image
const initialDishes = [
  { id: 1, name: 'Lomo Saltado', category: 'Especialidad', detail: 'Porción Personal', price: '38.00', image: '/image/Lomo saltado.PNG' },
  { id: 2, name: 'Bife de Chorizo', category: 'Especialidad', detail: '350 gramos', price: '57.00', image: '/image/Bife de chorizo.PNG' },
  { id: 3, name: 'Ceviche Mixto', category: 'Comida Marina', detail: 'Porción Personal', price: '42.00', image: '/image/Ceviche mixto.PNG' },
  { id: 4, name: 'Tomahawk Prime', category: 'Especialidad', detail: '800 gramos', price: '120.00', image: '/image/Tomahawk prime.PNG' }
];

export default function AdminPanel({ tables, onUpdateTableStatus, reservations }) {
  // Estado para alternar entre pestañas del panel administrativo
  const [activeTab, setActiveTab] = useState('tables'); // 'tables' | 'dishes'

  // Estados para el CRUD y previsualización de platos
  const [dishes, setDishes] = useState(initialDishes);
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'form'
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Comida Marina',
    detail: '',
    price: '',
    discount: '',
    image: '/image/Lomo saltado.PNG'
  });

  const handleDishChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateNew = () => {
    setEditingId(null);
    setFormData({
      name: '',
      category: 'Comida Marina',
      detail: '',
      price: '',
      discount: '',
      image: '/image/Lomo saltado.PNG'
    });
    setViewMode('form');
  };

  const handleEdit = (dish) => {
    setEditingId(dish.id);
    setFormData({
      name: dish.name,
      category: dish.category,
      detail: dish.detail,
      price: dish.price,
      discount: dish.discount || '',
      image: dish.image
    });
    setViewMode('form');
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este platillo?')) {
      setDishes(dishes.filter(d => d.id !== id));
    }
  };

  const handleDishSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setDishes(dishes.map(d => d.id === editingId ? { ...formData, id: editingId } : d));
    } else {
      setDishes([...dishes, { ...formData, id: Date.now() }]);
    }
    setViewMode('list');
  };

  return (
    <div className="container py-4">
      {/* Cabecera del Panel de Administración */}
      <div className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom">
        <div className="d-flex align-items-center gap-3">
          <div className="fs-1">📊</div>
          <div>
            <h2 className="fw-bold m-0">Panel de Control y Administración</h2>
            <p className="text-muted m-0">Gestión centralizada de reservas, mesas y control de cartas en tiempo real</p>
          </div>
        </div>
        
        {/* Pestañas de navegación interna del Admin */}
        <div className="btn-group shadow-sm" role="group">
          <button 
            type="button" 
            className={`btn ${activeTab === 'tables' ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => setActiveTab('tables')}
          >
            🪑 Control de Mesas
          </button>
          <button 
            type="button" 
            className={`btn ${activeTab === 'dishes' ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => { setActiveTab('dishes'); setViewMode('list'); }}
          >
            📜 Control de Cartas
          </button>
        </div>
      </div>

      {/* VISTA 1: CONTROL DE MESAS Y RESERVAS */}
      {activeTab === 'tables' && (
        <div className="row g-4">
          <div className="col-12 col-lg-5">
            <div className="card shadow p-4 rounded-4">
              <h4 className="mb-3">⚙️ Estado Operativo de Mesas</h4>
              <div className="d-flex flex-column gap-3">
                {tables.map((t) => (
                  <div key={t.id} className="p-3 border rounded-3 d-flex justify-content-between align-items-center bg-white shadow-sm">
                    <div>
                      <strong>{t.id}</strong>
                      <div className="small text-muted">Capacidad: {t.capacity} asientos</div>
                    </div>
                    <select 
                      className="form-select form-select-sm w-auto fw-bold"
                      value={t.status}
                      onChange={(e) => onUpdateTableStatus(t.id, e.target.value)}
                    >
                      <option value="Disponible">🟢 Disponible</option>
                      <option value="Ocupada">🔴 Ocupada</option>
                      <option value="Mantenimiento">🟠 Mantenimiento</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-7">
            <div className="card shadow p-4 rounded-4">
              <h4 className="mb-3">📋 Informe de Reservas y Consumos</h4>
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Cliente</th>
                      <th>Mesa</th>
                      <th>Fecha / Hora</th>
                      <th>Consumo Previo</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations && reservations.length > 0 ? (
                      reservations.map((res) => (
                        <tr key={res.id}>
                          <td className="fw-bold">{res.clientName}</td>
                          <td><span className="badge bg-secondary">{res.tableId}</span></td>
                          <td>{res.date} {res.time}</td>
                          <td className="text-primary fw-semibold">{res.dish}</td>
                          <td><span className="badge bg-success">Confirmada</span></td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center text-muted py-3">No hay reservas registradas aún.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VISTA 2: CONTROL DE CARTAS / PLATOS CON CRUD Y PREVISUALIZACIÓN EN VIVO */}
      {activeTab === 'dishes' && (
        <div>
          {viewMode === 'list' && (
            <>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold m-0">Gestión de Platillos y Menú</h4>
                <button className="btn btn-danger fw-bold px-4 py-2" onClick={handleCreateNew}>
                  + Agregar nueva carta
                </button>
              </div>

              <div className="row g-4">
                {dishes.map((dish) => (
                  <div key={dish.id} className="col-12 col-sm-6 col-md-3">
                    <div className="card h-100 shadow-sm rounded-4 overflow-hidden border-0">
                      <img src={dish.image} className="card-img-top" alt={dish.name} style={{ height: '160px', objectFit: 'cover' }} />
                      <div className="card-body">
                        <span className="badge bg-secondary mb-2">{dish.category}</span>
                        <h5 className="card-title fw-bold mb-1">{dish.name}</h5>
                        <p className="card-text text-muted small mb-2">{dish.detail}</p>
                        <p className="fw-bold fs-5 text-dark mb-0">S/ {dish.price}</p>
                      </div>
                      <div className="card-footer bg-white border-0 d-flex justify-content-around pb-3">
                        <button className="btn btn-outline-warning rounded-pill px-3 fw-bold" onClick={() => handleEdit(dish)}>
                          ✏️ Edit
                        </button>
                        <button className="btn btn-outline-danger rounded-pill px-3 fw-bold" onClick={() => handleDelete(dish.id)}>
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {viewMode === 'form' && (
            <div className="row g-4 align-items-start">
              {/* Formulario Izquierda */}
              <div className="col-md-6">
                <div className="card p-4 rounded-4 shadow-sm border-0">
                  <h4 className="fw-bold mb-3">{editingId ? 'Editar Platillo' : 'Agregar Nuevo Platillo'}</h4>
                  <form onSubmit={handleDishSubmit}>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Nombre del Plato*</label>
                      <input 
                        type="text" 
                        name="name" 
                        className="form-control" 
                        value={formData.name} 
                        onChange={handleDishChange} 
                        required 
                        placeholder="Ej: Trío marino"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Categoría*</label>
                      <select name="category" className="form-select" value={formData.category} onChange={handleDishChange}>
                        <option value="Comida Marina">Comida Marina</option>
                        <option value="Especialidad">Especialidad</option>
                        <option value="Parrillas">Parrillas</option>
                        <option value="Postres">Postres</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Ruta de Imagen (URL o local)*</label>
                      <input 
                        type="text" 
                        name="image" 
                        className="form-control" 
                        value={formData.image} 
                        onChange={handleDishChange} 
                        placeholder="Ej: /image/Lomo saltado.PNG"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Detalle del plato</label>
                      <textarea 
                        name="detail" 
                        className="form-control" 
                        rows="2" 
                        value={formData.detail} 
                        onChange={handleDishChange} 
                        placeholder="Ceviche clásico, Arroz con mariscos..."
                      />
                    </div>

                    <div className="row g-2 mb-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Precio (S/)</label>
                        <input 
                          type="number" 
                          step="0.01" 
                          name="price" 
                          className="form-control" 
                          value={formData.price} 
                          onChange={handleDishChange} 
                          placeholder="50.00" 
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Descuento (%)</label>
                        <input 
                          type="number" 
                          name="discount" 
                          className="form-control" 
                          value={formData.discount} 
                          onChange={handleDishChange} 
                          placeholder="10"
                        />
                      </div>
                    </div>

                    <div className="d-flex gap-2 mt-4">
                      <button type="submit" className="btn btn-warning fw-bold text-white flex-grow-1" style={{ backgroundColor: '#6b4403' }}>
                        Confirmar y Agregar
                      </button>
                      <button type="button" className="btn btn-outline-secondary" onClick={() => setViewMode('list')}>
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Previsualización en Vivo (Derecha) */}
              <div className="col-md-6">
                <h5 className="fw-bold text-muted mb-3 text-center">Previsualización en tiempo real</h5>
                <div className="card shadow border-0 rounded-4 overflow-hidden mx-auto" style={{ maxWidth: '400px' }}>
                  <img 
                    src={formData.image || '/image/Lomo saltado.PNG'} 
                    alt="Previsualización" 
                    className="card-img-top"
                    style={{ height: '220px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <span className="badge bg-secondary mb-2">{formData.category || 'Categoría'}</span>
                    <h3 className="card-title fw-bold text-dark">{formData.name || 'Nombre del plato'}</h3>
                    <p className="card-text text-muted small">{formData.detail || 'Descripción breve del plato...'}</p>
                    <h4 className="fw-bold text-dark mt-3">S/ {formData.price || '0.00'}</h4>
                    {formData.discount && (
                      <span className="badge bg-danger">-{formData.discount}% Dcto</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}