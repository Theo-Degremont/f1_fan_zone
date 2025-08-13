# Page Grand Prix - Documentation API

## 🎯 Structure actuelle

La page Grand Prix est prête pour l'intégration avec votre API. Voici la structure mise en place :

### 📁 Fichiers créés

1. **`/app/grand-prix/page.tsx`** - Page principale
2. **`/src/hooks/useGrandPrix.ts`** - Hook pour gérer les données
3. **`/src/components/GrandPrixCard.tsx`** - Composant carte réutilisable

## 🔧 Intégration API

### Dans `useGrandPrix.ts`, remplacez cette section :

```typescript
// TODO: Remplacer par l'appel API réel
// const response = await fetch(`${API_BASE_URL}/api/races?season=${year}`, {
//   headers: {
//     'X-API-Key': API_KEY
//   }
// });

// if (!response.ok) {
//   throw new Error(`Erreur HTTP: ${response.status}`);
// }

// const data = await response.json();
// setGrandPrixList(data.races || []);
```

### Par votre appel API réel :

```typescript
const response = await fetch(`${API_BASE_URL}/api/races?season=${year}`, {
  headers: {
    'X-API-Key': API_KEY,
    'Content-Type': 'application/json'
  }
});

if (!response.ok) {
  throw new Error(`Erreur HTTP: ${response.status}`);
}

const data = await response.json();
setGrandPrixList(data.races || data.grandPrix || data);
```

## 📋 Interface GrandPrix

L'interface est configurée pour ces propriétés :

```typescript
interface GrandPrix {
  id: number;                    // Identifiant unique
  name: string;                 // Nom du Grand Prix
  location: string;             // Ville/Lieu
  country: string;              // Pays
  date: string;                 // Date (ISO format)
  circuit: string;              // Nom du circuit
  round: number;                // Numéro de manche
  season: number;               // Année
  status: 'completed' | 'upcoming' | 'ongoing';
  
  // Résultats (optionnels)
  winner?: string;              // Vainqueur
  pole_position?: string;       // Pole position
  fastest_lap?: string;         // Meilleur tour
  race_time?: string;           // Temps de course
  weather?: string;             // Météo
  laps?: number;                // Nombre de tours
  distance?: string;            // Distance totale
}
```

## 🌐 URL attendue

La page accepte le paramètre d'année via l'état local. Pour une URL dynamique :

- **Actuel :** `/grand-prix` (filtre par boutons)
- **Futur possible :** `/grand-prix/2024` ou `/grand-prix?year=2024`

## 🎨 Fonctionnalités UI

### ✅ Implémentées
- Filtrage par année (2020-2025)
- Affichage en grille responsive
- Cartes avec informations essentielles
- États de chargement et d'erreur
- Badges de statut colorés
- Drapeaux des pays
- Glassmorphism design

### 🔮 À implémenter plus tard
- Navigation vers page de détail
- Pagination si beaucoup de courses
- Filtres avancés (circuit, pilote, etc.)
- Recherche textuelle
- Mode liste/grille

## 🚀 Points d'extension

1. **Page de détail :** Créer `/grand-prix/[id]/page.tsx`
2. **Filtres avancés :** Ajouter composant `GrandPrixFilters`
3. **Recherche :** Intégrer une barre de recherche
4. **Favoris :** Système de grands prix favoris

## 📱 Responsive

- **Mobile :** 1 colonne
- **Tablet :** 2 colonnes  
- **Desktop :** 3 colonnes

## 🎯 Prêt pour votre API !

Envoyez-moi l'URL de votre API et le format de réponse, je ferai l'intégration rapidement ! 🏁
