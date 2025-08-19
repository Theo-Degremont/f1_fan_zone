'use client'

import React, { useState, useEffect } from 'react'
import NavBar from '../../src/components/NavBar'
import Footer from '../../src/components/Footer'
import { BubbleBackground } from '../../src/components/animate-ui/backgrounds/bubble'
import { useGrandPrix, type GrandPrix } from '../../src/hooks/useGrandPrix'
import { GrandPrixCard } from '../../src/components/GrandPrixCard'

export default function GrandPrixPage() {
  const { grandPrixList, isLoading, error, loadGrandPrixBySeason, clearError } = useGrandPrix()

  const [selectedYear, setSelectedYear] = useState<number>(2025)
  const [availableYears] = useState<number[]>([2025, 2024, 2023, 2022, 2021, 2020])

  useEffect(() => {
    loadGrandPrixBySeason(selectedYear)
  }, [selectedYear, loadGrandPrixBySeason])

  return (
    <div className="min-h-screen relative pt-20">
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

      <main className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h1 className="text-5xl font-formula1 font-bold text-f1-gray-100 mb-4">
              Grands Prix
            </h1>
            <p className="text-xl text-f1-gray-100/70 max-w-2xl mx-auto">
              Découvrez tous les Grands Prix de Formule 1 par saison, 
              avec les résultats, dates et informations essentielles.
            </p>
          </div>

          <div className="mb-8">
            <div className="backdrop-blur-md bg-black/20 rounded-2xl shadow-2xl border border-white/10 p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h2 className="text-2xl font-formula1 font-semibold text-f1-gray-100">
                  Saison {selectedYear}
                </h2>
                
                <div className="flex flex-wrap gap-2">
                  {availableYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className={`px-4 py-2 rounded-lg font-formula1 font-medium transition-all duration-300 ${
                        selectedYear === year
                          ? 'bg-red-600 text-white shadow-lg transform scale-105'
                          : 'bg-f1-gray-700 text-f1-gray-100 hover:bg-f1-gray-600 hover:text-white'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
              <span className="ml-4 text-f1-gray-100 text-lg">
                Chargement des Grands Prix...
              </span>
            </div>
          )}

          {!isLoading && Array.isArray(grandPrixList) && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {grandPrixList.map((grandPrix) => (
                <GrandPrixCard
                  key={grandPrix.id}
                  grandPrix={grandPrix}
                />
              ))}
            </div>
          )}

          {!isLoading && Array.isArray(grandPrixList) && grandPrixList.length === 0 && (
            <div className="text-center py-12">
              <div className="backdrop-blur-md bg-black/20 rounded-2xl shadow-2xl border border-white/10 p-12">
                <h3 className="text-2xl font-bold text-f1-gray-100 mb-2">
                  Aucun Grand Prix trouvé
                </h3>
                <p className="text-f1-gray-100/70">
                  Il n'y a pas de Grands Prix pour l'année {selectedYear}.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
