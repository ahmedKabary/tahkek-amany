import React from 'react'

import { BrightBackground } from '@/components/BrightBackground'
import { SiteHeader } from '@/components/SiteHeader'
import { MainSidebar } from '@/components/MainSidebar'

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
        <div className="flex flex-col md:flex-row-reverse gap-6">
          <MainSidebar className="hidden md:flex" />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  )
}
