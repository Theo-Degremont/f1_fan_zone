'use client'

import { useEffect } from 'react'
import { useCountdown, type TimeLeft } from '../hooks/useCountdown'

interface CountdownProps {
  targetDate: string | Date
  onExpired?: () => void
  className?: string
  showLabels?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export default function Countdown({ 
  targetDate, 
  onExpired, 
  className = '', 
  showLabels = true,
  size = 'md'
}: CountdownProps) {
  const timeLeft = useCountdown(targetDate)

  useEffect(() => {
    if (timeLeft.expired && onExpired) {
      onExpired()
    }
  }, [timeLeft.expired, onExpired])

  // Configuration des tailles
  const sizeConfig = {
    sm: {
      container: 'p-3',
      text: 'text-2xl lg:text-3xl',
      label: 'text-xs'
    },
    md: {
      container: 'p-4',
      text: 'text-3xl lg:text-4xl',
      label: 'text-sm'
    },
    lg: {
      container: 'p-6',
      text: 'text-4xl lg:text-5xl',
      label: 'text-sm'
    }
  }

  const currentSize = sizeConfig[size]

  if (timeLeft.expired) {
    return (
      <div className={`text-center ${className}`}>
        <div className="bg-f1-gray-800 rounded-2xl p-8 border border-f1-gray-600">
          <div className="text-4xl mb-4">🏁</div>
          <div className="text-xl font-bold text-f1-gray-100">
            Événement terminé !
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-4 gap-4 ${className}`}>
      {/* Jours */}
      <div className={`bg-f1-gray-800 rounded-2xl border border-f1-gray-600 ${currentSize.container}`}>
        <div className={`${currentSize.text} font-bold text-f1-red-400 mb-2`}>
          {timeLeft.days.toString().padStart(2, '0')}
        </div>
        {showLabels && (
          <div className={`${currentSize.label} text-f1-gray-100/60 uppercase tracking-wider`}>
            Jours
          </div>
        )}
      </div>

      {/* Heures */}
      <div className={`bg-f1-gray-800 rounded-2xl border border-f1-gray-600 ${currentSize.container}`}>
        <div className={`${currentSize.text} font-bold text-f1-red-400 mb-2`}>
          {timeLeft.hours.toString().padStart(2, '0')}
        </div>
        {showLabels && (
          <div className={`${currentSize.label} text-f1-gray-100/60 uppercase tracking-wider`}>
            Heures
          </div>
        )}
      </div>

      {/* Minutes */}
      <div className={`bg-f1-gray-800 rounded-2xl border border-f1-gray-600 ${currentSize.container}`}>
        <div className={`${currentSize.text} font-bold text-f1-red-400 mb-2`}>
          {timeLeft.minutes.toString().padStart(2, '0')}
        </div>
        {showLabels && (
          <div className={`${currentSize.label} text-f1-gray-100/60 uppercase tracking-wider`}>
            Minutes
          </div>
        )}
      </div>

      {/* Secondes */}
      <div className={`bg-f1-gray-800 rounded-2xl border border-f1-gray-600 ${currentSize.container}`}>
        <div className={`${currentSize.text} font-bold text-f1-red-400 mb-2`}>
          {timeLeft.seconds.toString().padStart(2, '0')}
        </div>
        {showLabels && (
          <div className={`${currentSize.label} text-f1-gray-100/60 uppercase tracking-wider`}>
            Secondes
          </div>
        )}
      </div>
    </div>
  )
}
