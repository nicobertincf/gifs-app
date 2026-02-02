import { mockGifs } from "./mock-data/gifs.mock"
import { CustomHeader } from "./shared/components/CustomHeader"
import { SearchBar } from "./shared/components/SearchBar"
import { PreviousSearches } from "./gifs/PreviousSearches"
import { GifsList } from "./gifs/GifsList"
import { useState } from "react"
import { STORAGE_KEY, MAX_SEARCHES } from "./constants/storage.constants"

export const GifsApp = () => {

    const [previousQueries, setPreviousQueries] = useState<string[]>(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        return stored ? JSON.parse(stored) : []
    })

    const handleQueryAdded = (query: string) => {
        if (!query.trim()) return

        if (previousQueries.includes(query)) return

        const newQueries = [query, ...previousQueries].slice(0, MAX_SEARCHES)
        setPreviousQueries(newQueries)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newQueries))
    }

    const handleQuerySubmitted = (query: string) => {
        console.log(query)
        handleQueryAdded(query)
    }

    const handleQueryClicked = (query: string) => {
        console.log(query)
    }


    return (
        <>
            <CustomHeader
                title="GifsApp"
                description="El mejor buscador de gifs"
            />

            <SearchBar
                placeholder="Buscar gif"
                onQuerySubmitted={handleQuerySubmitted}
            />
            
            <PreviousSearches
                searches={previousQueries}
                onQueryClicked={handleQueryClicked}
            />
            
            <GifsList gifs={mockGifs} />
        </>
    )
}
