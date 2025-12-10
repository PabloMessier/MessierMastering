"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Music } from "lucide-react"

interface Track {
  title: string
  src: string
  description: string
  fragment: string
}

interface AudioPlayerProps {
  title: string
  subtitle: string
  description: string
  tracks: Track[]
}

const AudioPlayer = ({ title, subtitle, description, tracks }: AudioPlayerProps) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  const currentTrack = tracks[currentTrackIndex]

  // Group tracks by fragment for the playlist
  const groupedTracks = tracks.reduce((acc, track, index) => {
    if (!acc[track.fragment]) {
      acc[track.fragment] = []
    }
    acc[track.fragment].push({ ...track, index })
    return acc
  }, {} as Record<string, (Track & { index: number })[]>)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => {
      setCurrentTime(audio.currentTime)
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }

    const updateDuration = () => {
      setDuration(audio.duration || 0)
    }

    const handleEnded = () => {
      // Auto-play next track
      if (currentTrackIndex < tracks.length - 1) {
        setCurrentTrackIndex(prev => prev + 1)
      } else {
        setIsPlaying(false)
        setProgress(0)
        setCurrentTime(0)
      }
    }

    const handleError = () => {
      console.log("Audio error occurred")
      setIsPlaying(false)
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
    }
  }, [currentTrackIndex, tracks.length])

  // Load and play when track changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.src = currentTrack.src
    audio.volume = isMuted ? 0 : volume
    
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false))
    }
  }, [currentTrackIndex, currentTrack.src])

  // Update volume
  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().catch(() => setIsPlaying(false))
      setIsPlaying(true)
    }
  }, [isPlaying])

  const selectTrack = useCallback((index: number) => {
    if (index === currentTrackIndex) {
      togglePlay()
    } else {
      setCurrentTrackIndex(index)
      setIsPlaying(true)
      setProgress(0)
      setCurrentTime(0)
    }
  }, [currentTrackIndex, togglePlay])

  const previousTrack = useCallback(() => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(prev => prev - 1)
      setProgress(0)
      setCurrentTime(0)
    }
  }, [currentTrackIndex])

  const nextTrack = useCallback(() => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(prev => prev + 1)
      setProgress(0)
      setCurrentTime(0)
    }
  }, [currentTrackIndex, tracks.length])

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    const progressBar = progressRef.current
    if (!audio || !progressBar) return

    const rect = progressBar.getBoundingClientRect()
    const clickPosition = (e.clientX - rect.left) / rect.width
    const newTime = clickPosition * audio.duration
    audio.currentTime = newTime
  }, [])

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev)
  }, [])

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-black p-6 text-white">
        <h3 className="text-2xl font-light">
          {title} <span className="font-bold">{subtitle}</span>
        </h3>
        <p className="text-white/70 text-sm mt-2">{description}</p>
      </div>

      {/* Main Player */}
      <div className="p-6 bg-white border-b border-gray-200">
        {/* Now Playing */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
            <Music className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-base truncate">{currentTrack.title}</h4>
            <p className="text-gray-500 text-sm">{currentTrack.description}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div 
          ref={progressRef}
          className="w-full bg-gray-300 rounded-full h-2 cursor-pointer mb-2 group"
          onClick={handleProgressClick}
        >
          <div
            className="bg-black h-2 rounded-full transition-all duration-100 relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mb-6">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          {/* Playback Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={previousTrack}
              disabled={currentTrackIndex === 0}
              className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <SkipBack size={18} />
            </button>
            <button
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
            </button>
            <button
              onClick={nextTrack}
              disabled={currentTrackIndex === tracks.length - 1}
              className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <SkipForward size={18} />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
            >
              {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value))
                setIsMuted(false)
              }}
              className="w-20 h-1 bg-gray-300 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black"
            />
          </div>
        </div>
      </div>

      {/* Playlist */}
      <div className="max-h-72 overflow-y-auto">
        {Object.entries(groupedTracks).map(([fragment, fragmentTracks]) => (
          <div key={fragment}>
            <div className="px-6 py-2 bg-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide sticky top-0">
              {fragment}
            </div>
            {fragmentTracks.map((track) => (
              <button
                key={track.index}
                onClick={() => selectTrack(track.index)}
                className={`w-full px-6 py-3 flex items-center gap-3 hover:bg-gray-100 transition-colors text-left ${
                  currentTrackIndex === track.index ? "bg-gray-100" : "bg-white"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  currentTrackIndex === track.index ? "bg-black text-white" : "bg-gray-200 text-gray-500"
                }`}>
                  {currentTrackIndex === track.index && isPlaying ? (
                    <Pause size={14} />
                  ) : (
                    <Play size={14} className="ml-0.5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm truncate ${
                    currentTrackIndex === track.index ? "font-semibold" : "font-medium"
                  }`}>
                    {track.title}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{track.description}</p>
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>

      <audio ref={audioRef} preload="metadata" />
    </div>
  )
}

const AudioExamples = () => {
  const masteringTracks: Track[] = [
    { title: "Fragment 1 - Final Mix", src: "/audio/mastering-examples/FRAGMENT-1-(FINAL-MIX).wav", description: "Final mix before mastering", fragment: "Fragment 1" },
    { title: "Fragment 1 - Unmastered", src: "/audio/mastering-examples/FRAGMENT-1 -(UN-MASTERED).wav", description: "Original unmastered audio", fragment: "Fragment 1" },
    { title: "Fragment 1 - Mastered", src: "/audio/mastering-examples/FRAGMENT-1-(MASTERED).wav", description: "Professional mastered version", fragment: "Fragment 1" },
    { title: "Fragment 2 - Final Mix", src: "/audio/mastering-examples/FRAGMENT-2-(FINAL-MIX).wav", description: "Final mix before mastering", fragment: "Fragment 2" },
    { title: "Fragment 2 - Unmastered", src: "/audio/mastering-examples/FRAGMENT-2-(UN-MASTERED).wav", description: "Original unmastered audio", fragment: "Fragment 2" },
    { title: "Fragment 2 - Mastered", src: "/audio/mastering-examples/FRAGMENT-2-(MASTERED).wav", description: "Professional mastered version", fragment: "Fragment 2" },
    { title: "Fragment 3 - Final Mix", src: "/audio/mastering-examples/FRAGMENT-3-(FINAL-MIX).wav", description: "Final mix before mastering", fragment: "Fragment 3" },
    { title: "Fragment 3 - Unmastered", src: "/audio/mastering-examples/FRAGMENT-3-(UN-MASTERED).wav", description: "Original unmastered audio", fragment: "Fragment 3" },
    { title: "Fragment 3 - Mastered", src: "/audio/mastering-examples/FRAGMENT-3-(MASTERED).wav", description: "Professional mastered version", fragment: "Fragment 3" },
    { title: "Fragment 4 - Final Mix", src: "/audio/mastering-examples/FRAGMENT-4-(FINAL-MIX).wav", description: "Final mix before mastering", fragment: "Fragment 4" },
    { title: "Fragment 4 - Unmastered", src: "/audio/mastering-examples/FRAGMENT-4-(UN-MASTERED).wav", description: "Original unmastered audio", fragment: "Fragment 4" },
    { title: "Fragment 4 - Mastered", src: "/audio/mastering-examples/FRAGMENT-4-(MASTERED).wav", description: "Professional mastered version", fragment: "Fragment 4" },
    { title: "Fragment 5 - Final Mix", src: "/audio/mastering-examples/FRAGMENT-5-(FINAL-MIX).wav", description: "Final mix before mastering", fragment: "Fragment 5" },
    { title: "Fragment 5 - Unmastered", src: "/audio/mastering-examples/FRAGMENT-5-(UN-MASTERED).wav", description: "Original unmastered audio", fragment: "Fragment 5" },
    { title: "Fragment 5 - Mastered", src: "/audio/mastering-examples/FRAGMENT-5-(MASTERED).wav", description: "Professional mastered version", fragment: "Fragment 5" },
  ]

  const restorationTracks: Track[] = [
    { title: "Fragment 01 - Un-repaired", src: "/audio/restoration-examples/FRAGMENT01 (UN-REPAIRED).wav", description: "Original damaged audio", fragment: "Fragment 01" },
    { title: "Fragment 01 - Repaired", src: "/audio/restoration-examples/FRAGMENT01 (REPAIRED).wav", description: "Restored and repaired audio", fragment: "Fragment 01" },
    { title: "Fragment 02 - Un-repaired", src: "/audio/restoration-examples/FRAGMENT02 (UN-REPAIRED).wav", description: "Original damaged audio", fragment: "Fragment 02" },
    { title: "Fragment 02 - Repaired", src: "/audio/restoration-examples/FRAGMENT02 (REPAIRED).wav", description: "Restored and repaired audio", fragment: "Fragment 02" },
  ]

  return (
    <section id="examples" className="bg-white text-black section-padding">
      <div className="container">
        <h2 className="text-4xl md:text-5xl font-light mb-16 text-center">
          Audio <span className="font-bold">Examples</span>
        </h2>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            <AudioPlayer
              title="Mastering"
              subtitle="Examples"
              description="Compare the difference between final mix, unmastered, and professionally mastered audio tracks."
              tracks={masteringTracks}
            />
            <AudioPlayer
              title="Audio Restoration"
              subtitle="Examples"
              description="Hear the dramatic difference between damaged audio and our professional restoration work."
              tracks={restorationTracks}
            />
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These examples showcase the clarity, depth, and professional polish that our mastering process brings to
              your music. Each track demonstrates enhanced dynamics, improved frequency balance, and optimized loudness.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AudioExamples
