'use client'

import React, { useState, useEffect } from 'react';
import NavBar from '../../src/components/NavBar';
import Footer from '../../src/components/Footer';
import ProtectedRoute from '../../src/components/ProtectedRoute';
import { BubbleBackground } from '../../src/components/animate-ui/backgrounds/bubble';
import { useClassement } from '../../src/hooks/useClassement';
import { ClassementTeam } from '../../src/modeles/classementModel';
import { authService } from '../../src/services/authService';

export default function ClassementPage() {
  const { classements, isLoading, error, season, totalDrivers, loadClassementBySeason, clearError } = useClassement();
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const [activeTab, setActiveTab] = useState<'pilote' | 'team'>('pilote');
  
  const [classementsTeam, setClassementsTeam] = useState<ClassementTeam[]>([]);
  const [isLoadingTeam, setIsLoadingTeam] = useState(false);
  const [errorTeam, setErrorTeam] = useState<string | null>(null);
  const [totalTeams, setTotalTeams] = useState(0);

  const availableYears = [2025, 2024, 2023, 2022, 2021, 2020];

  const loadClassementTeamBySeason = async (year: number) => {
    try {
      setIsLoadingTeam(true);
      setErrorTeam(null);
      
      const response = await authService.authenticatedFetch(`http://localhost:3002/api/classements-teams/season/${year}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`L'API des classements d'équipes n'est pas encore disponible pour la saison ${year}`);
        }
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('📊 Données reçues de l\'API classements teams:', data);
      console.log('📊 Structure de data:', typeof data, Object.keys(data));
      
      let classements = [];
      if (data.data && data.data.classements) {
        classements = data.data.classements;
      } else if (data.classements) {
        classements = data.classements;
      } else if (Array.isArray(data)) {
        classements = data;
      } else {
        console.log('Data complet:', JSON.stringify(data, null, 2));
      }
      
      setClassementsTeam(classements);
      setTotalTeams(classements.length);
    } catch (err) {
      console.error('Erreur lors du chargement du classement teams:', err);
      setErrorTeam(err instanceof Error ? err.message : 'Erreur inconnue');
      setClassementsTeam([]);
      setTotalTeams(0);
    } finally {
      setIsLoadingTeam(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'pilote') {
      loadClassementBySeason(selectedYear);
    } else {
      loadClassementTeamBySeason(selectedYear);
    }
  }, [selectedYear, activeTab, loadClassementBySeason]);

  return (
    <ProtectedRoute>
      <NavBar />
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
      <div className="min-h-screen relative pt-35">
        
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-formula1 md:text-5xl font-bold text-f1-gray-100 mb-4">
              Classement {activeTab === 'pilote' ? 'Pilotes' : 'Équipes'}
            </h1>
            <p className="text-xl text-f1-gray-100/70 max-w-2xl mx-auto">
              Découvrez le classement des {activeTab === 'pilote' ? 'pilotes' : 'équipes'} par saison, leurs points et leurs performances
            </p>
            <div className="w-24 h-1 bg-f1-red-600 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="flex justify-center mb-8">
            <div className="backdrop-blur-md bg-black/20 rounded-2xl shadow-2xl border border-white/10 p-2">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('pilote')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === 'pilote'
                      ? 'bg-f1-red-600 text-f1-gray-50 shadow-lg transform scale-105'
                      : 'bg-transparent text-f1-gray-100/70 hover:bg-f1-gray-700/30 hover:text-f1-gray-100'
                  }`}
                >
                  Pilotes
                </button>
                <button
                  onClick={() => setActiveTab('team')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === 'team'
                      ? 'bg-f1-red-600 text-f1-gray-50 shadow-lg transform scale-105'
                      : 'bg-transparent text-f1-gray-100/70 hover:bg-f1-gray-700/30 hover:text-f1-gray-100'
                  }`}
                >
                  Équipes
                </button>
              </div>
            </div>
          </div>

          {/* Filtre par année */}
          <div className="mb-8">
            <div className="backdrop-blur-md bg-black/20 rounded-2xl shadow-2xl border border-white/10 p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h2 className="text-2xl font-formula1 font-semibold text-f1-gray-100">
                  Saison {selectedYear}
                </h2>
                
                {/* Sélecteur d'année */}
                <div className="flex flex-wrap gap-2">
                  {availableYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className={`px-4 py-2 rounded-lg font-formula1 font-medium transition-all duration-300 ${
                        selectedYear === year
                          ? 'bg-f1-red-600 text-white shadow-lg transform scale-105'
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

          

          {/* État d'erreur */}
          {((activeTab === 'pilote' && error) || (activeTab === 'team' && errorTeam)) && (
            <div className="text-center py-12">
              <div className="backdrop-blur-md bg-f1-red-800/20 rounded-2xl shadow-2xl border border-f1-red-600/30 p-12 max-w-md mx-auto">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-2xl font-bold text-f1-red-400 mb-2">
                  Erreur de chargement
                </h3>
                <p className="text-f1-red-400/70 mb-4">
                  {activeTab === 'pilote' ? error : errorTeam}
                </p>
                <button 
                  onClick={() => {
                    if (activeTab === 'pilote') {
                      clearError();
                      loadClassementBySeason(selectedYear);
                    } else {
                      setErrorTeam(null);
                      loadClassementTeamBySeason(selectedYear);
                    }
                  }}
                  className="px-6 py-2 bg-f1-red-600 text-f1-gray-50 rounded-lg hover:bg-f1-red-800 transition-colors"
                >
                  Réessayer
                </button>
              </div>
            </div>
          )}

          {/* État de chargement */}
          {((activeTab === 'pilote' && isLoading) || (activeTab === 'team' && isLoadingTeam)) && (
            <div className="text-center py-12">
              <div className="backdrop-blur-md bg-f1-gray-800/30 rounded-2xl shadow-2xl border border-f1-gray-600/20 p-12">
                <div className="animate-spin w-12 h-12 border-4 border-f1-red-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <span className="ml-4 text-f1-gray-100 text-lg">
                  Chargement du classement {activeTab === 'pilote' ? 'pilotes' : 'équipes'} {selectedYear}...
                </span>
              </div>
            </div>
          )}

          {/* Liste du classement - Tableau Pilotes */}
          {activeTab === 'pilote' && !isLoading && Array.isArray(classements) && classements.length > 0 && (
            <div className="backdrop-blur-md bg-f1-gray-800/30 rounded-2xl shadow-2xl border border-f1-gray-600/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  {/* En-tête du tableau */}
                  <thead className="bg-f1-red-600/20 font-formula1 border-b border-f1-red-600/30">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-f1-gray-100 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-f1-gray-100 uppercase tracking-wider">
                        Pilote
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-f1-gray-100 uppercase tracking-wider">
                        Équipe
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-f1-gray-100 uppercase tracking-wider">
                        Points
                      </th>
                    </tr>
                  </thead>

                  {/* Corps du tableau */}
                  <tbody className="divide-y divide-f1-gray-600/20">
                    {classements.map((classement, index) => (
                      <tr 
                        key={classement.id} 
                        className="hover:bg-f1-gray-700/20 transition-colors duration-200"
                      >
                        {/* Position */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              classement.position === 1 ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30' :
                              classement.position === 2 ? 'bg-gray-300/20 text-gray-300 border border-gray-300/30' :
                              classement.position === 3 ? 'bg-orange-400/20 text-orange-400 border border-orange-400/30' :
                              'bg-f1-gray-700/20 text-f1-gray-100 border border-f1-gray-600/30'
                            }`}>
                              {classement.position }
                            </div>
                          </div>
                        </td>

                        {/* Pilote */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-lg font-semibold text-f1-gray-100">
                                {classement.driver.name} {classement.driver.surname}
                              </div>
                              <div className="text-sm text-f1-gray-100/60">
                                #{classement.driver.number}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Équipe */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          {classement.driver.team_history.length > 0 ? (
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: classement.driver.team_history[0].team.color }}
                              />
                              <span className="text-f1-gray-100 text-sm">
                                {classement.driver.team_history[0].team.name}
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 rounded-full bg-f1-gray-500" />
                              <span className="text-f1-gray-500 text-sm italic">
                                Sans équipe
                              </span>
                            </div>
                          )}
                        </td>

                        {/* Points */}
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-2xl font-bold text-f1-red-400">
                            {classement.points}
                          </div>
                          <div className="text-xs text-f1-gray-100/60">
                            pts
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Liste du classement - Tableau Équipes */}
          {activeTab === 'team' && !isLoadingTeam && Array.isArray(classementsTeam) && classementsTeam.length > 0 && (
            <div className="backdrop-blur-md bg-f1-gray-800/30 rounded-2xl shadow-2xl border border-f1-gray-600/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  {/* En-tête du tableau */}
                  <thead className="bg-f1-red-600/20 border-b border-f1-red-600/30">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-f1-gray-100 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-f1-gray-100 uppercase tracking-wider">
                        Équipe
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-f1-gray-100 uppercase tracking-wider">
                        Victoires
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-f1-gray-100 uppercase tracking-wider">
                        Victoires Totales
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-f1-gray-100 uppercase tracking-wider">
                        Points
                      </th>
                    </tr>
                  </thead>

                  {/* Corps du tableau */}
                  <tbody className="divide-y divide-f1-gray-600/20">
                    {classementsTeam.map((classement, index) => (
                      <tr 
                        key={classement.id} 
                        className="hover:bg-f1-gray-700/20 transition-colors duration-200"
                      >
                        {/* Position */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              classement.position === 1 ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30' :
                              classement.position === 2 ? 'bg-gray-300/20 text-gray-300 border border-gray-300/30' :
                              classement.position === 3 ? 'bg-orange-400/20 text-orange-400 border border-orange-400/30' :
                              'bg-f1-gray-700/20 text-f1-gray-100 border border-f1-gray-600/30'
                            }`}>
                              {classement.position === 1 ? '🥇' :
                               classement.position === 2 ? '🥈' :
                               classement.position === 3 ? '🥉' :
                               classement.position}
                            </div>
                          </div>
                        </td>

                        {/* Équipe */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-6 h-6 rounded-full"
                              style={{ backgroundColor: classement.team.color }}
                            />
                            <div>
                              <div className="text-lg font-semibold text-f1-gray-100">
                                {classement.team.name}
                              </div>
                              <div className="text-sm text-f1-gray-100/60">
                                {classement.team.nb_championship} titre{classement.team.nb_championship > 1 ? 's' : ''}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Victoires */}
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="text-lg font-bold text-f1-gray-100">
                            {classement.nb_wins}
                          </div>
                          <div className="text-xs text-f1-gray-100/60">
                            cette saison
                          </div>
                        </td>

                        {/* Podiums */}
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="text-lg font-bold text-f1-gray-100">
                            {classement.team.nb_victory}
                          </div>
                          <div className="text-xs text-f1-gray-100/60">
                            victoires
                          </div>
                        </td>

                        {/* Points */}
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-2xl font-bold text-f1-red-400">
                            {classement.points}
                          </div>
                          <div className="text-xs text-f1-gray-100/60">
                            pts
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Message si aucun classement */}
          {((activeTab === 'pilote' && !isLoading && Array.isArray(classements) && classements.length === 0 && !error) ||
            (activeTab === 'team' && !isLoadingTeam && Array.isArray(classementsTeam) && classementsTeam.length === 0 && !errorTeam)) && (
            <div className="text-center py-12">
              <div className="backdrop-blur-md bg-f1-gray-800/30 rounded-2xl shadow-2xl border border-f1-gray-600/20 p-12">
                <div className="text-6xl mb-4">🏁</div>
                <h3 className="text-2xl font-bold text-f1-gray-100 mb-2">
                  Aucun classement trouvé
                </h3>
                <p className="text-f1-gray-100/70">
                  Il n'y a pas de données de classement {activeTab === 'pilote' ? 'pilotes' : 'équipes'} pour la saison {selectedYear}.
                </p>
                {activeTab === 'team' && (
                  <p className="text-f1-gray-100/50 text-sm mt-2">
                    💡 L'API des classements d'équipes sera bientôt disponible.
                  </p>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </ProtectedRoute>
  );
}