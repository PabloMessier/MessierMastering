"use client"

import { useState, useRef, useEffect } from "react"
import { Play, ExternalLink } from "lucide-react"

const Collaborations = () => {
  const [selectedVideo, setSelectedVideo] = useState(0)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleVideoSelect = (index: number) => {
    setSelectedVideo(index)
    setHasUserInteracted(true)
  }

  useEffect(() => {
    if (videoRef.current && hasUserInteracted) {
      videoRef.current.play()
    }
  }, [selectedVideo, hasUserInteracted])

  const collaborations = [
    {
      src: "/videos/collaborations/El Vega, Ladronn, DJ Jac - CARNE VIVA - LilSilvioElVegaVEVO (1080p, h264, youtube).mp4",
      title: "CARNE VIVA",
      artist: "El Vega, Ladronn, DJ Jac",
      description: "Professional mastering collaboration"
    },
    {
      src: "/videos/collaborations/HAPPY - LA FACTORIA ALEXIS (VIDEO OFICIAL).mp4",
      title: "HAPPY",
      artist: "LA FACTORIA ALEXIS",
      description: "Official video with professional mastering"
    },
    {
      src: "/videos/collaborations/Karly Way & El Oveja  - El Trompo   Video Oficial - Rocha Disc (1080p, h264, youtube).mp4",
      title: "El Trompo",
      artist: "Karly Way & El Oveja",
      description: "Video Oficial - Rocha Disc collaboration"
    },
    {
      src: "/videos/collaborations/ROXXXE - La Factoria  (Video Oficial).mp4",
      title: "La Factoria",
      artist: "ROXXXE",
      description: "Video Oficial with enhanced audio mastering"
    },
    {
      src: "/videos/collaborations/Simon Olano X Luisk De Leon - Culpo Al Alcohol.mp4",
      title: "Culpo Al Alcohol",
      artist: "Simon Olano X Luisk De Leon",
      description: "Collaborative mastering project"
    },
    {
      src: "/videos/collaborations/Valderrama X BLACKIEBWOY - Hablan de Mi (Audio Oficial) - Valderrama Oficial (1080p, h264, youtube).mp4",
      title: "Hablan de Mi",
      artist: "Valderrama X BLACKIEBWOY",
      description: "Audio Oficial - Professional mastering showcase"
    }
  ]

  return (
    <section id="collaborations" className="bg-black text-white section-padding">
      <div className="container">
        <h2 className="text-4xl md:text-5xl font-light mb-16 text-center">
          <span className="font-bold">Collaborations</span>
        </h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Video Player */}
          <div className="lg:col-span-2">
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                key={collaborations[selectedVideo].src}
                className="w-full h-full object-cover"
                controls
                preload="metadata"
              >
                <source src={collaborations[selectedVideo].src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">{collaborations[selectedVideo].title}</h3>
                <p className="text-white/70">{collaborations[selectedVideo].artist}</p>
                <p className="text-white/60 text-sm mt-1">{collaborations[selectedVideo].description}</p>
              </div>
              <button className="text-white/60 hover:text-white transition-colors">
                <ExternalLink size={20} />
              </button>
            </div>
          </div>

          {/* Playlist */}
          <div className="glass rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Featured Work</h3>
            <div className="space-y-3">
              {collaborations.map((video, index) => (
                <button
                  key={index}
                  onClick={() => handleVideoSelect(index)}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    selectedVideo === index ? "bg-white/20" : "hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-6 bg-white/20 rounded flex items-center justify-center">
                      <Play size={12} className="text-white ml-0.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{video.title}</h4>
                      <p className="text-white/70 text-xs">{video.artist}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Explore our collaborations with talented artists and see the mastering process in action. Each project
            brings unique challenges and creative opportunities.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Collaborations