"use client"

import { useEffect, useRef, useState, ReactNode } from "react"

interface LazySectionProps {
  children: ReactNode
  fallback?: ReactNode
  rootMargin?: string
  threshold?: number
}

export default function LazySection({ 
  children, 
  fallback = <div className="h-96 animate-pulse bg-gray-100" />,
  rootMargin = "100px",
  threshold = 0.01
}: LazySectionProps) {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          // Once loaded, stop observing
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current)
          }
        }
      },
      {
        rootMargin,
        threshold
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [rootMargin, threshold])

  return (
    <div ref={sectionRef}>
      {isInView ? children : fallback}
    </div>
  )
}
