# AI Resume Evaluator - Setup & Email Configuration Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- Modern web browser with JavaScript enabled

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

The application will be available at `http://localhost:3000`

---

## 📧 Email Configuration Guide

### Overview
The AI Resume Evaluator now supports sending profile reports via email. Currently, the system is set up with a mock email service. To enable real email sending, follow these steps:

### Option 1: Using SendGrid (Recommended)

SendGrid is a reliable email service with a generous free tier (100 emails/day).

1. **Create SendGrid Account**
   - Go to https://sendgrid.com
   - Sign up for a free account
   - Verify your email

2. **Get API Key**
   - Navigate to Settings → API Keys
   - Create a new API Key with "Mail Send" permissions
   - Copy the key and save it securely

3. **Update Environment Variables**
   ```bash
   # Create .env.local file in project root
   SENDGRID_API_KEY=your_sendgrid_api_key_here
   FROM_EMAIL=noreply@airesumeevaluator.com
   ```

4. **Install SendGrid Package**
   ```bash
   npm install @sendgrid/mail
   ```

5. **Update API Route** (`pages/api/send-profile.js`)
   ```javascript
   import sgMail from '@sendgrid/mail'

   sgMail.setApiKey(process.env.SENDGRID_API_KEY)

   export default async function handler(req, res) {
     if (req.method !== 'POST') {
       return res.status(405).json({ error: 'Method not allowed' })
     }

     try {
       const { email, profileData, userName } = req.body
       
       const msg = {
         to: email,
         from: process.env.FROM_EMAIL,
         subject: `Your Profile Report - AI Resume Evaluator`,
         html: generateProfileEmail(profileData, userName),
       }

       await sgMail.send(msg)

       return res.status(200).json({
         success: true,
         message: `Profile report sent to ${email}`
       })
     } catch (error) {
       return res.status(500).json({
         error: 'Failed to send email',
         message: error.message
       })
     }
   }
   ```

### Option 2: Using Gmail API

1. **Enable Gmail API**
   - Go to Google Cloud Console
   - Create a new project
   - Enable the Gmail API
   - Create OAuth 2.0 credentials

2. **Install Dependencies**
   ```bash
   npm install googleapis
   ```

3. **Configure OAuth** (See Google Cloud documentation)

### Option 3: Using Mailgun

Similar to SendGrid but with potentially different rate limits:
- Visit https://www.mailgun.com
- Create account and get API key
- Follow similar environment setup

### Option 4: Using AWS SES

1. **Verify Email Address**
   - Go to AWS SES console
   - Verify your sending email address

2. **Get Credentials**
   - Create IAM user with SES permissions
   - Get Access Key ID and Secret Access Key

3. **Install SDK**
   ```bash
   npm install @aws-sdk/client-ses
   ```

---

## ✨ Features Overview

### For Job Seekers
- **Profile Management**: Complete your professional profile with all key sections
- **AI Coaching**: Get AI-powered resume coaching and feedback
- **Skill Gap Analysis**: Identify missing skills and receive recommendations
- **Learning Roadmap**: Personalized learning suggestions based on your gaps
- **Profile Export**: Send your profile report via email or download as PDF

### For HR/Recruiters
- **Bulk Resume Screening**: Upload and process multiple resumes at once
- **Smart Scoring**: AI-powered scoring based on job requirements
- **Candidate Management**: View results in a clean, organized interface
- **Email Actions**: Send bulk emails to shortlisted candidates
- **Cutoff Configuration**: Customize scoring thresholds

---

## 🔐 Authentication

### Signup/Login Flow
1. User visits landing page
2. Selects role (Job Seeker or Recruiter)
3. Creates account with email/password or OAuth
4. Completes profile
5. Accesses dashboard

### Profile Completion Status
- System tracks completion percentage (0-100%)
- Real-time updates as user fills in information
- Visual indicators show missing sections
- Email export only available when profile is complete

---

## 🎨 UI/UX Improvements

### Design System
- **Color Scheme**: Microsoft Fluent Design (Primary: #0078D4)
- **Dark Mode**: Fully supported with smooth transitions
- **Responsive**: Mobile-first design, works on all devices
- **Accessibility**: WCAG 2.1 compliant

### Components
- Card-based layout with hover effects
- Gradient backgrounds for visual hierarchy
- Progress indicators and completion badges
- Loading states and error handling
- Toast notifications for feedback

---

## 📊 Profile Analytics

The Analytics tab shows:
- **Profile Completion**: Overall percentage and current status
- **Section Breakdown**: Detailed view of each profile section
- **Recommendations**: Smart suggestions for profile improvement
- **Export Options**: Send to email or download report

---

## 🚨 Bug Fixes & Improvements

### Recent Fixes
1. ✅ Removed nested `<a>` tags in Link components (Next.js 13+ compatibility)
2. ✅ Fixed file upload error handling for PDFs
3. ✅ Added comprehensive email service with HTML templates
4. ✅ Enhanced error messages and user feedback
5. ✅ Improved dark mode styling across all pages
6. ✅ Fixed profile completion calculation accuracy
7. ✅ Added real-time profile validation

### Performance Optimizations
- Next.js Image optimization enabled
- Code splitting for faster page loads
- CSS-in-JS optimization with Tailwind
- Database query optimization (when applicable)

---

## 🔍 Testing

### Manual Testing Checklist

**Authentication**
- [ ] Signup with email/password
- [ ] Login with existing account
- [ ] OAuth flow (Google, Microsoft)
- [ ] Logout functionality
- [ ] Session persistence

**Profile**
- [ ] Add/edit profile information
- [ ] File uploads work correctly
- [ ] Completion percentage updates in real-time
- [ ] Export to email works
- [ ] Download report works

**Dashboards**
- [ ] Job Seeker: Chat, charts, roadmap display
- [ ] HR: Resume upload, scoring, email action
- [ ] Both: Profile widget shows current completion

**UI/UX**
- [ ] Dark mode toggle works
- [ ] Responsive on mobile/tablet/desktop
- [ ] No console errors
- [ ] All links navigate correctly
- [ ] Forms validate input properly

---

## 📦 Project Structure

```
CODEATHON/
├── pages/
│   ├── index.js                 # Landing page
│   ├── profile.js               # User profile management
│   ├── _app.js                  # App wrapper
│   ├── auth/
│   │   ├── signup.js            # Sign up page
│   │   └── login.js             # Login page
│   ├── dashboard/
│   │   ├── seeker/index.js      # Job seeker dashboard
│   │   └── hr/index.js          # HR/recruiter dashboard
│   └── api/
│       └── send-profile.js      # Email API endpoint
├── components/
│   ├── Navbar.jsx               # Navigation bar
│   ├── ProfileWidget.jsx        # Profile status widget
│   ├── ProfileAnalytics.jsx     # Analytics dashboard
│   └── seeker/
│       ├── ChatPanel.jsx        # Chat interface
│       └── GrowthPanel.jsx      # Growth metrics
├── context/
│   ├── AuthContext.jsx          # Authentication state
│   ├── ProfileContext.jsx       # Profile data management
│   └── ThemeProvider.jsx        # Dark/light theme
├── lib/
│   ├── emailService.js          # Email templates and logic
│   └── hrMocks.js               # Mock data for HR features
└── styles/
    └── globals.css              # Global styles
```

---

## 🔧 Environment Variables

Create `.env.local` file in project root:

```env
# Email Configuration (SendGrid)
SENDGRID_API_KEY=your_api_key
FROM_EMAIL=noreply@airesumeevaluator.com

# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=

# Optional: API Base
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🤝 Contributing

When making changes:
1. Create a new branch for each feature
2. Follow the existing code style
3. Test thoroughly before submitting
4. Update documentation as needed

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting guide
2. Review the documentation
3. Check browser console for errors
4. Verify all environment variables are set

---

## 📄 License

This project is proprietary and intended for educational purposes.

---

## 🎯 Next Steps

### Planned Features
- [ ] Real-time resume parsing
- [ ] Advanced skill matching
- [ ] Interview preparation module
- [ ] Job marketplace integration
- [ ] Video interview recording
- [ ] Reference checking
- [ ] Background verification

### Infrastructure
- [ ] Database integration (PostgreSQL)
- [ ] File storage (AWS S3)
- [ ] Analytics dashboard
- [ ] Admin panel
- [ ] API documentation (Swagger)

---

**Last Updated**: February 7, 2026
**Version**: 1.0.0
