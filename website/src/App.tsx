import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ConversionPanel from './components/ConversionPanel'
import Features from './components/Features'
import DesktopApp from './components/DesktopApp'
import Footer from './components/Footer'

export default function App() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <div className={dark ? 'bg-[#0e0c1d] text-[#e8e6f0]' : 'bg-[#fafafa] text-[#1a1a2e]'}>
      <Navbar dark={dark} onToggleDark={() => setDark(!dark)} />
      <main>
        <Hero dark={dark} />
        <ConversionPanel dark={dark} />
        <Features dark={dark} />
        <DesktopApp dark={dark} />
      </main>
      <Footer dark={dark} />
    </div>
  )
}
