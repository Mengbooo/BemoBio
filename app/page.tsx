import ASCIIShader from "./components/ascii/ASCIIShader";
import ASCIIText from "./components/ascii/ASCIIText";
import PhysicsSketch from "./components/ascii/PhysicsSketch";
import Navigation from "./components/Navigation";
import MagneticGrid from "./components/MagneticGrid";
import HorizontalGallery from "./components/HorizontalGallery";
import Footer from "./components/Footer";


export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Main Container */}
      <div className="container mx-auto px-8 py-24 h-screen flex items-end">
        <div className="grid grid-cols-12 gap-6 w-full">
          
          {/* Main ASCII Animation Card */}
          <div className="col-span-8 relative rounded-[2.5rem] overflow-hidden h-[calc(100vh-12rem)]">
            <ASCIIShader 
              frequency={2.5}
              speed={0.2}
              lightness={1}
              colorPrimary="#00ff00"
              colorSecondary="#003300"
              className="w-full h-full"
            />
          </div>

          {/* Right Sidebar Cards */}
          <div className="col-span-4 flex flex-col gap-6 h-[calc(100vh-12rem)]">
            {/* ASCII Text Card */}
            <div className="bg-transparent rounded-3xl overflow-hidden aspect-square relative border border-zinc-800">
              {/* Top Text */}
              <div className="absolute top-0 left-0 w-full h-[75%] z-20 pointer-events-none">
                <div className="pointer-events-auto">
                  <ASCIIText
                    text='hey!'
                    enableWaves={true}
                    asciiFontSize={6}
                    textFontSize={150}
                  />
                </div>
              </div>
              {/* Bottom Text */}
              <div className="absolute top-[25%] left-0 w-full h-[75%] z-10 pointer-events-none">
                <div className="pointer-events-auto">
                  <ASCIIText
                    text='Guys'
                    enableWaves={true}
                    asciiFontSize={6}
                    textFontSize={150}
                  />
                </div>
              </div>
            </div>
            {/* Dithering Shader Card */}
            <div className="bg-black rounded-3xl overflow-hidden h-112 border border-purple-500/30 relative">
              <PhysicsSketch />
            </div>
            {/* Bottom Text - moved here */}
            <div className="bg-black px-6 py-4 rounded-2xl mt-auto">
              <p className="text-xl font-semibold">
                Here is Bolaxious!<br/>A front-end beginner 👀<br/>& design novice 🍟
              </p>
              <button className="w-10 h-10 rounded-full border border-white/30 hover:bg-white/10 transition-colors flex items-center justify-center mt-4">
                ↓
              </button>
            </div>
          </div>
        </div>
      </div>
    

      {/* Footer */}
      <Footer />
    </div>
  );
}
