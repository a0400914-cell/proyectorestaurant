import React, { useState } from 'react';

const PaymentSection = ({ onBack }) => {
  const [selectedMethod, setSelectedMethod] = useState('Yape');

  // Datos mock para los métodos de pago
  const paymentMethods = [
    { id: 'Yape', name: 'Yape', color: '#700286', qr: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=YAPE_SABOR_Y_ESTILO' },
    { id: 'Plin', name: 'Plin', color: '#00c3de', qr: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=PLIN_SABOR_Y_ESTILO' },
    { id: 'Paypal', name: 'Paypal', color: '#003087', qr: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=PAYPAL_SABOR_Y_ESTILO' }
  ];

  const currentMethod = paymentMethods.find(m => m.id === selectedMethod);

  return (
    <div className="container my-4">
      <h2 className="text-center fw-bold mb-4" style={{ color: '#8B4513' }}>MÉTODO DE PAGO</h2>
      
      <div className="card mx-auto shadow-sm p-4 rounded-4" style={{ maxWidth: '800px', backgroundColor: '#fcfcfc' }}>
        <h3 className="text-center fw-bold mb-1">SABOR Y ESTILO</h3>
        <p className="text-center text-muted mb-4">Pago para realizar la reserva</p>

        <div className="row align-items-center">
          {/* Opciones de pago (Izquierda) */}
          <div className="col-md-5 d-flex flex-column gap-3 mb-4 mb-md-0">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`btn btn-outline-secondary d-flex align-items-center gap-3 p-3 rounded-pill text-start fw-bold fs-5 ${
                  selectedMethod === method.id ? 'active border-2 border-dark shadow-sm' : ''
                }`}
                style={{
                  backgroundColor: selectedMethod === method.id ? '#e9ecef' : '#fff',
                  color: '#000'
                }}
              >
                <span 
                  className="badge rounded-circle p-2 text-white" 
                  style={{ backgroundColor: method.color, width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}
                >
                  {method.name[0]}
                </span>
                {method.name}
              </button>
            ))}
          </div>

          {/* Área de QR y Monto (Derecha) */}
          <div className="col-md-7 text-center">
            <div className="p-3 bg-white d-inline-block rounded-3 border shadow-sm mb-3">
              <img 
                src={currentMethod.qr} 
                alt={`QR ${currentMethod.name}`} 
                className="img-fluid"
                style={{ width: '180px', height: '180px' }}
              />
            </div>
            
            <h1 className="fw-bold mb-1" style={{ fontSize: '2.5rem' }}>S/ 10.00</h1>
            <p className="text-muted small mb-4">El pago realizado se restará de su consumo final</p>

            <button 
              onClick={onBack}
              className="btn btn-warning w-100 fw-bold py-2 text-white rounded-3"
              style={{ backgroundColor: '#6b4403', borderColor: '#6b4403' }}
            >
              Volver a la reserva de mesas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;

