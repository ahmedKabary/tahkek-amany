import React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer className={cn('mt-16 border-t border-slate-200/70', className)}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="text-sm font-semibold text-slate-900">
              تحقيق الأماني
            </div>
            <div className="mt-2 text-sm text-slate-600 leading-relaxed">
              منصة بسيطة وسريعة لمشاركة الأمنيات وإيصالها للجهات المختصة لمساعدتها
              على الوصول لمن يستحق.
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-900">روابط</div>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <Link className="text-slate-600 hover:text-slate-900" href="/about">
                عن المبادرة
              </Link>
              <Link
                className="text-slate-600 hover:text-slate-900"
                href="/privacy"
              >
                الخصوصية
              </Link>
              <Link className="text-slate-600 hover:text-slate-900" href="/login">
                تسجيل الدخول
              </Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-900">ملاحظة</div>
            <div className="mt-3 text-sm text-slate-600 leading-relaxed">
              نستخدم تسجيل الدخول عبر Google للمصادقة. لا نعرض بياناتك للعلن.
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}
