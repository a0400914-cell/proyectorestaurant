import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin, user }) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('cliente');
  const navigate = useNavigate();

  // Redirigir si ya existe sesión activa
  useEffect(() => {
    if (user) {
      navigate(user.role === 'admin' ? '/admin' : '/reservations');
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    const loggedUser = {
      name: email.split('@')[0],
      email: email,
      role: role
    };

    onLogin(loggedUser);
    navigate(role === 'admin' ? '/admin' : '/reservations');
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url('/image/ambiente1.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        marginTop: '-1.5rem', // Ajusta para cubrir los márgenes por defecto
        padding: '2rem 1rem'
      }}
    >
      <div 
        className="card p-4 shadow-lg border-0 rounded-4" 
        style={{ 
          maxWidth: '420px', 
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.95)', // Fondo blanco ligeramente transparente
          backdropFilter: 'blur(10px)'
        }}
      >
        <div className="text-center mb-3">
          <span className="fs-1">🍽️</span>
          <h3 className="fw-bold mt-2 mb-1" style={{ color: '#8B4513' }}>
            Bienvenido
          </h3>
          <p className="text-muted small">Ingresa tu cuenta para gestionar tus reservas</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-dark small fw-semibold">
              Correo Electrónico
            </label>
            <input 
              type="email" 
              className="form-control form-control-lg fs-6" 
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-dark small fw-semibold">
              Tipo de Usuario
            </label>
            <select 
              className="form-select form-select-lg fs-6" 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="cliente">Cliente</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <button type="submit" className="btn btn-warning w-100 fw-bold py-2 shadow-sm fs-6">
            Ingresar al Sistema
          </button>
        </form>
      </div>
    </div>
  );
}