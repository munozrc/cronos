import { useState } from 'react'
import { useDownloadStore } from '../../stores/useDownloadStore'
import { useAppStore } from '../../stores/useAppStore'
import { ViewContainer } from '../../layouts'
import { ListOfItems } from '../../components/ListOfItems'
import { Spinner } from '../../components/Spinner'

export const SearchView = () => {
  const [showSuggestions, toggleSuggestions] = useState<boolean>(false)
  const { queryResults, queryStatus, suggestionResults } = useAppStore()
  const { createNewDownload } = useDownloadStore()

  if (queryStatus === 'loading') return <Spinner />
  if (queryStatus === 'error') return <h3>Algo salio mal!</h3>

  return (
    <ViewContainer>
      <div>
        <button onClick={() => toggleSuggestions(false)}>resultados</button>
        <button onClick={() => toggleSuggestions(true)}>sugerencias</button>
      </div>
      <ListOfItems
        list={queryResults}
        isVisible={!showSuggestions}
        createNewDownload={createNewDownload}
      />
      <ListOfItems
        list={suggestionResults}
        isVisible={showSuggestions}
        createNewDownload={createNewDownload}
      />
    </ViewContainer>
  )
}
