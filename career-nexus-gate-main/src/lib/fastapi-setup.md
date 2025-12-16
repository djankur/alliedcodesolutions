# FastAPI Backend Setup Guide

This document explains how to set up your FastAPI backend to work with this TalentConnect frontend.

## Frontend API Configuration

The frontend is configured to connect to your FastAPI backend at:
- **Development**: `http://localhost:8000` (default)
- **Production**: Set `VITE_API_URL` environment variable

## Required FastAPI Endpoints

Based on the frontend implementation, your FastAPI backend should provide these endpoints:

### Authentication Endpoints
```python
POST /auth/login          # Login with email/password
POST /auth/register       # Register new user
POST /auth/logout         # Logout user
GET  /auth/me            # Get current user info
POST /auth/refresh       # Refresh JWT token
POST /auth/forgot-password # Password reset request
POST /auth/reset-password  # Password reset confirmation
```

### Job Management Endpoints
```python
GET    /jobs                    # Get jobs with filters/pagination
GET    /jobs/{job_id}          # Get specific job
POST   /jobs                   # Create new job (employers only)
PUT    /jobs/{job_id}          # Update job (job owner only)
DELETE /jobs/{job_id}          # Delete job (job owner only)
GET    /jobs/my-jobs           # Get employer's jobs
GET    /jobs/featured          # Get featured jobs
GET    /jobs/search            # Search jobs
POST   /jobs/{job_id}/apply    # Apply for job
GET    /jobs/{job_id}/applications  # Get job applications (employer only)
```

### Application Management
```python
GET   /applications/my-applications     # Get user's applications
PATCH /applications/{app_id}           # Update application status
```

### Contact Endpoints
```python
POST /contact/submit                   # Submit contact form
POST /contact/newsletter/subscribe     # Newsletter subscription
POST /contact/newsletter/unsubscribe   # Newsletter unsubscribe
POST /contact/callback-request         # Request callback
POST /contact/consultation-request     # Request consultation
```

### Payment Endpoints (Optional)
```python
POST /payments/create-intent          # Create payment intent
POST /payments/confirm               # Confirm payment
GET  /payments/plans                 # Get pricing plans
POST /payments/subscriptions/create  # Create subscription
GET  /payments/subscriptions/current # Get current subscription
```

## Example FastAPI Models

```python
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from enum import Enum

class UserType(str, Enum):
    JOB_SEEKER = "job_seeker"
    EMPLOYER = "employer"

class JobType(str, Enum):
    FULL_TIME = "full_time"
    PART_TIME = "part_time"
    CONTRACT = "contract"
    REMOTE = "remote"

class ExperienceLevel(str, Enum):
    ENTRY = "entry"
    MID = "mid"
    SENIOR = "senior"
    EXECUTIVE = "executive"

# User Models
class UserCreate(BaseModel):
    email: str
    password: str
    full_name: str
    user_type: UserType
    company_name: Optional[str] = None

class User(BaseModel):
    id: str
    email: str
    full_name: str
    user_type: UserType
    company_name: Optional[str] = None
    is_active: bool
    created_at: datetime

# Job Models
class JobCreate(BaseModel):
    title: str
    company_name: str
    location: str
    job_type: JobType
    experience_level: ExperienceLevel
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None
    currency: str = "USD"
    description: str
    requirements: List[str]
    benefits: List[str]
    skills: List[str]
    application_deadline: Optional[datetime] = None

class Job(JobCreate):
    id: str
    employer_id: str
    is_active: bool = True
    posted_date: datetime

# Contact Models
class ContactFormData(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None
    subject: str
    message: str
    user_type: str
```

## CORS Configuration

Make sure to configure CORS in your FastAPI app:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",  # Lovable development
        "https://yourdomain.lovable.app",  # Your production domain
        "https://yourcustomdomain.com"  # Custom domain if you have one
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## JWT Authentication

The frontend expects JWT tokens in this format:

```python
# Login response should return:
{
    "access_token": "your-jwt-token",
    "token_type": "bearer",
    "user": {
        "id": "user-id",
        "email": "user@example.com",
        "full_name": "User Name",
        "user_type": "job_seeker",
        # ... other user fields
    }
}
```

## File Upload Support

For resume uploads and other files:

```python
from fastapi import File, UploadFile

@app.post("/jobs/{job_id}/apply")
async def apply_for_job(
    job_id: str,
    file: UploadFile = File(...),
    cover_letter: Optional[str] = Form(None)
):
    # Handle file upload and application creation
    pass
```

## Error Handling

Return errors in this format for consistency with the frontend:

```python
from fastapi import HTTPException

# For validation errors
raise HTTPException(
    status_code=400,
    detail="Validation error message"
)

# For not found
raise HTTPException(
    status_code=404,
    detail="Resource not found"
)

# For unauthorized
raise HTTPException(
    status_code=401,
    detail="Authentication required"
)
```

## Environment Variables

Set these in your FastAPI environment:

```bash
# Database
DATABASE_URL=postgresql://user:pass@localhost/talentconnect

# JWT
JWT_SECRET_KEY=your-secret-key
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=30

# Email (for contact forms)
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Optional: Payment processing
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## Getting Started

1. Create your FastAPI project
2. Implement the required endpoints above
3. Configure CORS for your frontend domain
4. Set up JWT authentication
5. Add database models and migrations
6. Test the integration with the frontend

The frontend will automatically work with your FastAPI backend once these endpoints are implemented!