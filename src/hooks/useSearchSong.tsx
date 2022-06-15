import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppStore } from '../stores/useAppStore'

export function useSearchSong () {
  const { queryResults, queryStatus, lastQuery, setNewQuery, setQueryResults, setStatusQuery } = useAppStore()
  const { searchTrack } = window.cronos
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const value = searchParams.get('query')
    if (!value || value === lastQuery) return

    setNewQuery(value)
    setStatusQuery('loading')
    searchTrack(value)
      .then((results) => {
        setStatusQuery('complete')
        setQueryResults(results)
      })
      .catch(() => setStatusQuery('error'))
  }, [searchParams])

  return {
    queryResults,
    queryStatus
  }
}
