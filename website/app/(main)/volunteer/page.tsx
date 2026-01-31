'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

import { PageShell } from '@/components/PageShell'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'
import { db } from '@/lib/firebase'

export default function VolunteerPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({})

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [loading, router, user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors: typeof errors = {}
    if (!name.trim()) nextErrors.name = 'يرجى إدخال الاسم'
    if (!phone.trim()) nextErrors.phone = 'يرجى إدخال رقم الهاتف'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    if (!user) return

    setSubmitting(true)
    try {
      await addDoc(collection(db, 'volunteers'), {
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName,
        name,
        phone,
        createdAt: serverTimestamp(),
      })

      try {
        const token = await user.getIdToken()
        await fetch('/api/notify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            type: 'volunteer',
            message: `متطوع جديد: ${name}`,
          }),
        })
      } catch (notifyErr) {
        console.error('Failed to send volunteer notification:', notifyErr)
      }

      setSubmitted(true)
      setName('')
      setPhone('')
      setTimeout(() => setSubmitted(false), 3000)
    } catch (err) {
      console.error('Volunteer submit error:', err)
      setErrors({ phone: 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <Card className="bg-white/80 border-slate-200/70 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-900">تطوع معنا</CardTitle>
            <div className="text-sm text-slate-600">
              اترك بياناتك للتواصل معك للانضمام إلى فرق التطوع والقوافل الخارجية.
            </div>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
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
