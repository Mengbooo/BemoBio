'use client'

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-black/30 backdrop-blur-sm">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="font-bold text-2xl text-white">
          BemoBio
        </div>
      </div>
    </nav>
  )
}
