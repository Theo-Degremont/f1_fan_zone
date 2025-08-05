import NavBar from "../src/components/NavBar";
import { BubbleBackground } from '../src/components/animate-ui/backgrounds/bubble';

export default function Home() {
  return (
    <div className="min-h-screen bg-f1-gray-700 relative">
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
      
      {/* Contenu principal */}
      <div className="flex items-center justify-center min-h-screen relative z-10">
        <h1 className="text-4xl font-bold text-f1-gray-100">home</h1>
      </div>
    </div>
  );
}
