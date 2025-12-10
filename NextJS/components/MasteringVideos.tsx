"use client"

import { useState, useRef, useEffect } from "react"
import { Play, ExternalLink } from "lucide-react"

const MasteringVideos = () => {
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
      src: "/videos/mastering/2022-01-17.mp4",
      title: "Mastering Session - January 2022",
      description: "Professional mastering workflow demonstration from our January 2022 session"
    },
    {
      src: "/videos/mastering/2022-03-31.mp4",
      title: "Mastering Process - March 2022",
      description: "Step-by-step mastering process from our March 2022 studio session"
    },
    {
      src: "/videos/mastering/POP-3.mp4",
      title: "Pop Music Mastering - Part 3",
      description: "Specialized techniques for mastering pop music - advanced methods"
    },
    {
      src: "/videos/mastering/pop4.mp4",
      title: "Pop Music Mastering - Part 4",
      description: "Final touches and polishing techniques for pop music mastering"
    }
  ]

  return (
    <section id="mastering" className="bg-white text-black section-padding">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12">
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
                <h3 className="font-semibold text-lg">{videos[selectedVideo].title}</h3>
                <p className="text-gray-600 text-sm">{videos[selectedVideo].description}</p>
              </div>
              <button className="text-gray-600 hover:text-black transition-colors">
                <ExternalLink size={16} />
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-light mb-8">
              Mastering <span className="font-bold">Insights</span>
            </h2>
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              Learn about our mastering process and techniques through these educational videos. We believe in
              transparency and sharing knowledge with the music community.
            </p>

            <div className="space-y-4">
              {videos.map((video, index) => (
                <button
                  key={index}
                  onClick={() => handleVideoSelect(index)}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    selectedVideo === index ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Play size={16} className="text-gray-600" />
                    <div>
                      <h3 className="font-medium">{video.title}</h3>
                      <p className="text-gray-600 text-sm">{video.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MasteringVideos