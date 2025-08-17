'use client'

import { EmptySlotProps } from '@/src/modeles/driverCardModel'

export default function EmptySlot({ slotNumber, onClick }: EmptySlotProps) {
  return (
    <div 
      className="bg-f1-gray-100 rounded-lg shadow-lg cursor-pointer transition-all duration-300 overflow-hidden border-2 border-f1-gray-300"
      onClick={onClick}
    >
      <div className="relative">
        <div className="w-full h-88 bg-f1-gray-200 relative overflow-hidden">
          <div className="w-full h-full flex items-center justify-center backdrop-blur-sm bg-f1-gray-100/50">
            <div className="text-center">
              <div className="text-lg font-medium text-f1-gray-500">
                Pilote n°{slotNumber}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}