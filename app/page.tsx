'use client'

import React from 'react'
import Model3DViewer from '../src/components/3D/3DHelmet'
import NavBar from "../src/components/NavBar";
import { BubbleBackground } from '../src/components/animate-ui/backgrounds/bubble';
import F1HelmetViewer from '../src/components/3D/3DHelmet'; // Assuming this is the correct import for the 3D model viewer


export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* NavBar en premier avec z-index élevé */}
      <NavBar />
      {/* colors={{ 
          first: '131,15,0', 
          second: '196,23,0', 
          third: '218,59,35', 
          fourth: '255,112,93', 
          fifth: '255,183,173', 
          sixth: '43,43,43' 
        }} */}
      {/* Background animé en arrière-plan */}
      <BubbleBackground
      interactive = {true}
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
      
      {/* Section Hero */}
      <section className="relative min-h-screen flex items-center z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Côté gauche - Contenu textuel */}
            <div className="space-y-12 flex flex-col justify-center items-center text-center lg:text-left lg:items-start">
              {/* Gros titre */}
              <div className='space-y-2 justify-items-center'>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-f1-gray-100 leading-tight text-center">
                  Vivez la
                  <span className="block text-f1-red-600">Formule 1</span>
                  comme jamais
                </h1>
                
                {/* Sous-titre engageant */}
                <p className="text-xl md:text-2xl text-f1-gray-100/80 leading-relaxed max-w-2xl mt-8">
                  Plongez dans l'adrénaline pure de la F1. Suivez vos pilotes favoris, 
                  analysez chaque course et rejoignez la communauté la plus passionnée 
                  de France. L'émotion n'attend que vous.
                </p>
                
                {/* Bouton d'action */}
                <div className="pt-8">
                  <button className="group bg-f1-red-600 hover:bg-f1-red-800 text-white px-8 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-f1-red-600/30">
                    Démarrer l'aventure
                  </button>
                </div>
                
                {/* Petites stats rapides */}
                <div className="flex space-x-8 pt-12">
                  <div>
                    <div className="text-2xl font-bold text-f1-red-400">24</div>
                    <div className="text-sm text-f1-gray-100/60">Courses</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-f1-red-400">20</div>
                    <div className="text-sm text-f1-gray-100/60">Pilotes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-f1-red-400">50k+</div>
                    <div className="text-sm text-f1-gray-100/60">Fans</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Côté droit - Modèle 3D F1 */}
            <div className="lg:pl-8 h-96 lg:h-[800px] bo">
              <F1HelmetViewer/>
            </div>
            
          </div>
        </div>
      </section>
      
    </div>
  );
}
