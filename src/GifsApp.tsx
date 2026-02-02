import { mockGifs } from "./mock-data/gifs.mock"

export const GifsApp = () => {
  return (
    <>
        <div className="content-center">
            <h1>GifsApp</h1>
            <p>El mejor buscador de gifs</p>
        </div>

        <div className="search-container">
            <input type="text" placeholder="Buscar gif" />
            <button>Buscar</button>
        </div>
        
        <div className="previous-searches">
            <h2>Ultimos busquedas</h2>
            <ul className="previous-searches-list">
                <li>Flork</li>
                <li>This is fine</li>
                <li>Devs</li>
            </ul>
        </div>
        
        <div className="gifs-container">
            {
                mockGifs.map( (gif) => (
                    <div key={gif.id} className="gif-card">
                        <img src={ gif.url || '' } alt={ gif.title || 'No title' } />
                        <h3>{ gif.title || 'No title' }</h3>
                        <p>{ gif.height }x{ gif.width } (1.5 MB)</p>
                    </div>
                ))
            }
        </div>
    </>
  )
}
