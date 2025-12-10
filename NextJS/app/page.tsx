import dynamic from "next/dynamic"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import LazySection from "@/components/LazySection"

// Dynamically import components only when needed
const About = dynamic(() => import("@/components/About"))
const Services = dynamic(() => import("@/components/Services"))
const AudioExamples = dynamic(() => import("@/components/AudioExamples"))
const FAQ = dynamic(() => import("@/components/FAQ"))
const Studio = dynamic(() => import("@/components/Studio"))
const Collaborations = dynamic(() => import("@/components/Collaborations"))
const MasteringVideos = dynamic(() => import("@/components/MasteringVideos"))
const RestorationVideos = dynamic(() => import("@/components/RestorationVideos"))
const Contact = dynamic(() => import("@/components/Contact"))
const Footer = dynamic(() => import("@/components/Footer"))

export default function Home() {
  return (
    <main>
      {/* Critical above-the-fold components - always loaded */}
      <Header />
      <Hero />
      
      {/* Components loaded as user scrolls down */}
      <LazySection>
        <About />
      </LazySection>
      
      <LazySection>
        <Services />
      </LazySection>
      
      {/* Media components with larger rootMargin for preloading */}
      <LazySection rootMargin="200px">
        <AudioExamples />
      </LazySection>
      
      <LazySection>
        <FAQ />
      </LazySection>
      
      <LazySection>
        <Studio />
      </LazySection>
      
      {/* Video components with extra preloading margin */}
      <LazySection rootMargin="300px">
        <Collaborations />
      </LazySection>
      
      <LazySection rootMargin="300px">
        <MasteringVideos />
      </LazySection>
      
      <LazySection rootMargin="300px">
        <RestorationVideos />
      </LazySection>
      
      <LazySection>
        <Contact />
      </LazySection>
      
      <LazySection>
        <Footer />
      </LazySection>
    </main>
  )
}
