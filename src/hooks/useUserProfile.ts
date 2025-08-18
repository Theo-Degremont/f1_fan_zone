import { useState, useEffect } from 'react';
import { UserProfile, UpdateUserProfile, userService } from '../services/userService';

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Vérifier si l'utilisateur est connecté (côté client uniquement)
  const isAuthenticated = () => {
    if (typeof window === 'undefined') return false; // Protection SSR
    return !!localStorage.getItem('access_token');
  };

  // Récupérer le profil utilisateur
  const fetchUserProfile = async () => {
    if (!isAuthenticated()) {
      console.log('Utilisateur non connecté, impossible de récupérer le profil');
      setError('Veuillez vous connecter pour accéder à votre profil');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await userService.getUserProfile();
      
      if (response.success && response.data) {
        console.log('✅ Profil utilisateur récupéré avec succès:', response.data);
        setProfile(response.data);
      } else {
        console.warn('⚠️ Erreur lors de la récupération du profil:', response.message);
        setError(response.message || 'Erreur lors de la récupération du profil');
      }
    } catch (err) {
      console.error('Erreur lors de la récupération du profil:', err);
      setError('Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  // Mettre à jour le profil utilisateur
  const updateProfile = async (profileData: UpdateUserProfile): Promise<boolean> => {
    if (!isAuthenticated()) {
      console.log('🔒 Utilisateur non connecté, impossible de mettre à jour le profil');
      setError('Veuillez vous connecter pour modifier votre profil');
      return false;
    }

    setIsUpdating(true);
    setError(null);

    try {
      const response = await userService.updateUserProfile(profileData);

      if (response.success && response.data) {
        console.log('✅ Profil mis à jour avec succès');
        setProfile(response.data);
        return true;
      } else {
        setError(response.message || 'Erreur lors de la mise à jour du profil');
        return false;
      }
    } catch (err) {
      console.error('Erreur lors de la mise à jour du profil:', err);
      setError('Erreur de connexion');
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  // Charger le profil au montage du composant
  useEffect(() => {
    fetchUserProfile();
  }, []);

  return {
    profile,
    isLoading,
    isUpdating,
    error,
    fetchUserProfile,
    updateProfile,
    isAuthenticated: isAuthenticated(),
  };
};
