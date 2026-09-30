import { Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import { usePrefersReducedMotion } from "../hooks/use-prefers-reduced-motion"

const CONFETTI_STORAGE_KEY = "agape-hope-anniversary-confetti-seen-v1"
let confettiPlayedThisSession = false

type ConfettiPiece = {
  id: number
  side: "left" | "right"
  color: string
  delay: number
  duration: number
  distanceX: number
  distanceY: number
  rotation: number
}

export function AnniversaryBanner() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [showConfetti, setShowConfetti] = useState(false)

  const confetti = useMemo<ConfettiPiece[]>(
    () =>
      Array.from({ length: 26 }, (_, index) => {
        const side = index % 2 === 0 ? "left" : "right"
        const spread = 26 + (index % 7) * 12

        return {
          id: index,
          side,
          color: ["#F6C85F", "#FFFFFF", "#D9CFC9", "#B3261E", "#FFE9A8"][index % 5],
          delay: (index % 8) * 0.045,
          duration: 1.7 + (index % 5) * 0.12,
          distanceX: side === "left" ? spread : -spread,
          distanceY: 88 + (index % 6) * 14,
          rotation: side === "left" ? 180 + index * 17 : -180 - index * 17,
        }
      }),
    [],
  )

  useEffect(() => {
    if (prefersReducedMotion || confettiPlayedThisSession) return

    try {
      if (window.localStorage.getItem(CONFETTI_STORAGE_KEY)) return
      window.localStorage.setItem(CONFETTI_STORAGE_KEY, "true")
    } catch {
      // If storage is unavailable, still keep the burst to this app session.
    }

    confettiPlayedThisSession = true
    setShowConfetti(true)
    const timeout = window.setTimeout(() => setShowConfetti(false), 2600)
    return () => window.clearTimeout(timeout)
  }, [prefersReducedMotion])

  return (
    <div className="relative isolate overflow-hidden bg-primary text-white shadow-[0_10px_28px_rgba(43,35,32,0.16)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.16)_42%,rgba(246,200,95,0.34)_50%,rgba(255,255,255,0.14)_58%,transparent_100%)] bg-[length:240%_100%] motion-safe:animate-[anniversary-shimmer_4.8s_ease-in-out_infinite]"
      />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F6C85F] to-transparent opacity-80" />

      {showConfetti ? (
        <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-32 overflow-hidden" aria-hidden="true">
          {confetti.map((piece) => (
            <motion.span
              key={piece.id}
              className="absolute top-2 h-2.5 w-1.5 rounded-[2px]"
              style={{
                backgroundColor: piece.color,
                left: piece.side === "left" ? "18px" : "auto",
                right: piece.side === "right" ? "18px" : "auto",
              }}
              initial={{ opacity: 0, x: 0, y: -10, rotate: 0, scale: 0.7 }}
              animate={{
                opacity: [0, 1, 1, 0],
                x: piece.distanceX,
                y: piece.distanceY,
                rotate: piece.rotation,
                scale: [0.7, 1, 0.95],
              }}
              transition={{ delay: piece.delay, duration: piece.duration, ease: "easeOut" }}
            />
          ))}
        </div>
      ) : null}

      <div className="mx-auto flex min-h-12 w-full max-w-7xl flex-col items-center justify-center gap-2.5 px-4 py-2.5 text-center sm:min-h-13 sm:flex-row sm:gap-4 sm:px-6 lg:px-8">
        <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#F6C85F]/55 bg-white/12 px-3 py-1.5 text-[0.72rem] font-black leading-none tracking-[0.16em] text-[#FFE9A8] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
          <Sparkles size={15} aria-hidden="true" />
          5 YEARS
        </span>
        <p className="text-balance text-sm font-extrabold leading-6 tracking-[0.02em] sm:text-base">
          <span aria-hidden="true">🎉 </span>
          Celebrating 5 Years of Hope &amp; Service
          <span className="mx-2 text-[#F6C85F]" aria-hidden="true">
            ·
          </span>
          Welcome to Our New Website
        </p>
      </div>
    </div>
  )
}
