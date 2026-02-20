"use client";

import { LoadingImage } from '@/components/LoadingImage'
import Link from 'next/link'

import { PageShell } from '@/components/PageShell'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function HomeContent() {
  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              شارك أمنيتك…
              <span className="block text-sky-700">ودعنا نساعد في تحقيقها</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              نهدف لإدخال السرور للناس بأبسط الوسائل؛ من اجل إسعادهم
               وتخفيف ضغوط الحياة بلمسات بسيطة تمنحهم الفرح.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/login">ابدأ الآن</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full bg-white/60"
              >
                <Link href="/about">اعرف المزيد</Link>
              </Button>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <Card className="bg-white/70">
                <CardContent className="p-3 sm:p-4">
                  <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
                    <LoadingImage
                      src="/Resala.png"
                      alt="شعار جمعية رسالة"
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-contain"
                      priority
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70">
                <CardContent className="p-3 sm:p-4">
                  <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
                    <LoadingImage
                      src="/amany.png"
                      alt="تحقيق الأماني"
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-contain"
                      priority
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-b from-sky-200/60 via-violet-200/40 to-amber-200/60 blur-2xl" />
              <div className="relative rounded-3xl bg-white/70 border border-slate-200/70 p-6 sm:p-8 shadow-lg">
                <div className="mt-6 relative aspect-square w-full">
                  <LoadingImage
                    src="/genie.png"
                    alt="genie"
                    fill
                    sizes="(max-width: 1024px) 80vw, 420px"
                    className="object-contain"
                    priority
                  />
                </div>

                <div className="mt-4 text-center text-sm text-slate-600">
                  كل أمنية تستحق أن تُحقق… شاركها معنا وسنحاول تحقيقها.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integrated highlight strip */}
        <div className="mt-12 rounded-3xl bg-white/75 border border-slate-200/60 p-6 sm:p-8 shadow-sm">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl bg-sky-50/70 border border-sky-100/70 p-5 shadow-xs">
              <div className="text-sm font-semibold text-slate-900">جمعية رسالة</div>
              <div className="mt-2 text-sm text-slate-600 leading-relaxed">
                جمعية إنسانية لدعم الأسر والمحتاجين بجهود المتطوعين.
              </div>
            </div>
            <div className="rounded-2xl bg-amber-50/70 border border-amber-100/70 p-5 shadow-xs">
              <div className="text-sm font-semibold text-slate-900">قوافل خارجية</div>
              <div className="mt-2 text-sm text-slate-600 leading-relaxed">
                نصل إلى الشوارع والمناطق الأبعد بقوافل لمساعده الاسر المحتاجة.
              </div>
            </div>
            <div className="rounded-2xl bg-emerald-50/70 border border-emerald-100/70 p-5 shadow-xs">
              <div className="text-sm font-semibold text-slate-900">تطوع معنا</div>
              <div className="mt-2 text-sm text-slate-600 leading-relaxed">
                شارك بوقتك وجهدك، وساعد في نشر الخير ورسم الابتسامة على الوجوه.
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

