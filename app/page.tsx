import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import GradientMaskCard from "./components/GradientMaskCard";
import ColorBends from "./components/animation/ColorBends";
import HeroDithering from "./components/HeroDithering";




export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Main Section - Hero */}
      <section id="hero" className="h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0">
          <HeroDithering />
        </div>
        {/* 矩形覆盖层，与 works 对齐，宽度 70% */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="container mx-auto px-8 h-full flex justify-center items-center">
            <div className="w-[100%] h-[70vh] md:h-[40vh] lg:h-[40vh] border border-white/20 rounded-lg relative" style={{
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)'
            }}>
              {/* 左上角 */}
              <div className="absolute top-4 left-4 text-xs text-white/100 leading-relaxed">
                <div className="font-mono">Bolaxious</div>
                <div>Trying to be a Creative Developer</div>
              </div>
              {/* 右上角 */}
              <div className="absolute top-4 right-4 text-xs text-white/100 text-right leading-relaxed">
                <div>Design × Code</div>
                <div className="font-mono">2026</div>
              </div>
              {/* 左下角 */}
              <div className="absolute bottom-4 left-4 text-xs text-white/100 leading-relaxed">
                <div className="font-mono">https://bemo-bio.vercel.app</div>
              </div>
              {/* 右下角 */}
              <div className="absolute bottom-4 right-4 text-xs text-white/100 text-right leading-relaxed">
                <div>Based in China</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Works Section */}
      <section id="works" className="container mx-auto px-8 pt-24">
        <h2 className="text-2xl font-bold">Selected Works</h2>
        <div className="space-y-0">
          {/* Work Item 1 */}
          <GradientMaskCard
            title="BemoUI"
            description="Animated UI Components"
            tags={['React']}
            gradientColors="from-green-500/20 to-teal-500/20"
            link="https://bemo-ui.vercel.app/"
            icon="/bemoui.svg"
          />
          {/* Work Item 2 */}
          <GradientMaskCard
            title="BemoBio"
            description="Bolaxious' Portfolio"
            tags={['React']}
            gradientColors="from-purple-500/20 to-blue-500/20"
            link="https://bemo-bio.vercel.app/"
            icon="/bemobio.svg"
          />
          {/* Work Item 3 */}
          <GradientMaskCard
            title="BemoDB 2.0"
            description="Bolaxious' Blog 2.0"
            tags={['Blog']}
            gradientColors="from-red-500/20 to-orange-500/20"
            link="https://bolaxious.cn"
            icon="/bemodb.svg"
          />
          {/* Work Item 4 */}
          <GradientMaskCard
            title="Github"
            description="Bolaxious' GitHub"
            tags={['See More On···']}
            gradientColors="from-blue-500/20 to-teal-500/20"
            link="https://github.com/Mengbooo"
            icon="/github.svg"
          />
        </div>
      </section>

      {/* <NyanCat /> */}
      {/* <div style={{ width: '100%', height: '800px', position: 'relative' }}>
        <Prism
          animationType="rotate"
          timeScale={0.5}
          height={2.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0.5}
          glow={1}
        />
      </div> */}

      <div className="container mx-auto px-8 relative" style={{ minHeight: '40vh' }}>
        <ColorBends
          colors={["#111111ff","#8f8f8fff", "#e5e5ecff"]}
          rotation={0}
          speed={0.2}
          scale={1}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1}
          parallax={1}
          noise={0.1}
          transparent
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img 
            src="/stay-tuned-for-more.svg" 
            alt="Stay tuned for more"
            className="w-auto h-10 md:h-10 lg:h-12 max-w-full" 
            style={{ filter: 'invert(1) brightness(2) drop-shadow(0 0 8px white)' }}
          />
        </div>
      </div>

      {/* Footer with integrated FluidTriangle */}
      <Footer />
    </div>
  );
}
