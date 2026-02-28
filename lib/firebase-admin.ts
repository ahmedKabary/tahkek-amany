import admin from 'firebase-admin'

function getServiceAccount() {
  const json = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON
  if (json) {
    return JSON.parse(json)
  }

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY

  if (projectId && clientEmail && privateKey) {
    return {
      project_id: projectId,
      client_email: clientEmail,
      private_key: privateKey.replace(/\\n/g, '\n'),
    }
  }

  throw new Error(
    'Missing Firebase Admin credentials. Set FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON or (FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, FIREBASE_ADMIN_PRIVATE_KEY).'
  )
}

export function getAdminApp() {
  if (admin.apps.length) return admin.app()

  const serviceAccount = getServiceAccount()

  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

export function getAdminAuth() {
  return admin.auth(getAdminApp())
}
