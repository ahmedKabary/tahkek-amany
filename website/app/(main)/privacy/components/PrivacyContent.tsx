'use client'

import Link from 'next/link'

import { PageShell } from '@/components/PageShell'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function PrivacyContent() {
  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            سياسة الخصوصية
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            هذه الصفحة تلخّص كيفية استخدام البيانات.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card className="bg-white/70 border-slate-200/70">
            <CardHeader>
              <CardTitle className="text-slate-900">ما الذي نجمعه؟</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600 leading-relaxed">
              بيانات تسجيل الدخول (مثل البريد الإلكتروني) وبيانات النموذج
              (الاسم/الهاتف/الأمنية) لغرض التواصل ومراجعة الطلب.
            </CardContent>
          </Card>

          <Card className="bg-white/70 border-slate-200/70">
            <CardHeader>
              <CardTitle className="text-slate-900">كيف نستخدمه؟</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600 leading-relaxed">
              لتأكيد هوية المستخدم، تقليل الرسائل العشوائية، وتمكين الفريق من
              متابعة الحالات والتواصل عند الحاجة.
            </CardContent>
          </Card>

          <Card className="bg-white/70 border-slate-200/70">
            <CardHeader>
              <CardTitle className="text-slate-900">من يمكنه الاطلاع؟</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600 leading-relaxed">
              فقط الفريق المصرّح له داخل المشروع. لا يتم نشر بياناتك للعامة.
            </CardContent>
          </Card>

          <Card className="bg-white/70 border-slate-200/70">
            <CardHeader>
              <CardTitle className="text-slate-900">عدد الأمنيات</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600 leading-relaxed">
              يمكن لكل مستخدم إرسال أمنية واحدة فقط.
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Button asChild size="lg" className="rounded-full">
            <Link href="/login">ابدأ الآن</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full bg-white/60">
            <Link href="/">العودة للرئيسية</Link>
          </Button>
        </div>
      </div>
    </PageShell>
  )
}

