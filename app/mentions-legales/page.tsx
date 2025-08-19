'use client'

import React from 'react'
import NavBar from '../../src/components/NavBar'
import Footer from '../../src/components/Footer'
import ProtectedRoute from '../../src/components/ProtectedRoute'
import { BubbleBackground } from '../../src/components/animate-ui/backgrounds/bubble'

export default function MentionsLegalesPage() {
  return (<>
      <NavBar />
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
      
      <div className="min-h-screen relative pt-20 px-4">
        <div className="max-w-4xl mx-auto py-12">
          
          {/* En-tête */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-formula1 font-bold text-f1-gray-100 mb-4">
              Mentions légales
            </h1>
            <div className="w-24 h-1 bg-f1-red-600 mx-auto rounded-full"></div>
          </div>

          {/* Contenu principal */}
          <div className="backdrop-blur-md bg-f1-gray-800/30 rounded-2xl shadow-2xl border border-f1-gray-600/20 p-8 lg:p-12">
            
            {/* Section 1 : Éditeur du site */}
            <div className="mb-8">
              <h2 className="text-2xl font-formula1 font-bold text-f1-gray-100 mb-4 flex items-center">
                <span className="w-2 h-8 bg-f1-red-600 rounded-full mr-4"></span>
                Éditeur du site
              </h2>
              <div className="space-y-3 text-f1-gray-100/80 font-titillium leading-relaxed">
                <p><strong>Nom du site :</strong> F1 Fan Zone</p>
                <p><strong>URL :</strong> https://f1fanzone.fr</p>
                <p><strong>Propriétaire :</strong> Théo Degremont</p>
                <p><strong>Statut :</strong> Projet personnel / Site communautaire</p>
                <p><strong>Email :</strong> contact@f1fanzone.fr</p>
                <p><strong>Siège social :</strong> France</p>
              </div>
            </div>

            {/* Section 2 : Hébergement */}
            <div className="mb-8">
              <h2 className="text-2xl font-formula1 font-bold text-f1-gray-100 mb-4 flex items-center">
                <span className="w-2 h-8 bg-f1-red-600 rounded-full mr-4"></span>
                Hébergement
              </h2>
              <div className="space-y-3 text-f1-gray-100/80 font-titillium leading-relaxed">
                <p><strong>Hébergeur :</strong> Need For School</p>
                <p><strong>Adresse :</strong> 10 Rue du Général Sarrail, 76000, Rouen, France</p>
                <p><strong>Site web :</strong> https://www.needfor-school.com/</p>
              </div>
            </div>

            {/* Section 3 : Propriété intellectuelle */}
            <div className="mb-8">
              <h2 className="text-2xl font-formula1 font-bold text-f1-gray-100 mb-4 flex items-center">
                <span className="w-2 h-8 bg-f1-red-600 rounded-full mr-4"></span>
                Propriété intellectuelle
              </h2>
              <div className="space-y-4 text-f1-gray-100/80 font-titillium leading-relaxed">
                <p>
                  L'ensemble du contenu de ce site (textes, images, logos, graphismes, design, structure) 
                  est protégé par le droit d'auteur et appartient à F1 Fan Zone ou à ses partenaires, 
                  sauf mention contraire.
                </p>
                <p>
                  Les marques, logos et éléments distinctifs relatifs à la Formule 1 sont la propriété 
                  de Formula One World Championship Limited et de la Fédération Internationale de l'Automobile (FIA).
                </p>
                <p>
                  F1 Fan Zone est un site non officiel, indépendant et n'est pas affilié à 
                  Formula One World Championship Limited, à la FIA ou à toute autre entité officielle 
                  de la Formule 1.
                </p>
                <p>
                  Toute reproduction, représentation, modification, publication, adaptation de tout ou partie 
                  des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, 
                  sauf autorisation écrite préalable.
                </p>
              </div>
            </div>

            {/* Section 4 : Responsabilité */}
            <div className="mb-8">
              <h2 className="text-2xl font-formula1 font-bold text-f1-gray-100 mb-4 flex items-center">
                <span className="w-2 h-8 bg-f1-red-600 rounded-full mr-4"></span>
                Limitation de responsabilité
              </h2>
              <div className="space-y-4 text-f1-gray-100/80 font-titillium leading-relaxed">
                <p>
                  Les informations contenues sur ce site sont fournies à titre informatif et peuvent 
                  comporter des inexactitudes techniques ou des erreurs typographiques.
                </p>
                <p>
                  F1 Fan Zone s'efforce de fournir des informations exactes et à jour, mais ne peut 
                  garantir l'exactitude, la complétude ou l'actualité des informations diffusées.
                </p>
                <p>
                  L'utilisateur reconnaît utiliser ces informations sous sa responsabilité exclusive.
                </p>
                <p>
                  F1 Fan Zone ne saurait être tenu responsable des dommages directs ou indirects 
                  pouvant résulter de l'utilisation du site ou de l'impossibilité d'y accéder.
                </p>
              </div>
            </div>

            {/* Section 5 : Liens externes */}
            <div className="mb-8">
              <h2 className="text-2xl font-formula1 font-bold text-f1-gray-100 mb-4 flex items-center">
                <span className="w-2 h-8 bg-f1-red-600 rounded-full mr-4"></span>
                Liens externes
              </h2>
              <div className="space-y-4 text-f1-gray-100/80 font-titillium leading-relaxed">
                <p>
                  Le site peut contenir des liens vers d'autres sites web. F1 Fan Zone n'exerce 
                  aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu 
                  ou leur politique de confidentialité.
                </p>
                <p>
                  L'inclusion de liens vers des sites externes ne constitue pas une approbation 
                  du contenu de ces sites.
                </p>
              </div>
            </div>

            {/* Section 6 : Droit applicable */}
            <div className="mb-8">
              <h2 className="text-2xl font-formula1 font-bold text-f1-gray-100 mb-4 flex items-center">
                <span className="w-2 h-8 bg-f1-red-600 rounded-full mr-4"></span>
                Droit applicable
              </h2>
              <div className="space-y-4 text-f1-gray-100/80 font-titillium leading-relaxed">
                <p>
                  Les présentes mentions légales sont régies par le droit français.
                </p>
                <p>
                  Tout litige relatif à l'utilisation du site sera de la compétence exclusive 
                  des tribunaux français.
                </p>
              </div>
            </div>

            {/* Section 7 : Contact */}
            <div className="mb-0">
              <h2 className="text-2xl font-formula1 font-bold text-f1-gray-100 mb-4 flex items-center">
                <span className="w-2 h-8 bg-f1-red-600 rounded-full mr-4"></span>
                Contact
              </h2>
              <div className="space-y-3 text-f1-gray-100/80 font-titillium leading-relaxed">
                <p>
                  Pour toute question concernant ces mentions légales, vous pouvez nous contacter à :
                </p>
                <p><strong>Email :</strong> contact@f1fanzone.fr</p>
              </div>
            </div>

            {/* Date de mise à jour */}
            <div className="mt-12 pt-8 border-t border-f1-gray-600/30">
              <p className="text-sm text-f1-gray-100/60 text-center font-titillium">
                Dernière mise à jour : 19 août 2025
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      </>
  )
}
