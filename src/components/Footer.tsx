'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import '../styles/footer-hovers.css'
import { FaFacebookF, FaInstagram, FaTiktok} from "react-icons/fa";


export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className="bg-f1-gray-700 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl lg:text-4xl font-bold text-f1-gray-100 mb-6">
                À propos de nous
              </h3>
              <p className="text-f1-gray-100/80 font-titillium leading-relaxed text-lg space-y-4">
                <span className="block">
                  F1 Fan Zone est la destination ultime pour tous les passionnés de Formule 1 en France. 
                  Nous vous offrons une expérience immersive et complète du monde de la F1.
                </span>
                <span className="block">
                  Notre équipe de passionnés vous apporte les dernières actualités, analyses détaillées, 
                  statistiques en temps réel et comparaisons exclusives des performances des pilotes et équipes.
                </span>
                <span className="block">
                  De Monaco à Suzuka, de Silverstone à Interlagos, suivez chaque Grand Prix avec des insights 
                  uniques, des prédictions expertes et une communauté vibrante de fans.
                </span>
                <span className="block">
                  Rejoignez-nous pour vivre l'adrénaline pure de la F1, partager votre passion et découvrir 
                  les coulisses du sport automobile le plus prestigieux au monde.
                </span>
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-f1-gray-100 mb-4">
                Suivez-nous
              </h4>
              <div className="flex space-x-6">
                <Link 
                  href="" 
                  target="_blank"
                  className="social-media-hover p-4 rounded-full"
                >
                  <FaFacebookF className='w-6 h-6' />
                </Link>

                <Link 
                  href="" 
                  target="_blank"
                  className="social-media-hover p-4 rounded-full"
                >
                  <FaInstagram className='w-6 h-6' />
                </Link>

                <Link 
                  href="" 
                  target="_blank"
                  className="social-media-hover p-4 rounded-full"
                >
                    <FaTiktok className='w-6 h-6'  />
                </Link>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end items-start">
            <div className="relative">
              <Image 
                src="/images/logo_f1_fan_zone.svg" 
                alt="F1 Fan Zone Logo" 
                width={300} 
                height={300} 
                className="footer-logo-hover"
              />
              <div className="footer-logo-glow"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <Link href="/mentions-legales" className="legal-link-hover text-sm">
            Mentions légales
          </Link>
          <span className="text-f1-gray-100/30">•</span>
          <Link href="/conditions-generales" className="legal-link-hover text-sm">
            Conditions générales
          </Link>
          <span className="text-f1-gray-100/30">•</span>
          <Link href="/cgu" className="legal-link-hover text-sm">
            CGU
          </Link>
          <span className="text-f1-gray-100/30">•</span>
          <Link href="/politique-confidentialite" className="legal-link-hover text-sm">
            Politique de confidentialité
          </Link>
          <span className="text-f1-gray-100/30">•</span>
          <Link href="/cookies" className="legal-link-hover text-sm">
            Gestion des cookies
          </Link>
          <span className="text-f1-gray-100/30">•</span>
          <Link href="/contact" className="legal-link-hover text-sm">
            Contact
          </Link>
          <span className="text-f1-gray-100/30">•</span>
          <Link href="/partenaires" className="legal-link-hover text-sm">
            Partenaires
          </Link>
          <span className="text-f1-gray-100/30">•</span>
          <Link href="/accessibilite" className="legal-link-hover text-sm">
            Accessibilité
          </Link>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-f1-gray-600">
          
          <button 
            onClick={scrollToTop}
            className="scroll-to-top-hover text-white p-3 rounded-full mb-4 md:mb-0"
            aria-label="Retour en haut de page"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>

          <div className="text-center font-titillium md:text-right text-f1-gray-100/60 text-sm space-y-1">
            <p>© 2025 F1 Fan Zone. Tous droits réservés.</p>
            <p className="font-titillium text-xs">
              Site non officiel de la Formula 1. Marques et logos sont la propriété de leurs détenteurs respectifs.
            </p>
            <p className="font-titillium text-xs">
              Développé avec ❤️ pour la communauté F1 française
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
