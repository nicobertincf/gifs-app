import { mockGifs } from "./mock-data/gifs.mock"
import { mockSearches } from "./mock-data/searches.mock"
import { CustomHeader } from "./shared/components/CustomHeader"
import { SearchBar } from "./shared/components/SearchBar"
import { PreviousSearches } from "./gifs/PreviousSearches"
import { GifsList } from "./gifs/GifsList"

export const GifsApp = () => {
  return (
    <>
        <CustomHeader title="GifsApp" description="El mejor buscador de gifs" />

        <SearchBar onSearch={(query: string) => console.log(query)} placeholder="Buscar gif" />
        
        <PreviousSearches searches={mockSearches} />
        
        <GifsList gifs={mockGifs} />
    </>
  )
}
