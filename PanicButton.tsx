'use client'

import { useState } from 'react'

export default function PanicButton() {
  const [showConfirm, setShowConfirm] = useState(false)

  const handlePanic = () => {
    // Redirect to a safe site
    window.location.href = 'https://www.google.com'
  }

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="fixed bottom-4 right-4 w-14 h-14 bg-red-600 hover:bg-red-700 rounded-full shadow-lg flex items-center justify-center text-2xl z-50 transition-all hover:scale-110"
        title="Emergency Exit"
      >
        🚨
      </button>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-lg p-6 max-w-md border border-red-500">
            <h3 className="text-xl font-bold mb-4 text-red-400">Emergency Exit</h3>
            <p className="text-slate-300 mb-6">
              This will immediately redirect you to Google. Are you sure?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2 bg-slate-700 text-slate-200 rounded hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePanic}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-semibold"
              >
                Exit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
