import React from 'react';
import { ClassementPilote } from '../modeles/classementModel';

interface ClassementCardProps {
  classement: ClassementPilote;
  rank: number;
}

export function ClassementCard({ classement, rank }: ClassementCardProps) {
  
  // Fonction pour obtenir l'icône de position
  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${position}`;
    }
  };

  // Fonction pour obtenir la couleur de la position
  const getPositionColor = (position: number) => {
    switch (position) {
      case 1: return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 2: return 'text-gray-300 bg-gray-300/20 border-gray-300/30';
      case 3: return 'text-orange-400 bg-orange-400/20 border-orange-400/30';
      default: return 'text-f1-gray-100 bg-f1-gray-700/20 border-f1-gray-600/30';
    }
  };

  return (
    <div className="backdrop-blur-md bg-black/20 rounded-2xl shadow-2xl border border-white/10 p-6 hover:bg-black/30 transition-all duration-300 hover:transform hover:scale-105">
      
      {/* Header avec position et points */}
      <div className="flex items-center justify-between mb-4">
        <div className={`px-4 py-2 rounded-full text-lg font-bold border ${getPositionColor(classement.position)}`}>
          {getPositionIcon(classement.position)}
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-f1-red-400">
            {classement.points}
          </div>
          <div className="text-sm text-f1-gray-100/60">
            points
          </div>
        </div>
      </div>

      {/* Informations du pilote */}
      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-bold text-f1-gray-100">
            {classement.driver.name} {classement.driver.surname}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-f1-gray-100/70 text-sm">
              #{classement.driver.number}
            </span>
          </div>
        </div>

        {/* Équipe actuelle */}
        {classement.driver.current_team ? (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-black/20 border border-white/10">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: classement.driver.current_team.color }}
            />
            <span className="text-f1-gray-100/80 text-sm">
              {classement.driver.current_team.name}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-500/10 border border-gray-500/20">
            <div className="w-4 h-4 rounded-full bg-gray-500" />
            <span className="text-gray-400 text-sm italic">
              Sans équipe
            </span>
          </div>
        )}
      </div>

      {/* Badge spécial pour le podium */}
      {classement.position <= 3 && (
        <div className="mt-4 pt-3 border-t border-white/10">
          <div className={`text-center text-xs font-medium px-3 py-1 rounded-full ${
            classement.position === 1 ? 'bg-yellow-400/20 text-yellow-400' :
            classement.position === 2 ? 'bg-gray-300/20 text-gray-300' :
            'bg-orange-400/20 text-orange-400'
          }`}>
            🏆 PODIUM
          </div>
        </div>
      )}
    </div>
  );
}

export default ClassementCard;
