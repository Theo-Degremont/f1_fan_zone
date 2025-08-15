'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { TeamsApiService } from '../services/teamsApi'
import { Team } from '../modeles/teamModel'

export default function TeamShowcase() {
  const [teams, setTeams] = useState<Team[]>([])
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const carRef = useRef<HTMLDivElement>(null)

  // Charger les données depuis l'API
  useEffect(() => {
    const loadTeams = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const apiTeams = await TeamsApiService.getAllTeams()
        
        // Trier les équipes par nombre de championnats puis par victoires
        apiTeams.sort((a, b) => {
          if (b.nb_championship !== a.nb_championship) {
            return b.nb_championship - a.nb_championship
          }
          return b.nb_victory - a.nb_victory
        })
        
        setTeams(apiTeams)
      } catch (err) {
        console.error('Erreur lors du chargement des équipes:', err)
        setError('Impossible de charger les données des équipes. Vérifiez que l\'API est démarrée.')
      } finally {
        setIsLoading(false)
      }
    }

    loadTeams()
  }, [])

  // Intersection Observer pour détecter le scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1, // Réduire le seuil pour déclencher plus tôt
        rootMargin: '50px 0px 50px 0px' // Ajouter une marge pour déclencher avant que l'élément soit complètement visible
      }
    )

    if (carRef.current) {
      observer.observe(carRef.current)
    }

    return () => {
      if (carRef.current) {
        observer.unobserve(carRef.current)
      }
    }
  }, [])

  // Rotation automatique des équipes
  useEffect(() => {
    if (teams.length === 0) return

    const interval = setInterval(() => {
      setIsAnimating(true)
      
      setTimeout(() => {
        setCurrentTeamIndex((prevIndex) => 
          prevIndex === teams.length - 1 ? 0 : prevIndex + 1
        )
        setIsAnimating(false)
      }, 300) 
      
    }, 10000)

    return () => clearInterval(interval)
  }, [teams.length])

  // État de chargement
  if (isLoading) {
    return (
      <div className="grid lg:grid-cols-2 gap-5 items-center w-full">
        <div className="space-y-5">
          <div className="relative w-full h-96 lg:h-[400px] bg-f1-gray-600 animate-pulse rounded-lg">
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
              <div className="h-12 bg-f1-gray-500 rounded mb-3 w-3/4"></div>
              <div className="h-6 bg-f1-gray-500 rounded mb-8 w-1/2"></div>
              <div className="grid grid-cols-3 gap-4 w-full max-w-md">
                <div className="h-16 bg-f1-gray-500 rounded"></div>
                <div className="h-16 bg-f1-gray-500 rounded"></div>
                <div className="h-16 bg-f1-gray-500 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-96 lg:h-[500px] bg-f1-gray-600 animate-pulse rounded-lg"></div>
      </div>
    )
  }

  // État d'erreur
  if (error || teams.length === 0) {
    return (
      <div className="grid lg:grid-cols-2 gap-5 items-center w-full">
        <div className="text-center text-f1-gray-100 space-y-6">
          <div className="text-6xl">🏁</div>
          <h3 className="text-2xl font-bold mb-4">Connexion à l'API en cours...</h3>
          <p className="text-f1-gray-100/70 max-w-md mx-auto">
            {error || 'Aucune équipe trouvée. Assurez-vous que votre API est démarrée sur'} 
            <br />
            <code className="bg-f1-gray-600 px-2 py-1 rounded text-sm mt-2 inline-block">
              {process.env.NEXT_PUBLIC_API_BASE_URL}
            </code>
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.reload()} 
              className="block mx-auto px-6 py-2 bg-f1-red-600 text-white rounded hover:bg-f1-red-700 transition-colors"
            >
              Réessayer
            </button>
            <p className="text-sm text-f1-gray-100/50">
              Endpoint: <code>/api/teams</code>
            </p>
          </div>
        </div>
        <div className="w-full h-96 lg:h-[500px] bg-f1-gray-600/30 rounded-lg flex items-center justify-center">
          <div className="text-center text-f1-gray-100/50">
            <div className="text-4xl mb-4">📡</div>
            <p>En attente des données API...</p>
          </div>
        </div>
      </div>
    )
  }

  const currentTeam = teams[currentTeamIndex]

  // Debug: afficher les informations de l'équipe actuelle
  console.log('Équipe actuelle:', currentTeam?.name, 'Key:', currentTeam?.key)
  console.log('isVisible:', isVisible, 'isAnimating:', isAnimating)

  return (
    <>    
    <div className="grid lg:grid-cols-2 gap-5 items-center w-full">
      <div className={`space-y-5 transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        
        <div className="relative group">
          <div className="relative w-full h-96 lg:h-[400px] mx-auto lg:mx-0">
            <Image
              src={`/images/team_logo/logo_${currentTeam.key}.png`}
              alt={`${currentTeam.name} logo`}
              fill
              className={currentTeam.key === 'alpine' ? "object-contain grayscale brightness-25 contrast-105" : "object-contain grayscale brightness-50 contrast-105"}
              onError={(e) => {
                // Fallback vers un logo par défaut en cas d'erreur
                const target = e.target as HTMLImageElement
                target.src = '/images/team_logo/logo_ferrari.png'
              }}
            />
          </div>
          
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-f1-gray-100 mb-3 drop-shadow-2xl">
              {currentTeam.name}
            </h2>
            <p className="text-xl text-f1-gray-100/90 drop-shadow-lg mb-8">
              Fondée en {new Date(currentTeam.date_start).getFullYear()}
            </p>
            
            <div className="grid grid-cols-4 gap-1 w-full max-w-lg">
              
              <div>
                <div className="text-2xl lg:text-3xl font-bold drop-shadow-lg">{currentTeam.nb_victory}</div>
                <div className="text-xs lg:text-sm text-f1-gray-100/80 drop-shadow-md">Victoires</div>
              </div>

              <div>
                <div className="text-2xl lg:text-3xl font-bold drop-shadow-lg">{currentTeam.nb_race}</div>
                <div className="text-xs lg:text-sm text-f1-gray-100/80 drop-shadow-md">Courses</div>
              </div>

              <div>
                <div className="text-2xl lg:text-3xl font-bold drop-shadow-lg">{currentTeam.nb_championship}</div>
                <div className="text-xs lg:text-sm text-f1-gray-100/80 drop-shadow-md">Titres</div>
              </div>

              <div>
                <div className="text-2xl lg:text-3xl font-bold drop-shadow-lg">{currentTeam.nb_podiums}</div>
                <div className="text-xs lg:text-sm text-f1-gray-100/80 drop-shadow-md">Podiums</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div 
        ref={carRef}
        className={`transition-all duration-1000 ease-out ${
          isAnimating 
            ? 'opacity-0 translate-x-4' 
            : isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="relative w-full h-96 lg:h-[500px] group">
          <Image
            src={`/images/team_cars/${currentTeam.key}_f1_cars.png`}
            alt={`${currentTeam.name} F1 car`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain group-hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              console.log(`Erreur de chargement de l'image: /images/team_cars/${currentTeam.key}_f1_cars.png`)
              // Fallback vers une voiture par défaut en cas d'erreur
              const target = e.target as HTMLImageElement
              target.src = '/images/team_cars/ferrari_f1_cars.png'
            }}
            onLoad={() => {
              console.log(`Image chargée avec succès: /images/team_cars/${currentTeam.key}_f1_cars.png`)
            }}
            priority={false}
          />
          
          <div 
            className="absolute inset-0 rounded-lg opacity-20 group-hover:opacity-30 transition-opacity duration-700 blur-xl"
            style={{ 
              background: `radial-gradient(circle, ${currentTeam.color}40 0%, transparent 70%)` 
            }}
          />
        </div>
      </div>
    </div>
    </>
  )
}
