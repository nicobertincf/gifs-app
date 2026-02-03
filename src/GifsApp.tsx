import { CustomHeader } from "./shared/components/CustomHeader"
import { SearchBar } from "./shared/components/SearchBar"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
import { GifsList } from "./gifs/components/GifsList"
import { useState, useCallback } from "react"
import { APP_TITLE, APP_DESCRIPTION, SEARCH_PLACEHOLDER } from "./constants/app.constants"
import { useGifs } from "./gifs/hooks/useGifs"

export const GifsApp = () => {

    const [searchQuery, setSearchQuery] = useState<string>('')
    const { previousQueries, setCurrentQuery, gifs, handleQueryAdded, resetQueryAddedReference } = useGifs()

    const handleQuerySubmitted = useCallback((query: string) => {
        setCurrentQuery(query)
        resetQueryAddedReference()
    }, [setCurrentQuery, resetQueryAddedReference])

    const handleManualSubmit = (query: string) => {
        setCurrentQuery(query)
        handleQueryAdded(query)
    }

    const handleQueryClicked = useCallback((query: string) => {
        setCurrentQuery(query)
        setSearchQuery('')
    }, [setCurrentQuery])


    return (
        <>
            <CustomHeader
                title={APP_TITLE}
                description={APP_DESCRIPTION}
            />

            <SearchBar
                placeholder={SEARCH_PLACEHOLDER}
                onQuerySubmitted={handleQuerySubmitted}
                onManualSubmit={handleManualSubmit}
                value={searchQuery}
                onChange={setSearchQuery}
            />
            
            <PreviousSearches
                searches={previousQueries}
                onQueryClicked={handleQueryClicked}
            />
            
            <GifsList gifs={gifs} />
        </>
    )
}
