import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Menu from './components/Menu';
import Reservations from './components/Reservations';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([
    { id: 1, clientName: 'Juan Pérez', date: '2026-10-25', time: '13:00', tableId: 'Mesa 2', dish: 'Lomo Saltado' }
  ]);
  const [tables, setTables] = useState([
    { id: 'Mesa 1', capacity: 4, status: 'Disponible' },
    { id: 'Mesa 2', capacity: 2, status: 'Ocupada' },
    { id: 'Mesa 3', capacity: 6, status: 'Disponible' },
    { id: 'Mesa 4', capacity: 4, status: 'Mantenimiento' },
  ]);

  const handleLogout = () => setUser(null);

  return (
    <Router>
      <div className="min-vh-100 bg-light d-flex flex-column">
        {/* Barra de Navegación */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm">
          <div className="container">
            <Link className="navbar-brand fw-bold text-warning" to="/">🍽️ Sabor & Estilo</Link>
            <div className="collapse navbar-collapse show" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/menu">Carta</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/reservations">Reservar Mesa</Link></li>
                {user && user.role === 'admin' && (
                  <li className="nav-item"><Link className="nav-link text-info" to="/admin">Panel Admin</Link></li>
                )}
              </ul>
              <div>
                {user ? (
                  <div className="d-flex align-items-center gap-3">
                    <span className="text-white">Bienvenido, <strong>{user.name}</strong> ({user.role})</span>
                    <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">Cerrar Sesión</button>
                  </div>
                ) : (
                  <Link to="/login" className="btn btn-warning btn-sm">Iniciar Sesión</Link>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Contenido Principal y Rutas */}
        <div className="container my-4 flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/login" element={<Login onLogin={setUser} user={user} />} />
            
            {/* Ruta de Reservas sincronizada */}
            <Route 
              path="/reservations" 
              element={
                user ? (
                  <Reservations 
                    user={user} 
                    existingReservations={reservations} 
                    onAddReservation={(newRes) => {
                      setReservations([...reservations, newRes]);
                      setTables(tables.map(t => t.id === newRes.tableId ? { ...t, status: 'Reservada' } : t));
                    }}
                    tables={tables}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />

            {/* Ruta del Panel de Administración */}
            <Route 
              path="/admin" 
              element={
                user && user.role === 'admin' ? (
                  <AdminPanel 
                  reservations={reservations} 
                  tables={tables} 
                  setTables={setTables} 
                  onUpdateTableStatus={(idMesa, nuevoEstado) => {
                  setTables(tables.map(t => t.id === idMesa ? { ...t, status: nuevoEstado } : t));
                  }}
                 />
                 
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
          </Routes>
        </div>

        {/* Pie de Página (Footer) integrado correctamente */}
        <footer className="bg-dark text-white text-center py-4 mt-auto border-top border-secondary">
          <div className="container">
            <p className="mb-1 fw-bold text-warning">Restaurante Sabor & Estilo</p>
            <p className="text-muted small mb-2">
              Disfruta de la alta cocina, cortes selectos y momentos inolvidables.
            </p>
            <p className="text-secondary small mb-0">
              &copy; 2026 Sabor & Estilo. Todos los derechos reservados. | Desarrollado para IDAT.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}