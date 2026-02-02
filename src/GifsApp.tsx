import { mockGifs } from "./mock-data/gifs.mock"
import { CustomHeader } from "./shared/components/CustomHeader"
import { SearchBar } from "./shared/components/SearchBar"
import { PreviousSearches } from "./gifs/PreviousSearches"
import { GifsList } from "./gifs/GifsList"
import { useState, useEffect, useRef, useCallback } from "react"
import { STORAGE_KEY, MAX_SEARCHES_ITEMS } from "./constants/storage.constants"
import { APP_TITLE, APP_DESCRIPTION, SEARCH_PLACEHOLDER } from "./constants/app.constants"
import { AUTO_ADD_TO_HISTORY_DELAY_MS, SCROLL_THRESHOLD_PX } from "./constants/behavior.constants"

export const GifsApp = () => {

    const [previousQueries, setPreviousQueries] = useState<string[]>(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        return stored ? JSON.parse(stored) : []
    })

    const [currentQuery, setCurrentQuery] = useState<string>('')
    const queryAddedReference = useRef<string>('')

    const handleQueryAdded = useCallback((query: string) => {
        if (!query.trim()) return

        if (previousQueries.includes(query)) return

        if (queryAddedReference.current === query) return

        queryAddedReference.current = query
        const newQueries = [query, ...previousQueries].slice(0, MAX_SEARCHES_ITEMS)
        setPreviousQueries(newQueries)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newQueries))
    }, [previousQueries])

    const handleQuerySubmitted = (query: string) => {
        setCurrentQuery(query)
        queryAddedReference.current = ''
    }

    const handleManualSubmit = (query: string) => {
        setCurrentQuery(query)
        handleQueryAdded(query)
    }

    useEffect(() => {
        if (!currentQuery) return

        const handleScroll = () => {
            if (window.scrollY > SCROLL_THRESHOLD_PX) {
                handleQueryAdded(currentQuery)
            }
        }

        window.addEventListener('scroll', handleScroll)

        const timeoutId = setTimeout(() => {
            handleQueryAdded(currentQuery)
        }, AUTO_ADD_TO_HISTORY_DELAY_MS)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            clearTimeout(timeoutId)
        }
    }, [currentQuery, handleQueryAdded])

    const handleQueryClicked = (query: string) => {
        console.log(query)
    }


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
            />
            
            <PreviousSearches
                searches={previousQueries}
                onQueryClicked={handleQueryClicked}
            />
            
            <GifsList gifs={mockGifs} />
        </>
    )
}
