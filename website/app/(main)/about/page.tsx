'use client'

import Link from 'next/link'

import { PageShell } from '@/components/PageShell'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AboutPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            عن المبادرة
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            “تحقيق الأماني” مساحة بسيطة لاستقبال الأمنيات والتمنيات بشكل منظم.
            هدفنا هو تسهيل التواصل وتجميع المعلومات الأساسية بطريقة محترمة
            وملائمة للجميع.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card className="bg-white/70 border-slate-200/70">
            <CardHeader>
              <CardTitle className="text-slate-900">كيف تعمل؟</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600 leading-relaxed">
              تسجّل الدخول عبر Google ثم تكتب بيانات التواصل وأمنيتك. يتم حفظ
              البيانات في قاعدة البيانات ليتاح للفريق المختص مراجعتها.
            </CardContent>
          </Card>

          <Card className="bg-white/70 border-slate-200/70">
            <CardHeader>
              <CardTitle className="text-slate-900">لمن هذه المنصة؟</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600 leading-relaxed">
              لأي شخص يريد مشاركة أمنية أو حلم بشكل واضح. التصميم مُحسّن للعمل
              على الموبايل والتابلت والكمبيوتر.
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
