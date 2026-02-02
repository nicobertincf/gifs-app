import type { Gif } from "../mock-data/gifs.mock"

interface GifsListProps {
    gifs: Gif[]
}

export const GifsList = ({ gifs }: GifsListProps) => {
  return (
    <div className="gifs-container">
        {
            gifs.map( (gif) => (
                <div key={gif.id} className="gif-card">
                    <img src={ gif.url || '' } alt={ gif.title || 'No title' } />
                    <h3>{ gif.title || 'No title' }</h3>
                    <p>{ gif.height }x{ gif.width } (1.5 MB)</p>
                </div>
            ))
        }
    </div>
  )
}
