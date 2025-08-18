'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useNews } from '../hooks/useNews'

// Interface correspondant au modèle API
interface INews {
  _id: string
  title: string
  content: string
  image_url?: string
  link?: string
  author?: string
  published_at?: string
  is_active: boolean
}

// Fonction utilitaire pour formater la date
const formatDate = (dateString: string | undefined) => {
  if (!dateString) return 'Date inconnue'
  
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(dateString))
}

// Fonction utilitaire pour extraire une catégorie depuis le contenu
const extractCategory = (content: string): string => {
  if (content.toLowerCase().includes('championnat') || content.toLowerCase().includes('titre')) return 'Championnat'
  if (content.toLowerCase().includes('transfert') || content.toLowerCase().includes('pilote')) return 'Transferts'
  if (content.toLowerCase().includes('circuit') || content.toLowerCase().includes('calendrier')) return 'Calendrier'
  if (content.toLowerCase().includes('technologie') || content.toLowerCase().includes('innovation')) return 'Technique'
  return 'Actualités'
}

export default function NewsSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const { news, isLoading, error } = useNews()

  const handleNewsClick = (link?: string) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer')
    }
  }

  // Affichage du loading
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-f1-gray-100 mb-4">
            Dernières Actualités F1
          </h2>
          <div className="w-24 h-1 bg-f1-red-600 mx-auto rounded-full mb-6"></div>
        </div>
        
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-white">Chargement des actualités...</p>
          </div>
        </div>
      </div>
    )
  }

  // Affichage d'erreur
  if (error) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-f1-gray-100 mb-4">
            Dernières Actualités F1
          </h2>
          <div className="w-24 h-1 bg-f1-red-600 mx-auto rounded-full mb-6"></div>
        </div>
        
        <div className="text-center py-20">
          <p className="text-red-500 mb-4">Erreur: {error}</p>
          <p className="text-gray-400">
            Impossible de charger les actualités pour le moment.
          </p>
        </div>
      </div>
    )
  }

  // Aucune actualité disponible
  if (!news || news.length === 0) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-f1-gray-100 mb-4">
            Dernières Actualités F1
          </h2>
          <div className="w-24 h-1 bg-f1-red-600 mx-auto rounded-full mb-6"></div>
        </div>
        
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">
            Aucune actualité disponible pour le moment.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Titre de la section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-bold text-f1-gray-100 mb-4">
          Dernières Actualités F1
        </h2>
        <div className="w-24 h-1 bg-f1-red-600 mx-auto rounded-full mb-6"></div>
        <p className="text-xl text-f1-gray-100/70 max-w-2xl mx-auto">
          Restez informé des dernières nouvelles, transferts et annonces du monde de la Formule 1
        </p>
      </div>

      {/* Grille des news */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((article) => (
          <article
            key={article._id}
            className={`bg-f1-gray-800 rounded-2xl overflow-hidden border border-f1-gray-600 cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-f1-red-600/20 ${
              hoveredCard === article._id ? 'border-f1-red-600' : 'border-f1-gray-600'
            }`}
            onMouseEnter={() => setHoveredCard(article._id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleNewsClick(article.link)}
          >
            {/* Image de l'article */}
            <div className="relative h-48 overflow-hidden">
              {article.image_url ? (
                <Image
                  src={article.image_url}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-f1-gray-700 flex items-center justify-center">
                  <div className="text-6xl text-f1-gray-500">🏎️</div>
                </div>
              )}

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>

            {/* Contenu de l'article */}
            <div className="p-6">
              {/* Date de publication et auteur */}
              <div className="flex items-center justify-between text-f1-gray-100/60 text-sm mb-3">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  {formatDate(article.published_at)}
                </div>
                {article.author && (
                  <div className="text-xs text-f1-red-400">
                    {article.author}
                  </div>
                )}
              </div>

              {/* Titre */}
              <h3 className="text-xl font-bold text-f1-gray-100 mb-3 line-clamp-2 leading-tight">
                {article.title}
              </h3>

              {/* Contenu (description) */}
              <p className="text-f1-gray-100/80 text-sm leading-relaxed line-clamp-3 mb-4">
                {article.content.length > 150 
                  ? article.content.substring(0, 150) + '...' 
                  : article.content
                }
              </p>

              {/* Lien "Lire plus" */}
              {article.link && (
                <div className="flex items-center text-f1-red-400 text-sm font-semibold group">
                  <span className="group-hover:text-f1-red-300 transition-colors">
                    Lire l'article complet
                  </span>
                  <svg 
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              )}
            </div>

            {/* Indicateur de hover */}
            <div className={`h-1 bg-gradient-to-r from-f1-red-600 to-f1-red-400 transform transition-all duration-300 ${
              hoveredCard === article._id ? 'scale-x-100' : 'scale-x-0'
            }`}></div>
          </article>
        ))}
      </div>
    </div>
  )
}
