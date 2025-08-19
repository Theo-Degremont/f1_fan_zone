import React from 'react';
import type { GrandPrix } from '../hooks/useGrandPrix';

interface GrandPrixCardProps {
  grandPrix: GrandPrix;
  onViewDetails?: (grandPrix: GrandPrix) => void;
}

export function GrandPrixCard({ grandPrix }: GrandPrixCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isRaceFinished = () => {
    const raceDate = new Date(grandPrix.started_at);
    const now = new Date();
    const timeDifference = now.getTime() - raceDate.getTime();
    const fiveHoursInMs = 5 * 60 * 60 * 1000; 
    
    return timeDifference > fiveHoursInMs;
  };

  return (
    <div className="backdrop-blur-md bg-black/20 rounded-2xl shadow-2xl border border-white/10 p-6 hover:bg-black/30 transition-all duration-300 hover:transform hover:scale-105 relative group cursor-pointer">
      <div className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-center justify-center z-10">
        <div className="text-center">
          <div className="text-white text-lg font-bold mb-2">
            Voir en détails
          </div>
        </div>
      </div>


      <div className="relative z-0">

        {isRaceFinished() && (
          <div className="mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium border bg-green-500/20 text-green-400 border-green-500/30">
              Terminé
            </span>
          </div>
        )}
        {!isRaceFinished() && (
          <div className="mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium border bg-red-900 text-red-400 border-red-400">
            À venir
            </span>
          </div>
        )}

        <div className="flex items-center gap-3 mb-4">
          <div>
            <h3 className="text-lg font-formula1 font-bold text-f1-gray-100">
              {grandPrix.race_name}
            </h3>
            <p className="text-sm text-f1-gray-100/70">
              {formatDate(grandPrix.started_at)}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <img 
            src={grandPrix.image_url || '/placeholder-circuit.svg'} 
            alt={`Circuit ${grandPrix.track_name}`}
            className="w-full h-32 object-contain bg-white/5 rounded-lg"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-circuit.svg';
            }}
          />
        </div>

        <div className="flex text-center align-items-center space-y-1">
          <h4 className="text-f1-gray-100/60">
            {grandPrix.track_name}, {grandPrix.city}, {grandPrix.country || 'Non spécifié'}
          </h4>
        </div>
      </div>
    </div>
  );
}

export default GrandPrixCard;
