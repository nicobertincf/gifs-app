import { useState, useEffect } from 'react'
import { DEBOUNCE_DELAY_MS } from '../../constants/behavior.constants'

interface SearchBarProps {
    onQuerySubmitted: (query: string) => void
    onManualSubmit?: (query: string) => void
    placeholder?: string
}

export const SearchBar = ({ onQuerySubmitted, onManualSubmit, placeholder = "Buscar" }: SearchBarProps) => {
    const [query, setQuery] = useState('')

    useEffect(() => {
        if (!query.trim()) return

        const timeoutId = setTimeout(() => {
            onQuerySubmitted(query)
        }, DEBOUNCE_DELAY_MS)

        return () => clearTimeout(timeoutId)
    }, [query, onQuerySubmitted])

    const handleQuerySubmitted = () => {
        if (onManualSubmit) {
            onManualSubmit(query)
        } else {
            onQuerySubmitted(query)
        }
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
