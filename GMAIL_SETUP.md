# 📧 Gmail Email Setup Guide - Complete Instructions

## Quick Start (2 Minutes)

The email service is now fully integrated with Gmail support! Follow these steps to enable actual email sending:

---

## Step 1: Generate Gmail App Password

Your regular Gmail password **won't work** with this app. You need to create a special App Password.

### Instructions:

1. Go to: **https://myaccount.google.com/apppasswords**
   - (You might need to enable 2-Factor Authentication first)

2. Select:
   - **Mail** as the app
   - **Windows PC** (or your device) as the device

3. Google will generate a 16-character password
   - Example: `abcd efgh ijkl mnop`
   - Copy this password (without spaces)

---

## Step 2: Configure Environment Variables

1. Open `.env.local` in the project root
   - File: `c:\Users\RAJPAVAN SHAHUKARI\OneDrive\Desktop\CODEATHON\.env.local`

2. Update these fields:
   ```
   # Your Gmail email address
   GMAIL_USER=your-email@gmail.com
   
   # The 16-character app password you just generated (without spaces)
   GMAIL_APP_PASSWORD=abcdefghijklmnop
   
   # Email to display as sender
   FROM_EMAIL=your-email@gmail.com
   
   # Reply-to email
   REPLY_TO_EMAIL=your-email@gmail.com
   
   # Enable actual email sending
   ENABLE_EMAIL_SENDING=true
   ```

3. Save the file

---

## Step 3: Restart the Application

1. Stop the current server (press Ctrl+C in the terminal)

2. Restart with:
   ```bash
   npm run dev
   ```

3. The server will restart using your Gmail credentials

---

## Step 4: Test Email Sending

1. Go to your dashboard: `http://localhost:3001`

2. Upload a resume to test

3. Click **"Send to Email"** button

4. Check your inbox for the evaluation report!

---

## Troubleshooting

### ❌ "Email service not configured"

**Solution**: 
- Make sure `.env.local` has `GMAIL_USER` and `GMAIL_APP_PASSWORD`
- Check that `ENABLE_EMAIL_SENDING=true`
- Restart the app after saving

### ❌ "Invalid credentials"

**Solution**:
- Verify the 16-character app password is correct
- Make sure there are no extra spaces
- App passwords are different from your regular Gmail password
- If still failing, generate a new app password

### ❌ "2-Factor Authentication required"

**Solution**:
- Go to: https://myaccount.google.com/security
- Enable 2-Factor Authentication
- Then generate an App Password again

### ✅ Email sent but goes to spam?

**Solution**:
- Check spam/promotions folder
- Add your sender email to contacts
- Mark emails as "Not Spam"

---

## Email Templates

The app sends beautifully formatted HTML emails with:

### Resume Evaluation Email includes:
- ✅ Overall resume score (out of 100)
- ✅ Score breakdown (Experience, Skills, Education, Presentation)
- ✅ Job match percentage
- ✅ Experience level classification
- ✅ Key strengths
- ✅ Top skills identified
- ✅ Areas for improvement
- ✅ Actionable suggestions
- ✅ Next steps recommendations

### Profile Email includes:
- ✅ Profile overview
- ✅ Completion percentage
- ✅ Completed sections status
- ✅ Personalized recommendations

---

## Security Notes

- ✅ App passwords are more secure than regular passwords
- ✅ The app never stores your password
- ✅ Credentials are only used server-side
- ✅ Always use HTTPS in production

---

## Alternative Email Services

If you prefer not to use Gmail, the app also supports:

1. **SendGrid** - 100 emails/day free tier
2. **Mailgun** - 300 emails/month free tier
3. **AWS SES** - 200 emails/day free tier

See `EMAIL_SETUP.md` for configuration details.

---

## Testing Without Production Emails

If you want to test the app **without actually sending emails**:

```env
ENABLE_EMAIL_SENDING=false
```

Emails will be logged to console, but not sent. Perfect for development!

---

## Need Help?

1. Check console logs for error messages
2. Verify `.env.local` file exists and is readable
3. Ensure credentials are correct
4. Restart the application after any changes
5. Check browser console for frontend errors

---

**Email setup complete! Your app can now send resume evaluation reports via Gmail. 🎉**
