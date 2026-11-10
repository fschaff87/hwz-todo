import { motion } from 'motion/react'

type ProgressRingProps = {
  done: number
  total: number
}

const SIZE = 72
const RADIUS = 30
const STROKE_WIDTH = 8
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function ProgressRing({ done, total }: ProgressRingProps) {
  const fraction = total === 0 ? 0 : Math.min(Math.max(done / total, 0), 1)
  const dashOffset = CIRCUMFERENCE * (1 - fraction)

  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label={`${done} von ${total} erledigt`}
    >
      <circle
        className="stroke-muted"
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        strokeWidth={STROKE_WIDTH}
        fill="none"
      />
      <motion.circle
        className="stroke-accent"
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        strokeWidth={STROKE_WIDTH}
        fill="none"
        strokeLinecap="round"
        transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
        strokeDasharray={CIRCUMFERENCE}
        animate={{ strokeDashoffset: dashOffset }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-foreground font-mono text-sm font-semibold"
      >
        {done}/{total}
      </text>
    </svg>
  )
}
