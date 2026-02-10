'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { House, Menu, UserRound, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'

export function SiteHeader({
  className,
  right,
}: {
  className?: string
  right?: React.ReactNode
}) {
  const { user } = useAuth()
  const isAuthed = Boolean(user)
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const navLinks = [
    { href: '/', label: 'الرئيسية' },
    { href: '/about', label: 'عن المبادرة' },
    { href: '/privacy', label: 'الخصوصية' },
  ]
  const visibleLinks = isAuthed
    ? [
        { href: '/', label: 'الرئيسية' },
        { href: '/volunteer', label: 'تطوع معنا' },
        { href: '/privacy', label: 'الخصوصية' },
        { href: '/about', label: 'عن المبادرة' },
      ]
    : navLinks
  const mobileLinks = visibleLinks.filter((link) => link.href !== '/')

  return (
    <header className={cn('sticky top-0 z-50', className)}>
      <div className="bg-white/70 backdrop-blur-xl border-b border-slate-200/70">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-9 w-24">
                <Image
                  src="/Resala.png"
                  alt="Resala"
                  fill
                  sizes="96px"
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-2">
              {visibleLinks.map(({ href, label }) => (
                <Button
                  key={href}
                  asChild
                  variant="ghost"
                  className={cn(
                    'text-slate-700',
                    pathname === href && 'text-sky-700'
                  )}
                >
                  <Link href={href}>{label}</Link>
                </Button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {right}
              {!isAuthed ? (
                <Button asChild className="hidden md:inline-flex rounded-full">
                  <Link href="/login">تسجيل الدخول</Link>
                </Button>
              ) : (
                <>
                  <Button
                    asChild
                    className="hidden md:inline-flex rounded-full"
                  >
                    <Link href="/form">أرسل أمنيتي</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="hidden md:inline-flex rounded-full border-slate-200 bg-white hover:bg-slate-50"
                  >
                    <Link href="/profile" className="flex items-center gap-2">
                      <UserRound className="size-4" />
                      <span className="hidden sm:inline">الملف الشخصي</span>
                    </Link>
                  </Button>
                </>
              )}

              {/* Mobile menu toggle */}
              <Link
                href="/"
                className={cn(
                  'md:hidden p-1 transition-colors',
                  pathname === '/' ? 'text-sky-600' : 'text-slate-800 hover:text-slate-900'
                )}
                aria-label="العودة للرئيسية"
              >
                <House className="size-5" />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full transition-transform duration-200"
                onClick={() => setMobileOpen((v) => !v)}
                aria-expanded={mobileOpen}
                aria-label="فتح القائمة"
              >
                <div className="relative h-5 w-5">
                  <span
                    className={cn(
                      'absolute left-0 top-1/2 block h-0.5 w-full -translate-y-1.5 bg-slate-800 transition-all duration-200',
                      mobileOpen && 'translate-y-0 rotate-45'
                    )}
                  />
                  <span
                    className={cn(
                      'absolute left-0 top-1/2 block h-0.5 w-full bg-slate-800 transition-all duration-200',
                      mobileOpen && 'opacity-0'
                    )}
                  />
                  <span
                    className={cn(
                      'absolute left-0 top-1/2 block h-0.5 w-full translate-y-1.5 bg-slate-800 transition-all duration-200',
                      mobileOpen && '-translate-y-0 rotate-[-45deg]'
                    )}
                  />
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            'md:hidden border-t border-slate-200/70 bg-white/95 backdrop-blur-xl transition-all duration-300 origin-top overflow-hidden',
            mobileOpen
              ? 'max-h-[520px] opacity-100 translate-y-0'
              : 'max-h-0 opacity-0 -translate-y-3 pointer-events-none'
          )}
          aria-hidden={!mobileOpen}
        >
          <div className="px-4 py-4 space-y-3">
            <div className="grid gap-2">
              {mobileLinks.map(({ href, label }) => (
                <Button
                  key={href}
                  asChild
                  variant="ghost"
                  className={cn(
                    'justify-start text-slate-700',
                    pathname === href && 'text-sky-700'
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  <Link href={href}>{label}</Link>
                </Button>
              ))}
            </div>

            <div className="grid gap-2 pt-2 border-t border-slate-200/70">
              {!isAuthed ? (
                <Button
                  asChild
                  className="rounded-full"
                  onClick={() => setMobileOpen(false)}
                >
                  <Link href="/login">تسجيل الدخول</Link>
                </Button>
              ) : (
                <>
                  <Button
                    asChild
                    className="rounded-full"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Link href="/form">أرسل أمنيتي</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full border-slate-200 bg-white hover:bg-slate-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Link href="/profile" className="flex items-center gap-2">
                      <UserRound className="size-4" />
                      <span>الملف الشخصي</span>
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
