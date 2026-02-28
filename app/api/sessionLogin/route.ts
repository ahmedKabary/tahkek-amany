import { NextResponse } from 'next/server'

import { getAdminAuth } from '@/lib/firebase-admin'

export async function POST(request: Request) {
  try {
    const { idToken } = (await request.json()) as { idToken?: string }

    if (!idToken) {
      return NextResponse.json({ error: 'Missing idToken' }, { status: 400 })
    }

    const expiresIn = 1000 * 60 * 60 * 24 * 5
    const auth = getAdminAuth()

    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn })

    const response = NextResponse.json({ ok: true })
    response.cookies.set({
      name: 'session',
      value: sessionCookie,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: Math.floor(expiresIn / 1000),
    })

    return response
  } catch (err) {
    console.error('sessionLogin error', err)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
