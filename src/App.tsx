import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [ofertas, setOfertas] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const arsText =  "Dólar Oficial + IVA 21%: 1.445,95 ARS" 
  const ars = 1445.95

  useEffect(() => {
    setLoading(true)
    fetch(`https://radarzotep3.onrender.com/ofertasp3?page=${page}`)
      .then(response => response.json())
      .then(data => {
        setOfertas(data)
        setLoading(false)
        console.log(data)
      })
      .catch(error => {
        console.error('Error fetching ofertas:', error)
        setLoading(false)
      })
  }, [page])

  // Page buttons as a component for reuse
  const PageButtons = (
    <div style={{ marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'center' }}>
      <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Anterior</button>
      <span>Página {page}</span>
      <button onClick={() => setPage(p => p + 1)}>Siguiente</button>
    </div>
  )

  // Seductive Cafecito Button (linked to radarzotep3 profile)
  const CafecitoButton = (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '32px 0' }}>
      <a
        href="https://cafecito.app/radarzotep3"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          background: 'linear-gradient(90deg, #ffb347 0%, #ffcc33 100%)',
          color: '#fff',
          padding: '18px 36px',
          borderRadius: '32px',
          fontWeight: 'bold',
          fontSize: '1.3rem',
          boxShadow: '0 4px 24px rgba(255, 195, 0, 0.25)',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          transition: 'transform 0.2s, box-shadow 0.2s',
          border: '2px solid #fffbe7',
        }}
        onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.07)')}
        onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <img
          srcSet="https://cdn.cafecito.app/imgs/buttons/button_1.png 1x, https://cdn.cafecito.app/imgs/buttons/button_1_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_1_3.75x.png 3.75x"
          src="https://cdn.cafecito.app/imgs/buttons/button_1.png"
          alt="Invitame un café en cafecito.app"
          style={{ height: '40px', width: 'auto' }}
        />
        <span>
          ¿Te gustan estas ofertas? <b>Invitame un cafecito</b> y ayudá a que sigamos encontrando gangas irresistibles 😏✨
        </span>
      </a>
    </div>
  )

  // Simple loading animation (CSS spinner)
  const LoadingPlaceholder = (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '800px' }}>
      <div className="spinner"></div>
    </div>
  )

  return (
    <>
      <h1>RADARZOTEP3 Las mejores ofertas 🤪😜🤑💲</h1>
      <h2>Copyright: los chicos de la Universidad del Chaco 🧉</h2>
      <h3>{arsText}</h3>
      {CafecitoButton}
      {PageButtons}
      {loading ? (
        LoadingPlaceholder
      ) : (
        <div
          className='ofertas-grid'
        >
          {ofertas.map((oferta, idx) => (
            <div key={idx} className="oferta-card">
              <div className="oferta-content" style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
                <div className="oferta-left" style={{ flex: 1 }}>
                  <h2>{oferta.title}</h2>
                  <img src={oferta.image} alt={oferta.title} style={{ maxWidth: '200px', width: '100%' }} />
                </div>
                <div className="oferta-right" style={{ minWidth: '180px' }}>
                  <p>
                    <strong>Descuento:</strong> {oferta.discount} <br />
                    <strong>Precio original:</strong> {(oferta.originalPrice * ars).toFixed(2)} ARS ({oferta.originalPrice} USD) <br />
                    <strong>Precio final:</strong> <b style={{fontSize: "2rem"}}>{(oferta.finalPrice * ars).toFixed(2)}</b> ARS ({oferta.finalPrice} USD)
                  </p>
                  <a href={oferta.url} target="_blank" rel="noopener noreferrer">Ver en Steam</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {PageButtons}
      {/* Spinner CSS */}
      <style>
        {`
          .spinner {
            width: 48px;
            height: 48px;
            border: 6px solid #eee;
            border-top: 6px solid #3498db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </>
  )
}

export default App
