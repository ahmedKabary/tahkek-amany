import { NextResponse } from 'next/server'

import { getAdminAuth, getAdminDb } from '@/lib/firebaseAdmin'

type NotifyType = 'wish' | 'volunteer'

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization') || ''
    const match = authHeader.match(/^Bearer\s+(.+)$/i)
    if (!match) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const idToken = match[1]!
    const adminAuth = getAdminAuth()
    await adminAuth.verifyIdToken(idToken)

    const body = (await req.json()) as {
      type: NotifyType
      title?: string
      message?: string
      data?: Record<string, unknown>
    }

    const notifyType: NotifyType = body.type
    const title = body.title || (notifyType === 'wish' ? 'تم إرسال أمنية جديدة' : 'تم تسجيل متطوع جديد')
    const message = body.message || 'لديك تحديث جديد.'

    const adminDb = getAdminDb()
    const snap = await adminDb.collection('admin_devices').get()
    const tokens = snap.docs
      .map((d) => d.data())
      .map((d) => (typeof d.expoPushToken === 'string' ? d.expoPushToken : null))
      .filter(Boolean) as string[]

    if (!tokens.length) {
      return NextResponse.json({ ok: true, sent: 0 })
    }

    const payload = tokens.map((to) => ({
      to,
      sound: 'default',
      title,
      body: message,
      data: {
        type: notifyType,
        ...(body.data || {}),
      },
    }))

    const res = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const json = await res.json().catch(() => null)

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to send push', details: json },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true, sent: tokens.length, response: json })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
