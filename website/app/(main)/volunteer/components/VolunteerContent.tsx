"use client";

import React, { useState } from 'react'
import { LoadingImage } from '@/components/LoadingImage'
import { useRouter } from 'next/navigation'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

import { PageShell } from '@/components/PageShell'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'
import { db } from '@/lib/firebase'

export function VolunteerContent() {
  const router = useRouter()
  const { user } = useAuth()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({})
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    const nextErrors: typeof errors = {}
    if (!name.trim()) nextErrors.name = 'يرجى إدخال الاسم'
    if (!phone.trim()) nextErrors.phone = 'يرجى إدخال رقم الهاتف'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setSubmitting(true)
    try {
      await addDoc(collection(db, 'volunteers'), {
        userId: user?.uid ?? null,
        userEmail: user?.email ?? null,
        userName: user?.displayName ?? null,
        name: name.trim(),
        phone: phone.trim(),
        createdAt: serverTimestamp(),
      })

      setSubmitted(true)
      setName('')
      setPhone('')
      setTimeout(() => setSubmitted(false), 3000)
    } catch (err) {
      console.error('Error submitting volunteer form:', err)
      setSubmitError('حدث خطأ أثناء إرسال البيانات. يرجى المحاولة مرة أخرى.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-3 text-right">
            <p className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-xs font-semibold text-sky-700">
              🤝 عائلة المتطوعين
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              انضم لفريق القوافل الخارجية
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              كن جزءاً من فريقنا الذي يصنع الأثر في كل مكان.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-lg border border-white/50">
              <LoadingImage
                src="/volunteer1.png"
                alt="فريق المتطوعين 1"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-lg border border-white/50">
              <LoadingImage
                src="/volunteer2.png"
                alt="فريق المتطوعين 2"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        <Card className="bg-white/85 border-slate-200/70 shadow-xl backdrop-blur">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="space-y-1 text-right">
              <CardTitle className="text-2xl text-slate-900">استمارة التطوع</CardTitle>
              <div className="text-sm text-slate-600">
                اترك بياناتك لنتواصل معك للانضمام إلى فرق التطوع والقوافل الخارجية.
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit} id="form">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم الكامل</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="اكتب اسمك هنا"
                    className={errors.name ? 'border-rose-300 focus-visible:ring-rose-200' : undefined}
                  />
                  {errors.name ? (
                    <div className="text-rose-700 text-xs sm:text-sm">{errors.name}</div>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="ادخل رقم الهاتف"
                    className={errors.phone ? 'border-rose-300 focus-visible:ring-rose-200' : undefined}
                  />
                  {errors.phone ? (
                    <div className="text-rose-700 text-xs sm:text-sm">{errors.phone}</div>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button type="submit" className="rounded-full" disabled={submitting}>
                  {submitting ? 'جاري الإرسال...' : 'أرسل بياناتي'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full"
                  onClick={() => router.push('/')}
                >
                  العودة للرئيسية
                </Button>
              </div>

              {submitError ? (
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
                  {submitError}
                </div>
              ) : null}

              {submitted ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                  تم استلام بياناتك وسنتواصل معك قريباً. شكراً لتطوعك!
                </div>
              ) : null}
            </form>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}

