'use client'

import { useState } from 'react'
import Image from 'next/image'
import { DriverCardProps } from '@/src/modeles/driverCardModel'

export default function PiloteCardFlip({ driver, isSelected = false, onClick }: DriverCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div 
      className={`bg-transparent rounded-lg cursor-pointer h-96 perspective-1000 group ${
        isSelected ? 'ring-4 ring-f1-red-600' : ''
      }`}
      onClick={() => onClick?.(driver)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:scale-105 ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        <div className="absolute inset-0 w-full h-full backface-hidden bg-f1-gray-100 rounded-lg shadow-xl overflow-hidden">
          <div className="relative w-full h-full flex flex-col">
            <div className="flex-1 bg-f1-gray-600 relative overflow-hidden">
              <div className="absolute inset-2 flex justify-end pointer-events-none">
                <span className="text-7xl font-black text-white/10 select-none">
                  #{driver.number}
                </span>
              </div>
              
              {driver.image_url ? (
                <Image
                  src={driver.image_url}
                  alt={`${driver.name} ${driver.surname}`}
                  fill
                  className="object-contain relative z-10"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center relative z-10">
                  <div className="text-6xl font-bold text-f1-gray-100">
                    {driver.name.charAt(0)}{driver.surname.charAt(0)}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex-shrink-0">
              <div 
                className="px-4 py-4 text-white"
                style={{ backgroundColor: driver.current_team?.color || '#555555' }}
              >
                <div className="text-center">
                  <div className="font-medium font-formula1 text-base leading-tight">
                    {driver.name} {driver.surname}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 w-full h-full bg-f1-gray-600 backface-hidden rotate-y-180 rounded-lg shadow-xl overflow-hidden">
          <div className="p-6 h-full flex flex-col justify-between text-white">
            
            <div className="text-center mb-4">
                <div className='flex items-center justify-between'>
                <h3 className="text-xl font-formula1 font-bold mb-2">
                    {driver.name} {driver.surname}
                </h3>
                <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-3xl font-bold text-f1-gray-100">#{driver.number}</span>
                </div>
              </div>
              {driver.current_team && (
                <div 
                  className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: driver.current_team.color }}
                >
                  {driver.current_team.name}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="grid grid-cols-2 gap-1">
                <div className="text-center bg-f1-gray-700 rounded-lg p-3">
                  <div className="text-2xl font-bold ">{driver.nb_championship}</div>
                  <div className="text-xs text-f1-gray-100/70">Championnats</div>
                </div>
                <div className="text-center bg-f1-gray-700 rounded-lg p-3">
                  <div className="text-2xl font-bold ">{driver.nb_victory}</div>
                  <div className="text-xs text-f1-gray-100/70">Victoires</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-1">
                <div className="text-center bg-f1-gray-700 rounded-lg p-3">
                  <div className="text-2xl font-bold ">{driver.nb_podiums}</div>
                  <div className="text-xs text-f1-gray-100/70">Podiums</div>
                </div>
                <div className="text-center bg-f1-gray-700 rounded-lg p-3">
                  <div className="text-2xl font-bold ">{driver.nb_pole}</div>
                  <div className="text-xs text-f1-gray-100/70">Pole Positions</div>
                </div>
              </div>
              
              <div className="text-center bg-f1-gray-700 rounded-lg p-3">
                <div className="text-2xl font-bold 0">{driver.nb_race}</div>
                <div className="text-xs text-f1-gray-100/70">Courses disputées</div>
              </div>
            </div>

            <div className="text-center mt-4">
              <div className="text-xs text-f1-gray-100/50">
                Cliquez pour sélectionner
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
