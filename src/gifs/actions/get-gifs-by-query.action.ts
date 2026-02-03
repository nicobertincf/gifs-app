import { giphyApi } from '../api/giphy.api'

import type { GiphyResponse } from '../interfaces/giphy.response'
import type { Gif } from '../interfaces/gif.interface'

export const getGifsByQuery = async (query: string): Promise<Gif[]> => {
    if (!query) return []

    const response = await giphyApi.get<GiphyResponse>('/search', {
        params: {
            q: query,
            limit: 10
        }
    })

    return response.data.data.map(gif => ({
        id: gif.id,
        title: gif.title,
        url: gif.images.fixed_height.url,
        height: gif.images.fixed_height.height,
        width: gif.images.fixed_height.width
    }))
}
