import { useState, useEffect, useRef, useCallback } from "react"
import { STORAGE_KEY, MAX_SEARCHES_ITEMS } from "../../constants/storage.constants"
import { AUTO_ADD_TO_HISTORY_DELAY_MS, SCROLL_THRESHOLD_PX } from "../../constants/behavior.constants"
import { getGifsByQuery } from "../actions/get-gifs-by-query.action"
import type { Gif } from "../interfaces/gif.interface"

export const useGifs = () => {
    const [previousQueries, setPreviousQueries] = useState<string[]>(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        return stored ? JSON.parse(stored) : []
    })

    const [currentQuery, setCurrentQuery] = useState<string>('')
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

    const resetQueryAddedReference = useCallback(() => {
        queryAddedReference.current = ''
    }, [])

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

    useEffect(() => {
        if (!currentQuery) return

        const requestId = ++latestRequestId.current

        getGifsByQuery(currentQuery).then((response) => {
            if (requestId !== latestRequestId.current) return
            setGifs(response)
        })
    }, [currentQuery])

    return {
        previousQueries,
        currentQuery,
        setCurrentQuery,
        gifs,
        handleQueryAdded,
        resetQueryAddedReference
    }
}
