# FarmWork Connect

[![TypeScript](https://img.shields.io/badge/TypeScript-4.5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

> All-in-one agricultural services booking platform connecting farmers with labor, equipment, and rural services.

## System Architecture

`mermaid
graph TB
    subgraph "Client Layer"
        Web[React Web App]
        Mobile[Mobile Responsive]
    end

    subgraph "API Gateway"
        Express[Express.js Server]
        Auth[JWT Authentication]
        RateLimit[Rate Limiter]
    end

    subgraph "Business Logic"
        BookingService[Booking Service]
        PaymentService[Payment Service]
        NotificationService[Notification Service]
        SearchService[Search Service]
    end

    subgraph "Data Layer"
        MongoDB[(MongoDB)]
        Redis[(Redis Cache)]
        Stripe[Stripe API]
    end

    Web --> Express
    Mobile --> Express
    Express --> Auth
    Express --> RateLimit
    Express --> BookingService
    Express --> PaymentService
    Express --> NotificationService
    Express --> SearchService
    BookingService --> MongoDB
    PaymentService --> Stripe
    SearchService --> Redis
    NotificationService --> Email[Email Service]
`

## Database Schema

`mermaid
erDiagram
    USER {
        string id PK
        string name
        string email
        string phone
        string role
        date createdAt
    }
    
    SERVICE {
        string id PK
        string providerId FK
        string name
        string category
        float price
        string location
        float rating
    }
    
    BOOKING {
        string id PK
        string userId FK
        string serviceId FK
        date bookingDate
        string status
        float amount
    }
    
    REVIEW {
        string id PK
        string userId FK
        string serviceId FK
        int rating
        string comment
    }
    
    USER ||--o{ BOOKING : makes
    USER ||--o{ REVIEW : writes
    SERVICE ||--o{ BOOKING : has
    SERVICE ||--o{ REVIEW : receives
    USER ||--o{ SERVICE : provides
`

## Application Flow

`mermaid
flowchart TD
    Start([User Opens App]) --> Auth{New User?}
    Auth -->|Yes| Register[Register Account]
    Auth -->|No| Login[Login]
    Register --> Verify[Verify Email]
    Verify --> Dashboard
    Login --> Dashboard
    
    Dashboard --> Browse[Browse Services]
    Dashboard --> Post[Post Service]
    Dashboard --> MyBookings[My Bookings]
    
    Browse --> Search[Search & Filter]
    Search --> Select[Select Service]
    Select --> Book[Make Booking]
    Book --> Pay[Process Payment]
    Pay --> Confirm[Booking Confirmed]
    Confirm --> Notify[Send Notifications]
    
    Post --> FillForm[Fill Service Details]
    FillForm --> Publish[Publish Service]
    
    MyBookings --> Manage[Manage Bookings]
    Manage --> Cancel[Cancel] | Complete[Mark Complete] | Review[Leave Review]
`

## Project Structure

`
farmwork-connect/
├── client/                         # React Frontend
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   │   ├── common/           # Button, Card, Modal, etc.
│   │   │   ├── auth/             # Login, Register forms
│   │   │   ├── services/         # Service cards, lists
│   │   │   ├── bookings/         # Booking components
│   │   │   └── layout/           # Header, Footer, Sidebar
│   │   ├── pages/                # Route pages
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── ServiceDetail.tsx
│   │   │   ├── Bookings.tsx
│   │   │   └── Profile.tsx
│   │   ├── hooks/                # Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useBooking.ts
│   │   │   └── useDebounce.ts
│   │   ├── context/              # React Context
│   │   │   └── AuthContext.tsx
│   │   ├── services/             # API service calls
│   │   │   ├── api.ts
│   │   │   ├── authService.ts
│   │   │   └── bookingService.ts
│   │   ├── utils/                # Utility functions
│   │   ├── styles/               # CSS/SCSS files
│   │   ├── types/                # TypeScript types
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   └── tsconfig.json
│
├── server/                         # Node.js Backend
│   ├── src/
│   │   ├── config/               # Configuration
│   │   │   ├── database.ts
│   │   │   ├── stripe.ts
│   │   │   └── email.ts
│   │   ├── controllers/          # Route handlers
│   │   │   ├── authController.ts
│   │   │   ├── serviceController.ts
│   │   │   ├── bookingController.ts
│   │   │   └── paymentController.ts
│   │   ├── middleware/           # Custom middleware
│   │   │   ├── auth.ts
│   │   │   ├── validation.ts
│   │   │   └── errorHandler.ts
│   │   ├── models/              # Mongoose models
│   │   │   ├── User.ts
│   │   │   ├── Service.ts
│   │   │   ├── Booking.ts
│   │   │   └── Review.ts
│   │   ├── routes/              # API routes
│   │   │   ├── authRoutes.ts
│   │   │   ├── serviceRoutes.ts
│   │   │   ├── bookingRoutes.ts
│   │   │   └── paymentRoutes.ts
│   │   ├── services/            # Business logic
│   │   │   ├── authService.ts
│   │   │   ├── bookingService.ts
│   │   │   └── paymentService.ts
│   │   ├── utils/               # Helpers
│   │   │   ├── validators.ts
│   │   │   └── helpers.ts
│   │   └── app.ts               # Express app setup
│   ├── tests/                   # Test files
│   ├── package.json
│   └── tsconfig.json
│
├── docs/                          # Documentation
│   ├── API.md
│   ├── DEPLOYMENT.md
│   └── DATABASE.md
│
├── docker-compose.yml             # Docker setup
├── .env.example                   # Environment template
├── package.json                   # Root package.json
└── README.md
`

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React 18, TypeScript | UI components |
| **Styling** | Tailwind CSS, Material UI | Responsive design |
| **State** | React Context, React Query | State management |
| **Backend** | Node.js, Express | REST API |
| **Database** | MongoDB, Mongoose | Data storage |
| **Cache** | Redis | Session & query cache |
| **Auth** | JWT, bcrypt | Security |
| **Payments** | Stripe API | Payment processing |
| **Email** | Nodemailer, SendGrid | Notifications |
| **Deployment** | Docker, AWS/Heroku | Hosting |

## Installation

`ash
# Clone repository
git clone https://github.com/Jashwanth33/farmwork-connect.git
cd farmwork-connect

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Set up environment
cp ../.env.example ../.env
# Configure your .env file

# Start development
# Terminal 1 - Server
cd server && npm run dev

# Terminal 2 - Client
cd client && npm start
`

## API Reference

`yaml
Base URL: http://localhost:5000/api/v1

Endpoints:
  Authentication:
    POST /auth/register    - Register new user
    POST /auth/login       - Login user
    GET  /auth/me          - Get current user
    
  Services:
    GET    /services       - List all services
    POST   /services       - Create service
    GET    /services/:id   - Get service details
    PUT    /services/:id   - Update service
    DELETE /services/:id   - Delete service
    
  Bookings:
    GET    /bookings       - List user bookings
    POST   /bookings       - Create booking
    PUT    /bookings/:id   - Update booking status
    DELETE /bookings/:id   - Cancel booking
    
  Payments:
    POST /payments/create  - Create payment intent
    POST /payments/confirm - Confirm payment
`

## Contributing

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## License

Distributed under the MIT License. See LICENSE for more information.

## Author

**Jashwanth** - [GitHub](https://github.com/Jashwanth33) | [LinkedIn](https://linkedin.com/in/jashwanth)