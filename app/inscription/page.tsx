'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import NavBar from '../../src/components/NavBar'
import Footer from '../../src/components/Footer'
import { BubbleBackground } from '../../src/components/animate-ui/backgrounds/bubble'
import { useTeams } from '../../src/hooks/useTeams'
import { useAuth } from '../../src/hooks/useAuth'
import { SecureInput } from '../../src/components/SecureInput'
import { validateRegistrationForm, sanitizeInput } from '../../src/utils/validation'

export default function InscriptionPage() {
  const router = useRouter()
  
  const { teams: apiTeams, isLoading: teamsLoading, error: teamsError } = useTeams()
  
  const { register, isLoading: authLoading, error: authError, clearError, isAuthenticated, checkEmailAvailability } = useAuth()
  

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    favorite_team_id: null as number | null,
    favorite_driver_id: null as number | null
  })

  const [validationErrors, setValidationErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    teams?: string;
  }>({})

  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/') 
    }
  }, [isAuthenticated, router])


  const [showTeamsList, setShowTeamsList] = useState(false)
  const [showDriversList, setShowDriversList] = useState(false)

  const drivers = useMemo(() => {
    const allDrivers: Array<{id: number, name: string, surname: string, teamName: string}> = []
    
    apiTeams.forEach(team => {
      if (team.current_drivers) {
        team.current_drivers.forEach(driver => {
          allDrivers.push({
            id: driver.id,
            name: driver.name,
            surname: driver.surname,
            teamName: team.name
          })
        })
      }
    })
    
    return allDrivers
  }, [apiTeams])

  const handleSecureInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }

    if (authError) {
      clearError()
    }
  }

  useEffect(() => {
    if (isFormSubmitted) {
      const validation = validateRegistrationForm(formData)
      setValidationErrors(validation.errors)
    }
  }, [formData, isFormSubmitted])

  const handleTeamSelect = (teamId: number) => {
    setFormData(prev => ({
      ...prev,
      favorite_team_id: teamId
    }))
    setShowTeamsList(false)
    
    if (validationErrors.teams) {
      setValidationErrors(prev => ({
        ...prev,
        teams: undefined
      }))
    }
  }

  const handleDriverSelect = (driverId: number) => {
    setFormData(prev => ({
      ...prev,
      favorite_driver_id: driverId
    }))
    setShowDriversList(false)
    
    if (validationErrors.teams) {
      setValidationErrors(prev => ({
        ...prev,
        teams: undefined
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsFormSubmitted(true)
    
    setValidationErrors({})
    clearError()

    const validation = validateRegistrationForm(formData)
    
    if (!validation.isValid) {
      setValidationErrors(validation.errors)
      return
    }

    try {
      const { confirmPassword, ...registrationData } = formData
      
      const cleanData = {
        ...registrationData,
        username: sanitizeInput(registrationData.username),
        email: sanitizeInput(registrationData.email.toLowerCase())
      }
      
      await register(cleanData)
      
      
      
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error)
    }
  }

  const closeDropdowns = () => {
    setShowTeamsList(false)
    setShowDriversList(false)
  }

  const selectedTeam = apiTeams.find(team => team.id === formData.favorite_team_id)
  const selectedDriver = drivers.find(driver => driver.id === formData.favorite_driver_id)

  if (teamsLoading) {
    return (
      <div className="min-h-screen relative pt-20 flex items-center justify-center">
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
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-white">Chargement des équipes et pilotes...</p>
        </div>
      </div>
    )
  }

  if (teamsError) {
    return (
      <div className="min-h-screen relative pt-20 flex items-center justify-center">
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
        <div className="text-center">
          <p className="text-red-500 mb-4">Erreur: {teamsError}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="text-white hover:text-red-500 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    )
  }

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

      <section className="relative z-10 py-20">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="backdrop-blur-md bg-black/20 rounded-2xl shadow-2xl border border-white/10 p-8">
          
            <div className="text-center mb-8">
              <h1 className="text-4xl font-formula1 font-bold text-f1-gray-100 mb-2">
                Rejoignez la communauté
              </h1>
              <p className="text-f1-gray-100/70">
                Créez votre compte F1 Fan Zone
              </p>
            </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {authError && (
              <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-4">
                <p className="text-red-400 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {authError}
                </p>
              </div>
            )}
            
            <SecureInput
              type="text"
              name="username"
              value={formData.username}
              onChange={handleSecureInputChange}
              placeholder="Pseudo"
              error={validationErrors.username}
              required
            />

            <SecureInput
              type="email"
              name="email"
              value={formData.email}
              onChange={handleSecureInputChange}
              placeholder="Email"
              error={validationErrors.email}
              onEmailCheck={checkEmailAvailability}
              showEmailValidation={true}
              required
            />

            <SecureInput
              type="password"
              name="password"
              value={formData.password}
              onChange={handleSecureInputChange}
              placeholder="Mot de passe"
              error={validationErrors.password}
              showPasswordStrength={true}
              required
            />

            <SecureInput
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleSecureInputChange}
              placeholder="Confirmer le mot de passe"
              error={validationErrors.confirmPassword}
              required
            />

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowTeamsList(!showTeamsList)
                  setShowDriversList(false)
                }}
                className={`w-full px-4 py-3 rounded-lg bg-f1-gray-700 border text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 hover:border-gray-300 transition-all duration-300 flex items-center justify-between cursor-pointer min-h-[48px] ${
                  validationErrors.teams 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-gray-400 focus:border-red-500'
                }`}
              >
                {selectedTeam ? (
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-3"
                      style={{ backgroundColor: selectedTeam.color }}
                    ></div>
                    {selectedTeam.name}
                  </div>
                ) : (
                  <span className="text-f1-gray-100/50">Choisissez votre équipe favorite</span>
                )}
                <svg className="w-5 h-5 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {showTeamsList && (
                <>
                  <div className="fixed inset-0 z-40" onClick={closeDropdowns}></div>
                  <div className="absolute top-full left-0 right-0 mt-1 bg-f1-gray-700 border border-gray-400 rounded-lg shadow-2xl z-50 max-h-48 overflow-y-auto animate-in slide-in-from-top-2 duration-200">
                    {apiTeams.map((team) => (
                      <button
                        key={team.id}
                        type="button"
                        onClick={() => handleTeamSelect(team.id)}
                        className="w-full px-4 py-3 text-left text-white hover:bg-red-600/10 hover:text-red-400 transition-colors duration-200 flex items-center border-b border-gray-600 last:border-b-0"
                      >
                        <div 
                          className="w-4 h-4 rounded-full mr-3"
                          style={{ backgroundColor: team.color }}
                        ></div>
                        {team.name}
                      </button>
                    ))}
                  </div>
                </>
              )}
              
              {validationErrors.teams && (
                <p className="text-red-400 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {validationErrors.teams}
                </p>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowDriversList(!showDriversList)
                  setShowTeamsList(false)
                }}
                className="w-full px-4 py-3 rounded-lg bg-f1-gray-700 border border-gray-400 text-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 hover:border-gray-300 transition-all duration-300 flex items-center justify-between cursor-pointer min-h-[48px]"
              >
                {selectedDriver ? (
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{selectedDriver.surname} {selectedDriver.name}</span>
                    <span className="text-sm text-f1-gray-100/60">{selectedDriver.teamName}</span>
                  </div>
                ) : (
                  <span className="text-f1-gray-100/50">Choisissez votre pilote favori</span>
                )}
                <svg className="w-5 h-5 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {showDriversList && (
                <>
                  <div className="fixed inset-0 z-40" onClick={closeDropdowns}></div>
                  <div className="absolute top-full left-0 right-0 mt-1 bg-f1-gray-700 border border-gray-400 rounded-lg shadow-2xl z-50 max-h-48 overflow-y-auto animate-in slide-in-from-top-2 duration-200">
                    {drivers.map((driver) => (
                      <button
                        key={driver.id}
                        type="button"
                        onClick={() => handleDriverSelect(driver.id)}
                        className="w-full px-4 py-3 text-left text-white hover:bg-red-600/10 hover:text-red-400 transition-colors duration-200 border-b border-gray-600 last:border-b-0"
                      >
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{driver.surname} {driver.name}</span>
                          <span className="text-sm text-f1-gray-100/60">{driver.teamName}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full px-6 py-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0.5 hover:shadow-lg active:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500/50 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {authLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Inscription en cours...
                </div>
              ) : (
                <>
                  <span className="relative z-10">S'inscrire</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </>
              )}
            </button>

            <div className="text-center mt-6">
              <p className="text-f1-gray-100/70">
                Déjà membre ?{' '}
                <a href="/connexion" className="text-f1-red-600 hover:text-f1-red-400 transition-colors">
                  Se connecter
                </a>
              </p>
            </div>

          </form>
          </div>
        </div>
      </section>

      
      <Footer />
      
    </div>
  )
}
