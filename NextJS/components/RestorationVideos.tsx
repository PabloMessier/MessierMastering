"use client"

import { useState, useRef, useEffect } from "react"
import { Play, ExternalLink } from "lucide-react"

const RestorationVideos = () => {
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

  const videos = [
    {
      src: "/videos/restoration/optometra.mp4",
      title: "Professional Audio Restoration - Optometra Project",
      description: "Complete audio restoration process demonstration - removing noise and enhancing clarity"
    }
  ]

  return (
    <section id="restoration" className="bg-black text-white section-padding">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-light mb-8">
              Audio <span className="font-bold">Restoration</span>
            </h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Discover our audio restoration capabilities through these demonstration videos. From removing unwanted
              noise to reviving vintage recordings, we can help restore your audio to its full potential.
            </p>

            <div className="space-y-4">
              {videos.map((video, index) => (
                <button
                  key={index}
                  onClick={() => handleVideoSelect(index)}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    selectedVideo === index ? "glass" : "hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Play size={16} className="text-white/60" />
                    <div>
                      <h3 className="font-medium">{video.title}</h3>
                      <p className="text-white/60 text-sm">{video.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {videos.length === 1 && (
              <div className="mt-8 p-4 rounded-lg bg-white/5">
                <p className="text-white/60 text-sm">
                  This comprehensive restoration project demonstrates our complete workflow and techniques for 
                  professional audio restoration.
                </p>
              </div>
            )}
          </div>

          <div className="relative">
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                key={videos[selectedVideo].src}
                className="w-full h-full object-cover"
                controls
                preload="metadata"
              >
                <source src={videos[selectedVideo].src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-lg">{videos[selectedVideo].title}</h3>
                <p className="text-white/60 text-sm">{videos[selectedVideo].description}</p>
              </div>
              <button className="text-white/60 hover:text-white transition-colors">
                <ExternalLink size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RestorationVideos