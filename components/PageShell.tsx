import React from 'react'

import { BrightBackground } from '@/components/BrightBackground'
import { SiteHeader } from '@/components/SiteHeader'

export function PageShell({
  children,
  headerRight,
  hideHeader = false,
}: {
  children: React.ReactNode
  headerRight?: React.ReactNode
  hideHeader?: boolean
}) {
  return (
    <div className="min-h-screen">
      <BrightBackground />
      {!hideHeader ? <SiteHeader right={headerRight} /> : null}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
        <main>{children}</main>
      </div>
    </div>
  )
}
