import { Driver } from './driverModel'
import { Team } from './teamModel'

// Types pour les props des composants de comparaison
export interface DriverCardProps {
  driver: Driver
  isSelected?: boolean
  onClick?: (driver: Driver) => void
}

export interface EmptySlotProps {
  slotNumber: number
  onClick?: () => void
}

// Export des types existants pour le comparateur
export type { Driver } from './driverModel'
export type { Team } from './teamModel'
