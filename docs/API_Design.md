# MagulaPlan REST API Specification

**Base URL:** `/api/v1`  
**Protocol:** HTTPS  
**Authentication:** Bearer Session Token (`Authorization: Bearer <token>`)

---

## 1. Authentication & User Management

### 1.1 User Registration
- **Endpoint:** `POST /api/v1/auth/register`
- **Auth Required:** No
- **Request Payload:**
```json
{
  "email": "couple@example.lk",
  "password": "Password@123",
  "fullName": "Kasun & Sandani",
  "partnerName": "Sandani Silva",
  "phoneNumber": "0771234567",
  "weddingDate": "2027-02-14",
  "totalBudget": 3500000.00
}
```
- **Response Payload (201 Created):**
```json
{
  "userId": 1,
  "token": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
  "email": "couple@example.lk",
  "fullName": "Kasun & Sandani",
  "role": "USER"
}
```

### 1.2 User Login
- **Endpoint:** `POST /api/v1/auth/login`
- **Auth Required:** No
- **Request Payload:**
```json
{
  "email": "couple@example.lk",
  "password": "Password@123"
}
```
- **Response Payload (200 OK):**
```json
{
  "userId": 1,
  "token": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
  "email": "couple@example.lk",
  "fullName": "Kasun & Sandani",
  "role": "USER"
}
```

### 1.3 Get Current User Profile
- **Endpoint:** `GET /api/v1/users/me`
- **Auth Required:** Yes (Bearer Token)
- **Response Payload (200 OK):**
```json
{
  "userId": 1,
  "email": "couple@example.lk",
  "fullName": "Kasun & Sandani",
  "partnerName": "Sandani Silva",
  "phoneNumber": "0771234567",
  "weddingDate": "2027-02-14",
  "totalBudget": 3500000.00,
  "role": "USER"
}
```

### 1.4 Update Current User Profile
- **Endpoint:** `PUT /api/v1/users/me`
- **Auth Required:** Yes (Bearer Token)
- **Request Payload:**
```json
{
  "fullName": "Kasun & Sandani",
  "partnerName": "Sandani Silva",
  "phoneNumber": "0771234567",
  "weddingDate": "2027-02-14",
  "totalBudget": 3800000.00
}
```
- **Response Payload (200 OK):**
```json
{
  "userId": 1,
  "message": "User updated successfully"
}
```

---

## 2. Vendor Directory & Marketplace

### 2.1 Get Approved Vendors
- **Endpoint:** `GET /api/v1/vendors`
- **Auth Required:** No
- **Query Params:** `?search=Studio&district=Colombo&categoryId=2`
- **Response Payload (200 OK):**
```json
[
  {
    "vendorId": 1,
    "categoryId": 2,
    "categoryName": "Photography & Videography",
    "businessName": "Studio 3000DF",
    "districtLocation": "Colombo",
    "contactPhone": "0732345678",
    "contactEmail": "info@studio3000df.com",
    "startingPrice": 35000.00,
    "imageUrl": "https://images.unsplash.com/photo-1537633552985-df8429e8048b",
    "rating": 4.9,
    "reviewCount": 210,
    "verified": true,
    "featured": true,
    "status": "APPROVED"
  }
]
```

### 2.2 Vendor Self-Registration
- **Endpoint:** `POST /api/v1/vendors`
- **Auth Required:** No
- **Request Payload:**
```json
{
  "categoryId": 1,
  "businessName": "Grand Ballroom Ceylon",
  "districtLocation": "Colombo",
  "contactPhone": "0771234567",
  "contactEmail": "weddings@grandballroom.lk",
  "startingPrice": 250000.00,
  "imageUrl": "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
  "description": "Luxury 5-star wedding venue with panoramic ballroom."
}
```
- **Response Payload (201 Created):**
```json
{
  "vendorId": 14,
  "status": "PENDING",
  "message": "Registration submitted for admin review."
}
```

---

## 3. Budget Tracker & Financial Analytics

### 3.1 Get Budget Items for User
- **Endpoint:** `GET /api/v1/budget-items`
- **Auth Required:** Yes (Bearer Token)
- **Response Payload (200 OK):**
```json
[
  {
    "budgetItemId": 1,
    "itemName": "Grand Ballroom Deposit",
    "category": "Venues & Reception Halls",
    "estimatedCost": 350000.00,
    "actualCost": 350000.00,
    "depositPaid": 100000.00,
    "status": "Deposit Paid"
  }
]
```

### 3.2 Add Budget Item
- **Endpoint:** `POST /api/v1/budget-items`
- **Auth Required:** Yes (Bearer Token)
- **Request Payload:**
```json
{
  "userId": 1,
  "itemName": "Floral Poruwa Arch",
  "category": "Floral & Poruwa Decor",
  "estimatedCost": 75000.00,
  "actualCost": 75000.00,
  "depositPaid": 25000.00,
  "status": "Planned"
}
```
- **Response Payload (201 Created):**
```json
{
  "budgetItemId": 2,
  "itemName": "Floral Poruwa Arch",
  "status": "Planned"
}
```

### 3.3 Get Financial Budget Summary
- **Endpoint:** `GET /api/v1/budget-items/summary/{userId}`
- **Auth Required:** Yes (Bearer Token)
- **Response Payload (200 OK):**
```json
{
  "totalBudget": 3500000.00,
  "totalEstimated": 1250000.00,
  "totalActual": 950000.00,
  "totalDepositPaid": 450000.00,
  "remainingBudget": 2250000.00
}
```

---

## 4. Guest List, RSVP & Digital Invitations

### 4.1 Get All Guests
- **Endpoint:** `GET /api/v1/guests`
- **Auth Required:** Yes (Bearer Token)
- **Response Payload (200 OK):**
```json
[
  {
    "guestId": "a123e456-e89b-12d3-a456-426614174000",
    "guestName": "Nadeesha Gunawardena",
    "contactNumber": "0771234567",
    "sideOfFamily": "Bride",
    "rsvpStatus": "Attending",
    "whatsappStatus": "SENT",
    "plusOnes": 1,
    "mealPreference": "Non-Veg"
  }
]
```

### 4.2 Generate Shareable Digital Invitation
- **Endpoint:** `GET /api/v1/guests/{guestId}/share`
- **Auth Required:** Yes (Bearer Token)
- **Response Payload (200 OK):**
```json
{
  "guestName": "Nadeesha Gunawardena",
  "rsvpUrl": "https://magulaplan.netlify.app/rsvp/a123e456-e89b-12d3-a456-426614174000",
  "title": "Wedding Invitation — Kasun & Sandani",
  "message": "Dear Nadeesha Gunawardena, Kasun & Sandani invite you to celebrate their wedding day! Please confirm your attendance here:",
  "whatsappStatus": "SENT"
}
```

### 4.3 Update Guest RSVP Status
- **Endpoint:** `PATCH /api/v1/guests/{guestId}/rsvp`
- **Auth Required:** Yes
- **Request Payload:**
```json
{
  "rsvpStatus": "Attending"
}
```
- **Response Payload (200 OK):**
```json
{
  "guestId": "a123e456-e89b-12d3-a456-426614174000",
  "rsvpStatus": "Attending"
}
```

---

## 5. Multi-Vendor Commerce & Cart Checkout

### 5.1 Finalize Booking Checkout
- **Endpoint:** `POST /api/v1/bookings/checkout`
- **Auth Required:** Yes (Bearer Token)
- **Request Payload:**
```json
{
  "userId": 1,
  "vendorIds": [1, 3, 7]
}
```
- **Response Payload (201 Created):**
```json
[
  {
    "bookingId": 101,
    "vendorId": 1,
    "vendorName": "Studio 3000DF",
    "status": "CONFIRMED",
    "bookedAt": "2026-09-01T12:00:00"
  }
]
```
