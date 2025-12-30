import ASCIIShader from "./components/ascii/ASCIIShader";
import ASCIIText from "./components/ascii/ASCIIText";
import PhysicsSketch from "./components/ascii/PhysicsSketch";
import Navigation from "./components/Navigation";


export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Main Container */}
      <div className="container mx-auto px-8 py-24 h-screen flex items-center">
        <div className="grid grid-cols-12 gap-6 w-full h-[calc(100vh-12rem)]">
          
          {/* Main ASCII Animation Card */}
          <div className="col-span-8 relative rounded-[2.5rem] overflow-hidden">
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
          <div className="col-span-4 flex flex-col gap-6">
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
              {/* Bottom Right Text */}
              <div className="absolute bottom-4 right-4 text-bold text-zinc-300 z-10 pointer-events-none font-semibold">
                Here is Bolaxious
              </div>
            </div>
            {/* Dithering Shader Card */}
            <div className="bg-black rounded-3xl overflow-hidden flex-1 border border-purple-500/30 relative">
              <PhysicsSketch />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Left Text */}
      <div className="fixed bottom-8 left-8 z-10">
        <div className="bg-black px-6 py-4 rounded-2xl inline-block">
          <p className="text-2xl font-semibold">
            Equal parts creative<br />developer & designer
          </p>
        </div>
        <button className="w-10 h-10 rounded-full border border-white/30 hover:bg-white/10 transition-colors flex items-center justify-center mt-4">
          ↓
        </button>
      </div>
    </div>
  );
}
