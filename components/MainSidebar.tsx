"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Info, Shield, UserRound, Sparkles, HeartHandshake } from 'lucide-react'

import { cn } from '@/lib/utils'

const links = [
  { href: '/', label: 'الرئيسية', icon: Home },
  { href: '/form', label: 'أرسل أمنيتي', icon: Sparkles },
  { href: '/volunteer', label: 'تطوع معنا', icon: HeartHandshake },
  { href: '/profile', label: 'الملف الشخصي', icon: UserRound },
  { href: '/about', label: 'عن المبادرة', icon: Info },
  { href: '/privacy', label: 'الخصوصية', icon: Shield },
]

export function MainSidebar({ className = '' }: { className?: string }) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'rounded-3xl bg-white/80 border border-slate-200/70 shadow-sm p-3 w-52 shrink-0',
        'flex flex-col gap-1',
        className,
      )}
    >
      <div className="px-2 pb-2 text-xs font-semibold text-slate-500">
        التنقل
      </div>
      <nav className="flex flex-col gap-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center justify-between gap-2 rounded-2xl px-3 py-2.5 text-sm transition-colors',
                active
                  ? 'bg-sky-50 text-sky-700 border border-sky-100'
                  : 'text-slate-700 hover:bg-slate-50 border border-transparent',
              )}
            >
              <span className="flex items-center gap-2">
                <Icon className="size-4" />
                <span>{label}</span>
              </span>
              {active ? (
                <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
              ) : null}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
