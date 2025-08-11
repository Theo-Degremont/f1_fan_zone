'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useNextRace } from '../hooks/useRaces'

export default function NextRace() {
  const { race, isLoading, error, refetch } = useNextRace()
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    if (!race) return

    const calculateTimeLeft = () => {
      const difference = +new Date(race.started_at) - +new Date()
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [race])

  // Fonction pour obtenir le drapeau du pays
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

  // État de chargement (comme TeamShowcase)
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

  // État d'erreur (comme TeamShowcase)
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
      {/* Titre de la section */}
      <div className="mb-12">
        <h2 className="text-4xl lg:text-5xl font-bold text-f1-gray-100 mb-4">
          Prochaine Course
        </h2>
        <div className="w-24 h-1 bg-f1-red-600 mx-auto rounded-full"></div>
      </div>

      {/* Contenu principal */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        
        {/* Côté gauche - Image du circuit */}
        <div className="relative">
          <div className="w-full h-80 rounded-3xl shadow-2xl relative overflow-hidden">
            <Image
              src={race.image_url}
              alt={`Circuit ${race.track_name}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
              onError={(e) => {
                console.log(`Erreur de chargement de l'image: ${race.image_url}`)
                // Fallback vers un fond par défaut en cas d'erreur
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
            
            {/* Overlay sombre pour améliorer la lisibilité */}
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* Effet de brillance */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
            
            {/* Décorations */}
            <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white/20 rounded-full"></div>
            <div className="absolute bottom-6 left-6 w-12 h-12 border-2 border-white/20 rounded-full"></div>
            <div className="absolute top-1/2 left-4 w-2 h-16 bg-white/10 rounded-full"></div>
          </div>
        </div>

        {/* Côté droit - Informations de la course */}
        <div className="space-y-8 text-left">
          
          {/* Nom du Grand Prix */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{getCountryFlag(race.country)}</span>
              <h3 className="text-3xl lg:text-4xl font-bold text-f1-gray-100">
                {race.race_name}
              </h3>
            </div>
            <div className="text-lg text-f1-gray-100/70">
              {race.track_name}
            </div>
          </div>

          {/* Lieu */}
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-f1-red-600 rounded-full"></div>
            <span className="text-xl text-f1-gray-100/80">
              {race.city}, {race.country}
            </span>
          </div>

          {/* Date de la course */}
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-f1-red-600 rounded-full"></div>
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

          {/* Informations supplémentaires */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-f1-red-600 rounded-full"></div>
              <span className="text-sm text-f1-gray-100/60">
                {race.nb_laps} tours
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-f1-red-600 rounded-full"></div>
              <span className="text-sm text-f1-gray-100/60">
                {race.nb_curve} virages
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Compte à rebours */}
      <div className="mt-16">
        <h4 className="text-2xl font-semibold text-f1-gray-100 mb-8">
          Temps restant avant le départ
        </h4>
        
        <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
          
          {/* Jours */}
          <div className="bg-f1-gray-800 rounded-2xl p-6 border border-f1-gray-600">
            <div className="text-4xl lg:text-5xl font-bold text-f1-red-400 mb-2">
              {timeLeft.days.toString().padStart(2, '0')}
            </div>
            <div className="text-sm text-f1-gray-100/60 uppercase tracking-wider">
              Jours
            </div>
          </div>

          {/* Heures */}
          <div className="bg-f1-gray-800 rounded-2xl p-6 border border-f1-gray-600">
            <div className="text-4xl lg:text-5xl font-bold text-f1-red-400 mb-2">
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <div className="text-sm text-f1-gray-100/60 uppercase tracking-wider">
              Heures
            </div>
          </div>

          {/* Minutes */}
          <div className="bg-f1-gray-800 rounded-2xl p-6 border border-f1-gray-600">
            <div className="text-4xl lg:text-5xl font-bold text-f1-red-400 mb-2">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <div className="text-sm text-f1-gray-100/60 uppercase tracking-wider">
              Minutes
            </div>
          </div>

          {/* Secondes */}
          <div className="bg-f1-gray-800 rounded-2xl p-6 border border-f1-gray-600">
            <div className="text-4xl lg:text-5xl font-bold text-f1-red-400 mb-2">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
            <div className="text-sm text-f1-gray-100/60 uppercase tracking-wider">
              Secondes
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
