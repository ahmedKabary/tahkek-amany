'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { PageShell } from '@/components/PageShell'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

export default function ProfilePage() {
  const router = useRouter()
  const { user, loading, logout } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  if (loading) {
    return (
      <PageShell>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-14">
          <div className="rounded-2xl bg-white/70 border border-slate-200/70 px-6 py-5 shadow-sm w-full sm:w-96 mx-auto">
            <div className="flex items-center gap-3">
              <span className="inline-block size-4 rounded-full border-2 border-sky-600/70 border-t-transparent animate-spin" />
              <div className="text-sm text-slate-700 font-medium">جاري التحميل...</div>
            </div>
          </div>
        </div>
      </PageShell>
    )
  }

  if (!user) {
    return null
  }

  const initials = user.displayName?.[0] ?? 'أ'

  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="bg-white/80 border-slate-200/80 shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-800 text-2xl font-semibold">
                {initials}
              </div>
              <div>
                <CardTitle className="text-xl text-slate-900">
                  {user.displayName ?? 'حسابي'}
                </CardTitle>
                <div className="text-sm text-slate-600">{user.email}</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <InfoField label="المعرف" value={user.uid} />
                {user.phoneNumber ? (
                  <InfoField label="رقم الهاتف" value={user.phoneNumber} />
                ) : null}
              </div>

              <Separator />

              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/form">لوحة الأمنيات</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-slate-200 bg-white hover:bg-slate-50"
                  onClick={handleLogout}
                >
                  تسجيل الخروج
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/75 border-slate-200/80 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">تذكير سريع</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <p>حافظ على بياناتك محدثة لتسهيل التواصل معك عند مراجعة أمنيتك.</p>
              <p>يمكنك دائماً العودة لتحديث رقم الهاتف أو اسم العرض من حساب Google.</p>
              <Separator />
              <div className="flex items-center gap-3">
                <div className="inline-flex size-10 items-center justify-center rounded-xl bg-sky-100 text-sky-800 text-lg font-bold">
                  ✨
                </div>
                <div>
                  <div className="font-semibold text-slate-900">جاهز لإرسال أمنية جديدة؟</div>
                  <div className="text-slate-600">انتقل إلى لوحة الأمنيات وابدأ الطلب الآن.</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageShell>
  )
}

function InfoField({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3">
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className={cn('mt-1 text-sm font-medium text-slate-900 break-words')}>
        {value}
      </div>
    </div>
  )
}
