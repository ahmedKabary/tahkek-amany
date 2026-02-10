'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
  limit,
} from 'firebase/firestore'

import { PageShell } from '@/components/PageShell'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'
import { db } from '@/lib/firebase'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

export function ProfileContent() {
  const router = useRouter()
  const { user, loading, logout } = useAuth()
  const [latestWish, setLatestWish] = useState<Wish | null>(null)
  const [wishesLoading, setWishesLoading] = useState(true)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (!user) return
    const q = query(
      collection(db, 'wishes'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(1)
    )
    const unsub = onSnapshot(
      q,
      (snap) => {
        if (snap.empty) {
          setLatestWish(null)
          setWishesLoading(false)
          return
        }
        const d = snap.docs[0]
        setLatestWish({ id: d.id, ...(d.data() as Omit<Wish, 'id'>) })
        setWishesLoading(false)
      },
      (err) => {
        console.error('profile wish error', err)
        setWishesLoading(false)
      }
    )
    return () => unsub()
  }, [user])

  const handleLogout = async () => {
    await logout()
    setShowLogoutConfirm(false)
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
  const statusKey = normalizeStatus(latestWish?.status)

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
        <header className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="bg-gradient-to-l from-sky-50 via-white to-white border-slate-200/80 shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="inline-flex size-16 items-center justify-center rounded-3xl bg-sky-100 text-sky-800 text-2xl font-semibold">
                {initials}
              </div>
              <div className="space-y-1">
                <CardTitle className="text-2xl text-slate-900">{user.displayName ?? 'حسابي'}</CardTitle>
                <div className="text-sm text-slate-600">{user.email}</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
                {user.phoneNumber ? <InfoField label="رقم الهاتف" value={user.phoneNumber} /> : null}
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/form">ارسال امنية</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-slate-200 bg-white hover:bg-slate-50"
                  onClick={() => setShowLogoutConfirm(true)}
                >
                  تسجيل الخروج
                </Button>
              </div>
            </CardContent>
          </Card>

          <WishStatusCard wish={latestWish} loading={wishesLoading} />
        </header>

        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-slate-900">تتبع أمنيتي</h2>
            {!wishesLoading && !latestWish ? (
              <div className="text-sm text-slate-600">لا توجد أمنية بعد</div>
            ) : null}
          </div>
          {wishesLoading ? (
            <div className="rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3 text-sm text-slate-700">
              جاري تحميل الأمنيات...
            </div>
          ) : !latestWish ? (
            <div className="rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-6 text-center text-sm text-slate-600">
              لا توجد أمنية بعد. يمكنك إرسال أمنية جديدة الآن.
            </div>
          ) : (
            <WishTimeline wish={latestWish} />
          )}
        </section>
      </div>
      <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <DialogContent className="sm:max-w-md" showCloseButton={false}>
          <DialogHeader className="text-right">
            <DialogTitle>تأكيد تسجيل الخروج</DialogTitle>
            <DialogDescription className="text-sm text-slate-600 leading-relaxed">
              أنت على وشك تسجيل الخروج. ستحتاج إلى تسجيل الدخول مرة أخرى لمتابعة تتبع أمنياتك أو إرسال أمنية جديدة.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start sm:flex-row-reverse">
            <Button variant="destructive" onClick={handleLogout}>
              نعم، سجّل الخروج
            </Button>
            <Button variant="outline" onClick={() => setShowLogoutConfirm(false)}>
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageShell>
  )
}

type Wish = {
  id: string
  wish?: string
  status?: string
  createdAt?: Timestamp
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

type StatusKey = 'unreaded' | 'processing' | 'accepted' | 'completed' | 'declined' | 'pending'

function normalizeStatus(status?: string): StatusKey {
  const val = (status || '').toLowerCase()
  if (val === 'unreaded') return 'unreaded'
  if (val === 'accepted') return 'accepted'
  if (val === 'completed') return 'completed'
  if (val === 'declined') return 'declined'
  if (val === 'processing') return 'processing'
  return 'unreaded'
}

function statusLabel(status: StatusKey) {
  switch (status) {
    case 'unreaded':
      return 'قيد المراجعة'
    case 'processing':
      return 'قيد المعالجة'
    case 'accepted':
      return 'مقبولة (بانتظار التنفيذ)'
    case 'completed':
      return 'مكتملة'
    case 'declined':
      return 'مرفوضة'
    default:
      return 'قيد المراجعة'
  }
}

function WishStatusCard({ wish, loading }: { wish: Wish | null; loading: boolean }) {
  const status = normalizeStatus(wish?.status)
  return (
    <Card className="bg-white/85 border-slate-200/80 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg text-slate-900">حالة الأمنية الحالية</CardTitle>
          <div className="text-sm text-slate-600 mt-1">
            {loading ? 'جاري التحميل...' : wish ? statusLabel(status) : 'لا يوجد طلب بعد'}
          </div>
        </div>
        {wish ? <StatusPill status={status} /> : <StatusPill status="unreaded" label="لم تُرسل بعد" muted />}
      </CardHeader>
      <CardContent className="space-y-3">
        {loading ? (
          <div className="rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3 text-sm text-slate-700">
            جاري تحميل البيانات...
          </div>
        ) : wish ? (
          <div className={cn('rounded-2xl border px-4 py-3 space-y-2 shadow-sm', cardTone(status))}>
            <div className="text-sm text-slate-700 leading-relaxed">{wish.wish || 'بدون نص للأمنية'}</div>
            <div className="text-xs text-slate-500">
              {wish.createdAt ? wish.createdAt.toDate().toLocaleString('ar-EG') : '—'}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-6 text-sm text-slate-600 text-center">
            لم تُرسل أي أمنية بعد.
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function WishTimeline({ wish }: { wish: Wish }) {
  const status = normalizeStatus(wish.status)
  const steps: { key: StatusKey; label: string; hint: string }[] = [
    { key: 'unreaded', label: 'قيد المراجعة', hint: 'تم استلام الأمنية وجاري التحقق الأولي.' },
    { key: 'processing', label: 'قيد المعالجة', hint: 'نحن نناقش أمنيتك مع الفريق.' },
    { key: 'accepted', label: 'مقبولة بانتظار التنفيذ', hint: 'تمت الموافقة وستُنفَّذ قريبًا.' },
    { key: 'completed', label: 'تم تحقيق الأمنية', hint: 'الأمنية مكتملة ✅' },
    { key: 'declined', label: 'مرفوضة', hint: 'للأسف لم يمكن تحقيق الأمنية.' },
  ]

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/85 p-3 sm:p-4 md:p-5 shadow-sm space-y-3 min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm text-slate-600">تقدم الطلب</div>
        <StatusPill status={status} />
      </div>
      <div className="space-y-2">
        {steps.map((step) => {
          const active = status === step.key
          const reached =
            status === 'completed'
              ? ['unreaded', 'processing', 'accepted', 'completed'].includes(step.key)
              : status === 'accepted'
              ? ['unreaded', 'processing', 'accepted'].includes(step.key)
              : status === 'processing'
              ? ['unreaded', 'processing'].includes(step.key)
              : status === 'pending' || status === 'unreaded'
              ? step.key === 'unreaded'
              : status === 'declined'
              ? step.key === 'declined'
              : false
          return (
            <div
              key={step.key}
              className={cn(
                'flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 rounded-xl border px-3 py-2.5 sm:px-4 min-w-0',
                reached ? cardTone(step.key) : 'border-slate-200 bg-white/80'
              )}
            >
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <span className="text-base shrink-0" aria-hidden>{stepIcon(step.key)}</span>
                <div className="space-y-0.5 min-w-0">
                  <div className="text-sm font-semibold text-slate-900 break-words">{step.label}</div>
                  <div className="text-xs text-slate-600 break-words">{step.hint}</div>
                </div>
              </div>
              {active ? (
                <span className="text-xs text-sky-600 font-semibold shrink-0 sm:ml-auto self-start sm:self-center">
                  الحالة الحالية
                </span>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function StatusPill({ status, label, muted }: { status: StatusKey; label?: string; muted?: boolean }) {
  const text = label ?? statusLabel(status)
  const styles = badgeTone(status, muted)
  return <span className={cn('inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border', styles)}>{text}</span>
}

function stepIcon(status: StatusKey) {
  switch (status) {
    case 'completed':
      return '✅'
    case 'declined':
      return '🚫'
    case 'processing':
      return '🌀'
    default:
      return '⏳'
  }
}

function cardTone(status: StatusKey) {
  switch (status) {
    case 'unreaded':
      return 'border-slate-200 bg-white/80'
    case 'processing':
      return 'border-sky-100 bg-sky-50/70'
    case 'accepted':
      return 'border-amber-100 bg-amber-50/70'
    case 'completed':
      return 'border-emerald-100 bg-emerald-50/70'
    case 'declined':
      return 'border-rose-100 bg-rose-50/70'
    default:
      return 'border-slate-200 bg-white/80'
  }
}

function badgeTone(status: StatusKey, muted = false) {
  if (muted) return 'bg-slate-50 text-slate-600 border-slate-200'
  switch (status) {
    case 'unreaded':
      return 'bg-slate-50 text-slate-700 border-slate-200'
    case 'processing':
      return 'bg-sky-50 text-sky-700 border-sky-100'
    case 'accepted':
      return 'bg-amber-50 text-amber-800 border-amber-100'
    case 'completed':
      return 'bg-emerald-50 text-emerald-700 border-emerald-100'
    case 'declined':
      return 'bg-rose-50 text-rose-700 border-rose-100'
    default:
      return 'bg-slate-50 text-slate-700 border-slate-200'
  }
}

