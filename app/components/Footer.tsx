'use client'

import ASCIICube from './ascii/ASCIICube'

export default function Footer() {
  return (
    <footer className="min-h-screen bg-transparent text-white border-t border-zinc-800 relative">
      <div className="container mx-auto px-8 py-16 grid grid-cols-12 gap-6">
        {/* Logo */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4 mt-8">
          <h2 className="text-4xl md:text-5xl font-bold">BemoBio</h2>
        </div>

        {/* Menu */}
        <nav className="col-span-6 md:col-span-3 lg:col-span-2 mt-8 flex flex-col gap-2 text-lg">
          <span className="font-semibold mb-2">Menu</span>
          <a href="#" className="hover:opacity-70 transition-opacity">Works</a>
          <a href="#" className="hover:opacity-70 transition-opacity">About</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Contact</a>
        </nav>

        {/* Help */}
        <nav className="col-span-6 md:col-span-3 lg:col-span-2 mt-8 flex flex-col gap-2">
          <span className="font-semibold mb-2">Help</span>
          <a href="#" className="hover:opacity-70 transition-opacity text-sm">FAQs</a>
          <a href="#" className="hover:opacity-70 transition-opacity text-sm">Support</a>
          <a href="#" className="hover:opacity-70 transition-opacity text-sm">Privacy</a>
        </nav>

        {/* Socials */}
        <nav className="col-span-6 md:col-span-3 lg:col-span-2 mt-8 flex flex-col gap-2">
          <span className="font-semibold mb-2">Socials</span>
          <a href="#" className="hover:opacity-70 transition-opacity text-sm">Twitter</a>
          <a href="#" className="hover:opacity-70 transition-opacity text-sm">Instagram</a>
          <a href="#" className="hover:opacity-70 transition-opacity text-sm">GitHub</a>
          <a href="#" className="hover:opacity-70 transition-opacity text-sm">LinkedIn</a>
        </nav>

        {/* Legal */}
        <nav className="col-span-12 md:col-span-6 lg:col-span-4 mt-8 flex flex-col gap-2 text-sm">
          <a href="#" className="hover:opacity-70 transition-opacity">Privacy Policy</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Terms & Conditions</a>
        </nav>

        {/* Copyright */}
        <div className="col-span-12 mt-16 mb-8 text-xs uppercase opacity-60 border-t border-zinc-800 pt-8">
          © 2025 BemoBio. All rights reserved
        </div>
      </div>

      {/* ASCII Cube - Bottom right of Footer */}
      <div className="absolute bottom-8 right-8 w-[300px] h-[300px] rounded-2xl overflow-hidden border border-zinc-800 bg-black">
        <ASCIICube />
      </div>
    </footer>
  )
}
