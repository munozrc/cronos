import { useDownloadStore } from '../../stores/useDownloadStore'
import { useAppStore } from '../../stores/useAppStore'
import { ListOfItems } from '../../components/ListOfItems'
import { Spinner } from '../../components/Spinner'
import { Searchbar, TabContainer, ViewContainer } from '../../layouts'

export const SearchView = () => {
  const { queryResults, queryStatus, suggestionResults, searchTrackSuggestions } = useAppStore()
  const { createNewDownload } = useDownloadStore()

  const handleCallbackTab = (index: number) => {
    if (index === 1) searchTrackSuggestions()
  }

  return (
    <ViewContainer>
      <Searchbar />
      {queryStatus === 'complete' && (
        <TabContainer callback={handleCallbackTab}>
          <ListOfItems
            list={queryResults}
            createNewDownload={createNewDownload}
          />
          <ListOfItems
            list={suggestionResults}
            createNewDownload={createNewDownload}
          />
        </TabContainer>
      )}
      {queryStatus === 'loading' && <Spinner />}
      {queryStatus === 'error' && <h3>Algo salio mal!</h3>}
    </ViewContainer>
  )
}
