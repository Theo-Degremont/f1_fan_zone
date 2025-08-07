'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface Team {
  id: string
  name: string
  founded: string
  victories: number
  grandPrix: number
  championships: number
  logoPath: string
  carPath: string
  primaryColor: string
}

const teams: Team[] = [
  {
    id: 'red-bull',
    name: 'Red Bull Racing',
    founded: '2005',
    victories: 95,
    grandPrix: 380,
    championships: 6,
    logoPath: '/images/team_logo/logo_red-bull.png',
    carPath: '/images/team_cars/red-bull_f1_cars.png',
    primaryColor: '#0600EF'
  },
  {
    id: 'ferrari',
    name: 'Scuderia Ferrari',
    founded: '1950',
    victories: 243,
    grandPrix: 1050,
    championships: 16,
    logoPath: '/images/team_logo/logo_ferrari.png',
    carPath: '/images/team_cars/ferrari_f1_cars.png',
    primaryColor: '#DC143C'
  },
  {
    id: 'mercedes',
    name: 'Mercedes-AMG Petronas',
    founded: '2010',
    victories: 115,
    grandPrix: 280,
    championships: 8,
    logoPath: '/images/team_logo/logo_mercedes.png',
    carPath: '/images/team_cars/mercedes_f1_cars.png',
    primaryColor: '#00D2BE'
  },
  {
    id: 'mclaren',
    name: 'McLaren F1 Team',
    founded: '1966',
    victories: 183,
    grandPrix: 920,
    championships: 8,
    logoPath: '/images/team_logo/logo_mclaren.png',
    carPath: '/images/team_cars/mclaren_f1_cars.png',
    primaryColor: '#FF8700'
  },
  {
    id: 'alpine',
    name: 'Alpine F1 Team',
    founded: '1981',
    victories: 17,
    grandPrix: 450,
    championships: 2,
    logoPath: '/images/team_logo/logo_alpine.png',
    carPath: '/images/team_cars/alpine_f1_cars.png',
    primaryColor: '#0090FF'
  },
  {
    id: 'aston-martin',
    name: 'Aston Martin F1',
    founded: '2021',
    victories: 1,
    grandPrix: 60,
    championships: 0,
    logoPath: '/images/team_logo/logo_aston-martin.png',
    carPath: '/images/team_cars/aston-martin_f1_cars.png',
    primaryColor: '#006F62'
  },
  {
    id: 'williams',
    name: 'Williams Racing',
    founded: '1977',
    victories: 114,
    grandPrix: 790,
    championships: 9,
    logoPath: '/images/team_logo/logo_williams.png',
    carPath: '/images/team_cars/williams_f1_cars.png',
    primaryColor: '#005AFF'
  },
  {
    id: 'haas',
    name: 'Haas F1 Team',
    founded: '2016',
    victories: 0,
    grandPrix: 160,
    championships: 0,
    logoPath: '/images/team_logo/logo_haas.png',
    carPath: '/images/team_cars/haas_f1_cars.png',
    primaryColor: '#FFFFFF'
  },
  {
    id: 'racing-bulls',
    name: 'Racing Bulls',
    founded: '2016',
    victories: 0,
    grandPrix: 160,
    championships: 0,
    logoPath: '/images/team_logo/logo_racing-bulls.png',
    carPath: '/images/team_cars/racing-bulls_f1_cars.png',
    primaryColor: '#009dffff'
  },
  {
    id: 'stake',
    name: 'Stake F1 Team',
    founded: '2024',
    victories: 0,
    grandPrix: 160,
    championships: 0,
    logoPath: '/images/team_logo/logo_stake.png',
    carPath: '/images/team_cars/stake_f1_cars.png',
    primaryColor: '#0ed700ff'
  },


]

export default function TeamShowcase() {
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const carRef = useRef<HTMLDivElement>(null)

  // Intersection Observer pour détecter le scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.2, // Déclenche quand 20% de l'élément est visible
        rootMargin: '0px 0px -100px 0px' // Déclenche un peu avant que l'élément soit complètement visible
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

  useEffect(() => {
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
  }, [])

  const currentTeam = teams[currentTeamIndex]

  return (
    <div className="grid lg:grid-cols-2 gap-5 items-center w-full">
      
      <div className={`space-y-5 transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        
        <div className="relative group">
          <div className="relative w-full h-96 lg:h-[400px] mx-auto lg:mx-0">
            <Image
              src={currentTeam.logoPath}
              alt={`${currentTeam.name} logo`}
              fill
              className={currentTeam.id=='alpine' ? "object-contain grayscale brightness-25 contrast-105 " : "object-contain grayscale brightness-50 contrast-105 "}
            />
          </div>
          
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-f1-gray-100 mb-3 drop-shadow-2xl">
              {currentTeam.name}
            </h2>
            <p className="text-xl text-f1-gray-100/90 drop-shadow-lg mb-8">
              Fondée en {currentTeam.founded}
            </p>
            
            <div className="grid grid-cols-3 gap-1 w-full max-w-md">
              
              <div>
                <div className="text-3xl font-bold drop-shadow-lg">{currentTeam.victories}</div>
                <div className="text-sm text-f1-gray-100/80 drop-shadow-md">Victoires</div>
              </div>

              <div>
                <div className="text-3xl font-bold drop-shadow-lg">{currentTeam.grandPrix}</div>
                <div className="text-sm text-f1-gray-100/80 drop-shadow-md">Grands Prix</div>
              </div>

              <div>
                <div className="text-3xl font-bold drop-shadow-lg">{currentTeam.championships}</div>
                <div className="text-sm text-f1-gray-100/80 drop-shadow-md">Championnats</div>
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
            src={currentTeam.carPath}
            alt={`${currentTeam.name} F1 car`}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-700"
          />
          
          <div 
            className="absolute inset-0 rounded-lg opacity-20 group-hover:opacity-30 transition-opacity duration-700 blur-xl"
            style={{ 
              background: `radial-gradient(circle, ${currentTeam.primaryColor}40 0%, transparent 70%)` 
            }}
          />
        </div>
      </div>
    </div>
  )
}
