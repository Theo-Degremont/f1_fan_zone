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
      showToast('Vous êtes déjà connecté !', 'info')
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
      
      // Si succès, afficher le toast de connexion réussie
      showToast('Connexion réussie ! Bon retour !', 'success')
      
      // La redirection sera gérée par useEffect si nécessaire
      
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
            <div className="flex items-center justify-center">
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
            {/* Lien vers l'inscription */}
            <div className="text-center mt-1">
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
