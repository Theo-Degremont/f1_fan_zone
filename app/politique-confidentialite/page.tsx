'use client'

import React from 'react'
import NavBar from '../../src/components/NavBar'
import Footer from '../../src/components/Footer'
import ProtectedRoute from '../../src/components/ProtectedRoute'
import { BubbleBackground } from '../../src/components/animate-ui/backgrounds/bubble'

export default function PolitiqueConfidentialitePage() {
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
              Politique de confidentialité
            </h1>
            <div className="w-24 h-1 bg-f1-red-600 mx-auto rounded-full"></div>
            <p className="text-f1-gray-100/70 mt-4 font-titillium text-lg">
              La protection de vos données personnelles est notre priorité
            </p>
          </div>

          {/* Contenu principal */}
          <div className="backdrop-blur-md bg-f1-gray-800/30 rounded-2xl shadow-2xl border border-f1-gray-600/20 p-8 lg:p-12">
            
            {/* Section 1 : Introduction */}
            <div className="mb-8">
              <h2 className="text-2xl font-formula1 font-bold text-f1-gray-100 mb-4 flex items-center">
                <span className="w-2 h-8 bg-f1-red-600 rounded-full mr-4"></span>
                1. Introduction
              </h2>
              <div className="space-y-4 text-f1-gray-100/80 font-titillium leading-relaxed">
                <p>
                  F1 Fan Zone s'engage à protéger la confidentialité et la sécurité de vos 
                  données personnelles conformément au Règlement Général sur la Protection 
                  des Données (RGPD) et à la loi française.
                </p>
                <p>
                  Cette politique explique comment nous collectons, utilisons, stockons et 
                  protégeons vos informations personnelles lorsque vous utilisez notre site web.
                </p>
                <p>
                  En utilisant F1 Fan Zone, vous consentez aux pratiques décrites dans 
                  cette politique de confidentialité.
                </p>
              </div>
            </div>

            {/* Section 2 : Responsable du traitement */}
            <div className="mb-8">
              <h2 className="text-2xl font-formula1 font-bold text-f1-gray-100 mb-4 flex items-center">
                <span className="w-2 h-8 bg-f1-red-600 rounded-full mr-4"></span>
                2. Responsable du traitement
              </h2>
              <div className="space-y-3 text-f1-gray-100/80 font-titillium leading-relaxed">
                <p><strong>Responsable :</strong> Théo Degremont - F1 Fan Zone</p>
                <p><strong>Contact :</strong> contact@f1fanzone.fr</p>
                <p><strong>Adresse :</strong> France</p>
              </div>
            </div>

            {/* Section 3 : Données collectées */}
            <div className="mb-8">
              <h2 className="text-2xl font-formula1 font-bold text-f1-gray-100 mb-4 flex items-center">
                <span className="w-2 h-8 bg-f1-red-600 rounded-full mr-4"></span>
                3. Données personnelles collectées
              </h2>
              <div className="space-y-4 text-f1-gray-100/80 font-titillium leading-relaxed">
                <p>Nous collectons les types de données suivants :</p>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-f1-gray-100 mb-2">📝 Données d'inscription</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Nom d'utilisateur</li>
                      <li>Adresse email</li>
                      <li>Mot de passe (crypté)</li>
                      <li>Date de création du compte</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-f1-gray-100 mb-2">📊 Données d'utilisation</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Scores et résultats aux jeux</li>
                      <li>Préférences d'équipes et pilotes</li>
                      <li>Historique des interactions</li>
                      <li>Commentaires et contributions</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-f1-gray-100 mb-2">🔧 Données techniques</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Adresse IP</li>
                      <li>Type de navigateur et version</li>
                      <li>Système d'exploitation</li>
                      <li>Pages visitées et durée</li>
                      <li>Cookies techniques</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4 : Finalités du traitement */}
            <div className="mb-8">
              <h2 className="text-2xl font-formula1 font-bold text-f1-gray-100 mb-4 flex items-center">
                <span className="w-2 h-8 bg-f1-red-600 rounded-full mr-4"></span>
                4. Finalités du traitement
              </h2>
              <div className="space-y-4 text-f1-gray-100/80 font-titillium leading-relaxed">
                <p>Nous utilisons vos données personnelles pour :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Gestion des comptes :</strong> création, authentification et maintenance</li>
                  <li><strong>Fonctionnalités du service :</strong> jeux, classements, comparaisons</li>
                  <li><strong>Personnalisation :</strong> contenu adapté à vos préférences</li>
                  <li><strong>Communication :</strong> notifications importantes et mises à jour</li>
                  <li><strong>Amélioration du service :</strong> analyse d'usage et optimisation</li>
                  <li><strong>Sécurité :</strong> protection contre la fraude et les abus</li>
                  <li><strong>Obligations légales :</strong> conformité aux réglementations</li>
                </ul>
              </div>
            </div>

            {/* Section 5 : Base légale */}
            <div className="mb-8">
              <h2 className="text-2xl font-formula1 font-bold text-f1-gray-100 mb-4 flex items-center">
                <span className="w-2 h-8 bg-f1-red-600 rounded-full mr-4"></span>
                5. Base légale du traitement
              </h2>
              <div className="space-y-4 text-f1-gray-100/80 font-titillium leading-relaxed">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Consentement :</strong> pour l'inscription et les communications optionnelles</li>
                  <li><strong>Exécution du contrat :</strong> pour fournir nos services</li>
                  <li><strong>Intérêt légitime :</strong> pour l'amélioration du service et la sécurité</li>
                  <li><strong>Obligation légale :</strong> pour se conformer aux lois applicables</li>
                </ul>
              </div>
            </div>

            {/* Section 6 : Partage des données */}
            <div className="mb-8">
              <h2 className="text-2xl font-formula1 font-bold text-f1-gray-100 mb-4 flex items-center">
                <span className="w-2 h-8 bg-f1-red-600 rounded-full mr-4"></span>
                6. Partage des données
              </h2>
              <div className="space-y-4 text-f1-gray-100/80 font-titillium leading-relaxed">
                <p>
                  <strong>Nous ne vendons jamais vos données personnelles.</strong>
                </p>
                <p>Vos données peuvent être partagées uniquement dans les cas suivants :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Prestataires techniques :</strong> hébergement (Vercel), base de données</li>
                  <li><strong>Obligations légales :</strong> si requis par la loi ou une autorité</li>
                  <li><strong>Protection des droits :</strong> en cas de violation des CGU</li>
                  <li><strong>Données publiques :</strong> classements et scores (anonymisés si souhaité)</li>
                </ul>
                <p>
                  Tous nos prestataires sont tenus par des accords de confidentialité 
                  et doivent respecter le RGPD.
                </p>
              </div>
            </div>

            {/* Section 7 : Conservation des données */}
            <div className="mb-8">
              <h2 className="text-2xl font-formula1 font-bold text-f1-gray-100 mb-4 flex items-center">
                <span className="w-2 h-8 bg-f1-red-600 rounded-full mr-4"></span>
                7. Conservation des données
              </h2>
              <div className="space-y-4 text-f1-gray-100/80 font-titillium leading-relaxed">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Comptes actifs :</strong> conservés tant que le compte est utilisé</li>
                  <li><strong>Comptes inactifs :</strong> suppression après 3 ans d'inactivité</li>
                  <li><strong>Données de jeu :</strong> conservées 5 ans pour les statistiques</li>
                  <li><strong>Données techniques :</strong> 13 mois maximum (cookies, logs)</li>
                  <li><strong>Suppression de compte :</strong> effacement sous 30 jours</li>
                </ul>
                <p>
                  Certaines données peuvent être conservées plus longtemps si requis 
                  par la loi ou pour des raisons de sécurité.
                </p>
              </div>
            </div>

            {/* Section 8 : Sécurité */}
            <div className="mb-8">
              <h2 className="text-2xl font-formula1 font-bold text-f1-gray-100 mb-4 flex items-center">
                <span className="w-2 h-8 bg-f1-red-600 rounded-full mr-4"></span>
                8. Sécurité des données
              </h2>
              <div className="space-y-4 text-f1-gray-100/80 font-titillium leading-relaxed">
                <p>Nous mettons en place des mesures de sécurité techniques et organisationnelles :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Chiffrement des mots de passe</li>
                  <li>Connexions HTTPS sécurisées</li>
                  <li>Authentification sécurisée</li>
                  <li>Surveillance des accès</li>
                  <li>Sauvegardes régulières</li>
                  <li>Mises à jour de sécurité</li>
                </ul>
                <p>
                  En cas de violation de données, nous vous informerons dans les 72 heures 
                  conformément au RGPD.
                </p>
              </div>
            </div>

            {/* Section 9 : Vos droits */}
            <div className="mb-8">
              <h2 className="text-2xl font-formula1 font-bold text-f1-gray-100 mb-4 flex items-center">
                <span className="w-2 h-8 bg-f1-red-600 rounded-full mr-4"></span>
                9. Vos droits (RGPD)
              </h2>
              <div className="space-y-4 text-f1-gray-100/80 font-titillium leading-relaxed">
                <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-f1-gray-100">Droit d'accès</h4>
                      <p className="text-sm">Consulter vos données personnelles</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-f1-gray-100">Droit de rectification</h4>
                      <p className="text-sm">Corriger vos données inexactes</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-f1-gray-100">Droit d'effacement</h4>
                      <p className="text-sm">Supprimer vos données</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-f1-gray-100">Droit de limitation</h4>
                      <p className="text-sm">Restreindre le traitement</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-f1-gray-100">Droit de portabilité</h4>
                      <p className="text-sm">Récupérer vos données</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-f1-gray-100">Droit d'opposition</h4>
                      <p className="text-sm">Vous opposer au traitement</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-f1-gray-100">Retrait du consentement</h4>
                      <p className="text-sm">Révoquer votre accord</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-f1-gray-100">Droit de recours</h4>
                      <p className="text-sm">Saisir la CNIL</p>
                    </div>
                  </div>
                </div>
                <p className="mt-4">
                  <strong>Pour exercer vos droits :</strong> contactez-nous à 
                  <span className="text-f1-red-400"> contact@f1fanzone.fr</span> avec 
                  une pièce d'identité. Réponse sous 30 jours maximum.
                </p>
              </div>
            </div>

            {/* Section 10 : Cookies */}
            <div className="mb-8">
              <h2 className="text-2xl font-formula1 font-bold text-f1-gray-100 mb-4 flex items-center">
                <span className="w-2 h-8 bg-f1-red-600 rounded-full mr-4"></span>
                10. Cookies et technologies similaires
              </h2>
              <div className="space-y-4 text-f1-gray-100/80 font-titillium leading-relaxed">
                <p>Nous utilisons différents types de cookies :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Cookies essentiels :</strong> authentification, sécurité (obligatoires)</li>
                  <li><strong>Cookies de performance :</strong> analyse d'usage anonyme</li>
                  <li><strong>Cookies fonctionnels :</strong> préférences utilisateur</li>
                </ul>
                <p>
                  Vous pouvez gérer vos préférences de cookies dans les paramètres 
                  de votre navigateur. Attention : désactiver certains cookies peut 
                  affecter le fonctionnement du site.
                </p>
              </div>
            </div>

            {/* Section 11 : Transferts internationaux */}
            <div className="mb-8">
              <h2 className="text-2xl font-formula1 font-bold text-f1-gray-100 mb-4 flex items-center">
                <span className="w-2 h-8 bg-f1-red-600 rounded-full mr-4"></span>
                11. Transferts internationaux
              </h2>
              <div className="space-y-4 text-f1-gray-100/80 font-titillium leading-relaxed">
                <p>
                  Nos données sont principalement stockées dans l'Union Européenne. 
                  Certains prestataires (Vercel) peuvent traiter des données aux États-Unis 
                  sous des garanties appropriées (clauses contractuelles types).
                </p>
                <p>
                  Tous les transferts respectent les exigences du RGPD pour assurer 
                  un niveau de protection adéquat.
                </p>
              </div>
            </div>

            {/* Section 12 : Mineurs */}
            <div className="mb-8">
              <h2 className="text-2xl font-formula1 font-bold text-f1-gray-100 mb-4 flex items-center">
                <span className="w-2 h-8 bg-f1-red-600 rounded-full mr-4"></span>
                12. Protection des mineurs
              </h2>
              <div className="space-y-4 text-f1-gray-100/80 font-titillium leading-relaxed">
                <p>
                  Notre service s'adresse à tous les âges. Pour les mineurs de moins de 16 ans, 
                  nous demandons l'accord des parents ou tuteurs légaux.
                </p>
                <p>
                  Si vous pensez qu'un mineur a fourni des données sans autorisation, 
                  contactez-nous pour une suppression immédiate.
                </p>
              </div>
            </div>

            {/* Section 13 : Modifications */}
            <div className="mb-0">
              <h2 className="text-2xl font-formula1 font-bold text-f1-gray-100 mb-4 flex items-center">
                <span className="w-2 h-8 bg-f1-red-600 rounded-full mr-4"></span>
                13. Modifications de la politique
              </h2>
              <div className="space-y-4 text-f1-gray-100/80 font-titillium leading-relaxed">
                <p>
                  Cette politique peut être mise à jour pour refléter les changements 
                  de nos pratiques ou de la réglementation.
                </p>
                <p>
                  Les modifications importantes vous seront notifiées par email ou 
                  via une notification sur le site.
                </p>
                <p>
                  Nous vous encourageons à consulter régulièrement cette page.
                </p>
              </div>
            </div>

            {/* Contact et date */}
            <div className="mt-12 pt-8 border-t border-f1-gray-600/30">
              <div className="text-center space-y-4">
                <div className="bg-f1-red-600/10 border border-f1-red-600/30 rounded-lg p-6">
                  <p className="text-f1-gray-100 font-titillium text-lg mb-2">
                    <strong>🛡️ Délégué à la Protection des Données</strong>
                  </p>
                  <p className="text-f1-gray-100/80 font-titillium">
                    Pour toute question sur vos données personnelles :<br />
                    <span className="text-f1-red-400 font-semibold">contact@f1fanzone.fr</span>
                  </p>
                  <p className="text-sm text-f1-gray-100/60 font-titillium mt-3">
                    Vous pouvez également contacter la CNIL : <a href="https://www.cnil.fr" target="_blank" className="text-f1-red-400 hover:underline">www.cnil.fr</a>
                  </p>
                </div>
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
