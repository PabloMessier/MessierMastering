import dynamic from "next/dynamic"
import { Suspense } from "react"
import Header from "@/components/Header"
import Hero from "@/components/Hero"

// Lazy load non-critical components
const About = dynamic(() => import("@/components/About"), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
  ssr: true
})

const Services = dynamic(() => import("@/components/Services"), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
  ssr: true
})

const AudioExamples = dynamic(() => import("@/components/AudioExamples"), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
  ssr: false // Audio players don't need SSR
})

const FAQ = dynamic(() => import("@/components/FAQ"), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
  ssr: true
})

const Studio = dynamic(() => import("@/components/Studio"), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
  ssr: true
})

const Collaborations = dynamic(() => import("@/components/Collaborations"), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
  ssr: false // Video players don't need SSR
})

const MasteringVideos = dynamic(() => import("@/components/MasteringVideos"), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
  ssr: false // Video players don't need SSR
})

const RestorationVideos = dynamic(() => import("@/components/RestorationVideos"), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
  ssr: false // Video players don't need SSR
})

const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
  ssr: true
})

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="h-24 animate-pulse bg-gray-100" />,
  ssr: true
})

export default function Home() {
  return (
    <main>
      {/* Critical above-the-fold components */}
      <Header />
      <Hero />
      
      {/* Lazy-loaded components with Suspense */}
      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100" />}>
        <About />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100" />}>
        <Services />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100" />}>
        <AudioExamples />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100" />}>
        <FAQ />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100" />}>
        <Studio />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100" />}>
        <Collaborations />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100" />}>
        <MasteringVideos />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100" />}>
        <RestorationVideos />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100" />}>
        <Contact />
      </Suspense>
      
      <Suspense fallback={<div className="h-24 animate-pulse bg-gray-100" />}>
        <Footer />
      </Suspense>
    </main>
  )
}
