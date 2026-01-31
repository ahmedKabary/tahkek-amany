import React from 'react'

export function BrightBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-sky-50 to-amber-50" />
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="absolute top-32 -right-24 h-80 w-80 rounded-full bg-violet-200/40 blur-3xl" />
      <div className="absolute -bottom-24 left-1/3 h-80 w-80 rounded-full bg-amber-200/40 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(theme(colors.slate.900)_0.5px,transparent_0.5px)] [background-size:18px_18px]" />
    </div>
  )
}
