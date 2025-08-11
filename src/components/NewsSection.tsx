'use client'

import { useState } from 'react'
import Image from 'next/image'

// Interface correspondant au modèle API Mongoose
interface INews {
  _id: string
  title: string
  content: string
  image_url?: string
  link?: string
  author?: string
  published_at?: Date
  is_active: boolean
}

// Fonction utilitaire pour formater la date
const formatDate = (date: Date | undefined) => {
  if (!date) return 'Date inconnue'
  
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(date))
}

// Fonction utilitaire pour extraire une catégorie depuis le contenu
const extractCategory = (content: string): string => {
  if (content.toLowerCase().includes('championnat') || content.toLowerCase().includes('titre')) return 'Championnat'
  if (content.toLowerCase().includes('transfert') || content.toLowerCase().includes('pilote')) return 'Transferts'
  if (content.toLowerCase().includes('circuit') || content.toLowerCase().includes('calendrier')) return 'Calendrier'
  if (content.toLowerCase().includes('technologie') || content.toLowerCase().includes('innovation')) return 'Technique'
  return 'Actualités'
}

// Données d'exemple respectant le modèle API
const newsData: INews[] = [
  {
    _id: "507f1f77bcf86cd799439011",
    title: "Max Verstappen remporte son 4ème titre mondial consécutif",
    content: "Le pilote néerlandais de Red Bull Racing décroche son quatrième championnat du monde consécutif lors du Grand Prix de Las Vegas, confirmant sa domination sur la Formule 1. Cette victoire marque une nouvelle ère dans l'histoire de la F1.",
    image_url: "https://media.api-sports.io/formula-1/circuits/6.png",
    link: "https://www.formula1.com/en/latest/article.max-verstappen-wins-fourth-title",
    author: "Équipe F1 Fan Zone",
    published_at: new Date('2024-11-25'),
    is_active: true
  },
  {
    _id: "507f1f77bcf86cd799439012",
    title: "Ferrari annonce ses pilotes pour la saison 2025",
    content: "La Scuderia Ferrari officialise la composition de son duo de pilotes pour la prochaine saison avec Charles Leclerc et Lewis Hamilton, créant l'une des paires les plus attendues de l'histoire de la F1.",
    image_url: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "https://www.ferrari.com/en/formula1/articles/drivers-2025-announcement",
    author: "Rédaction F1",
    published_at: new Date('2024-11-20'),
    is_active: true
  },
  {
    _id: "507f1f77bcf86cd799439013",
    title: "Nouveau circuit urbain confirmé pour 2025",
    content: "La FIA confirme l'ajout d'un nouveau Grand Prix urbain au calendrier 2025, promettant des courses spectaculaires dans un cadre urbain moderne avec des défis techniques uniques pour les pilotes et les équipes.",
    image_url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "https://www.fia.com/news/new-urban-circuit-2025-calendar",
    author: "FIA Communications",
    published_at: new Date('2024-11-18'),
    is_active: true
  }
]



export default function NewsSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const handleNewsClick = (link?: string) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer')
    }
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
        {newsData.filter(article => article.is_active).map((article) => (
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
