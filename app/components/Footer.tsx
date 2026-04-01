'use client'

import WaveText from './animation/RotatingText'
import ThruVFX from './ThruVFX'
import FluidTriangle from './ascii/FluidTriangle'
import SplashCursor from './animation/Cursor'
import Image from 'next/image'


export default function Footer() {
  return (
    <footer className="h-screen bg-transparent text-white border-t border-zinc-800 flex flex-col relative overflow-hidden">
      {/* Cursor effect only in Footer */}
      {/* <SplashCursor /> */}
      <div className="container mx-auto px-8 py-16 grid grid-cols-12 gap-6 relative">
        {/* Logo and Motto */}
        <div className="col-span-12 md:col-span-6 lg:col-span-6 mt-8">
          <div className="w-32 h-16 my-2">
            <Image
              src="/logo7.png"
              alt="BemoBio Logo"
              width={200}
              height={200}
              className="rounded-lg object-cover"
            />
          </div>
          {/* Motto */}
          {/* <div className="mt-20 flex items-center">
            <img 
              src="/lets-create-something-awesome.svg" 
              alt="Let's create something awesome" 
              className="w-auto h-8" 
              style={{ filter: 'invert(1) brightness(10) drop-shadow(0 0 2px white)' }}
            />
          </div> */}
        </div>

        {/* Spacer */}
        <div className="hidden lg:block lg:col-span-2"></div>

        {/* Menu */}
        <nav className="col-span-6 md:col-span-3 lg:col-span-2 mt-8 flex flex-col gap-2 text-lg text-right">
          <span className="font-semibold mb-2">Menu</span>
          <a href="#hero" className="hover:opacity-70 transition-opacity">Homepage</a>
          <a href="#works" className="hover:opacity-70 transition-opacity">Works</a>
          <a href="mailto:bolaxious@163.com" className="hover:opacity-70 transition-opacity">Contact</a>
        </nav>

        {/* Socials */}
        <nav className="col-span-6 md:col-span-3 lg:col-span-2 mt-8 flex flex-col gap-2 text-lg text-right">
          <span className="font-semibold mb-2">Socials</span>
          <a href="https://bolaxious.cn" target='_blank' className="hover:opacity-70 transition-opacity">Blog</a>
          <a href="https://github.com/Mengbooo" target='_blank' className="hover:opacity-70 transition-opacity ">GitHub</a>
          <a href="https://www.xiaohongshu.com/user/profile/6025423800000000010094a0" target="_blank" className="hover:opacity-70 transition-opacity ">Xhs</a>
        </nav>

        {/* Copyright */}
        <div className="col-span-12 mb-8 text-xs uppercase opacity-60 border-t border-zinc-800 pt-8">
          © 2026 BemoBio. All rights reserved
        </div>
      </div>

      {/* Fluid Triangle - Fixed height at bottom */}
      <div className="h-[400px] w-full absolute bottom-0 left-0">
        <FluidTriangle />
      </div>
    </footer>
  )
}
