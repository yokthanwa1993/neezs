# 🏗️ Neeiz Platform - Full System Architecture

## 📋 Overview

Neeiz เป็นแพลตฟอร์มจ้างงานแบบครบวงจรที่ประกอบด้วย 3 ส่วนหลัก:
- **Web Platform** (Next.js) - สำหรับ SEO และการใช้งานบนเว็บ
- **Mobile App** (React Native) - สำหรับการใช้งานบนมือถือ
- **Backend API** (Node.js/Express) - สำหรับจัดการข้อมูลและ Authentication

---

## 🏗️ Monorepo Structure

```
Neeiz/
├── apps/
│   ├── web/                    # 🌐 Web Platform (Next.js)
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── index.tsx              # Landing Page (SEO)
│   │   │   │   ├── jobs/
│   │   │   │   │   ├── index.tsx          # Job Listings
│   │   │   │   │   └── [id].tsx           # Job Details
│   │   │   │   ├── employer/
│   │   │   │   │   ├── dashboard.tsx      # Employer Dashboard
│   │   │   │   │   ├── post-job.tsx       # Post New Job
│   │   │   │   │   ├── applications.tsx   # Manage Applications
│   │   │   │   │   ├── analytics.tsx      # Analytics & Reports
│   │   │   │   │   └── profile.tsx        # Company Profile
│   │   │   │   ├── jobseeker/
│   │   │   │   │   ├── dashboard.tsx      # Job Seeker Dashboard
│   │   │   │   │   ├── profile.tsx        # Personal Profile
│   │   │   │   │   └── applications.tsx   # My Applications
│   │   │   │   ├── auth/
│   │   │   │   │   ├── login.tsx          # LINE Login
│   │   │   │   │   └── callback.tsx       # Auth Callback
│   │   │   │   └── chat/
│   │   │   │       └── [conversationId].tsx # Chat Interface
│   │   │   ├── components/
│   │   │   │   ├── ui/                     # Shared UI Components
│   │   │   │   ├── layout/
│   │   │   │   ├── job-card.tsx
│   │   │   │   ├── job-search.tsx
│   │   │   │   └── chat-widget.tsx
│   │   │   ├── services/
│   │   │   │   ├── api.ts                  # API Client
│   │   │   │   ├── auth.ts                 # Authentication
│   │   │   │   └── chat.ts                 # Chat Service
│   │   │   ├── hooks/
│   │   │   │   ├── use-auth.ts
│   │   │   │   ├── use-jobs.ts
│   │   │   │   └── use-chat.ts
│   │   │   ├── types/
│   │   │   │   ├── job.ts
│   │   │   │   ├── user.ts
│   │   │   │   └── chat.ts
│   │   │   └── utils/
│   │   │       ├── constants.ts
│   │   │       └── helpers.ts
│   │   ├── public/
│   │   ├── package.json
│   │   ├── next.config.js
│   │   ├── tailwind.config.js
│   │   ├── Dockerfile
│   │   └── captain-definition
│   │
│   ├── mobile/                  # 📱 Mobile App (React Native)
│   │   ├── src/
│   │   │   ├── screens/
│   │   │   │   ├── auth/
│   │   │   │   │   ├── LoginScreen.tsx
│   │   │   │   │   └── AuthCallback.tsx
│   │   │   │   ├── jobseeker/
│   │   │   │   │   ├── JobSearchScreen.tsx
│   │   │   │   │   ├── JobDetailScreen.tsx
│   │   │   │   │   ├── ApplyJobScreen.tsx
│   │   │   │   │   ├── ProfileScreen.tsx
│   │   │   │   │   └── ApplicationsScreen.tsx
│   │   │   │   ├── employer/
│   │   │   │   │   ├── DashboardScreen.tsx
│   │   │   │   │   ├── PostJobScreen.tsx
│   │   │   │   │   ├── ApplicationsScreen.tsx
│   │   │   │   │   └── CompanyProfileScreen.tsx
│   │   │   │   ├── chat/
│   │   │   │   │   ├── ChatListScreen.tsx
│   │   │   │   │   └── ChatScreen.tsx
│   │   │   │   └── common/
│   │   │   │       ├── LoadingScreen.tsx
│   │   │   │       └── ErrorScreen.tsx
│   │   │   ├── components/
│   │   │   │   ├── JobCard.tsx
│   │   │   │   ├── SearchBar.tsx
│   │   │   │   ├── ChatBubble.tsx
│   │   │   │   └── ProfileHeader.tsx
│   │   │   ├── services/
│   │   │   │   ├── api.ts
│   │   │   │   ├── auth.ts
│   │   │   │   └── chat.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useAuth.ts
│   │   │   │   ├── useJobs.ts
│   │   │   │   └── useChat.ts
│   │   │   ├── types/
│   │   │   │   ├── job.ts
│   │   │   │   ├── user.ts
│   │   │   │   └── chat.ts
│   │   │   ├── navigation/
│   │   │   │   ├── AppNavigator.tsx
│   │   │   │   ├── AuthNavigator.tsx
│   │   │   │   ├── JobSeekerNavigator.tsx
│   │   │   │   └── EmployerNavigator.tsx
│   │   │   └── utils/
│   │   │       ├── constants.ts
│   │   │       └── helpers.ts
│   │   ├── android/
│   │   ├── ios/
│   │   ├── package.json
│   │   ├── app.json
│   │   ├── metro.config.js
│   │   ├── Dockerfile
│   │   └── captain-definition
│   │
│   └── api/                     # 🔧 Backend API (Node.js/Express)
│       ├── src/
│       │   ├── routes/
│       │   │   ├── auth.ts              # Authentication
│       │   │   ├── jobs.ts              # Job Management
│       │   │   ├── applications.ts      # Job Applications
│       │   │   ├── chat.ts              # Chat System
│       │   │   ├── users.ts             # User Management
│       │   │   ├── companies.ts         # Company Management
│       │   │   └── analytics.ts         # Analytics
│       │   ├── controllers/
│       │   │   ├── authController.ts
│       │   │   ├── jobController.ts
│       │   │   ├── applicationController.ts
│       │   │   ├── chatController.ts
│       │   │   └── analyticsController.ts
│       │   ├── models/
│       │   │   ├── User.ts
│       │   │   ├── Job.ts
│       │   │   ├── Application.ts
│       │   │   ├── Company.ts
│       │   │   ├── Chat.ts
│       │   │   └── Message.ts
│       │   ├── middleware/
│       │   │   ├── auth.ts
│       │   │   ├── validation.ts
│       │   │   └── rateLimit.ts
│       │   ├── services/
│       │   │   ├── firebase.ts
│       │   │   ├── line.ts
│       │   │   ├── chat.ts
│       │   │   └── notification.ts
│       │   ├── utils/
│       │   │   ├── database.ts
│       │   │   ├── validation.ts
│       │   │   └── helpers.ts
│       │   ├── types/
│       │   │   ├── user.ts
│       │   │   ├── job.ts
│       │   │   └── chat.ts
│       │   └── index.ts
│       ├── package.json
│       ├── tsconfig.json
│       ├── Dockerfile
│       └── captain-definition
│
├── packages/                    # 📦 Shared Packages
│   ├── ui/                     # Shared UI Components
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   └── Modal.tsx
│   │   │   ├── hooks/
│   │   │   └── utils/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── types/                  # Shared TypeScript Types
│   │   ├── src/
│   │   │   ├── job.ts
│   │   │   ├── user.ts
│   │   │   ├── chat.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── utils/                  # Shared Utilities
│   │   ├── src/
│   │   │   ├── validation.ts
│   │   │   ├── formatting.ts
│   │   │   └── constants.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── config/                 # Shared Configurations
│       ├── src/
│       │   ├── eslint/
│       │   ├── typescript/
│       │   └── tailwind/
│       ├── package.json
│       └── tsconfig.json
│
├── tools/                      # 🛠️ Development Tools
│   ├── eslint-config/
│   │   ├── index.js
│   │   └── package.json
│   ├── typescript-config/
│   │   ├── base.json
│   │   ├── nextjs.json
│   │   ├── react-native.json
│   │   └── package.json
│   └── tailwind-config/
│       ├── index.js
│       └── package.json
│
├── docs/                       # 📚 Documentation
│   ├── api/
│   ├── deployment/
│   ├── development/
│   └── README.md
│
├── .github/                    # 🔄 CI/CD
│   └── workflows/
│       ├── deploy-api.yml
│       ├── deploy-web.yml
│       └── deploy-mobile.yml
│
├── package.json                # Root package.json
├── pnpm-workspace.yaml         # Workspace configuration
├── turbo.json                  # Turborepo configuration
├── .gitignore
└── README.md
```

---

## 🔗 API Endpoints Structure

```typescript
// API Routes (neeiz-api/src/routes/)
├── /api/auth/
│   ├── POST /line-login          # LINE Login
│   ├── GET /profile              # Get user profile
│   ├── PUT /profile              # Update profile
│   └── POST /logout              # Logout
│
├── /api/jobs/
│   ├── GET /search               # Search jobs
│   ├── GET /:id                  # Get job details
│   ├── POST /create              # Create job (employer)
│   ├── PUT /:id                  # Update job (employer)
│   └── DELETE /:id               # Delete job (employer)
│
├── /api/applications/
│   ├── POST /apply               # Apply for job
│   ├── GET /my-applications      # Get my applications
│   ├── GET /job/:jobId           # Get applications for job
│   ├── PUT /:id/status           # Update application status
│   └── DELETE /:id               # Cancel application
│
├── /api/chat/
│   ├── GET /conversations        # Get chat conversations
│   ├── GET /:conversationId      # Get conversation details
│   ├── POST /:conversationId     # Send message
│   └── PUT /:conversationId/read # Mark as read
│
├── /api/companies/
│   ├── GET /profile              # Get company profile
│   ├── PUT /profile              # Update company profile
│   ├── POST /logo                # Upload company logo
│   └── GET /:id                  # Get company details
│
└── /api/analytics/
    ├── GET /jobs/views           # Job view analytics
    ├── GET /applications/stats   # Application statistics
    └── GET /chat/activity        # Chat activity metrics
```

---

## 🎯 User Flow Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Landing Page  │    │   Authentication │    │   Role Routing  │
│   (SEO Optimized)│   │   (LINE Login)   │    │   (User Type)   │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                       │                       │
          ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Job Seekers   │    │    Employers    │    │   Chat System   │
│   Flow          │    │    Flow         │    │   (Real-time)   │
│                 │    │                 │    │                 │
│ • Browse Jobs   │    │ • Post Jobs     │    │ • Messages      │
│ • Apply Jobs    │    │ • Manage Apps   │    │ • Notifications │
│ • Track Apps    │    │ • Analytics     │    │ • File Sharing  │
│ • Chat          │    │ • Chat          │    │ • Read Status   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 📊 Database Schema

```sql
-- Users Table
users (
  id UUID PRIMARY KEY,
  line_user_id VARCHAR,
  email VARCHAR,
  name VARCHAR,
  role ENUM('jobseeker', 'employer'),
  profile_image VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Companies Table
companies (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name VARCHAR,
  description TEXT,
  logo_url VARCHAR,
  website VARCHAR,
  location VARCHAR,
  created_at TIMESTAMP
)

-- Jobs Table
jobs (
  id UUID PRIMARY KEY,
  company_id UUID REFERENCES companies(id),
  title VARCHAR,
  description TEXT,
  requirements TEXT,
  salary_min INTEGER,
  salary_max INTEGER,
  location VARCHAR,
  job_type ENUM('fulltime', 'parttime', 'contract'),
  status ENUM('active', 'inactive', 'closed'),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Applications Table
applications (
  id UUID PRIMARY KEY,
  job_id UUID REFERENCES jobs(id),
  user_id UUID REFERENCES users(id),
  resume_url VARCHAR,
  cover_letter TEXT,
  status ENUM('pending', 'reviewed', 'accepted', 'rejected'),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Chat Conversations Table
conversations (
  id UUID PRIMARY KEY,
  job_id UUID REFERENCES jobs(id),
  employer_id UUID REFERENCES users(id),
  jobseeker_id UUID REFERENCES users(id),
  created_at TIMESTAMP
)

-- Chat Messages Table
messages (
  id UUID PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id),
  sender_id UUID REFERENCES users(id),
  content TEXT,
  message_type ENUM('text', 'image', 'file'),
  file_url VARCHAR,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP
)
```

---

## 🚀 Deployment Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   GitHub        │    │   Firebase      │    │   Domain        │
│   Repository    │    │   Platform      │    │   (DNS)         │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                       │                       │
          ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   GitHub        │    │   Firebase      │    │   Users         │
│   Actions       │    │   Services      │    │   Access        │
│   (CI/CD)       │    │                 │    │                 │
│                 │    │ • Hosting       │    │ • Web Platform  │
│ • Build         │    │ • Functions     │    │ • Mobile App    │
│ • Test          │    │ • Firestore     │    │ • API Access    │
│ • Deploy        │    │ • Storage       │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **Deployment URLs:**
- **Web Platform**: `https://<your-firebase-project-id>.web.app`
- **API**: Deployed as Firebase Functions

---

## 🔧 Technology Stack

### **Frontend:**
- **Web**: Next.js 14, TypeScript, Tailwind CSS
- **Mobile**: React Native, Expo, TypeScript
- **State Management**: Zustand / Redux Toolkit
- **UI Components**: Shadcn/ui, React Native Elements

### **Backend:**
- **Runtime**: Node.js 20, TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL / Firebase Firestore
- **Authentication**: Firebase Admin SDK, LINE Login
- **Real-time**: Socket.io / Firebase Realtime Database

### **DevOps:**
- **Containerization**: Docker
- **Platform**: Firebase
- **CI/CD**: GitHub Actions
- **Package Manager**: pnpm
- **Monorepo**: Turborepo

### **Third-party Services:**
- **Authentication**: LINE Login
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Analytics**: Google Analytics
- **Monitoring**: Sentry

---

## 📱 User Roles & Features

### **Job Seekers:**
- ✅ Browse and search jobs
- ✅ Apply for jobs
- ✅ Track application status
- ✅ Chat with employers
- ✅ Manage profile and resume
- ✅ Receive job notifications

### **Employers:**
- ✅ Post job listings
- ✅ Manage applications
- ✅ Chat with candidates
- ✅ View analytics and reports
- ✅ Manage company profile
- ✅ Receive application notifications

### **Admin Features:**
- ✅ User management
- ✅ Job moderation
- ✅ Analytics dashboard
- ✅ System monitoring
- ✅ Content management

---

## 🔒 Security & Privacy

### **Authentication:**
- LINE Login integration
- JWT token management
- Role-based access control
- Session management

### **Data Protection:**
- HTTPS encryption
- Input validation
- SQL injection prevention
- XSS protection
- Rate limiting

### **Compliance:**
- GDPR compliance
- Data retention policies
- Privacy policy
- Terms of service

---

## 📈 Performance & Scalability

### **Performance:**
- Server-side rendering (SSR)
- Static site generation (SSG)
- Image optimization
- Code splitting
- Lazy loading

### **Scalability:**
- Microservices architecture
- Load balancing
- Caching strategies
- Database optimization
- CDN integration

---

## 🧪 Testing Strategy

### **Unit Testing:**
- Jest for JavaScript/TypeScript
- React Testing Library
- API endpoint testing

### **Integration Testing:**
- End-to-end testing with Playwright
- API integration tests
- Database integration tests

### **Performance Testing:**
- Load testing with Artillery
- Lighthouse CI
- Bundle size monitoring

---

## 📚 Documentation

### **Developer Documentation:**
- API documentation (Swagger/OpenAPI)
- Component library
- Setup guides
- Deployment guides

### **User Documentation:**
- User guides
- FAQ
- Video tutorials
- Help center

---

## 🚀 Getting Started

### **Prerequisites:**
- Node.js 20+
- pnpm
- Docker
- Git

### **Development Setup:**
```bash
# Clone repository
git clone https://github.com/your-org/neeiz.git
cd neeiz

# Install dependencies
pnpm install

# Start development servers
pnpm dev:web      # Start web platform
pnpm dev:mobile   # Start mobile app
pnpm dev:api      # Start API server
```

### **Production Deployment:**
```bash
# Deploy to Firebase
firebase deploy
```

---

## 🤝 Contributing

### **Development Workflow:**
1. Create feature branch
2. Make changes
3. Write tests
4. Submit pull request
5. Code review
6. Merge to main

### **Code Standards:**
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Conventional commits
- Semantic versioning

---

## 📞 Support

### **Contact Information:**
- **Email**: support@neeiz.com
- **Documentation**: https://docs.neeiz.com
- **Issues**: GitHub Issues
- **Discord**: Neeiz Community

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Last updated: August 2024* 