
interface PreviousSearchesProps {
    searches: string[]
    onQueryClicked: (query: string) => void
}

export const PreviousSearches = ({ searches, onQueryClicked }: PreviousSearchesProps) => {
  return (
    <div className="previous-searches">
        <h2>Ultimos busquedas</h2>
        <ul className="previous-searches-list">
            {
                searches.map( (search) => (
                    <li key={search} onClick={() => onQueryClicked(search)}>{search}</li>
                ))
            }
        </ul>
    </div>
  )
}
