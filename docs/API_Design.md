# MagulaPlan REST API Specification

**Base URL:** `/api/v1`  
**Protocol:** HTTPS  
**Authentication:** Bearer Session Token (`Authorization: Bearer <sessionToken>`)  
**Security Roles:** `ROLE_USER` (Couples), `ROLE_VENDOR` (Commercial Vendors), `ROLE_ADMIN` (Administrators)

---

## 1. Authentication & User Management

### 1.1 User / Couple Registration
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
  "token": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
  "userId": 1,
  "fullName": "Kasun & Sandani",
  "email": "couple@example.lk",
  "role": "USER"
}
```

### 1.2 User Login (All Roles)
- **Endpoint:** `POST /api/v1/auth/login`
- **Auth Required:** No
- **Request Payload:**
```json
{
  "email": "admin@magulaplan.lk",
  "password": "Admin@123"
}
```
- **Response Payload (200 OK):**
```json
{
  "token": "d7e8f9a0-b1c2-3d4e-5f6a-7b8c9d0e1f2a",
  "userId": 1,
  "fullName": "MagulaPlan Admin",
  "email": "admin@magulaplan.lk",
  "role": "ADMIN"
}
```
*Note:* The endpoint automatically trims leading/trailing whitespace and performs case-insensitive matching (`findByEmailIgnoreCase`). Password hashes are evaluated against BCrypt.

### 1.3 Get Authenticated Profile
- **Endpoint:** `GET /api/v1/users/me`
- **Auth Required:** Yes (`ROLE_USER`, `ROLE_VENDOR`, `ROLE_ADMIN`)
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

### 1.4 Update Authenticated Profile
- **Endpoint:** `PUT /api/v1/users/me`
- **Auth Required:** Yes
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

## 2. Vendor Directory & Commercial Marketplace

### 2.1 Get Approved Vendors (Public Directory)
- **Endpoint:** `GET /api/v1/vendors`
- **Auth Required:** No
- **Response Payload (200 OK):**
```json
[
  {
    "vendorId": 3,
    "categoryId": 2,
    "categoryName": "Photography",
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
    "status": "APPROVED",
    "subscriptionTier": "FEATURED",
    "paymentStatus": "PAID"
  }
]
```

### 2.2 Search & Filter Vendors
- **Endpoint:** `GET /api/v1/vendors/search`
- **Auth Required:** No
- **Query Params:** `?search=Studio&district=Colombo&minPrice=10000&maxPrice=50000&page=0&size=10`
- **Response Payload (200 OK):** Pageable JSON response with matching approved vendors.

### 2.3 Vendor Self-Registration & Plan Selection
- **Endpoint:** `POST /api/v1/vendors`
- **Auth Required:** No (Public self-registration permitted)
- **Validation Constraints:** `@NotBlank` on `businessName`, `districtLocation`, `contactPhone`; `@NotNull` on `categoryId`; `@Email` on `contactEmail`.
- **Request Payload:**
```json
{
  "categoryId": 2,
  "businessName": "Royal Ceylon Photography",
  "districtLocation": "Colombo",
  "contactPhone": "0771234567",
  "contactEmail": "royal@ceylon.lk",
  "startingPrice": 75000.00,
  "imageUrl": "https://images.unsplash.com/photo-1537633552985-df8429e8048b",
  "description": "Premier wedding photography studio in Colombo. Specializing in Kandyan weddings.",
  "subscriptionTier": "PRO",
  "paymentStatus": "PAID",
  "password": "VendorSecret@123"
}
```
- **Response Payload (201 Created):**
```json
{
  "vendorId": 14,
  "categoryId": 2,
  "categoryName": "Photography",
  "businessName": "Royal Ceylon Photography",
  "districtLocation": "Colombo",
  "contactPhone": "0771234567",
  "contactEmail": "royal@ceylon.lk",
  "startingPrice": 75000.00,
  "imageUrl": "https://images.unsplash.com/photo-1537633552985-df8429e8048b",
  "rating": null,
  "reviewCount": 0,
  "verified": true,
  "featured": false,
  "status": "PENDING",
  "subscriptionTier": "PRO",
  "paymentStatus": "PAID",
  "userId": 5,
  "sessionToken": "b4e2f1a9-8c3d-4e5f-9a1b-2c3d4e5f6a7b"
}
```
*Note:* Automatically creates a `User` account with `ROLE_VENDOR` if `password` is provided, returning `sessionToken` for instant client-side authentication.

### 2.4 Get Authenticated Vendor Listing
- **Endpoint:** `GET /api/v1/vendors/me`
- **Auth Required:** Yes (`ROLE_VENDOR` or owning user)
- **Response Payload (200 OK):** The authenticated vendor's full business profile.

### 2.5 Update Vendor Listing (IDOR Protected)
- **Endpoint:** `PUT /api/v1/vendors/{vendorId}`
- **Auth Required:** Yes (Owner of `vendorId` or `ROLE_ADMIN`)
- **Access Control:** Non-admin callers who do not own the vendor receive `403 Forbidden`.
- **Request Payload:**
```json
{
  "categoryId": 2,
  "businessName": "Royal Ceylon Photography",
  "districtLocation": "Colombo",
  "contactPhone": "0779998888",
  "contactEmail": "royal@ceylon.lk",
  "startingPrice": 85000.00,
  "imageUrl": "https://images.unsplash.com/photo-1537633552985-df8429e8048b",
  "description": "Updated portfolio description.",
  "subscriptionTier": "FEATURED"
}
```
- **Response Payload (200 OK):** Updated `VendorResponseDto`.

### 2.6 Delete Vendor Listing
- **Endpoint:** `DELETE /api/v1/vendors/{vendorId}`
- **Auth Required:** Yes (Owner or `ROLE_ADMIN`)
- **Response Payload (204 No Content)**

---

## 3. Budget Tracker & Financial Analytics (IDOR Scoped)

### 3.1 Get Budget Items for User
- **Endpoint:** `GET /api/v1/budget-items`
- **Auth Required:** Yes (`ROLE_USER`)
- **Isolation Rule:** Authenticated non-admin callers automatically receive **only their own** budget items.
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
    "status": "Deposit Paid",
    "userId": 1
  }
]
```

### 3.2 Add Budget Item
- **Endpoint:** `POST /api/v1/budget-items`
- **Auth Required:** Yes
- **Isolation Rule:** Caller's user ID from `SecurityContextHolder` overrides client-supplied `userId`.
- **Request Payload:**
```json
{
  "itemName": "Floral Poruwa Arch",
  "category": "Floral & Poruwa Decor",
  "estimatedCost": 75000.00,
  "actualCost": 75000.00,
  "depositPaid": 25000.00,
  "status": "Planned"
}
```
- **Response Payload (201 Created)**

### 3.3 Update / Delete Budget Item
- **Endpoint:** `PUT /api/v1/budget-items/{budgetItemId}` / `DELETE /api/v1/budget-items/{budgetItemId}`
- **Auth Required:** Yes (Owner or Admin)
- **Access Control:** Unauthorized modification returns `403 Forbidden`.

---

## 4. Guest List, RSVP & Digital Invitations (IDOR Scoped)

### 4.1 Get All Guests for User
- **Endpoint:** `GET /api/v1/guests`
- **Auth Required:** Yes (`ROLE_USER`)
- **Isolation Rule:** Scoped to caller's `user_id`. Non-admin users cannot view other couples' guests.

### 4.2 Generate Shareable Digital Invitation
- **Endpoint:** `GET /api/v1/guests/{guestId}/share`
- **Auth Required:** Yes
- **Response Payload (200 OK):**
```json
{
  "title": "Wedding Invitation",
  "message": "You're invited! Kasun & Sandani request the pleasure of your company at our wedding. Please RSVP here: https://magulaplan.com/rsvp/a123e456-e89b-12d3-a456-426614174000",
  "rsvpUrl": "https://magulaplan.com/rsvp/a123e456-e89b-12d3-a456-426614174000",
  "guestName": "Nadeesha Gunawardena",
  "whatsappStatus": "SENT"
}
```

---

## 5. Multi-Vendor Commerce & Lead Pipeline

### 5.1 Finalize Booking Cart Checkout
- **Endpoint:** `POST /api/v1/bookings/checkout`
- **Auth Required:** Yes (`ROLE_USER`)
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
    "userId": 1,
    "vendorId": 3,
    "vendorName": "Studio 3000DF",
    "status": "PENDING",
    "bookedAt": "2026-09-02T12:00:00",
    "customerName": "Kasun & Sandani",
    "customerEmail": "couple@example.lk",
    "customerPhone": "0771234567"
  }
]
```

### 5.2 Get Vendor Booking Inquiries & Leads
- **Endpoint:** `GET /api/v1/bookings/vendor/{vendorId}`
- **Auth Required:** Yes (`ROLE_VENDOR` owning `vendorId` or `ROLE_ADMIN`)
- **Response Payload (200 OK):**
```json
[
  {
    "bookingId": 101,
    "userId": 1,
    "vendorId": 3,
    "vendorName": "Studio 3000DF",
    "status": "PENDING",
    "bookedAt": "2026-09-02T12:00:00",
    "customerName": "Kasun & Sandani",
    "customerEmail": "couple@example.lk",
    "customerPhone": "0771234567"
  }
]
```

---

## 6. Platform Administration & Governance (`ROLE_ADMIN`)

### 6.1 Platform Overview KPI Metrics
- **Endpoint:** `GET /api/v1/admin/stats`
- **Auth Required:** Yes (`ROLE_ADMIN`)
- **Response Payload (200 OK):**
```json
{
  "totalVendors": 14,
  "totalUsers": 28,
  "pendingApprovals": 2,
  "totalBookings": 45
}
```

### 6.2 Pending Vendor Moderation Queue
- **Endpoint:** `GET /api/v1/admin/vendors/pending`
- **Auth Required:** Yes (`ROLE_ADMIN`)
- **Response Payload (200 OK):** Array of vendors with status `PENDING`.

### 6.3 Approve Vendor Listing
- **Endpoint:** `PUT /api/v1/admin/vendors/{vendorId}/approve`
- **Auth Required:** Yes (`ROLE_ADMIN`)
- **Action:** Sets `status = "APPROVED"` and `verified = true`, publishing the business to the public directory.

### 6.4 Reject Vendor Listing
- **Endpoint:** `PUT /api/v1/admin/vendors/{vendorId}/reject`
- **Auth Required:** Yes (`ROLE_ADMIN`)
- **Action:** Sets `status = "REJECTED"`, excluding the business from search.

### 6.5 User Management & Account Suspension
- **Endpoint:** `GET /api/v1/admin/users` (List all users)
- **Endpoint:** `PUT /api/v1/admin/users/{userId}/suspend` (Sets `isActive = false`)
- **Endpoint:** `PUT /api/v1/admin/users/{userId}/reinstate` (Sets `isActive = true`)
- **Auth Required:** Yes (`ROLE_ADMIN`)

---

## 7. Standard Error Responses

| Status Code | Scenario | Payload Structure |
|---|---|---|
| **`400 Bad Request`** | Jakarta Bean Validation Failure | `{"timestamp": "...", "message": "Business name is required; Contact phone is required", "fieldErrors": {"businessName": "...", "contactPhone": "..."}}` |
| **`401 Unauthorized`** | Missing or Invalid Session Token | `{"token": null, "userId": null, "fullName": null, "email": null, "role": null}` |
| **`403 Forbidden`** | Cross-Tenant IDOR Attempt or Insufficient Role | `{"timestamp": "...", "message": "You are not authorized to update this vendor listing"}` |
| **`404 Not Found`** | Resource Non-Existent | `{"timestamp": "...", "message": "Vendor not found with id: 99"}` |
| **`409 Conflict`** | Duplicate Registration Email | `{"message": "An account with this email already exists."}` |
