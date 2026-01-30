import React from 'react'

type ScorebadgeProps = {
  score: number
}

const Scorebadge = ({ score }: ScorebadgeProps) => {
  const isStrong = score > 69
  const isGoodStart = score > 49

  const badgeLabel = isStrong ? 'strong' : isGoodStart ? 'good start' : 'needs work'
  const badgeClass = isStrong
    ? 'bg-badge-green text-green-600'
    : isGoodStart
      ? 'bg-badge-yellow text-yellow-600'
      : 'bg-badge-red text-red-600'

  return (
    <div className={`inline-flex items-center rounded-full px-3 py-1 ${badgeClass}`}>
      <p className="text-xs font-semibold uppercase tracking-wide">{badgeLabel}</p>
    </div>
  )
}

export default Scorebadge
