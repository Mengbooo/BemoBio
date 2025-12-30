'use client'

import Image from 'next/image'

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center px-8 py-6">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-36 h-36 relative">
          <Image 
            src="/logo3.png" 
            alt="BemoBio Logo" 
            width={100}
            height={100}
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </nav>
  )
}
