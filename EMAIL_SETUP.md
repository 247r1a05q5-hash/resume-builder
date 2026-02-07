# Email Setup & Integration Guide

## Email Configuration Options

### Quick Setup with Mock Service (Development)

By default, the application uses a mock email service that logs emails to the console. This is perfect for testing without actual email sending.

**File**: `lib/emailService.js`
**API Route**: `pages/api/send-profile.js`

---

## Production Email Setup

### SendGrid (Recommended - Free tier)

**Benefits:**
- 100 emails/day free tier
- Excellent deliverability
- Easy integration
- Detailed analytics

**Steps:**

1. **Sign Up**
   ```
   Visit: https://sendgrid.com
   Create account and verify email
   ```

2. **Create API Key**
   - Dashboard → Settings → API Keys
   - Create New Key with "Mail Send" permission
   - Copy and save securely

3. **Install Package**
   ```bash
   npm install @sendgrid/mail
   ```

4. **Configure Environment**
   Create `.env.local`:
   ```
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   FROM_EMAIL=noreply@airesume.com
   ```

5. **Update pages/api/send-profile.js**
   ```javascript
   import sgMail from '@sendgrid/mail'
   import { generateProfileEmail } from '../../lib/emailService'

   sgMail.setApiKey(process.env.SENDGRID_API_KEY)

   export default async function handler(req, res) {
     if (req.method !== 'POST') {
       return res.status(405).json({ error: 'Method not allowed' })
     }

     try {
       const { email, profileData, userName } = req.body

       const htmlContent = generateProfileEmail(profileData, userName)

       const msg = {
         to: email,
         from: process.env.FROM_EMAIL,
         subject: `Your Profile Report - AI Resume Evaluator`,
         html: htmlContent,
       }

       await sgMail.send(msg)

       return res.status(200).json({
         success: true,
         message: `Profile report sent successfully to ${email}`,
         timestamp: new Date().toISOString(),
       })
     } catch (error) {
       console.error('SendGrid error:', error)
       return res.status(500).json({
         error: 'Failed to send email',
         message: error.message,
       })
     }
   }
   ```

---

### Mailgun Integration

**Benefits:**
- More free emails (300/month)
- Great documentation
- European compliance options

**Steps:**

1. **Sign Up**
   ```
   Visit: https://www.mailgun.com
   Create account
   ```

2. **Get Credentials**
   - Dashboard → API
   - Note: Domain and API Key

3. **Install Package**
   ```bash
   npm install mailgun.js form-data
   ```

4. **Configure Environment**
   ```
   MAILGUN_DOMAIN=mg.yourdomain.com
   MAILGUN_API_KEY=key-xxxxxxxxxxxxxxxxxxxxxxx
   FROM_EMAIL=noreply@yourdomain.com
   ```

5. **Update API Route**
   ```javascript
   import FormData from 'form-data'
   import Mailgun from 'mailgun.js'
   
   const mailgun = new Mailgun(FormData)
   const client = mailgun.client({
     username: 'api',
     key: process.env.MAILGUN_API_KEY,
   })

   export default async function handler(req, res) {
     const { email, profileData, userName } = req.body

     try {
       const result = await client.messages.create(
         process.env.MAILGUN_DOMAIN,
         {
           from: process.env.FROM_EMAIL,
           to: email,
           subject: 'Your Profile Report',
           html: generateProfileEmail(profileData, userName),
         }
       )

       return res.status(200).json({
         success: true,
         message: `Profile report sent to ${email}`,
         id: result.id,
       })
     } catch (error) {
       return res.status(500).json({
         error: 'Failed to send email',
         message: error.message,
       })
     }
   }
   ```

---

### AWS SES (Scalable Option)

**Benefits:**
- Pay-per-email pricing
- Highly scalable
- Excellent for production

**Steps:**

1. **AWS Account Setup**
   - Create AWS account
   - Go to SES service
   - Verify sender email

2. **Get Credentials**
   - Create IAM user with SES permissions
   - Get Access Key ID and Secret Access Key

3. **Install AWS SDK**
   ```bash
   npm install @aws-sdk/client-ses
   ```

4. **Configure Environment**
   ```
   AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
   AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
   AWS_REGION=us-east-1
   FROM_EMAIL=noreply@example.com
   ```

5. **Update API Route**
   ```javascript
   import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'
   
   const ses = new SESClient({ region: process.env.AWS_REGION })

   export default async function handler(req, res) {
     const { email, profileData, userName } = req.body

     try {
       const params = {
         Source: process.env.FROM_EMAIL,
         Destination: { ToAddresses: [email] },
         Message: {
           Subject: { Data: 'Your Profile Report' },
           Body: {
             Html: { Data: generateProfileEmail(profileData, userName) },
           },
         },
       }

       const command = new SendEmailCommand(params)
       await ses.send(command)

       return res.status(200).json({
         success: true,
         message: `Profile report sent to ${email}`,
       })
     } catch (error) {
       return res.status(500).json({
         error: 'Failed to send email',
         message: error.message,
       })
     }
   }
   ```

---

### Resend (Modern Alternative)

**Benefits:**
- Easy setup
- React-first approach
- Modern infrastructure

**Steps:**

1. **Sign Up**
   ```
   Visit: https://resend.com
   Create account
   ```

2. **Get API Key**
   - Dashboard → API Keys
   - Create new key

3. **Install Package**
   ```bash
   npm install resend
   ```

4. **Configure Environment**
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   FROM_EMAIL=onboarding@resend.dev
   ```

5. **Update API Route**
   ```javascript
   import { Resend } from 'resend'

   const resend = new Resend(process.env.RESEND_API_KEY)

   export default async function handler(req, res) {
     const { email, profileData, userName } = req.body

     try {
       const result = await resend.emails.send({
         from: process.env.FROM_EMAIL,
         to: email,
         subject: 'Your Profile Report',
         html: generateProfileEmail(profileData, userName),
       })

       return res.status(200).json({
         success: true,
         message: `Profile report sent to ${email}`,
         id: result.data.id,
       })
     } catch (error) {
       return res.status(500).json({
         error: 'Failed to send email',
         message: error.message,
       })
     }
   }
   ```

---

## Testing Email Functionality

### 1. Local Testing

```javascript
// Test by sending to yourself
const testEmail = 'your-email@gmail.com'
console.log('Email content:', generateProfileEmail(mockData, 'Test User'))
```

### 2. Mock Email Service

The default setup uses a mock service:
```bash
# Run and check console for email logs
npm run dev
```

### 3. SendGrid Test

```bash
# Send test email
curl --request POST \
  --url https://api.sendgrid.com/v3/mail/send \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "personalizations": [{
      "to": [{"email": "test@example.com"}],
      "subject": "Test"
    }],
    "from": {"email": "noreply@example.com"},
    "content": [{
      "type": "text/html",
      "value": "<p>Test email</p>"
    }]
  }'
```

---

## Email Verification

### Gmail Configuration

1. **Enable 2FA**
   - Go to myaccount.google.com
   - Security → 2-Step Verification
   - Complete setup

2. **Create App Password**
   - Security → App passwords
   - Select Mail → Windows Computer
   - Copy the 16-character password

3. **Configure SMTP**
   ```
   Host: smtp.gmail.com
   Port: 587
   Username: your-email@gmail.com
   Password: your-app-password
   ```

---

## Troubleshooting

### Email Not Sending

1. **Check API Key**
   - Verify key is correct
   - Confirm it has Mail Send permissions
   - Check expiration date

2. **Verify Sender Email**
   - Most services require sender verification
   - Check verification status in dashboard
   - Resend verification email if needed

3. **Check Recipient Email**
   - Verify email format is valid
   - Ensure it's not in spam folder
   - Check email service limits (daily cap)

4. **Review Logs**
   - Check NextJS console output
   - Look for API response errors
   - Verify CORS headers if using external API

### Common Issues

**Issue**: "Invalid API Key"
**Solution**: Regenerate key, ensure no spaces/typos

**Issue**: "Unauthorized - 401"
**Solution**: Check environment variables are loaded correctly

**Issue**: "Rate Limit Exceeded"
**Solution**: Check service plan limits, upgrade if needed

---

## Best Practices

1. **Security**
   - Never commit API keys to version control
   - Use environment variables (.env.local)
   - Rotate keys periodically
   - Use service-specific restrictions

2. **Email Content**
   - Keep emails HTML-friendly
   - Use responsive templates
   - Include unsubscribe link if required
   - Test across email clients

3. **Deliverability**
   - Maintain good sender reputation
   - Monitor bounce rates
   - Respect email preferences
   - Follow CAN-SPAM regulations

4. **Monitoring**
   - Track delivery rates
   - Monitor for failures
   - Set up alerts for errors
   - Review bounce/complaint rates

---

## Production Deployment

### Railway, Vercel, Netlify

All support environment variables:

1. **Add Environment Variables**
   - Dashboard → Settings → Environment Variables
   - Add all email service credentials
   - Deploy will restart automatically

2. **Test in Production**
   - Send test email after deploy
   - Monitor logs for errors
   - Verify delivery to email

---

**Last Updated**: February 7, 2026
