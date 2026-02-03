'use client'

import { useState } from 'react'

interface CreatePostModalProps {
  onClose: () => void
  onSubmit: (content: string, isAnonymous: boolean) => void
  loading: boolean
}

export default function CreatePostModal({ onClose, onSubmit, loading }: CreatePostModalProps) {
  const [content, setContent] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim()) {
      onSubmit(content, isAnonymous)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-lg max-w-2xl w-full p-6 border border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Share Your Truth</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 text-2xl"
            disabled={loading}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your experience, thoughts, or truth..."
              className="w-full h-48 px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-400 resize-none"
              disabled={loading}
              required
            />
            <p className="text-xs text-slate-500 mt-2">
              Your content will be encrypted and stored on the blockchain. It cannot be removed or censored.
            </p>
          </div>

          <div className="mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 text-blue-500 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                disabled={loading}
              />
              <span className="text-slate-300">Post anonymously (recommended)</span>
            </label>
            <p className="text-xs text-slate-500 ml-7 mt-1">
              Your wallet address will still be visible, but won't be prominently displayed
            </p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-400 mb-2">📌 Posting Fee: 0.001 MATIC</h3>
            <p className="text-sm text-slate-300">
              • 90% funds free posts for those who can't afford to pay<br/>
              • 10% supports platform maintenance<br/>
              • Your post is permanently stored on Polygon blockchain
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || !content.trim()}
            >
              {loading ? 'Posting...' : 'Post to Blockchain'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
