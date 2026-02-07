# ⚡ Quick Start - Email Setup (5 Minutes)

## 🎯 Goal
Send resume evaluation reports via Gmail

---

## 📝 Step-by-Step

### 1️⃣ Get Gmail App Password (2 minutes)
```
Link: https://myaccount.google.com/apppasswords
Select: Mail + Your Device
Copy: 16-character password
Example: abcd efgh ijkl mnop
```

### 2️⃣ Update `.env.local` (1 minute)
```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
FROM_EMAIL=your-email@gmail.com
ENABLE_EMAIL_SENDING=true
```

### 3️⃣ Restart App (1 minute)
```bash
Press Ctrl+C to stop
npm run dev
```

### 4️⃣ Send Email (1 minute)
1. Go to: http://localhost:3001
2. Login to dashboard
3. Upload a resume
4. Click "Send to Email"
5. Check inbox ✅

---

## 🧪 Test Without Gmail Setup

Want to test without configuring Gmail?

Just keep `ENABLE_EMAIL_SENDING=false` in `.env.local`

Emails will be logged to console instead.

---

## 📊 What Gets Sent

Each email includes:
- ✅ Overall Score (0-100)
- ✅ Score Breakdown (5 categories)  
- ✅ Job Match %
- ✅ Key Strengths
- ✅ Top Skills
- ✅ Improvements Needed
- ✅ Suggestions
- ✅ Next Steps

---

## ❓ Need Help?

| Issue | Solution |
|-------|----------|
| "Not configured" | Add credentials to `.env.local` |
| "Invalid credentials" | Check Gmail App Password |
| "Still in spam?" | Mark as "Not Spam" |
| "2FA required?" | Enable at: https://myaccount.google.com/security |

---

**That's it! You're ready to send emails.** 🚀
