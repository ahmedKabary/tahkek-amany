'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Sparkles as SparklesIcon } from 'lucide-react';

import { PageShell } from '@/components/PageShell'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export function LoginContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/form');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        router.push('/form');
      }
    } catch (error: any) {
      console.error('Error signing in:', error);
      if (error.code === 'auth/popup-blocked') {
        setError('تم حظر نافذة تسجيل الدخول. يرجى السماح بالنوافذ المنبثقة.');
      } else if (error.code === 'auth/popup-closed-by-user') {
        setError('تم إغلاق نافذة تسجيل الدخول.');
      } else {
        setError('خطأ في تسجيل الدخول. يرجى المحاولة مرة أخرى.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1">
            {/* Main login card */}
            <Card className="bg-white/75 border-slate-200/70 shadow-lg">
              <CardHeader className="space-y-3">
                {/* Logo area */}
                <div className="flex items-center justify-between gap-4">
                  <Link href="/" className="relative h-10 w-28">
                    <Image
                      src="/Resala.png"
                      alt="Resala"
                      fill
                      sizes="112px"
                      className="object-contain"
                      priority
                    />
                  </Link>
                  <div className="inline-flex items-center justify-center size-10 rounded-full bg-sky-100 text-sky-800">
                    <SparklesIcon className="size-5" />
                  </div>
                </div>

                <CardTitle className="text-2xl sm:text-3xl text-slate-900">
                  تسجيل الدخول
                </CardTitle>
                <div className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  استخدم حساب Google للدخول الآمن وإرسال أمنيتك.
                </div>
              </CardHeader>

              <CardContent className="space-y-5">
                {/* Error message */}
                {error && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
                    <div className="text-sm font-medium text-rose-800">
                      {error}
                    </div>
                  </div>
                )}

                {/* Google Sign In Button */}
                <Button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  size="lg"
                  className="w-full h-12 rounded-xl border border-slate-200 bg-white text-slate-800 shadow-sm hover:bg-slate-50 hover:border-slate-300 focus-visible:ring-sky-200 focus-visible:border-sky-300"
                  variant="outline"
                >
                  {loading ? (
                    <>
                      <span className="inline-block size-4 rounded-full border-2 border-slate-300 border-t-transparent animate-spin" />
                      <span>جارٍ التسجيل...</span>
                    </>
                  ) : (
                    <>
                      <span className="inline-flex size-8 items-center justify-center rounded-lg bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="size-5">
                          <path fill="#EA4335" d="M24 9.5c3.54 0 6 1.54 7.38 2.83l5.38-5.38C33.64 3.36 29.23 1.5 24 1.5 14.91 1.5 7.24 6.92 4.06 14.26l6.64 5.16C12.14 13.14 17.57 9.5 24 9.5z" />
                          <path fill="#4285F4" d="M46.5 24.5c0-1.57-.14-3.08-.41-4.5H24v9h12.65c-.55 2.98-2.18 5.5-4.65 7.18l7.1 5.51C43.96 37.92 46.5 31.73 46.5 24.5z" />
                          <path fill="#FBBC05" d="M10.7 28.9c-.48-1.44-.76-2.98-.76-4.4s.27-2.96.76-4.4L4.06 14.26C2.73 17.17 2 20.5 2 24c0 3.5.73 6.83 2.06 9.74l6.64-4.84z" />
                          <path fill="#34A853" d="M24 46.5c5.23 0 9.64-1.72 12.85-4.68l-7.1-5.51C28.19 37.18 26.2 37.9 24 37.9c-6.43 0-11.86-3.64-14.3-8.8l-6.64 4.84C7.24 41.08 14.91 46.5 24 46.5z" />
                          <path fill="none" d="M2 2h44v44H2z" />
                        </svg>
                      </span>
                      <span className="font-semibold">تسجيل الدخول عبر Google</span>
                    </>
                  )}
                </Button>

              </CardContent>
            </Card>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-b from-sky-200/60 via-violet-200/40 to-amber-200/60 blur-2xl" />
              <div className="relative rounded-3xl bg-white/70 border border-slate-200/70 p-6 sm:p-8 shadow-lg">
                <div className="text-center">
                  <div className="text-sm font-semibold text-slate-900">
                    أهلاً وسهلاً 👋
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    تجربة مشرقة وبسيطة على كل الأجهزة
                  </div>
                </div>

                <div className="mt-6 relative aspect-square w-full">
                  <Image
                    src="/genie.png"
                    alt="genie"
                    fill
                    sizes="(max-width: 1024px) 80vw, 420px"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

