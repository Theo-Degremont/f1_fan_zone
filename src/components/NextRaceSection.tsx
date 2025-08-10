'use client'

import { useState, useEffect } from 'react'

interface RaceInfo {
  grandPrix: string
  circuit: string
  city: string
  country: string
  raceDate: Date
  flag: string
}

// Prochaine course (exemple)
const nextRace: RaceInfo = {
  grandPrix: "Grand Prix de Monaco",
  circuit: "Circuit de Monaco",
  city: "Monte-Carlo",
  country: "Monaco",
  raceDate: new Date('2025-05-25T15:00:00'), // Exemple de date
  flag: "🇲🇨"
}

export default function NextRace() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +nextRace.raceDate - +new Date()
      
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
  }, [])

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
        
        {/* Côté gauche - Image du tracé (carré rouge) */}
        <div className="relative">
          <div className="w-full h-80 bg-gradient-to-br from-f1-red-600 to-f1-red-800 rounded-3xl shadow-2xl relative overflow-hidden">
            {/* Effet de brillance */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
            
            {/* Contenu du "tracé" */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🏁</div>
                <div className="text-white/80 text-sm font-medium">
                  Tracé du Circuit
                </div>
              </div>
            </div>
            
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
              <span className="text-3xl">{nextRace.flag}</span>
              <h3 className="text-3xl lg:text-4xl font-bold text-f1-gray-100">
                {nextRace.grandPrix}
              </h3>
            </div>
            <div className="text-lg text-f1-gray-100/70">
              {nextRace.circuit}
            </div>
          </div>

          {/* Lieu */}
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-f1-red-600 rounded-full"></div>
            <span className="text-xl text-f1-gray-100/80">
              {nextRace.city}, {nextRace.country}
            </span>
          </div>

          {/* Date de la course */}
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-f1-red-600 rounded-full"></div>
            <span className="text-xl text-f1-gray-100/80">
              {nextRace.raceDate.toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })} à {nextRace.raceDate.toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
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

        {/* Bouton d'action */}
        <div className="mt-12">
          <button className="bg-gradient-to-r from-f1-red-600 to-f1-red-700 hover:from-f1-red-700 hover:to-f1-red-800 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-f1-red-600/30">
            Voir tous les détails de la course
          </button>
        </div>
      </div>
    </div>
  )
}
