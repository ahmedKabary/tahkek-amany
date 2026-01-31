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
      <main>{children}</main>
    </div>
  )
}
