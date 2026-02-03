import { CustomHeader } from "./shared/components/CustomHeader"
import { SearchBar } from "./shared/components/SearchBar"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
import { GifsList } from "./gifs/components/GifsList"
import { useState, useEffect, useRef, useCallback } from "react"
import { STORAGE_KEY, MAX_SEARCHES_ITEMS } from "./constants/storage.constants"
import { APP_TITLE, APP_DESCRIPTION, SEARCH_PLACEHOLDER } from "./constants/app.constants"
import { AUTO_ADD_TO_HISTORY_DELAY_MS, SCROLL_THRESHOLD_PX } from "./constants/behavior.constants"
import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action"
import type { Gif } from "./gifs/interfaces/gif.interface"

export const GifsApp = () => {

    const [previousQueries, setPreviousQueries] = useState<string[]>(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        return stored ? JSON.parse(stored) : []
    })

    const [currentQuery, setCurrentQuery] = useState<string>('')
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [gifs, setGifs] = useState<Gif[]>([])
    const queryAddedReference = useRef<string>('')
    const latestRequestId = useRef<number>(0)

    const handleQueryAdded = useCallback((query: string) => {
        if (!query.trim()) return

        if (previousQueries.includes(query)) return

        if (queryAddedReference.current === query) return

        queryAddedReference.current = query
        const newQueries = [query, ...previousQueries].slice(0, MAX_SEARCHES_ITEMS)
        setPreviousQueries(newQueries)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newQueries))
    }, [previousQueries])

    const handleQuerySubmitted = useCallback((query: string) => {
        setCurrentQuery(query)
        queryAddedReference.current = ''
    }, [])

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

    const handleQueryClicked = useCallback((query: string) => {
        setCurrentQuery(query)
        setSearchQuery('')
    }, [])

    useEffect(() => {
        if (!currentQuery) return

        const requestId = ++latestRequestId.current

        getGifsByQuery(currentQuery).then((response) => {
            if (requestId !== latestRequestId.current) return
            setGifs(response)
        })
    }, [currentQuery])


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
