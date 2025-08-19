'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import NavBar from '@/src/components/NavBar'
import Footer from '@/src/components/Footer'
import ProtectedRoute from '@/src/components/ProtectedRoute'
import PiloteCard from '@/src/components/PiloteCard'
import PiloteCardFlip from '@/src/components/PiloteCardFlip'
import EmptySlot from '@/src/components/EmptySlot'
import { BubbleBackground } from '@/src/components/animate-ui/backgrounds/bubble'
import { Driver } from '@/src/modeles/driverCardModel'

export default function ComparateurPage() {
  const router = useRouter()
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [selectedDriver1, setSelectedDriver1] = useState<Driver | null>(null)
  const [selectedDriver2, setSelectedDriver2] = useState<Driver | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDrivers()
  }, [])

  const fetchDrivers = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:3002/api/drivers', {
        headers: {
          'X-API-Key': 'f1-api-key-2025-secure-access-f1fanzone-production'
        }
      })

      if (!response.ok) {
        throw new Error('Erreur lors du chargement des pilotes')
      }

      const data = await response.json()
      setDrivers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  const handleDriverClick = (driver: Driver) => {
    if (!selectedDriver1) {
      setSelectedDriver1(driver)
    } else if (!selectedDriver2) {
      setSelectedDriver2(driver)
    } else {

      setSelectedDriver1(driver)
      setSelectedDriver2(null)
    }
  }

  const handleRemoveDriver = (position: number) => {
    if (position === 1) setSelectedDriver1(null)
    else setSelectedDriver2(null)
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
            <div className="text-xl text-f1-gray-100">Chargement des pilotes...</div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen relative">
      <BubbleBackground
            interactive = {true}
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
      
      <div className="container mx-auto px-10 py-8 pt-40 relative z-10">

        <div className="relative flex items-center justify-center gap-30 mb-8 max-w-7xl mx-auto">
          <div className="w-75">
            {selectedDriver1 ? (
              <PiloteCard 
                driver={selectedDriver1}
                isSelected={true}
                onClick={() => handleRemoveDriver(1)} 
              />
            ) : (
              <EmptySlot 
                slotNumber={1}
                onClick={() => {}} 
              />
            )}
          </div>

          <div className="w-75">
            {selectedDriver2 ? (
              <PiloteCard 
                driver={selectedDriver2}
                isSelected={true}
                onClick={() => handleRemoveDriver(2)} 
              />
            ) : (
              <EmptySlot 
                slotNumber={2}
                onClick={() => {}} 
              />
            )}
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div>
              <Image
                src="/images/drapeau-damier-double.png"
                alt="Versus - Drapeau damier"
                width={180}
                height={180}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <button
            className={`px-8 py-4 text-white font-bold text-xl rounded-lg transition-all duration-300 ${
              selectedDriver1 && selectedDriver2
                ? 'bg-f1-red-600 hover:bg-f1-red-800 cursor-pointer shadow-lg'
                : 'bg-f1-gray-700 cursor-not-allowed shadow-lg'
            }`}
            disabled={!selectedDriver1 || !selectedDriver2}
            onClick={() => {
              if (selectedDriver1 && selectedDriver2) {
                router.push(`/comparateur/resultat?driver1=${selectedDriver1.id}&driver2=${selectedDriver2.id}`)
              }
            }}
          >
            Comparer
          </button>
        </div>

        <hr className="border-f1-gray-100 mb-8 opacity-30" />

        <div className="mb-8">
          <h2 className="text-2xl font-formula1 font-bold text-center mb-6 text-f1-gray-100">
            Sélectionnez vos pilotes
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {drivers.map((driver) => (
              <PiloteCardFlip 
                key={driver.id} 
                driver={driver}
                isSelected={selectedDriver1?.id === driver.id || selectedDriver2?.id === driver.id}
                onClick={handleDriverClick}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
      </div>
    </ProtectedRoute>
  )
}
