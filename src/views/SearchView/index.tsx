import { useDownloadStore } from '../../stores/useDownloadStore'
import { useAppStore } from '../../stores/useAppStore'
import { ListOfItems } from '../../components/ListOfItems'
import { Spinner } from '../../components/Spinner'
import { TabContainer } from '../../layouts/TabContainer'

export const SearchView = () => {
  const { queryResults, queryStatus, suggestionResults } = useAppStore()
  const { createNewDownload } = useDownloadStore()

  if (queryStatus === 'loading') return <Spinner />
  if (queryStatus === 'error') return <h3>Algo salio mal!</h3>

  return (
    <TabContainer>
      <ListOfItems
        list={queryResults}
        createNewDownload={createNewDownload}
      />
      <ListOfItems
        list={suggestionResults}
        createNewDownload={createNewDownload}
      />
    </TabContainer>
  )
}
