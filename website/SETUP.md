# تحقيق الأماني - دليل الإعداد

## الخطوات اللازمة لتشغيل الموقع

### 1. إنشاء مشروع Firebase

1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. انقر على "إنشاء مشروع" (Create Project)
3. أدخل اسم المشروع (مثل: "Tacheek Al Amani")
4. اتبع الخطوات لإنشاء المشروع

### 2. إعداد Firebase Authentication

1. في Firebase Console، اذهب إلى **Authentication** > **Sign-in method**
2. انقر على **Google** وفعّلها
3. أضف بريدك الإلكتروني كمصادقي

### 3. إنشاء Firestore Database

1. اذهب إلى **Firestore Database**
2. انقر على **Create Database**
3. اختر **Production mode**
4. اختر موقع السيرفر (يفضل: `me-west1` للشرق الأوسط)

### 4. تعيين قواعد الأمان (Security Rules)

استبدل قواعد الأمان بالقواعد التالية:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // السماح للمستخدمين بقراءة وكتابة بياناتهم الخاصة
    match /wishes/{document=**} {
      allow create: if request.auth != null;
      allow read, update, delete: if request.auth.uid == resource.data.userId;
      allow list: if request.auth != null;
    }
  }
}
```

### 5. الحصول على بيانات الاعتماد

1. في Firebase Console، اذهب إلى **Project Settings** (أيقونة الترس)
2. اختر تطبيق الويب (Web)
3. انسخ التكوين:

```javascript
{
  "apiKey": "YOUR_API_KEY",
  "authDomain": "YOUR_PROJECT.firebaseapp.com",
  "projectId": "YOUR_PROJECT_ID",
  "storageBucket": "YOUR_PROJECT.appspot.com",
  "messagingSenderId": "YOUR_MESSAGING_SENDER_ID",
  "appId": "YOUR_APP_ID"
}
```

### 6. إضافة متغيرات البيئة

أضف هذه المتغيرات إلى ملف `.env.local` أو إلى Vercel:

```
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
```

### 7. التشغيل المحلي

```bash
npm install
npm run dev
```

الموقع سيعمل على `http://localhost:3000`

### 8. النشر على Vercel

1. ادفع الكود إلى GitHub
2. ربط المستودع بـ Vercel
3. أضف متغيرات البيئة في **Settings** > **Environment Variables**
4. انشر الموقع

## هيكل البيانات

### مجموعة Wishes

كل وثيقة تحتوي على:

```javascript
{
  userId: string,           // معرّف المستخدم من Firebase Auth
  userEmail: string,        // البريد الإلكتروني للمستخدم
  userName: string,         // اسم المستخدم من Google
  name: string,             // الاسم الكامل المدخل من النموذج
  phone: string,            // رقم الهاتف
  wish: string,             // الأمنية/الحلم
  createdAt: timestamp      // وقت الإنشاء
}
```

## تخصيص الموقع

### تغيير الألوان

عدّل متغيرات CSS في `/app/globals.css`:

```css
:root {
  --primary: oklch(0.6 0.25 280);      /* اللون الأساسي */
  --secondary: oklch(0.75 0.25 35);    /* اللون الثانوي */
  --accent: oklch(0.65 0.27 25);       /* لون التركيز */
}
```

### تغيير الخطوط

يمكنك استبدال خط Cairo بخط آخر في `/app/layout.tsx`:

```typescript
import { DM_Sans } from 'next/font/google'

const font = DM_Sans({ 
  subsets: ["latin", "arabic"],
  weight: ["400", "700"]
});
```

### تغيير النصوص

ابحث عن النصوص العربية في:
- `/app/login/page.tsx` - صفحة تسجيل الدخول
- `/app/form/page.tsx` - صفحة النموذج

### إضافة الشعار

استبدل `<Sparkles />` في `/app/login/page.tsx` بصورة الشعار:

```tsx
<img src="/logo.png" alt="Logo" className="w-20 h-20" />
```

## استكشاف الأخطاء

### خطأ: "Firebase is not initialized"

تأكد من أن متغيرات البيئة صحيحة في `.env.local` أو Vercel

### خطأ: "Too many requests from this IP address"

يمكن أن يكون سبب الخطأ محاولات تسجيل دخول متكررة. انتظر قليلاً ثم حاول مجدداً.

### لا تظهر البيانات في Firestore

تأكد من:
1. تفعيل Google Sign-In في Firebase Authentication
2. أن قواعد الأمان صحيحة
3. أن المستخدم مسجل دخول

## الدعم

للحصول على مساعدة:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
