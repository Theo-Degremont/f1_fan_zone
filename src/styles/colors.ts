// Palette de couleurs pour F1 Fan Zone - Thème sombre
export const colors = {
  // Couleurs principales
  primary: {
    red: '#DA3B23',        // Rouge principal
    dark: '#2B2B2B',       // Gris foncé principal
    lightGray: '#F2F2F2',  // Blanc cassé
    white: '#FFFFFF',      // Blanc pur
  },

  // Dérivés du rouge #DA3B23
  red: {
    900: '#830F00',        // Rouge très foncé
    800: '#C41700',        // Rouge foncé
    600: '#DA3B23',        // Rouge principal
    400: '#FF705D',        // Rouge clair
    200: '#FFB7AD',        // Rouge très clair
  },

  // Dérivés du gris #2B2B2B
  gray: {
    900: '#000000',        // Noir
    800: '#1C1C1C',        // Gris très foncé
    700: '#2B2B2B',        // Gris principal
    600: '#383838',        // Gris moyen
    500: '#555555',        // Gris clair
    100: '#F2F2F2',        // Blanc cassé
    50: '#FFFFFF',         // Blanc pur
  },

  // Couleurs d'état adaptées au thème sombre
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },

  // Couleurs spécifiques aux équipes F1 (pour plus tard)
  teams: {
    mercedes: '#00D2BE',
    redBull: '#0600EF',
    ferrari: '#DC143C',
    mclaren: '#FF8700',
    alpine: '#0090FF',
    astonMartin: '#006F62',
    haas: '#FFFFFF',
    alphaTauri: '#2B4562',
    alfa: '#900000',
    williams: '#005AFF',
  },

  // Couleurs pour les dégradés
  gradients: {
    redPrimary: 'linear-gradient(135deg, #DA3B23 0%, #830F00 100%)',
    darkToRed: 'linear-gradient(135deg, #2B2B2B 0%, #DA3B23 100%)',
    darkGradient: 'linear-gradient(135deg, #000000 0%, #2B2B2B 100%)',
  }
};

// Export des couleurs pour Tailwind CSS
