'use client'

import { useState, useEffect } from 'react'
import NavBar from '@/src/components/NavBar'
import Footer from '@/src/components/Footer'
import { BubbleBackground } from '@/src/components/animate-ui/backgrounds/bubble'
import { useGameScore } from '@/src/hooks/useGameScore'
import { useAuth } from '@/src/hooks/useAuth'

export default function Game() {
  const [gameState, setGameState] = useState<'waiting' | 'countdown' | 'go' | 'running' | 'result'>('waiting')
  const [lights, setLights] = useState([false, false, false, false, false])
  const [startTime, setStartTime] = useState<number>(0)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [finalTime, setFinalTime] = useState<string>('0.00')
  const [tooEarly, setTooEarly] = useState(false)
  const [timeoutIds, setTimeoutIds] = useState<NodeJS.Timeout[]>([])
  const [scoreSubmitted, setScoreSubmitted] = useState(false)

  const { bestScore, submitScore, isLoading: scoreLoading } = useGameScore()
  const { isAuthenticated } = useAuth()

  // Timer pour le chronos
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameState === 'running') {
      interval = setInterval(() => {
        setCurrentTime(Date.now())
      }, 10) // Mise à jour toutes les 10ms pour plus de fluidité
    }
    return () => clearInterval(interval)
  }, [gameState])

  const startGame = () => {
    setGameState('countdown')
    setLights([false, false, false, false, false])
    setTooEarly(false)
    setCurrentTime(0)
    setFinalTime('0.00')
    
    // Séquence des feux F1
    const ids: NodeJS.Timeout[] = []
    ids.push(setTimeout(() => setLights([true, false, false, false, false]), 1000))
    ids.push(setTimeout(() => setLights([true, true, false, false, false]), 2000))
    ids.push(setTimeout(() => setLights([true, true, true, false, false]), 3000))
    ids.push(setTimeout(() => setLights([true, true, true, true, false]), 4000))
    ids.push(setTimeout(() => setLights([true, true, true, true, true]), 5000))
    
    // Temps aléatoire avant l'extinction (comme en F1)
    const randomDelay = Math.random() * 2000 + 1000 // Entre 1 et 3 secondes
    ids.push(setTimeout(() => {
      setLights([false, false, false, false, false])
      setGameState('running')
      setStartTime(Date.now())
      setCurrentTime(Date.now())
    }, 5000 + randomDelay))
    
    setTimeoutIds(ids)
  }

  const clearAllTimeouts = () => {
    timeoutIds.forEach(id => clearTimeout(id))
    setTimeoutIds([])
  }

  const handleClick = async () => {
    if (gameState === 'waiting') {
      startGame()
    } else if (gameState === 'countdown') {
      setTooEarly(true)
      setGameState('result')
      clearAllTimeouts() // Arrêter tous les timeouts
      setLights([false, false, false, false, false]) // Éteindre tous les feux
    } else if (gameState === 'running') {
      const final = ((currentTime - startTime) / 1000).toFixed(2)
      setFinalTime(final)
      setGameState('result')
      
      // Envoyer le score à l'API si l'utilisateur est connecté
      if (isAuthenticated && !scoreSubmitted) {
        setScoreSubmitted(true)
        
        const scoreData = {
          score_ms: Math.round((currentTime - startTime)),
        }
        
        await submitScore(scoreData)
      }
    } else if (gameState === 'result') {
      // Reset pour recommencer
      setGameState('waiting')
      setLights([false, false, false, false, false])
      setTooEarly(false)
      setCurrentTime(0)
      setFinalTime('0.00')
      setScoreSubmitted(false)
    }
  }

  // Calcul du temps écoulé en secondes
  const elapsedTime = gameState === 'running' ? ((currentTime - startTime) / 1000).toFixed(2) : 
                     gameState === 'result' && !tooEarly ? finalTime : '0.00'
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
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
      
      <main 
        className="flex-1 flex flex-col items-center justify-center px-4 relative z-10 cursor-pointer min-h-[100vh]"
        onClick={handleClick}
      >
          
        <div className="relative mb-8">
          <div className="absolute top-30 left-0 right-0 h-2 bg-black rounded-full shadow-lg -z-1"></div>
          <div className="absolute bottom-30 left-0 right-0 h-2 bg-black rounded-full shadow-lg -z-1"></div>

          <div className="flex justify-center items-center gap-8 py-8">
            {/* Feu 1 */}
            <div className="bg-f1-gray-700 rounded-2xl p-8 border-2 border-f1-gray-600 shadow-2xl">
              <div className="flex flex-col gap-6">
                <div className="w-20 h-20 rounded-full border-2 border-f1-gray-400 shadow-inner bg-white/20"></div>
                <div className={`w-20 h-20 rounded-full border-2 border-f1-gray-400 shadow-inner transition-all duration-300 ${
                  lights[0] ? 'bg-red-500 shadow-red-500/50 shadow-2xl' : 'bg-white/20'
                }`}></div>
              </div>
            </div>

            {/* Feu 2 */}
            <div className="bg-f1-gray-700 rounded-2xl p-8 border-2 border-f1-gray-600 shadow-2xl">
              <div className="flex flex-col gap-6">
                <div className="w-20 h-20 rounded-full border-2 border-f1-gray-400 shadow-inner bg-white/20"></div>
                <div className={`w-20 h-20 rounded-full border-2 border-f1-gray-400 shadow-inner transition-all duration-300 ${
                  lights[1] ? 'bg-red-500 shadow-red-500/50 shadow-2xl' : 'bg-white/20'
                }`}></div>
              </div>
            </div>

            {/* Feu 3*/}
            <div className="bg-f1-gray-700 rounded-2xl p-8 border-2 border-f1-gray-600 shadow-2xl">
              <div className="flex flex-col gap-6">
                <div className="w-20 h-20 rounded-full border-2 border-f1-gray-400 shadow-inner bg-white/20"></div>
                <div className={`w-20 h-20 rounded-full border-2 border-f1-gray-400 shadow-inner transition-all duration-300 ${
                  lights[2] ? 'bg-red-500 shadow-red-500/50 shadow-2xl' : 'bg-white/20'
                }`}></div>
              </div>
            </div>

            {/* Feu 4 */}
            <div className="bg-f1-gray-700 rounded-2xl p-8 border-2 border-f1-gray-600 shadow-2xl">
              <div className="flex flex-col gap-6">
                <div className="w-20 h-20 rounded-full border-2 border-f1-gray-400 shadow-inner bg-white/20"></div>
                <div className={`w-20 h-20 rounded-full border-2 border-f1-gray-400 shadow-inner transition-all duration-300 ${
                  lights[3] ? 'bg-red-500 shadow-red-500/50 shadow-2xl' : 'bg-white/20'
                }`}></div>
              </div>
            </div>

            {/* Feu 5 */}
            <div className="bg-f1-gray-700 rounded-2xl p-8 border-2 border-f1-gray-600 shadow-2xl">
              <div className="flex flex-col gap-6">
                <div className="w-20 h-20 rounded-full border-2 border-f1-gray-400 shadow-inner bg-white/20"></div>
                <div className={`w-20 h-20 rounded-full border-2 border-f1-gray-400 shadow-inner transition-all duration-300 ${
                  lights[4] ? 'bg-red-500 shadow-red-500/50 shadow-2xl' : 'bg-white/20'
                }`}></div>
              </div>
            </div>
          </div>
          
          </div>

        <div className="text-center">
          <div className="text-8xl font-mono font-bold text-f1-gray-100 mb-4">
            {elapsedTime}s
          </div>
          
          {gameState === 'waiting' && (
            <p className="text-xl text-f1-gray-400">
              Cliquez pour commencer
            </p>
          )}
          
          {gameState === 'countdown' && (
            <p className="text-xl text-f1-red font-bold animate-pulse">
              Attendez...
            </p>
          )}
          
          {gameState === 'result' && (
            <div className="space-y-4">
              {tooEarly ? (
                <div className="text-center">
                  <p className="text-2xl text-red-400 font-bold mb-2">
                    FAUX DÉPART !
                  </p>
                  <p className="text-lg text-red-300">
                    Vous avez cliqué trop tôt
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-2xl text-white">
                    {parseFloat(elapsedTime) < 0.5 ? "Excellent !" : 
                     parseFloat(elapsedTime) < 1 ? "Très bon !" :
                     parseFloat(elapsedTime) < 2 ? "Bon !" : "Continuez !"}
                  </p>
                </div>
              )}
              <p className="text-sm text-f1-gray-400">
                Cliquez pour recommencer
              </p>
            </div>
          )}
        </div>
      </main>
      {isAuthenticated && bestScore && (
        <div className="relative z-10 pb-4">
          <div className="text-center">
            <div className="inline-flex items-center space-x-3 bg-f1-gray-800/80 border border-red-600 rounded-xl px-6 py-3 backdrop-blur-sm">
              <span className="text-2xl">👑</span>
              <div className="text-left ">
                <p className="text-sm font-semibold">Meilleur Score {(bestScore.score_ms / 1000).toFixed(3)}s</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  )
}
