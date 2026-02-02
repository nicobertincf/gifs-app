
interface PreviousSearchesProps {
    searches: string[]
}

export const PreviousSearches = ({ searches }: PreviousSearchesProps) => {
  return (
    <div className="previous-searches">
        <h2>Ultimos busquedas</h2>
        <ul className="previous-searches-list">
            {
                searches.map( (search) => (
                    <li key={search}>{search}</li>
                ))
            }
        </ul>
    </div>
  )
}
