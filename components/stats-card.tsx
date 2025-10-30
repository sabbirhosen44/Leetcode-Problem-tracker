"use client"

import { motion } from "framer-motion"

interface StatsCardProps {
  label: string
  value: number
  total?: number
}

export function StatsCard({ label, value, total }: StatsCardProps) {
  const percentage = total ? Math.round((value / total) * 100) : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg bg-card border border-border p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <p className="text-xs md:text-sm font-medium text-muted-foreground">{label}</p>
      <div className="mt-3 flex items-baseline gap-2">
        <p className="text-2xl md:text-3xl font-bold text-foreground">
          {value}
          {total && <span className="text-lg md:text-xl text-muted-foreground ml-1">/{total}</span>}
        </p>
        {percentage > 0 && <p className="text-xs md:text-sm font-semibold text-primary">{percentage}%</p>}
      </div>
    </motion.div>
  )
}
