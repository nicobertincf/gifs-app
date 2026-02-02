import { useState } from 'react'

interface SearchBarProps {
    onSearch: (query: string) => void
    placeholder?: string
}

export const SearchBar = ({ onSearch, placeholder = "Buscar" }: SearchBarProps) => {
    const [query, setQuery] = useState('')

    const handleSearch = () => {
        onSearch(query)
    }

    return (
    <div className="search-container">
        <input type="text" placeholder={placeholder} value={query} onChange={(e) => setQuery(e.target.value)} />
        <button onClick={handleSearch}>Buscar</button>
    </div>
  )
}
