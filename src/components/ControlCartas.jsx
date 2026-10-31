import React, { useState } from 'react';

const initialDishes = [
  { id: 1, name: 'Lomo Saltado', category: 'Especialidad', detail: 'Porción Personal', price: '38.00', image: 'https://via.placeholder.com/300x200?text=Lomo+Saltado' },
  { id: 2, name: 'Bife de Chorizo', category: 'Especialidad', detail: '350 gramos', price: '57.00', image: 'https://via.placeholder.com/300x200?text=Bife+de+Chorizo' },
  { id: 3, name: 'Ceviche Mixto', category: 'Comida Marina', detail: 'Porción Personal', price: '42.00', image: 'https://via.placeholder.com/300x200?text=Ceviche+Mixto' },
  { id: 4, name: 'Tomahawk Prime', category: 'Especialidad', detail: '800 gramos', price: '120.00', image: 'https://via.placeholder.com/300x200?text=Tomahawk+Prime' }
];

const ControlCartas = () => {
  const [dishes, setDishes] = useState(initialDishes);
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'form'
  const [editingId, setEditingId] = useState(null);

  // Estado para el formulario (Previsualización en tiempo real)
  const [formData, setFormData] = useState({
    name: '',
    category: 'Comida Marina',
    detail: '',
    price: '',
    discount: '',
    discountDetail: '',
    image: 'https://via.placeholder.com/300x200?text=Nuevo+Plato'
  });

  const handleChange = (e) => {
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
      discountDetail: '',
      image: 'https://via.placeholder.com/300x200?text=Nuevo+Plato'
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
      discountDetail: dish.discountDetail || '',
      image: dish.image
    });
    setViewMode('form');
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este platillo?')) {
      setDishes(dishes.filter(d => d.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setDishes(dishes.map(d => d.id === editingId ? { ...formData, id: editingId } : d));
    } else {
      setDishes([...dishes, { ...formData, id: Date.now() }]);
    }
    setViewMode('list');
  };

  return (
    <div className="container my-4">
      {/* Encabezado del Panel */}
      <div className="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom">
        <div className="fs-1">📊</div>
        <div>
          <h2 className="fw-bold m-0">Panel de Control y Administración</h2>
          <p className="text-muted m-0">Gestión Centralizada de reservas y control de mesas en tiempo real</p>
        </div>
      </div>

      {/* VISTA 1: LISTADO DE PLATOS */}
      {viewMode === 'list' && (
        <>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-danger btn-lg fw-bold" onClick={handleCreateNew}>
              + agregar nueva carta
            </button>
          </div>

          <div className="row g-4">
            {dishes.map((dish) => (
              <div key={dish.id} className="col-12 col-sm-6 col-md-3">
                <div className="card h-100 shadow-sm rounded-4 overflow-hidden">
                  <img src={dish.image} className="card-img-top" alt={dish.name} style={{ height: '160px', objectFit: 'cover' }} />
                  <div className="card-body">
                    <span className="badge bg-secondary mb-2">{dish.category}</span>
                    <h5 className="card-title fw-bold mb-1">{dish.name}</h5>
                    <p className="card-text text-muted small mb-2">{dish.detail}</p>
                    <p className="fw-bold fs-5 text-dark">S/ {dish.price}</p>
                  </div>
                  <div className="card-footer bg-white border-0 d-flex justify-content-around pb-3">
                    <button className="btn btn-outline-warning rounded-circle p-2" title="Editar" onClick={() => handleEdit(dish)}>
                      ✏️ Edit
                    </button>
                    <button className="btn btn-outline-danger rounded-circle p-2" title="Eliminar" onClick={() => handleDelete(dish.id)}>
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* VISTA 2: FORMULARIO CON PREVISUALIZACIÓN EN TIEMPO REAL */}
      {viewMode === 'form' && (
        <div className="row g-4 align-items-start">
          {/* Formulario Izquierda */}
          <div className="col-md-6">
            <div className="card p-4 rounded-4 shadow-sm">
              <h4 className="fw-bold mb-3">{editingId ? 'Editar Platillo' : 'Agregar Platillo'}</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Nombre del Plato*</label>
                  <input 
                    type="text" 
                    name="name" 
                    className="form-control" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    placeholder="Ej: Trío marino"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Categoría*</label>
                  <select name="category" className="form-select" value={formData.category} onChange={handleChange}>
                    <option value="Comida Marina">Comida Marina</option>
                    <option value="Especialidad">Especialidad</option>
                    <option value="Parrillas">Parrillas</option>
                    <option value="Postres">Postres</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Detalle del plato</label>
                  <textarea 
                    name="detail" 
                    className="form-control" 
                    rows="2" 
                    value={formData.detail} 
                    onChange={handleChange} 
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
                      onChange={handleChange} 
                      placeholder="50.00" 
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Aplicar Descuento (%)</label>
                    <input 
                      type="number" 
                      name="discount" 
                      className="form-control" 
                      value={formData.discount} 
                      onChange={handleChange} 
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
                src={formData.image || 'https://via.placeholder.com/400x250'} 
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
  );
};

export default ControlCartas;