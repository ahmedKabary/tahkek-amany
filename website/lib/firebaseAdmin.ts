import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`Missing env var: ${name}`)
  return value
}

export function getAdminApp() {
  if (getApps().length) return getApps()[0]!

  const projectId = requireEnv('FIREBASE_ADMIN_PROJECT_ID')
  const clientEmail = requireEnv('FIREBASE_ADMIN_CLIENT_EMAIL')
  const privateKey = requireEnv('FIREBASE_ADMIN_PRIVATE_KEY').replace(/\\n/g, '\n')

  return initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  })
}

export function getAdminAuth() {
  getAdminApp()
  return getAuth()
}

export function getAdminDb() {
  getAdminApp()
  return getFirestore()
}
