'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import NavBar from '@/src/components/NavBar'
import Footer from '@/src/components/Footer'
import { RippleButton } from '@/src/components/animate-ui/buttons/ripple';
import PiloteCard from '@/src/components/PiloteCard'
import { BubbleBackground } from '@/src/components/animate-ui/backgrounds/bubble'
import { Driver } from '@/src/modeles/driverCardModel'

interface ComparisonResult {
  winner: Driver
  loser: Driver
  score: {
    winner: number
    loser: number
  }
  details: {
    championships: { winner: number, loser: number, point: string }
    victories: { winner: number, loser: number, point: string }
    podiums: { winner: number, loser: number, point: string }
    poles: { winner: number, loser: number, point: string }
    efficiency: { winner: number, loser: number, point: string }
    races: { winner: number, loser: number, point: string }
  }
}

export default function ResultatComparaisonPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [driver1, setDriver1] = useState<Driver | null>(null)
  const [driver2, setDriver2] = useState<Driver | null>(null)
  const [result, setResult] = useState<ComparisonResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const driver1Id = searchParams.get('driver1')
    const driver2Id = searchParams.get('driver2')

    if (!driver1Id || !driver2Id) {
      router.push('/comparateur')
      return
    }

    fetchDriversAndCompare(parseInt(driver1Id), parseInt(driver2Id))
  }, [searchParams, router])

  const fetchDriversAndCompare = async (id1: number, id2: number) => {
    try {
      const response = await fetch('http://localhost:3002/api/drivers', {
        headers: {
          'X-API-Key': 'f1-api-key-2025-secure-access-f1fanzone-production'
        }
      })

      if (!response.ok) {
        throw new Error('Erreur lors du chargement des pilotes')
      }

      const drivers: Driver[] = await response.json()
      const d1 = drivers.find(d => d.id === id1)
      const d2 = drivers.find(d => d.id === id2)

      if (!d1 || !d2) {
        router.push('/comparateur')
        return
      }

      setDriver1(d1)
      setDriver2(d2)
      setResult(compareDrivers(d1, d2))
    } catch (err) {
      console.error('Erreur lors de la comparaison:', err)
      router.push('/comparateur')
    } finally {
      setLoading(false)
    }
  }

  const compareDrivers = (d1: Driver, d2: Driver): ComparisonResult => {
    let score1 = 0
    let score2 = 0

    // Calcul de l'efficacité (pourcentages basés sur le nombre de courses)
    const efficiency1 = {
      victoryRate: d1.nb_race > 0 ? (d1.nb_victory / d1.nb_race) * 100 : 0,
      podiumRate: d1.nb_race > 0 ? (d1.nb_podiums / d1.nb_race) * 100 : 0,
      poleRate: d1.nb_race > 0 ? (d1.nb_pole / d1.nb_race) * 100 : 0
    }

    const efficiency2 = {
      victoryRate: d2.nb_race > 0 ? (d2.nb_victory / d2.nb_race) * 100 : 0,
      podiumRate: d2.nb_race > 0 ? (d2.nb_podiums / d2.nb_race) * 100 : 0,
      poleRate: d2.nb_race > 0 ? (d2.nb_pole / d2.nb_race) * 100 : 0
    }

    const avgEfficiency1 = (efficiency1.victoryRate + efficiency1.podiumRate + efficiency1.poleRate) / 3
    const avgEfficiency2 = (efficiency2.victoryRate + efficiency2.podiumRate + efficiency2.poleRate) / 3

    // Comparaisons avec points
    const details = {
      championships: {
        winner: d1.nb_championship,
        loser: d2.nb_championship,
        point: d1.nb_championship > d2.nb_championship ? 'd1' : d2.nb_championship > d1.nb_championship ? 'd2' : 'tie'
      },
      victories: {
        winner: d1.nb_victory,
        loser: d2.nb_victory,
        point: d1.nb_victory > d2.nb_victory ? 'd1' : d2.nb_victory > d1.nb_victory ? 'd2' : 'tie'
      },
      podiums: {
        winner: d1.nb_podiums,
        loser: d2.nb_podiums,
        point: d1.nb_podiums > d2.nb_podiums ? 'd1' : d2.nb_podiums > d1.nb_podiums ? 'd2' : 'tie'
      },
      poles: {
        winner: d1.nb_pole,
        loser: d2.nb_pole,
        point: d1.nb_pole > d2.nb_pole ? 'd1' : d2.nb_pole > d1.nb_pole ? 'd2' : 'tie'
      },
      efficiency: {
        winner: avgEfficiency1,
        loser: avgEfficiency2,
        point: avgEfficiency1 > avgEfficiency2 ? 'd1' : avgEfficiency2 > avgEfficiency1 ? 'd2' : 'tie'
      },
      races: {
        winner: d1.nb_race,
        loser: d2.nb_race,
        point: d1.nb_race > d2.nb_race ? 'd1' : d2.nb_race > d1.nb_race ? 'd2' : 'tie'
      }
    }

    // Calcul des scores avec nouveau système de points
    // 1 point pour chaque catégorie standard
    if (details.championships.point === 'd1') score1 += 1
    else if (details.championships.point === 'd2') score2 += 1

    if (details.victories.point === 'd1') score1 += 1
    else if (details.victories.point === 'd2') score2 += 1

    if (details.podiums.point === 'd1') score1 += 1
    else if (details.podiums.point === 'd2') score2 += 1

    if (details.poles.point === 'd1') score1 += 1
    else if (details.poles.point === 'd2') score2 += 1

    // 3 points pour l'efficacité (importance majeure)
    if (details.efficiency.point === 'd1') score1 += 3
    else if (details.efficiency.point === 'd2') score2 += 3

    // Critère de départage : si tous les pilotes sont à zéro partout sauf courses disputées
    const isDriver1AllZero = d1.nb_championship === 0 && d1.nb_victory === 0 && d1.nb_podiums === 0 && d1.nb_pole === 0
    const isDriver2AllZero = d2.nb_championship === 0 && d2.nb_victory === 0 && d2.nb_podiums === 0 && d2.nb_pole === 0
    
    let finalWinner, finalLoser
    
    if (isDriver1AllZero && isDriver2AllZero) {
      // Si les deux pilotes sont à zéro partout, celui avec le plus de courses gagne
      finalWinner = d1.nb_race >= d2.nb_race ? d1 : d2
      finalLoser = d1.nb_race >= d2.nb_race ? d2 : d1
    } else if (score1 === score2) {
      // En cas d'égalité, départage par l'efficacité puis par les courses disputées
      if (avgEfficiency1 === avgEfficiency2) {
        finalWinner = d1.nb_race >= d2.nb_race ? d1 : d2
        finalLoser = d1.nb_race >= d2.nb_race ? d2 : d1
      } else {
        finalWinner = avgEfficiency1 > avgEfficiency2 ? d1 : d2
        finalLoser = avgEfficiency1 > avgEfficiency2 ? d2 : d1
      }
    } else {
      finalWinner = score1 > score2 ? d1 : d2
      finalLoser = score1 > score2 ? d2 : d1
    }

    return {
      winner: finalWinner,
      loser: finalLoser,
      score: { 
        winner: finalWinner === d1 ? score1 : score2, 
        loser: finalWinner === d1 ? score2 : score1 
      },
      details
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen relative">
        <BubbleBackground 
          interactive={true}
          colors={{
            first: '218,59,35',
            second: '56,56,56',
            third: '242,242,242',
            fourth: '199,23,0',
            fifth: '131,15,0',
            sixth: '255,112,93',
          }}
        />
        <NavBar />
        <div className="container mx-auto px-4 py-8 pt-24 relative z-10">
          <div className="flex justify-center items-center h-64">
            <div className="text-xl text-f1-gray-100">Analyse de la comparaison...</div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!result || !driver1 || !driver2) {
    return null
  }

  return (
    <div className="min-h-screen relative">
      <BubbleBackground
        interactive={true}
        colors={{ 
          first: '218,59,35', 
          second: '196,23,0', 
          third: '131,15,0', 
          fourth: '218,59,35', 
          fifth: '131,15,0', 
          sixth: '131,15,0' 
        }}
        className="fixed inset-0 -z-10"
      />
      <NavBar />
      
      <div className="container mx-auto px-4 py-8 pt-24 relative z-10">
        {/* Pilote gagnant au centre */}
        <div className="flex flex-col items-center mb-12">
          <div className="mb-6">
            <div className="text-3xl font-bold text-white text-center mb-2">
              🏆 GAGNANT
            </div>
            <div className="text-xl text-center">
              {result.winner.name} {result.winner.surname}
            </div>
          </div>
          
          <div className="w-75">
            <PiloteCard 
              driver={result.winner}
              isSelected={true}
              onClick={() => {}}
            />
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="text-center p-4">
             <RippleButton onClick={() => router.push('/comparateur')} className='bg-f1-red-600 text-white text-lg p-6'>Nouvelle Comparaison</RippleButton>


        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-f1-gray-100">
            Détail de l'Analyse
          </h2>
          
          <div className="backdrop-blur-md bg-f1-gray-800/30 rounded-2xl shadow-2xl border border-f1-gray-600/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
    
                <thead className="bg-f1-red-600/20 border-b border-f1-red-600/30">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-f1-gray-100 uppercase tracking-wider">
                      Statistiques
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-f1-gray-100 uppercase tracking-wider">
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2">
                          {driver1.current_team && (
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: driver1.current_team.color }}
                            />
                          )}
                          <span>{driver1.name} {driver1.surname}</span>
                        </div>
                        <div className="text-xs text-f1-gray-100/60 normal-case">
                          #{driver1.number}
                        </div>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-f1-gray-100 uppercase tracking-wider">
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2">
                          {driver2.current_team && (
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: driver2.current_team.color }}
                            />
                          )}
                          <span>{driver2.name} {driver2.surname}</span>
                        </div>
                        <div className="text-xs text-f1-gray-100/60 normal-case">
                          #{driver2.number}
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>

                
                <tbody className="divide-y divide-f1-gray-600/20">
                  {/* Championnats */}
                  <tr className="hover:bg-f1-gray-700/20 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-lg font-semibold text-f1-gray-100">
                        Championnats
                      </div>
                      <div className="text-sm text-f1-gray-100/60">
                        Titres mondiaux
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-center`}>
                      <div className="text-xl font-bold text-f1-gray-100">
                        {driver1.nb_championship}
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-center`}>
                      <div className="text-xl font-bold text-f1-gray-100">
                        {driver2.nb_championship}
                      </div>
                    </td>
                  </tr>

                  {/* Victoires */}
                  <tr className="hover:bg-f1-gray-700/20 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-lg font-semibold text-f1-gray-100">
                        Victoires
                      </div>
                      <div className="text-sm text-f1-gray-100/60">
                        Courses gagnées
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-center`}>
                      <div className="text-xl font-bold text-f1-gray-100">
                        {driver1.nb_victory}
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-center`}>
                      <div className="text-xl font-bold text-f1-gray-100">
                        {driver2.nb_victory}
                      </div>
                    </td>
                  </tr>

                  {/* Podiums */}
                  <tr className="hover:bg-f1-gray-700/20 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-lg font-semibold text-f1-gray-100">
                        Podiums
                      </div>
                      <div className="text-sm text-f1-gray-100/60">
                        Top 3 en course
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-center`}>
                      <div className="text-xl font-bold text-f1-gray-100">
                        {driver1.nb_podiums}
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-center `}>
                      <div className="text-xl font-bold text-f1-gray-100">
                        {driver2.nb_podiums}
                      </div>
                    </td>
                  </tr>

                  {/* Pole Positions */}
                  <tr className="hover:bg-f1-gray-700/20 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-lg font-semibold text-f1-gray-100">
                        Pole Positions
                      </div>
                      <div className="text-sm text-f1-gray-100/60">
                        Départs en première ligne
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-center `}>
                      <div className="text-xl font-bold text-f1-gray-100">
                        {driver1.nb_pole}
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-center }`}>
                      <div className="text-xl font-bold text-f1-gray-100">
                        {driver2.nb_pole}
                      </div>
                    </td>
                  </tr>

                 

                  {/* Efficacité */}
                  <tr className="hover:bg-f1-gray-700/20 transition-colors duration-200 border-t-2 border-f1-red-600/30">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-lg font-semibold ">
                        Efficacité 
                      </div>
                      <div className="text-sm text-f1-gray-100/60">
                        Performance moyenne pondérée
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-center`}>
                      <div className="text-xl font-bold text-f1-gray-100">
                        {driver1.nb_race > 0 ? (
                          ((driver1.nb_victory / driver1.nb_race * 100) + 
                           (driver1.nb_podiums / driver1.nb_race * 100) + 
                           (driver1.nb_pole / driver1.nb_race * 100)) / 3
                        ).toFixed(1) : '0.0'}%
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-center`}>
                      <div className="text-xl font-bold text-f1-gray-100">
                        {driver2.nb_race > 0 ? (
                          ((driver2.nb_victory / driver2.nb_race * 100) + 
                           (driver2.nb_podiums / driver2.nb_race * 100) + 
                           (driver2.nb_pole / driver2.nb_race * 100)) / 3
                        ).toFixed(1) : '0.0'}%
                      </div>
                    </td>
                  </tr>

                  {/* Courses disputées */}
                  <tr className="hover:bg-f1-gray-700/20 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-lg font-semibold text-f1-gray-100">
                        Courses disputées
                      </div>
                      <div className="text-sm text-f1-gray-100/60">
                        Total de participations
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-xl font-bold text-f1-gray-100">
                        {driver1.nb_race}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-xl font-bold text-f1-gray-100">
                        {driver2.nb_race}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
