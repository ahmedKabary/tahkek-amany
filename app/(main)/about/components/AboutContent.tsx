'use client'

import Link from 'next/link'

import { PageShell } from '@/components/PageShell'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function AboutContent() {
  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            عن المبادرة
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            هدفنا هو اسعاد جميع فئات المجتمع.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card className="bg-white/70 border-slate-200/70">
            <CardHeader>
              <CardTitle className="text-slate-900">كيف تعمل؟</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600 leading-relaxed">
              تُبدي أمنيتك أو حلمك وبيانات التواصل، ونقوم بمراجعتها و محاولة تحقيقها إذا كان ممكنًا.
            </CardContent>
          </Card>

          <Card className="bg-white/70 border-slate-200/70">
            <CardHeader>
              <CardTitle className="text-slate-900">لمن هذه المبادرة؟</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600 leading-relaxed">
              لأي شخص يريد مشاركة أمنية أو حلم بشكل واضح.
            </CardContent>
          </Card>
        </div>

        <div className="mt-10">
          <Card className="bg-white/70 border-slate-200/70">
            <CardHeader>
              <CardTitle className="text-slate-900">أمنيات يمكن تحقيقها</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 text-sm text-slate-700">
                <div className="rounded-xl border border-slate-200/70 bg-white/70 px-4 py-3">
                  الأمنيات المعنوية والدعم المعنوي
                </div>
                <div className="rounded-xl border border-slate-200/70 bg-white/70 px-4 py-3">
                  الصحبة والرفقة الطيبة
                </div>
                <div className="rounded-xl border border-slate-200/70 bg-white/70 px-4 py-3">
                  توفير كتب مناسبة للقراءة أو التعلم
                </div>
                <div className="rounded-xl border border-slate-200/70 bg-white/70 px-4 py-3">
                  تعلم حِرفة أو مهارة عملية
                </div>
                <div className="rounded-xl border border-slate-200/70 bg-white/70 px-4 py-3">
                  تعلم البرمجة والمهارات الرقمية
                </div>
                <div className="rounded-xl border border-slate-200/70 bg-white/70 px-4 py-3">
                  المساعدة في الاحتياجات اليومية أو الطارئة
                </div>
                <div className="rounded-xl border border-slate-200/70 bg-white/70 px-4 py-3 sm:col-span-2">
                  إتاحة فرص عمل أو تدريب مهني عند الإمكان
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Button asChild size="lg" className="rounded-full">
            <Link href="/login">ابدأ الآن</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full bg-white/60">
            <Link href="/privacy">سياسة الخصوصية</Link>
          </Button>
        </div>
      </div>
    </PageShell>
  )
}

