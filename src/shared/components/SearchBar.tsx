import { useState } from 'react'

interface SearchBarProps {
    onQuerySubmitted: (query: string) => void
    placeholder?: string
}

export const SearchBar = ({ onQuerySubmitted, placeholder = "Buscar" }: SearchBarProps) => {
    const [query, setQuery] = useState('')

    const handleQuerySubmitted = () => {
        onQuerySubmitted(query)
        setQuery('')
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleQuerySubmitted()
        }
    }

    return (
    <div className="search-container">
        <input 
            type="text" 
            placeholder={placeholder} 
            value={query} 
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
        />
        <button onClick={handleQuerySubmitted}>Buscar</button>
    </div>
  )
}
