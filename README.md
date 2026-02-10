# تحقيق الأماني - منصة تحقيق الأماني والأحلام

**Tacheek Al Amani** - Achieving Dreams Platform for Resala Association

## نظرة عامة

منصة ويب عربية فريدة لتحقيق الأماني والأحلام، مع تصميم سحري مستوحى من الجني، وأنيميشنات انسيابية، وتجربة مستخدم استثنائية. تم بناء المنصة بتقنيات حديثة وآمنة.

## المميزات الرئيسية

- **تسجيل دخول آمن**: بدون كلمات مرور عبر Google Sign-In
- **واجهة ساحرة**: ألوان زاهية ومؤثرات بصرية خلابة
- **أنيميشنات سلسة**: انتقالات ناعمة وعناصر طافية وتأثيرات براقة
- **دعم العربية الكامل**: واجهة RTL (من اليمين إلى اليسار) وخط Cairo
- **تصميم متجاوب**: مثالي على الهواتف والأجهزة اللوحية وأجهزة الحاسوب
- **تحقق من صحة النموذج**: رسائل خطأ ودية بالعربية
- **تخزين آمن**: قاعدة بيانات Firestore آمنة مع قواعد أمان متقدمة

## التكنولوجيات المستخدمة

- **Next.js 16** - إطار عمل React الحديث
- **Firebase** - المصادقة وقاعدة البيانات
- **Tailwind CSS v4** - تصميم متقدم
- **TypeScript** - كود آمن وموثوق
- **Cairo Font** - خط عربي جميل من Google Fonts

## المتطلبات الأساسية

- Node.js 18+
- npm أو yarn
- حساب Firebase

## التثبيت والإعداد

### 1. استنساخ المستودع أو التحميل

```bash
git clone <repository-url>
cd tacheek-al-amani
npm install
```

### 2. إعداد Firebase

**إنشاء مشروع Firebase:**
1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. انقر على "Create Project"
3. اتبع الخطوات حتى ينتهي الإنشاء

**تفعيل المصادقة:**
1. اذهب إلى **Authentication** > **Sign-in method**
2. فعّل **Google** كطريقة تسجيل دخول

**إنشاء Firestore Database:**
1. اذهب إلى **Firestore Database**
2. انقر على **Create Database**
3. اختر **Production mode**
4. اختر موقع السيرفر (مثل: `me-west1`)

**تعيين قواعد الأمان:**
انسخ هذه القواعد في **Firestore** > **Rules**:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /wishes/{document=**} {
      allow create: if request.auth != null;
      allow read, update, delete: if request.auth.uid == resource.data.userId;
      allow list: if request.auth != null;
    }
  }
}
```

### 3. الحصول على بيانات الاعتماد

1. في Firebase Console، اذهب إلى **Project Settings** (أيقونة الترس)
2. اختر تطبيق الويب (Web)
3. انسخ التكوين

### 4. إضافة متغيرات البيئة

أنشئ ملف `.env.local` في جذر المشروع:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 5. التشغيل المحلي

```bash
npm run dev
```

الموقع سيكون متاحاً على `http://localhost:3000`

## النشر على Vercel

### الطريقة 1: عبر واجهة Vercel

1. ادفع الكود إلى GitHub
2. اذهب إلى [Vercel.com](https://vercel.com) وسجل دخول
3. انقر على **Import Project**
4. اختر مستودع GitHub الخاص بك
5. أضف متغيرات البيئة في **Environment Variables**
6. انقر على **Deploy**

### الطريقة 2: عبر Vercel CLI

```bash
# تثبيت Vercel CLI
npm i -g vercel

# النشر
vercel

# إضافة متغيرات البيئة
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
```

## هيكل المشروع

```
تحقيق-الأماني/
├── app/
│   ├── layout.tsx          # التخطيط الرئيسي مع AuthProvider
│   ├── page.tsx            # الصفحة الرئيسية (تحويل للتسجيل)
│   ├── login/
│   │   └── page.tsx        # صفحة تسجيل الدخول
│   ├── form/
│   │   └── page.tsx        # صفحة النموذج الرئيسية
│   └── globals.css         # التنسيقات العامة والألوان
├── components/
│   ├── AnimatedBackground.tsx  # مكونات الأنيميشن
│   └── Container.tsx           # مكونات التخطيط المتجاوب
├── contexts/
│   └── AuthContext.tsx     # سياق المصادقة
├── lib/
│   └── firebase.ts         # إعداد Firebase
├── SETUP.md                # دليل الإعداد التفصيلي
└── README.md              # هذا الملف
```

## حيكل بيانات Firestore

### مجموعة Wishes

```javascript
{
  userId: string,           // معرف المستخدم من Firebase Auth
  userEmail: string,        // البريد الإلكتروني
  userName: string,         // اسم المستخدم من Google
  name: string,             // الاسم الكامل المدخل
  phone: string,            // رقم الهاتف
  wish: string,             // نص الأمنية
  createdAt: timestamp      // وقت الإنشاء
}
```

## التخصيص والتطوير

### تغيير الألوان

عدّل متغيرات CSS في `/app/globals.css`:

```css
:root {
  --primary: oklch(0.6 0.25 280);      /* اللون الأساسي */
  --secondary: oklch(0.75 0.25 35);    /* اللون الثانوي */
  --accent: oklch(0.65 0.27 25);       /* لون التركيز */
}
```

### تغيير النصوص

ابحث عن النصوص في:
- `/app/login/page.tsx` - نصوص تسجيل الدخول
- `/app/form/page.tsx` - نصوص النموذج

### إضافة حقول جديدة

1. أضف الحقل إلى النموذج في `/app/form/page.tsx`
2. أضف التحقق من الصحة في دالة `validateForm`
3. أضف الحقل إلى `formData` عند الإرسال

### تخصيص الخطوط

غيّر خط Cairo في `/app/layout.tsx`:

```typescript
import { YourFont } from 'next/font/google'

const font = YourFont({ 
  subsets: ["latin", "arabic"],
  weight: ["400", "700"]
});
```

## استكشاف الأخطاء

### خطأ: "Firebase is not initialized"
- تحقق من متغيرات البيئة في `.env.local`
- تأكد من صحة قيم Firebase Config

### خطأ: "signInWithPopup failed"
- تفعيل Google Sign-In في Firebase Authentication
- السماح بالنوافذ المنبثقة في المتصفح

### لا تظهر البيانات في Firestore
- تحقق من أن قواعد الأمان صحيحة
- تأكد من أن المستخدم مسجل دخول
- تحقق من وجود مجموعة `wishes` في Firestore

### أداء بطيء
- تحقق من حجم الحزمة: `npm run build`
- استخدم React DevTools للبحث عن تصيير غير ضروري

## الأمان

- **بيانات الاعتماد**: لا تخزن بيانات حساسة في `.env` العام
- **CORS**: تم تكوين Firebase لقبول طلبات من Vercel
- **RLS**: قواعد أمان Firestore تضمن حماية البيانات
- **SSL/TLS**: تفعيل تلقائي على Vercel

## المساهمة

نرحب بالمساهمات! يرجى:
1. إنشاء فرع جديد لميزتك
2. الالتزام بقواعد الكود
3. إرسال طلب دمج مع وصف واضح

## الترخيص

تم بناء هذا المشروع لـ جمعية رسالة. جميع الحقوق محفوظة.

## الدعم

للحصول على مساعدة:
- تحقق من [SETUP.md](./SETUP.md) للتفاصيل الإضافية
- راجع [Firebase Documentation](https://firebase.google.com/docs)
- اطلع على [Next.js Documentation](https://nextjs.org/docs)

## الشكر والتقدير

- Firebase للمصادقة آمنة وقاعدة البيانات
- Next.js لإطار العمل الممتاز
- Tailwind CSS للتصميم الحديث
- Google Fonts لخط Cairo الجميل

---

**تم بناء هذا المشروع بـ ❤️ لتحقيق الأماني**
# tahkek-amany
