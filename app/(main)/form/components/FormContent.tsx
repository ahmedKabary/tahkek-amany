"use client";

import React from "react"
import Link from 'next/link'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingImage } from '@/components/LoadingImage'
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  serverTimestamp,
  Timestamp,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { Send } from 'lucide-react';

import { PageShell } from '@/components/PageShell'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface FormData {
  name: string;
  phone: string;
  wish: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  wish?: string;
}

export function FormContent() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    wish: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<'none' | 'processing' | 'completed' | 'declined' | 'pending'>('none');

  useEffect(() => {
    const loadLatestWish = async () => {
      if (!user) return;
      try {
        const snap = await getDocs(
          query(
            collection(db, 'wishes'),
            where('userId', '==', user.uid),
            orderBy('createdAt', 'desc'),
            limit(1)
          )
        );
        if (snap.empty) {
          setCurrentStatus('none');
          return;
        }
        const status = (snap.docs[0].data().status || '').toLowerCase();
        if (status === 'completed') setCurrentStatus('completed');
        else if (status === 'declined') setCurrentStatus('declined');
        else if (status === 'processing') setCurrentStatus('processing');
        else if (status === 'pending' || status === '') setCurrentStatus('pending');
        else setCurrentStatus('pending');
      } catch (err) {
        console.error('load latest wish error', err);
      }
    };
    loadLatestWish();
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'يرجى إدخال اسمك';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'يرجى إدخال رقم هاتفك';
    } else if (!/^[0-9\s\-\+\(\)]{8,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'يرجى إدخال رقم هاتف صحيح';
    }

    if (!formData.wish.trim()) {
      newErrors.wish = 'يرجى إدخال أمنيتك';
    } else if (formData.wish.trim().length < 5) {
      newErrors.wish = 'يجب أن تكون الأمنية أطول من 5 أحرف';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    try {
      // تحقق من القيود: أمنية واحدة فقط إلا إذا كانت مرفوضة، ولا تقديم بعد أمنية مقبولة
      const existingSnap = await getDocs(
        query(collection(db, 'wishes'), where('userId', '==', user?.uid ?? ''))
      );

      const wishes = existingSnap.docs.map((d) => d.data() as { status?: string });
      const hasGranted = wishes.some((w) => (w.status || '').toLowerCase() === 'completed');
      const hasActive = wishes.some((w) => {
        const s = (w.status || '').toLowerCase();
        return s === '' || s === 'processing' || s === 'pending' || (!s && true);
      });

      if (hasGranted) {
        setErrors({
          wish: 'تم تحقيق أمنيتك بالفعل، لا يمكن إرسال أمنية جديدة.',
        });
        return;
      }

      if (hasActive) {
        setErrors({
          wish: 'لا يمكنك إرسال أمنية جديدة حالياً. يوجد طلب قيد المراجعة أو المعالجة.',
        });
        return;
      }

      // Rate limit: max 5 submissions per user per hour
      const oneHourAgo = Timestamp.fromDate(new Date(Date.now() - 60 * 60 * 1000));
      const recentSubmissions = await getDocs(
        query(
          collection(db, 'wishes'),
          where('userId', '==', user?.uid ?? ''),
          where('createdAt', '>=', oneHourAgo)
        )
      );

      if (recentSubmissions.size >= 5) {
        setErrors({
          wish: 'تم الوصول للحد الأقصى للطلبات لهذه الساعة (5). حاول لاحقاً.',
        });
        return;
      }

      await addDoc(collection(db, 'wishes'), {
        userId: user?.uid,
        userEmail: user?.email,
        userName: user?.displayName,
        ...formData,
        status: 'unreaded',
        createdAt: serverTimestamp(),
      });

      setSuccess(true);
      // Immediately reflect that there is now an active wish so the form locks
      setCurrentStatus('pending');
      setFormData({ name: '', phone: '', wish: '' });

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ wish: 'حدث خطأ أثناء إرسال النموذج. يرجى المحاولة مرة أخرى.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <PageShell>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex items-center justify-center">
            <div className="rounded-2xl bg-white/70 border border-slate-200/70 px-6 py-5 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="inline-block size-4 rounded-full border-2 border-sky-600/70 border-t-transparent animate-spin" />
                <div className="text-sm text-slate-700 font-medium">جاري التحميل...</div>
              </div>
            </div>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          <div>
            {/* Form card */}
            <Card className="mt-6 bg-white/75 border-slate-200/70 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl text-slate-900">
                  أرسل أمنيتك
                </CardTitle>
                <div className="text-sm text-slate-600">
                  اكتب بياناتك وأمنيتك بشكل واضح لمساعدتنا على التواصل معك.
                </div>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name field */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-900">
                      الاسم الكامل
                    </Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={currentStatus === 'processing' || currentStatus === 'pending' || currentStatus === 'completed'}
                      placeholder="أدخل اسمك الكامل"
                      className={
                        errors.name
                          ? 'border-rose-300 focus-visible:ring-rose-200'
                          : cn(
                              'border-slate-200 focus-visible:ring-sky-200',
                              currentStatus === 'processing' || currentStatus === 'pending' || currentStatus === 'completed'
                                ? 'bg-slate-100 text-slate-500'
                                : ''
                            )
                      }
                    />
                    {errors.name && (
                      <div className="text-rose-700 text-xs sm:text-sm">
                        ⚠️ {errors.name}
                      </div>
                    )}
                  </div>

                  {/* Phone field */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-slate-900">
                      رقم الهاتف
                    </Label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={currentStatus === 'processing' || currentStatus === 'pending' || currentStatus === 'completed'}
                      placeholder="ادخل رقم الهاتف"
                      className={
                        errors.phone
                          ? 'border-rose-300 focus-visible:ring-rose-200'
                          : cn(
                              'border-slate-200 focus-visible:ring-sky-200',
                              currentStatus === 'processing' || currentStatus === 'pending' || currentStatus === 'completed'
                                ? 'bg-slate-100 text-slate-500'
                                : ''
                            )
                      }
                    />
                    {errors.phone && (
                      <div className="text-rose-700 text-xs sm:text-sm">
                        ⚠️ {errors.phone}
                      </div>
                    )}
                  </div>

                  {/* Wish field */}
                  <div className="space-y-2">
                    <Label htmlFor="wish" className="text-slate-900">
                      أمنيتك
                    </Label>
                    <Textarea
                      id="wish"
                      name="wish"
                      value={formData.wish}
                      onChange={handleInputChange}
                      disabled={currentStatus === 'processing' || currentStatus === 'pending' || currentStatus === 'completed'}
                      placeholder="أخبرنا عن أمنيتك وحلمك..."
                      rows={6}
                      className={
                        errors.wish
                          ? 'border-rose-300 focus-visible:ring-rose-200'
                          : cn(
                              'border-slate-200 focus-visible:ring-sky-200',
                              currentStatus === 'processing' || currentStatus === 'pending' || currentStatus === 'completed'
                                ? 'bg-slate-100 text-slate-500'
                                : ''
                            )
                      }
                    />
                    {errors.wish && (
                      <div className="text-rose-700 text-xs sm:text-sm">
                        ⚠️ {errors.wish}
                      </div>
                    )}
                    <div className="text-xs text-slate-500">
                      {formData.wish.length} / 500 أحرف
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting || currentStatus === 'processing' || currentStatus === 'pending' || currentStatus === 'completed'}
                    size="lg"
                    className={cn(
                      'w-full rounded-2xl transition-all',
                      currentStatus === 'processing' || currentStatus === 'pending'
                        ? 'bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-50'
                        : currentStatus === 'completed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-50'
                        : 'bg-primary text-primary-foreground'
                    )}
                  >
                    {submitting ? (
                      <>
                        <span className="inline-block size-4 rounded-full border-2 border-white/70 border-t-transparent animate-spin" />
                        <span>جاري الإرسال...</span>
                      </>
                    ) : currentStatus === 'processing' || currentStatus === 'pending' ? (
                      <>
                        <Send className="size-4" />
                        <span>طلبك قيد المراجعة</span>
                      </>
                    ) : currentStatus === 'completed' ? (
                      <>
                        <Send className="size-4" />
                        <span>تم تحقيق أمنيتك</span>
                      </>
                    ) : currentStatus === 'declined' ? (
                      <>
                        <Send className="size-4" />
                        <span>إرسال أمنية جديدة</span>
                      </>
                    ) : (
                      <>
                        <Send className="size-4" />
                        <span>إرسال أمنيتي</span>
                      </>
                    )}
                  </Button>

                  {(currentStatus === 'processing' || currentStatus === 'pending' || currentStatus === 'completed') && (
                    <div className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed text-center">
                      يمكنك متابعة الامنية من{' '}
                      <Link href="/profile" className="text-sky-700 hover:underline">
                        الملف الشخصي
                      </Link>
                    </div>
                  )}

                  {success && (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 shadow-xs">
                      ✅ تم استلام أمنيتك بنجاح. سنراجعها ونتواصل معك قريباً. يمكنك متابعة حالة أمنيتك من{' '}
                      <Link href="/profile" className="text-sky-700 hover:underline font-medium">
                        الملف الشخصي
                      </Link>
                      .
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          <aside className="lg:sticky lg:top-24">
            <div className="rounded-3xl bg-white/70 border border-slate-200/70 p-6 shadow-sm">
              <div className="text-sm font-semibold text-slate-900">
                تنبيه
              </div>
              <div className="mt-2 text-sm text-slate-600 leading-relaxed">
                لكل مستخدم أمنية واحدة فقط
              </div>

              <div className="mt-6 relative aspect-square w-full">
                <LoadingImage
                  src="/genie.png"
                  alt="genie"
                  fill
                  sizes="(max-width: 1024px) 80vw, 360px"
                  className="object-contain"
                />
              </div>
            </div>
          </aside>
        </div>

        {/* شروط تحقيق الأمنية */}
        <div className="mt-12 rounded-3xl bg-white/75 border border-slate-200/70 p-6 sm:p-8 shadow-sm">
          <div className="text-lg font-semibold text-slate-900">شروط تحقيق الأمنية</div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4">
              <div className="text-sm font-medium text-slate-900">وضوح التفاصيل</div>
              <div className="mt-1 text-sm text-slate-600 leading-relaxed">
                اكتب الأمنية بوضوح مع ذكر الاحتياج الأساسي، الموقع، وأي تفاصيل تساعد فريقنا.
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4">
              <div className="text-sm font-medium text-slate-900">لمزيد من المعلومات</div>
              <div className="mt-1 text-sm text-slate-600 leading-relaxed">
                يمكن الاطلاع على تفاصيل المبادرة عبر{' '}
                <Link href="/about" className="text-sky-700 hover:underline">
                  صفحة عن المبادرة
                </Link>
                .
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

