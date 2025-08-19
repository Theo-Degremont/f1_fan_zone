'use client'

import Image from 'next/image'
import { useNextRace } from '../hooks/useRaces'
import Countdown from './Countdown'

export default function NextRace() {
  const { race, isLoading, error, refetch } = useNextRace()

  const getCountryFlag = (country: string) => {
    const flags: { [key: string]: string } = {
      'Monaco': '🇲🇨',
      'France': '🇫🇷',
      'Italy': '🇮🇹',
      'Spain': '🇪🇸',
      'United Kingdom': '🇬🇧',
      'Belgium': '🇧🇪',
      'Netherlands': '🇳🇱',
      'Germany': '🇩🇪',
      'Austria': '🇦🇹',
      'Hungary': '🇭🇺',
      'Singapore': '🇸🇬',
      'Japan': '🇯🇵',
      'United States': '🇺🇸',
      'Mexico': '🇲🇽',
      'Brazil': '🇧🇷',
      'Australia': '🇦🇺',
      'Canada': '🇨🇦',
      'Azerbaijan': '🇦🇿',
      'Saudi Arabia': '🇸🇦',
      'UAE': '🇦🇪'
    }
    return flags[country] || '🏁'
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-f1-gray-100 mb-4">
            Prochaine Course
          </h2>
          <div className="w-24 h-1 bg-f1-red-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="w-full h-80 bg-f1-gray-600 animate-pulse rounded-3xl"></div>
          <div className="space-y-6">
            <div className="h-12 bg-f1-gray-600 animate-pulse rounded"></div>
            <div className="h-6 bg-f1-gray-600 animate-pulse rounded w-3/4"></div>
            <div className="h-6 bg-f1-gray-600 animate-pulse rounded w-1/2"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !race) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-f1-gray-100 mb-4">
            Prochaine Course
          </h2>
          <div className="w-24 h-1 bg-f1-red-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="text-center text-f1-gray-100 space-y-6">
          <div className="text-6xl">🏁</div>
          <h3 className="text-2xl font-bold mb-4">Connexion à l'API en cours...</h3>
          <p className="text-f1-gray-100/70 max-w-md mx-auto">
            {error || 'Aucune course trouvée. Assurez-vous que votre API est démarrée sur'} 
            <br />
            <code className="bg-f1-gray-600 px-2 py-1 rounded text-sm mt-2 inline-block">
              {process.env.NEXT_PUBLIC_API_BASE_URL}
            </code>
          </p>
          <div className="space-y-3">
            <button 
              onClick={refetch} 
              className="block mx-auto px-6 py-2 bg-f1-red-600 text-white rounded hover:bg-f1-red-700 transition-colors"
            >
              Réessayer
            </button>
            <p className="text-sm text-f1-gray-100/50">
              Endpoint: <code>/api/races/next</code>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="mb-12">
        <h2 className="text-3xl font-formula1 lg:text-4xl font-bold text-f1-gray-100 mb-4">
          Prochaine Course
        </h2>
        <div className="w-24 h-1 bg-f1-red-600 mx-auto rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        
        <div className="relative">
          <div className="w-full h-80 rounded-3xl shadow-2xl relative overflow-hidden">
            <Image
              src={race.image_url || '/placeholder-circuit.svg'}
              alt={`Circuit ${race.track_name}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
              onError={(e) => {
                console.log(`Erreur de chargement de l'image: ${race.image_url}`)
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                const parent = target.parentElement
                if (parent) {
                  parent.className = 'w-full h-80 bg-gradient-to-br from-f1-red-600 to-f1-red-800 rounded-3xl shadow-2xl relative overflow-hidden flex items-center justify-center'
                  parent.innerHTML = `
                    <div class="text-center">
                      <div class="text-6xl mb-4">🏁</div>
                      <div class="text-white/80 text-sm font-medium">Circuit ${race.track_name}</div>
                    </div>
                  `
                }
              }}
              onLoad={() => {
                console.log(`Image circuit chargée avec succès: ${race.image_url}`)
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
              <span className="text-3xl">{getCountryFlag(race.country || '')}</span>
              <h3 className="text-2xl font-formula1 lg:text-3xl font-bold text-f1-gray-100">
                {race.race_name}
              </h3>
            </div>
            <div className="text-lg text-f1-gray-100/70">
              {race.track_name}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-f1-gray-600 rounded-full"></div>
            <span className="text-xl text-f1-gray-100/80">
              {race.city}, {race.country || 'Non spécifié'}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-f1-gray-600 rounded-full"></div>
            <span className="text-xl text-f1-gray-100/80">
              {new Date(race.started_at).toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })} à {new Date(race.started_at).toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-f1-gray-600 rounded-full"></div>
              <span className="text-xl text-f1-gray-100/80">
                {race.nb_laps} tours
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h4 className="text-2xl font-semibold text-f1-gray-100 mb-8">
          Temps restant avant le départ
        </h4>
        
        <Countdown 
          targetDate={race.started_at}
          size="lg"
          className="max-w-2xl mx-auto"
          onExpired={() => {
            console.log('La course a commencé !');
          }}
        />
      </div>
    </div>
  )
}
