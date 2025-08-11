'use client'

import { useState, useEffect } from 'react'
import { RaceApiService } from '../services/raceApi'
import { Race } from '../modeles/raceModel'

interface UseRaceReturn {
  race: Race | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useNextRace(): UseRaceReturn {
  const [race, setRace] = useState<Race | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchNextRace = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const nextRace = await RaceApiService.getNextRace()
      setRace(nextRace)
    } catch (err) {
      console.error('Erreur lors du chargement de la prochaine course:', err)
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setIsLoading(false)
    }
  }

  // Charger la prochaine course au montage du composant
  useEffect(() => {
    fetchNextRace()
  }, [])

  // Fonction pour refetch manuellement
  const refetch = async () => {
    await fetchNextRace()
  }

  return {
    race,
    isLoading,
    error,
    refetch
  }
}