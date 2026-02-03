'use client'

import { useState } from 'react'

interface Post {
  id: number
  author: string
  decryptedContent?: string
  timestamp: number
  validations: number
  disputes: number
}

interface ForumPostProps {
  post: Post
  onValidate: () => void
  onDispute: (reason: string) => void
  currentUser: string
}

export default function ForumPost({ post, onValidate, onDispute, currentUser }: ForumPostProps) {
  const [showDispute, setShowDispute] = useState(false)
  const [disputeReason, setDisputeReason] = useState('')
  const [showFullContent, setShowFullContent] = useState(false)

  const isAuthor = post.author.toLowerCase() === currentUser.toLowerCase()
  const date = new Date(post.timestamp * 1000).toLocaleDateString()
  const health = post.validations - post.disputes
  const isCracked = post.disputes > post.validations

  const handleDispute = () => {
    if (disputeReason.trim()) {
      onDispute(disputeReason)
      setDisputeReason('')
      setShowDispute(false)
    }
  }

  // Truncate content for preview
  const content = post.decryptedContent || 'Encrypted content'
  const preview = content.length > 200 ? content.slice(0, 200) + '...' : content
  const displayContent = showFullContent ? content : preview

  return (
    <div className={`bg-slate-800/50 rounded-lg p-6 border transition-all crystallize-enter ${
      isCracked ? 'border-red-500/50' : health > 5 ? 'border-green-500/50 crystal-glow' : 'border-slate-700'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">
              {isAuthor ? 'You' : `${post.author.slice(0, 6)}...${post.author.slice(-4)}`}
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-500">{date}</span>
          </div>
          
          {/* Health indicator */}
          <div className="flex items-center gap-2 mt-2">
            <div className={`text-xs px-2 py-1 rounded ${
              isCracked ? 'bg-red-500/20 text-red-400' :
              health > 5 ? 'bg-green-500/20 text-green-400' :
              health > 0 ? 'bg-blue-500/20 text-blue-400' :
              'bg-slate-500/20 text-slate-400'
            }`}>
              {isCracked ? '❌ Cracked' : health > 5 ? '💎 Strong' : health > 0 ? '✨ Growing' : '🔷 New'}
            </div>
            <span className="text-xs text-slate-500">
              {post.validations} ✓ • {post.disputes} ✗
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-slate-200 whitespace-pre-wrap">{displayContent}</p>
        {content.length > 200 && (
          <button
            onClick={() => setShowFullContent(!showFullContent)}
            className="text-blue-400 hover:text-blue-300 text-sm mt-2"
          >
            {showFullContent ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Actions */}
      {!isAuthor && (
        <div className="flex items-center gap-3 pt-4 border-t border-slate-700">
          <button
            onClick={onValidate}
            className="px-4 py-2 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30 transition-colors text-sm font-medium"
          >
            ✓ Validate
          </button>
          
          {!showDispute ? (
            <button
              onClick={() => setShowDispute(true)}
              className="px-4 py-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors text-sm font-medium"
            >
              ✗ Dispute
            </button>
          ) : (
            <div className="flex gap-2 flex-1">
              <input
                type="text"
                value={disputeReason}
                onChange={(e) => setDisputeReason(e.target.value)}
                placeholder="Why are you disputing this?"
                className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded text-sm focus:outline-none focus:border-red-400"
              />
              <button
                onClick={handleDispute}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm font-medium"
              >
                Submit
              </button>
              <button
                onClick={() => setShowDispute(false)}
                className="px-4 py-2 bg-slate-700 text-slate-300 rounded hover:bg-slate-600 transition-colors text-sm"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
