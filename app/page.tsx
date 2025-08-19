'use client'

import React from 'react'
import NavBar from "../src/components/NavBar";
import { BubbleBackground } from '../src/components/animate-ui/backgrounds/bubble';
import F1HelmetViewer from '../src/components/3D/3DHelmet'; 
import { RippleButton } from '../src/components/animate-ui/buttons/ripple';
import TeamShowcase from '../src/components/TeamShowcase';
import NextRace from '../src/components/NextRaceSection';
import NewsSection from '../src/components/NewsSection';
import Footer from '../src/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen relative pt-20">

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
      <NavBar />
      <section className="relative min-h-screen flex items-center z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-12 flex flex-col justify-center items-center text-center lg:text-left lg:items-start">
              <div className='space-y-2 justify-items-center'>
                <h1 className="text-5xl font-formula1 md:text-5xl lg:text-6xl font-bold leading-tight text-center">
                  Vivez la
                  <span className="block font-formula1 text-f1-red-600">Formule 1</span>
                  comme jamais
                </h1>

                <p className="text-xl font-titillium md:text-3xl text-f1-gray-100/80 leading-relaxed max-w-2xl mt-8">
                  Plongez dans l'adrénaline pure de la F1. Suivez vos pilotes favoris,
                  analysez chaque course et rejoignez la communauté la plus passionnée
                  de France. L'émotion n'attend que vous.
                </p>
                
                <div className="pt-8">
                  <RippleButton className='bg-f1-red-600 text-white text-lg p-6'>Démarrer l'aventure</RippleButton>

                </div>
                
                <div className="flex space-x-8 pt-12">
                  <div className='flex flex-col items-center'>
                    <div className="text-2xl font-formula1 font-bold text-f1-red-400">24</div>
                    <div className="text-m text-f1-gray-100/60">Courses</div>
                  </div>
                  <div className='flex flex-col items-center'>
                    <div className="text-2xl font-formula1 font-bold text-f1-red-400">20</div>
                    <div className="text-m text-f1-gray-100/60">Pilotes</div>
                  </div>
                  <div className='flex flex-col items-center'>
                    <div className="text-2xl font-formula1 font-bold text-f1-red-400">50k+</div>
                    <div className="text-m text-f1-gray-100/60">Fans</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:pl-8 h-96 lg:h-[800px] bo">
              <F1HelmetViewer/>
            </div>
            
          </div>
        </div>
      </section>
      <section className="bg-f1-gray-700 py-20">
        <div className="bg-f1-gray-700 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <TeamShowcase />
        </div>
      </section>
      
      <section className="bg-f1-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <NextRace />
        </div>
      </section>      

      <section className="bg-f1-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <NewsSection />
        </div>
      </section>      

      <Footer />
    </div>
  );
}
