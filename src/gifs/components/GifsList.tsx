import type { Gif } from '../interfaces/gif.interface'

interface GifsListProps {
    gifs: Gif[]
}

export const GifsList = ({ gifs }: GifsListProps) => {
  return (
    <div className="gifs-container">
        {
            gifs.map( (gif) => (
                <div key={gif.id} className="gif-card">
                    <img src={ gif.url } alt={ gif.title || 'No title' } />
                    <h3>{ gif.title || 'No title' }</h3>
                    <p>{ gif.height }x{ gif.width }</p>
                </div>
            ))
        }
    </div>
  )
}
