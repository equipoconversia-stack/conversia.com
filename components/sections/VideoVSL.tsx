"use client"

import { useState } from "react"
import Image from "next/image"

interface VideoVSLProps {
  videoId: string
}

export function VideoVSL({ videoId }: VideoVSLProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div
      className="relative w-full cursor-pointer overflow-hidden rounded-2xl"
      style={{
        boxShadow: "0 0 40px rgba(108, 99, 255, 0.2), 0 0 0 1px rgba(108, 99, 255, 0.15)",
      }}
      onClick={() => setIsLoaded(true)}
      role="button"
      tabIndex={0}
      aria-label="Reproducir video de ConversIA"
      onKeyDown={(e) => e.key === "Enter" && setIsLoaded(true)}
    >
      <div className="aspect-video w-full bg-[#12121A]">
        {!isLoaded ? (
          <div className="group relative h-full w-full">
            <Image
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt="Mirá cómo funciona ConversIA"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              loading="lazy"
              unoptimized
            />
            {/* Overlay oscuro */}
            <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/30" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#6C63FF] shadow-[0_0_30px_rgba(108,99,255,0.5)] transition-transform group-hover:scale-110">
                <svg
                  className="ml-1 h-9 w-9 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 h-full w-full border-0"
            title="Video ConversIA"
          />
        )}
      </div>
    </div>
  )
}
