'use client'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const Swiper = dynamic(() => import('swiper/react').then(m => m.Swiper), { ssr: false })
const SwiperSlide = dynamic(() => import('swiper/react').then(m => m.SwiperSlide), { ssr: false })

interface CarouselProps {
  images: string[]
}

export default function Carousel({ images }: CarouselProps) {
  const [ready, setReady] = useState(false)
  const [instaIos, setInstaIos] = useState(false)

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const ua = navigator.userAgent
      if (/iP(hone|od|ad)/.test(ua) && ua.includes('Instagram')) {
        setInstaIos(true)
      }
    }
  }, [])

  useEffect(() => {
    let canceled = false
    const preload = async () => {
      for (const src of images) {
        if (canceled) return
        await new Promise<void>(res => {
          const img = new Image()
          img.onload = () => res()
          img.onerror = () => res()
          img.src = src
        })
        await new Promise(r => setTimeout(r, 100))
      }
      if (!canceled) setReady(true)
    }
    preload()
    return () => { canceled = true }
  }, [images])

  if (!images.length) {
    return (
      <header className="relative h-screen mb-40">
        <div className="flex justify-center items-center h-full bg-gray-200 text-gray-600">
          <p>Loading…</p>
        </div>
      </header>
    )
  }

  if (!ready) {
    return (
      <header className="relative h-screen mb-40">
        <div className="flex justify-center items-center h-full bg-gray-200 text-gray-600">
          <p>Loading…</p>
        </div>
      </header>
    )
  }

  return (
    <header className="relative h-screen mb-40">
      <Swiper
        modules={[Autoplay]}
        autoplay={!instaIos ? { delay: 3000, disableOnInteraction: false } : false}
        loop={!instaIos}
        slidesPerView={instaIos ? 1 : 3}
        spaceBetween={0}
        breakpoints={!instaIos ? {
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        } : undefined}
        className="h-full w-full"
      >
        {images.map((src, i) => (
          <SwiperSlide key={i}>
            <img
              src={src}
              alt={`slide ${i + 1}`}
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </header>
  )
}
