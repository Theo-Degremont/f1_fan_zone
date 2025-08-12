'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { sanitizeInput, getPasswordStrength, validateEmail } from '../utils/validation'

interface SecureInputProps {
  type: 'text' | 'email' | 'password'
  name: string
  value: string
  onChange: (name: string, value: string) => void
  placeholder: string
  error?: string
  required?: boolean
  showPasswordStrength?: boolean
  className?: string
  onEmailCheck?: (email: string) => Promise<{ isAvailable: boolean; message?: string }>
  showEmailValidation?: boolean
}

export function SecureInput({
  type,
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  showPasswordStrength = false,
  className = '',
  onEmailCheck,
  showEmailValidation = false
}: SecureInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [emailCheckStatus, setEmailCheckStatus] = useState<{
    isChecking: boolean;
    isAvailable: boolean | null;
    message: string | null;
  }>({
    isChecking: false,
    isAvailable: null,
    message: null
  })

  // Gérer les changements de valeur avec nettoyage
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value
    
    // Nettoyer la valeur selon le type
    if (type === 'text' || type === 'email') {
      newValue = sanitizeInput(newValue)
    }
    // Pour les mots de passe, on ne fait pas de nettoyage agressif
    // car ils peuvent contenir des caractères spéciaux légitimes
    
    onChange(name, newValue)
  }, [name, onChange, type])

  // Vérification de l'email avec debounce
  useEffect(() => {
    if (type === 'email' && showEmailValidation && onEmailCheck && value) {
      const emailValidation = validateEmail(value)
      
      if (emailValidation.isValid) {
        setEmailCheckStatus(prev => ({ ...prev, isChecking: true, isAvailable: null, message: null }))
        
        const timeoutId = setTimeout(async () => {
          try {
            const result = await onEmailCheck(value)
            setEmailCheckStatus({
              isChecking: false,
              isAvailable: result.isAvailable,
              message: result.message || null
            })
          } catch (error) {
            setEmailCheckStatus({
              isChecking: false,
              isAvailable: null,
              message: 'Erreur lors de la vérification'
            })
          }
        }, 800) // Debounce de 800ms

        return () => clearTimeout(timeoutId)
      } else {
        setEmailCheckStatus({
          isChecking: false,
          isAvailable: null,
          message: null
        })
      }
    } else if (type === 'email' && !value) {
      // Reset quand le champ email est vide
      setEmailCheckStatus({
        isChecking: false,
        isAvailable: null,
        message: null
      })
    }
  }, [value, type, showEmailValidation]) // Retirer onEmailCheck des dépendances

  // Obtenir la force du mot de passe
  const passwordStrength = showPasswordStrength && type === 'password' && value 
    ? getPasswordStrength(value) 
    : null

  // Styles de base
  const baseStyles = "w-full px-4 py-3 rounded-lg bg-f1-gray-700 border text-white placeholder-f1-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
  
  // Styles conditionnels selon l'état
  const conditionalStyles = error 
    ? 'border-red-500 focus:border-red-500' 
    : 'border-gray-400 focus:border-red-500 hover:border-gray-300'

  const finalClassName = `${baseStyles} ${conditionalStyles} ${className}`

  return (
    <div className="space-y-2">
      <div className="relative">
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          name={name}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          required={required}
          className={finalClassName}
          autoComplete={type === 'password' ? 'new-password' : 'on'}
          maxLength={type === 'password' ? 50 : type === 'email' ? 255 : 25}
        />

        {/* Bouton pour montrer/cacher le mot de passe */}
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        )}

        {/* Indicateur de vérification d'email */}
        {type === 'email' && showEmailValidation && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {emailCheckStatus.isChecking ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            ) : emailCheckStatus.isAvailable === true ? (
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : emailCheckStatus.isAvailable === false ? (
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            ) : null}
          </div>
        )}
      </div>

      {/* Indicateur de force du mot de passe */}
      {passwordStrength && isFocused && (
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Force du mot de passe:</span>
            <span className={`text-xs font-medium ${passwordStrength.color}`}>
              {passwordStrength.strength}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1">
            <div 
              className={`h-1 rounded-full transition-all duration-300 ${
                passwordStrength.score <= 2 ? 'bg-red-500' :
                passwordStrength.score <= 4 ? 'bg-yellow-500' :
                passwordStrength.score <= 5 ? 'bg-green-500' : 'bg-green-600'
              }`}
              style={{ width: `${Math.min((passwordStrength.score / 6) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Statut de vérification de l'email */}
      {type === 'email' && showEmailValidation && emailCheckStatus.message && (
        <div className={`text-sm mt-1 flex items-center ${
          emailCheckStatus.isAvailable === true 
            ? 'text-green-500' 
            : emailCheckStatus.isAvailable === false 
              ? 'text-f1-red-200' 
              : 'text-yellow-500'
        }`}>
          {emailCheckStatus.isAvailable === true ? (
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : emailCheckStatus.isAvailable === false ? (
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
          {emailCheckStatus.message}
        </div>
      )}

      {/* Message d'erreur */}
      {error && (
        <p className="text-red-400 text-sm mt-1 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}
