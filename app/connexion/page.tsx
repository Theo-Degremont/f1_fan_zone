'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import NavBar from '../../src/components/NavBar'
import Footer from '../../src/components/Footer'
import { BubbleBackground } from '../../src/components/animate-ui/backgrounds/bubble'
import { useAuth } from '../../src/hooks/useAuth'
import { SecureInput } from '../../src/components/SecureInput'
import { useToast } from '../../src/components/Toast'
import { validateEmail, sanitizeInput } from '../../src/utils/validation'

export default function ConnexionPage() {
  const router = useRouter()
  
  // Hook pour l'authentification
  const { login, isLoading: authLoading, error: authError, clearError, isAuthenticated } = useAuth()
  
  // Hook pour les toasts
  const { showToast, ToastContainer } = useToast()

  // États pour les champs du formulaire
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  // États pour les erreurs de validation
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({})

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      showToast('Connexion réussie ! Bon retour !', 'success')
      router.push('/') // Rediriger vers la page d'accueil
    }
  }, [isAuthenticated, router, showToast]) // Remettre showToast maintenant qu'il est stable

  // Gestion des changements dans les inputs sécurisés
  const handleSecureInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Effacer l'erreur de validation pour ce champ
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }

    // Effacer l'erreur de l'API
    if (authError) {
      clearError()
    }
  }

  // Gestion des changements dans les inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Effacer l'erreur quand l'utilisateur tape
    if (authError) {
      clearError()
    }
  }

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Effacer les erreurs précédentes
    setValidationErrors({})
    clearError()

    // Validation côté client
    const errors: typeof validationErrors = {}
    
    const emailValidation = validateEmail(formData.email)
    if (!emailValidation.isValid) {
      errors.email = emailValidation.message
    }
    
    if (!formData.password) {
      errors.password = 'Le mot de passe est requis'
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      showToast('Veuillez corriger les erreurs dans le formulaire', 'error')
      return
    }

    try {
      // Nettoyer les données avant envoi
      const cleanEmail = sanitizeInput(formData.email.toLowerCase())
      
      // Appeler l'API de connexion
      await login(cleanEmail, formData.password)
      
      // Si succès, le toast et la redirection seront gérés par useEffect
      
    } catch (error) {
      console.error('Erreur lors de la connexion:', error)
      showToast('Erreur lors de la connexion', 'error')
    }
  }

  return (
    <div className="min-h-screen relative pt-20">
      {/* Background */}
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

      {/* Navigation */}
      <NavBar />

      {/* Contenu principal */}
      <section className="relative z-10 py-20">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Conteneur avec fond flou */}
          <div className="backdrop-blur-md bg-black/20 rounded-2xl shadow-2xl border border-white/10 p-8">
          
            {/* Titre */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-f1-gray-100 mb-2">
                Bon retour !
              </h1>
              <p className="text-f1-gray-100/70">
                Connectez-vous à votre compte F1 Fan Zone
              </p>
            </div>

          {/* Formulaire de connexion */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Messages d'erreur globaux */}
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
            
            {/* Email */}
            <SecureInput
              type="email"
              name="email"
              value={formData.email}
              onChange={handleSecureInputChange}
              placeholder="Email"
              error={validationErrors.email}
              required
            />

            {/* Mot de passe */}
            <SecureInput
              type="password"
              name="password"
              value={formData.password}
              onChange={handleSecureInputChange}
              placeholder="Mot de passe"
              error={validationErrors.password}
              required
            />

            {/* Se souvenir de moi */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData(prev => ({ ...prev, rememberMe: e.target.checked }))}
                  className="mr-2 text-red-600 bg-f1-gray-700 border-gray-400 rounded focus:ring-red-500 focus:ring-2"
                />
                <span className="text-f1-gray-100 text-sm">Se souvenir de moi</span>
              </label>
              <a href="#" className="text-red-600 hover:text-red-400 text-sm transition-colors">
                Mot de passe oublié ?
              </a>
            </div>

            {/* Bouton de connexion */}
            <button
              type="submit"
              disabled={authLoading}
              className="w-full px-6 py-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0.5 hover:shadow-lg active:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500/50 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {authLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Connexion en cours...
                </div>
              ) : (
                <>
                  <span className="relative z-10">Se connecter</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </>
              )}
            </button>

            {/* Séparateur */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-f1-gray-100/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-f1-gray-100/50">Ou continuer avec</span>
              </div>
            </div>

            {/* Bouton Google (pour plus tard) */}
            <button
              type="button"
              className="w-full px-4 py-3 border border-f1-gray-100/30 rounded-lg text-f1-gray-100 hover:bg-f1-gray-100/10 transition-colors duration-300 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continuer avec Google
            </button>

            {/* Lien vers l'inscription */}
            <div className="text-center mt-6">
              <p className="text-f1-gray-100/70">
                Pas encore de compte ?{' '}
                <a href="/inscription" className="text-red-600 hover:text-red-400 transition-colors">
                  S'inscrire
                </a>
              </p>
            </div>

          </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      
      {/* Toast Container */}
      <ToastContainer />
    </div>
  )
}
