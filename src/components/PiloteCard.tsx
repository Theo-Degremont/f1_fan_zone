'use client'

import Image from 'next/image'
import { DriverCardProps } from '@/src/modeles/driverCardModel'

export default function PiloteCard({ driver, isSelected = false, onClick }: DriverCardProps) {
  return (
    <div 
          className={`bg-transparent rounded-lg cursor-pointer h-88 perspective-1000 group`}
          onClick={() => onClick?.(driver)}
        >
          <div className={`relative w-full h-full   `}>
            
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
                      className="object-contain relative "
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
                      <div className="font-medium text-base leading-tight">
                        {driver.name} {driver.surname}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}
