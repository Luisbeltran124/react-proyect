import { useState } from 'react';

// Cargamos Bootstrap directamente desde el CDN para que funcione solo editando este archivo
const bootstrapCSS = document.createElement("link");
bootstrapCSS.rel = "stylesheet";
bootstrapCSS.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";
document.head.appendChild(bootstrapCSS);

function App() {
  const [paises, setPaises] = useState([]);

  const obtenerDatos = async () => {
    try {
      const res = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,capital,currencies,languages,population');
      const data = await res.json();
      setPaises(data.slice(0, 20)); // Mostramos 20 para que cargue rápido
    } catch (error) {
      console.error("Error al obtener datos", error);
    }
  };

  // Estilos internos para asegurar el diseño de escritorio sin usar App.css
  const estilos = {
    container: {
      minWidth: '1200px',
      margin: '0 auto',
      padding: '40px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px'
    },
    img: {
      height: '160px',
      objectFit: 'cover'
    }
  };

  return (
    <div style={estilos.container} className="bg-light min-vh-100">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold text-dark">Panel Mundial</h1>
        <button className="btn btn-primary btn-lg shadow" onClick={obtenerDatos}>
          Cargar Información
        </button>
      </div>

      <div style={estilos.grid}>
        {paises.map((pais, index) => (
          <div className="card border-0 shadow-sm" key={index}>
            <img 
              src={pais.flags.png} 
              style={estilos.img} 
              className="card-img-top" 
              alt="Bandera" 
            />
            <div className="card-body">
              <h6 className="fw-bold text-uppercase mb-3">{pais.name.common}</h6>
              <div className="small">
                <p className="mb-1"><strong>Capital:</strong> {pais.capital?.[0] || "N/A"}</p>
                <p className="mb-1"><strong>Poblacion:</strong> {pais.population.toLocaleString()}</p>
                <p className="mb-1"><strong>Idioma:</strong> {pais.languages ? Object.values(pais.languages)[0] : "N/A"}</p>
                <p className="mb-0"><strong>Moneda:</strong> {pais.currencies ? Object.values(pais.currencies)[0].name : "N/A"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;