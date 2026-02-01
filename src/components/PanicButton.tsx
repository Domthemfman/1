'use client'

import { useEffect, useRef, useState } from 'react'

interface PanicButtonProps {
  redirectUrl?: string
  buttonLabel?: string
  useReplace?: boolean // when true uses location.replace, otherwise location.href
}

export default function PanicButton({
  redirectUrl = 'https://www.google.com',
  buttonLabel = 'Emergency Exit',
  useReplace = true,
}: PanicButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const exitButtonRef = useRef<HTMLButtonElement | null>(null)
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!showConfirm) return

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Focus after a tiny delay so animation can start
    setTimeout(() => exitButtonRef.current?.focus(), 50)

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        startClose()
      } else if (e.key === 'Tab') {
        const focusable = Array.from(
          dialogRef.current?.querySelectorAll<HTMLElement>('[data-panic-focusable="true"]') ?? []
        )
        if (focusable.length === 0) return

        const currentIndex = focusable.indexOf(document.activeElement as HTMLElement)
        if (e.shiftKey) {
          if (currentIndex === 0 || document.activeElement === dialogRef.current) {
            e.preventDefault()
            focusable[focusable.length - 1].focus()
          }
        } else {
          if (currentIndex === focusable.length - 1) {
            e.preventDefault()
            focusable[0].focus()
          }
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocusedRef.current?.focus()
    }
  }, [showConfirm])

  const performRedirect = () => {
    if (typeof window === 'undefined') return
    if (useReplace) {
      window.location.replace(redirectUrl)
    } else {
      window.location.href = redirectUrl
    }
  }

  const startClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      setShowConfirm(false)
    }, 250)
  }

  const onOverlayMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) startClose()
  }

  return (
    <> 
      <style>{` 
        @keyframes panic-fade-in { from { opacity: 0 } to { opacity: 1 } }
        @keyframes panic-scale-in { from { opacity: 0; transform: translateY(8px) scale(0.98) } to { opacity: 1; transform: translateY(0) scale(1) } }
        @keyframes panic-scale-out { from { opacity: 1; transform: translateY(0) scale(1) } to { opacity: 0; transform: translateY(8px) scale(0.98) } }

        .panic-overlay { animation: panic-fade-in 180ms ease-out forwards; }
        .panic-dialog-in { animation: panic-scale-in 200ms cubic-bezier(.16,.84,.44,1) forwards; }
        .panic-dialog-out { animation: panic-scale-out 180ms ease-in forwards; }
      `}</style> 
      
      <button
        onClick={() => setShowConfirm(true)}
        className="fixed bottom-4 right-4 w-14 h-14 bg-red-600 hover:bg-red-700 rounded-full shadow-lg flex items-center justify-center text-2xl z-50 transition-transform duration-200 hover:scale-110"
        title={buttonLabel}
        aria-label={buttonLabel}
      > 
        🚨
      </button>

      {showConfirm && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 panic-overlay"
          role="presentation"
          onMouseDown={onOverlayMouseDown}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="panic-title"
            onMouseDown={(e) => e.stopPropagation()}
            className={`bg-slate-800 rounded-lg p-6 max-w-md border border-red-500 ${
              isClosing ? 'panic-dialog-out' : 'panic-dialog-in'
            }`}
          >
            <h3 id="panic-title" className="text-xl font-bold mb-4 text-red-400">
              {buttonLabel}
            </h3>
            <p className="text-slate-300 mb-6">
              This will immediately redirect you away from this site. Are you sure?
            </p>
            <div className="flex gap-3">
              <button
                data-panic-focusable="true"
                onClick={startClose}
                className="flex-1 px-4 py-2 bg-slate-700 text-slate-200 rounded hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button
                ref={exitButtonRef}
                data-panic-focusable="true"
                onClick={performRedirect}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-semibold"
              >
                Exit Now
              </button>
            </div>
          </div>
        </div>
      )} 
    </>
  }
}