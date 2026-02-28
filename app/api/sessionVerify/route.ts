import { NextResponse } from 'next/server'

import { getAdminAuth } from '@/lib/firebase-admin'

export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie') || ''
    const match = cookieHeader.match(/(?:^|; )session=([^;]+)/)

    if (!match) {
      return NextResponse.json({ ok: false }, { status: 401 })
    }

    const sessionCookie = decodeURIComponent(match[1])
    const auth = getAdminAuth()

    await auth.verifySessionCookie(sessionCookie, true)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('sessionVerify error', err)
    return NextResponse.json({ ok: false }, { status: 401 })
  }
}
