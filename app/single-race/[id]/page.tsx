'use client'

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import NavBar from '../../../src/components/NavBar';
import Footer from '../../../src/components/Footer';
import ProtectedRoute from '../../../src/components/ProtectedRoute';
import { BubbleBackground } from '../../../src/components/animate-ui/backgrounds/bubble';
import { useRaceResults } from '../../../src/hooks/useRaceResults';
import { formatLapTime } from '../../../src/utils/raceUtils';
import Image from 'next/image';

export default function SingleRacePage() {
  const params = useParams();
  const raceId = params.id as string;
  const { results, isLoading, error, raceInfo, fastestLapTime, loadRaceResults, clearError } = useRaceResults();

  useEffect(() => {
    if (raceId) {
      loadRaceResults(parseInt(raceId));
    }
  }, [raceId, loadRaceResults]);

  return (
    <ProtectedRoute>
      <NavBar />
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
      <div className="min-h-screen relative pt-40 px-4">
        <div className="max-w-6xl mx-auto">
          {raceInfo && (
            <div className="mb-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-formula1 lg:text-4xl font-bold text-f1-gray-100 mb-4">
                  {raceInfo.race_name}
                </h2>
                <div className="w-24 h-1 bg-f1-red-600 mx-auto rounded-full"></div>
              </div>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <div className="w-full h-80 rounded-3xl shadow-2xl relative overflow-hidden">
                    <Image
                      src={raceInfo.image_url || '/placeholder-circuit.svg'}
                      alt={`Circuit ${raceInfo.track_name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain"
                      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        console.log(`Erreur de chargement de l'image: ${raceInfo.image_url}`)
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        const parent = target.parentElement
                        if (parent) {
                          parent.className = 'w-full h-80 bg-gradient-to-br from-f1-red-600 to-f1-red-800 rounded-3xl shadow-2xl relative overflow-hidden flex items-center justify-center'
                          parent.innerHTML = `
                            <div class="text-center">
                              <div class="text-white/80 text-sm font-medium">Circuit ${raceInfo.track_name}</div>
                            </div>
                          `
                        }
                      }}
                      onLoad={() => {
                        console.log(`Image circuit chargée avec succès: ${raceInfo.image_url}`)
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
                    <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white/20 rounded-full"></div>
                    <div className="absolute bottom-6 left-6 w-12 h-12 border-2 border-white/20 rounded-full"></div>
                    <div className="absolute top-1/2 left-4 w-2 h-16 bg-white/10 rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-8 text-left">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-formula1 lg:text-3xl font-bold text-f1-gray-100">
                        {raceInfo.track_name}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-f1-gray-600 rounded-full"></div>
                    <span className="text-xl text-f1-gray-100/80">
                      {raceInfo.city}, {raceInfo.country || 'Non spécifié'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-f1-gray-600 rounded-full"></div>
                    <span className="text-xl text-f1-gray-100/80">
                      {new Date(raceInfo.started_at).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })} à {new Date(raceInfo.started_at).toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-f1-gray-600 rounded-full"></div>
                    <span className="text-xl text-f1-gray-100/80">
                       {raceInfo.nb_laps} tours
                    </span>
                  </div>
                  
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <div className="backdrop-blur-md bg-f1-red-800/20 rounded-2xl shadow-2xl border border-f1-red-600/30 p-12 max-w-md mx-auto">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-2xl font-bold text-f1-red-400 mb-2">
                  Erreur de chargement
                </h3>
                <p className="text-f1-red-400/70 mb-4">
                  {error}
                </p>
                <button 
                  onClick={() => {
                    clearError();
                    if (raceId) loadRaceResults(parseInt(raceId));
                  }}
                  className="px-6 py-2 bg-f1-red-600 text-f1-gray-50 rounded-lg hover:bg-f1-red-800 transition-colors"
                >
                  Réessayer
                </button>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="text-center py-12">
              <div className="backdrop-blur-md bg-f1-gray-800/30 rounded-2xl shadow-2xl border border-f1-gray-600/20 p-12">
                <div className="animate-spin w-12 h-12 border-4 border-f1-red-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <span className="ml-4 text-f1-gray-100 text-lg">
                  Chargement des résultats de la course...
                </span>
              </div>
            </div>
          )}

          {!isLoading && Array.isArray(results) && results.length > 0 && (
            <div className="mb-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-formula1 lg:text-3xl font-bold text-f1-gray-100 mb-4">
                  Résultats de la course
                </h3>
              </div>
              <div className="backdrop-blur-md bg-f1-gray-800/30 rounded-2xl shadow-2xl border border-f1-gray-600/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-f1-red-600/20 font-formula1 border-b border-f1-red-600/30">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-f1-gray-100 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-f1-gray-100 uppercase tracking-wider">
                        Pilote
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-f1-gray-100 uppercase tracking-wider">
                        Équipe
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-f1-gray-100 uppercase tracking-wider">
                        Meilleur Tour
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-f1-gray-100 uppercase tracking-wider">
                        Points
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-f1-gray-600/20">
                    {results.map((result, index) => (
                      <tr 
                        key={result.id} 
                        className="hover:bg-f1-gray-700/20 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {result.status === 'DNF' ? (
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-f1-red-800/20 text-f1-red-400 border border-f1-red-600/30">
                                DNF
                              </div>
                            ) : (
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                result.position === 1 ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30' :
                                result.position === 2 ? 'bg-gray-300/20 text-gray-300 border border-gray-300/30' :
                                result.position === 3 ? 'bg-orange-400/20 text-orange-400 border border-orange-400/30' :
                                'bg-f1-gray-700/20 text-f1-gray-100 border border-f1-gray-600/30'
                              }`}>
                                {result.position}
                              </div>
                            )}
                          </div>
                        </td>


                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-lg font-semibold text-f1-gray-100">
                                {result.driver.name} {result.driver.surname}
                              </div>
                              <div className="text-sm text-f1-gray-100/60">
                                #{result.driver.number}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Équipe */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          {result.driver.team_history.length > 0 ? (
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: result.driver.team_history[0].team.color }}
                              />
                              <span className="text-f1-gray-100 text-sm">
                                {result.driver.team_history[0].team.name}
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 rounded-full bg-f1-gray-500" />
                              <span className="text-f1-gray-500 text-sm italic">
                                Sans équipe
                              </span>
                            </div>
                          )}
                        </td>


                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className={`text-lg font-mono ${
                            result.lap_time === fastestLapTime && fastestLapTime !== null
                              ? 'text-purple-400 font-bold'
                              : 'text-f1-gray-100'
                          }`}>
                            {formatLapTime(result.lap_time)}''
                          </div>
                        </td>

                        {/* Points */}
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-2">
                            {result.points > 0 && (
                              <span className=" text-lg">+</span>
                            )}
                            <div className="text-2xl font-bold ">
                              {result.points}
                            </div>
                            <div className="text-xs text-f1-gray-100/60">
                              pts
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            </div>
          )}

          {!isLoading && Array.isArray(results) && results.length === 0 && !error && (
            <div className="text-center py-12">
              <div className="backdrop-blur-md bg-f1-gray-800/30 rounded-2xl shadow-2xl border border-f1-gray-600/20 p-12">

                <h3 className="text-2xl font-bold text-f1-gray-100 mb-2">
                  Aucun résultat trouvé
                </h3>
                <p className="text-f1-gray-100/70">
                  Les résultats de cette course ne sont pas encore disponibles.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </ProtectedRoute>
  );
}
