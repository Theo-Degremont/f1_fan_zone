'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import NavBar from '../../src/components/NavBar'
import Footer from '../../src/components/Footer'
import { BubbleBackground } from '../../src/components/animate-ui/backgrounds/bubble'
import { useTeams } from '../../src/hooks/useTeams'
import { useAuth } from '../../src/hooks/useAuth'
import { useUserProfile } from '../../src/hooks/useUserProfile'
import { SecureInput } from '../../src/components/SecureInput'
import { useToast } from '../../src/components/Toast'
import { sanitizeInput } from '../../src/utils/validation'

export default function ProfilePage() {
  const router = useRouter()
  
  const { teams: apiTeams, isLoading: teamsLoading, error: teamsError } = useTeams()
  const { logout, isAuthenticated, checkEmailAvailability } = useAuth()
  const { profile, isLoading: profileLoading, isUpdating, error: profileError, updateProfile } = useUserProfile()
  const { showToast, ToastContainer } = useToast()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    favorite_team_id: null as number | null,
    favorite_driver_id: null as number | null
  })

  const [validationErrors, setValidationErrors] = useState<{
    username?: string;
    email?: string;
  }>({})

  const [showTeamsList, setShowTeamsList] = useState(false)
  const [showDriversList, setShowDriversList] = useState(false)

  useEffect(() => {
    if (!isAuthenticated && !profileLoading) {
      showToast('Veuillez vous connecter pour accéder à votre profil', 'error')
      router.push('/connexion')
    }
  }, [isAuthenticated, profileLoading, router, showToast])

  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username || '',
        email: profile.email || '',
        favorite_team_id: profile.favorite_team_id,
        favorite_driver_id: profile.favorite_driver_id
      })
    }
  }, [profile])

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
  }

  const handleTeamSelect = (teamId: number) => {
    setFormData(prev => ({
      ...prev,
      favorite_team_id: teamId
    }))
    setShowTeamsList(false)
  }

  const handleDriverSelect = (driverId: number) => {
    setFormData(prev => ({
      ...prev,
      favorite_driver_id: driverId
    }))
    setShowDriversList(false)
  }

  const validateForm = async () => {
    const errors: typeof validationErrors = {}
    
    if (!formData.username.trim()) {
      errors.username = 'Le pseudo est requis'
    } else if (formData.username.trim().length < 3) {
      errors.username = 'Le pseudo doit contenir au moins 3 caractères'
    }

    if (!formData.email.trim()) {
      errors.email = 'L\'email est requis'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Format d\'email invalide'
    } else {
      // Vérifier la disponibilité de l'email seulement si l'email a changé
      if (profile && formData.email.toLowerCase() !== profile.email.toLowerCase()) {
        try {
          const emailCheck = await checkEmailAvailability(formData.email)
          if (!emailCheck.isAvailable) {
            errors.email = 'Cet email est déjà utilisé par un autre compte'
          }
        } catch (error) {
          console.warn('Impossible de vérifier la disponibilité de l\'email:', error)        }
      }
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const isValid = await validateForm()
    if (!isValid) {
      showToast('Veuillez corriger les erreurs dans le formulaire', 'error')
      return
    }

    try {
      const cleanData = {
        username: sanitizeInput(formData.username),
        email: sanitizeInput(formData.email.toLowerCase()),
        favorite_team_id: formData.favorite_team_id,
        favorite_driver_id: formData.favorite_driver_id
      }
      
      const success = await updateProfile(cleanData)
      
      if (success) {
        console.log('Profil mis à jour avec succès')
      } else {
        if (profileError?.includes('email') || profileError?.includes('Email')) {
          showToast('Cet email est déjà utilisé par un autre compte', 'error')
        } else if (profileError?.includes('username') || profileError?.includes('pseudo')) {
          showToast('Ce pseudo est déjà utilisé par un autre compte', 'error')
        } else if (profileError?.includes('CORS') || profileError?.includes('PUT') || profileError?.includes('PATCH')) {
          showToast('Fonctionnalité temporairement indisponible. L\'équipe technique travaille sur le problème.', 'error')
        } else {
          showToast(profileError || 'Erreur lors de la mise à jour du profil', 'error')
        }
      }
      
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error)
      showToast('Une erreur est survenue lors de la mise à jour', 'error')
    }
  }

  const handleLogout = () => {
    logout()
    showToast('Vous avez été déconnecté avec succès', 'success')
    router.push('/')
  }

  const closeDropdowns = () => {
    setShowTeamsList(false)
    setShowDriversList(false)
  }

  const selectedTeam = apiTeams.find(team => team.id === formData.favorite_team_id)
  const selectedDriver = drivers.find(driver => driver.id === formData.favorite_driver_id)

  if (profileLoading || teamsLoading) {
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
          <p className="text-white">Chargement de votre profil...</p>
        </div>
      </div>
    )
  }

  if (profileError || teamsError) {
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
          <p className="text-red-500 mb-4">Erreur: {profileError || teamsError}</p>
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
              <h1 className="text-4xl font-bold text-f1-gray-100 mb-2">
                Mon Profil
              </h1>
              <p className="text-f1-gray-100/70">
                Modifiez vos informations personnelles
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {profileError && (
                <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-4">
                  <p className="text-red-400 text-sm flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {profileError}
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

              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setShowTeamsList(!showTeamsList)
                    setShowDriversList(false)
                  }}
                  className="w-full px-4 py-3 rounded-lg bg-f1-gray-700 border border-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 hover:border-gray-300 transition-all duration-300 flex items-center justify-between cursor-pointer min-h-[48px]"
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
                disabled={isUpdating}
                className="w-full px-6 py-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0.5 hover:shadow-lg active:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500/50 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isUpdating ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Mise à jour en cours...
                  </div>
                ) : (
                  <>
                    <span className="relative z-10">Mettre à jour</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full px-6 py-4 bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0.5 hover:shadow-lg active:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500/50 relative overflow-hidden group"
              >
                <span className="relative z-10">Se déconnecter</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>

            </form>
          </div>
        </div>
      </section>

      <Footer />
      
      <ToastContainer />
    </div>
  )
}
