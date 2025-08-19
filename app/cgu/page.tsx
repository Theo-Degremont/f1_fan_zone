'use client'

import React from 'react'
import NavBar from '../../src/components/NavBar'
import Footer from '../../src/components/Footer'
import ProtectedRoute from '../../src/components/ProtectedRoute'
import { BubbleBackground } from '../../src/components/animate-ui/backgrounds/bubble'

export default function CGUPage() {
  return (
    <>
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
              Conditions Générales d'Utilisation
            </h1>
            <div className="w-24 h-1 bg-f1-red-600 mx-auto rounded-full"></div>
            <p className="text-f1-gray-100/70 mt-4 font-titillium text-lg">
              En utilisant F1 Fan Zone, vous acceptez les présentes conditions
            </p>
          </div>

          {/* Contenu principal */}
          <div className="backdrop-blur-md bg-f1-gray-800/30 rounded-2xl shadow-2xl border border-f1-gray-600/20 p-8 lg:p-12">
            
            {/* Section 1 : Acceptation des conditions */}
            <div className="mb-8">
              <h2 className="text-2xl font-formula1 font-bold text-f1-gray-100 mb-4 flex items-center">
                <span className="w-2 h-8 bg-f1-red-600 rounded-full mr-4"></span>
                1. Acceptation des conditions
              </h2>
              <div className="space-y-4 text-f1-gray-100/80 font-titillium leading-relaxed">
                <p>
                  En accédant et en utilisant le site web F1 Fan Zone, vous acceptez d'être lié 
                  par les présentes Conditions Générales d'Utilisation (CGU).
                </p>
                <p>
                  Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site.
                </p>
                <p>
                  Nous nous réservons le droit de modifier ces CGU à tout moment. 
                  Les modifications prendront effet dès leur publication sur le site.
                </p>
              </div>
            </div>

            {/* Section 2 : Description du service */}
            <div className="mb-8">
              <h2 className="text-2xl font-formula1 font-bold text-f1-gray-100 mb-4 flex items-center">
                <span className="w-2 h-8 bg-f1-red-600 rounded-full mr-4"></span>
                2. Description du service
              </h2>
              <div className="space-y-4 text-f1-gray-100/80 font-titillium leading-relaxed">
                <p>
                  F1 Fan Zone est une plateforme communautaire dédiée aux passionnés de Formule 1 
                  qui propose :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Actualités et informations sur la Formule 1</li>
                  <li>Statistiques et analyses des courses</li>
                  <li>Comparaisons entre pilotes et équipes</li>
                  <li>Jeux et quiz interactifs</li>
                  <li>Communauté de fans et discussions</li>
                  <li>Classements et résultats en temps réel</li>
                </ul>
                <p>
                  Ce service est fourni à titre gratuit et à des fins de divertissement 
                  et d'information.
                </p>
              </div>
            </div>

            {/* Section 3 : Inscription et comptes utilisateurs */}
            <div className="mb-8">
              <h2 className="text-2xl font-formula1 font-bold text-f1-gray-100 mb-4 flex items-center">
                <span className="w-2 h-8 bg-f1-red-600 rounded-full mr-4"></span>
                3. Inscription et comptes utilisateurs
              </h2>
              <div className="space-y-4 text-f1-gray-100/80 font-titillium leading-relaxed">
                <p>
                  Pour accéder à certaines fonctionnalités, vous devez créer un compte utilisateur :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Vous devez fournir des informations exactes et à jour</li>
                  <li>Vous êtes responsable de la confidentialité de votre mot de passe</li>
                  <li>Vous ne devez pas partager votre compte avec des tiers</li>
                  <li>Vous devez nous notifier immédiatement tout usage non autorisé</li>
                  <li>Un seul compte par personne est autorisé</li>
                </ul>
                <p>
                  Nous nous réservons le droit de suspendre ou supprimer tout compte qui 
                  viole ces conditions.
                </p>
              </div>
            </div>

            {/* Section 4 : Utilisation acceptable */}
            <div className="mb-8">
              <h2 className="text-2xl font-formula1 font-bold text-f1-gray-100 mb-4 flex items-center">
                <span className="w-2 h-8 bg-f1-red-600 rounded-full mr-4"></span>
                4. Utilisation acceptable
              </h2>
              <div className="space-y-4 text-f1-gray-100/80 font-titillium leading-relaxed">
                <p>Vous vous engagez à :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Utiliser le site conformément à la loi</li>
                  <li>Respecter les droits d'autrui</li>
                  <li>Ne pas publier de contenu illégal, offensant ou inapproprié</li>
                  <li>Ne pas tenter de pirater ou compromettre la sécurité du site</li>
                  <li>Ne pas utiliser le site à des fins commerciales non autorisées</li>
                  <li>Respecter la communauté et maintenir un environnement positif</li>
                </ul>
                
                <p className="mt-6"><strong>Il est strictement interdit de :</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Harceler, menacer ou intimider d'autres utilisateurs</li>
                  <li>Publier du contenu raciste, sexiste ou discriminatoire</li>
                  <li>Diffuser de fausses informations</li>
                  <li>Violer les droits de propriété intellectuelle</li>
                  <li>Utiliser des robots, scripts ou autres moyens automatisés</li>
                  <li>Tenter d'accéder à des zones restreintes du site</li>
                </ul>
              </div>
            </div>

            {/* Section 5 : Contenu utilisateur */}
            <div className="mb-8">
              <h2 className="text-2xl font-formula1 font-bold text-f1-gray-100 mb-4 flex items-center">
                <span className="w-2 h-8 bg-f1-red-600 rounded-full mr-4"></span>
                5. Contenu utilisateur
              </h2>
              <div className="space-y-4 text-f1-gray-100/80 font-titillium leading-relaxed">
                <p>
                  En publiant du contenu sur F1 Fan Zone (commentaires, discussions, scores), 
                  vous garantissez que :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Vous possédez tous les droits sur ce contenu</li>
                  <li>Le contenu ne viole aucune loi ou droit de tiers</li>
                  <li>Le contenu est approprié et respectueux</li>
                </ul>
                <p>
                  Vous accordez à F1 Fan Zone une licence non exclusive pour utiliser, 
                  modifier et afficher votre contenu dans le cadre du service.
                </p>
                <p>
                  Nous nous réservons le droit de modérer, modifier ou supprimer tout 
                  contenu qui viole ces conditions.
                </p>
              </div>
            </div>

            {/* Section 6 : Propriété intellectuelle */}
            <div className="mb-8">
              <h2 className="text-2xl font-formula1 font-bold text-f1-gray-100 mb-4 flex items-center">
                <span className="w-2 h-8 bg-f1-red-600 rounded-full mr-4"></span>
                6. Propriété intellectuelle
              </h2>
              <div className="space-y-4 text-f1-gray-100/80 font-titillium leading-relaxed">
                <p>
                  Tous les éléments du site (design, code, textes, images, logos) sont 
                  protégés par les droits de propriété intellectuelle.
                </p>
                <p>
                  Les marques et logos de la Formule 1 appartiennent à leurs propriétaires 
                  respectifs. F1 Fan Zone les utilise dans un cadre informatif et de commentaire.
                </p>
                <p>
                  Toute reproduction ou utilisation non autorisée est interdite.
                </p>
              </div>
            </div>

            {/* Section 7 : Disponibilité du service */}
            <div className="mb-8">
              <h2 className="text-2xl font-formula1 font-bold text-f1-gray-100 mb-4 flex items-center">
                <span className="w-2 h-8 bg-f1-red-600 rounded-full mr-4"></span>
                7. Disponibilité du service
              </h2>
              <div className="space-y-4 text-f1-gray-100/80 font-titillium leading-relaxed">
                <p>
                  Nous nous efforçons de maintenir le site accessible 24h/24, 7j/7, 
                  mais ne pouvons garantir une disponibilité continue.
                </p>
                <p>
                  Le service peut être interrompu pour maintenance, mises à jour ou 
                  en cas de problèmes techniques.
                </p>
                <p>
                  Nous ne saurions être tenus responsables des dommages résultant 
                  d'une indisponibilité temporaire du service.
                </p>
              </div>
            </div>

            {/* Section 8 : Limitation de responsabilité */}
            <div className="mb-8">
              <h2 className="text-2xl font-formula1 font-bold text-f1-gray-100 mb-4 flex items-center">
                <span className="w-2 h-8 bg-f1-red-600 rounded-full mr-4"></span>
                8. Limitation de responsabilité
              </h2>
              <div className="space-y-4 text-f1-gray-100/80 font-titillium leading-relaxed">
                <p>
                  F1 Fan Zone est fourni "en l'état" sans garantie d'aucune sorte.
                </p>
                <p>
                  Nous ne saurions être tenus responsables des dommages directs ou 
                  indirects résultant de l'utilisation du site.
                </p>
                <p>
                  Chaque utilisateur utilise le service à ses propres risques.
                </p>
              </div>
            </div>

            {/* Section 9 : Droit applicable */}
            <div className="mb-0">
              <h2 className="text-2xl font-formula1 font-bold text-f1-gray-100 mb-4 flex items-center">
                <span className="w-2 h-8 bg-f1-red-600 rounded-full mr-4"></span>
                9. Droit applicable et juridiction
              </h2>
              <div className="space-y-4 text-f1-gray-100/80 font-titillium leading-relaxed">
                <p>
                  Ces CGU sont régies par le droit français.
                </p>
                <p>
                  Tout litige sera soumis à la juridiction exclusive des tribunaux français.
                </p>
                <p>
                  En cas de nullité d'une clause, les autres dispositions restent valables.
                </p>
              </div>
            </div>

            {/* Contact et date */}
            <div className="mt-12 pt-8 border-t border-f1-gray-600/30">
              <div className="text-center space-y-4">
                <p className="text-f1-gray-100/80 font-titillium">
                  <strong>Questions sur les CGU ?</strong><br />
                  Contactez-nous : <span className="text-f1-red-400">contact@f1fanzone.fr</span>
                </p>
                <p className="text-sm text-f1-gray-100/60 font-titillium">
                  Dernière mise à jour : 19 août 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  )
}
