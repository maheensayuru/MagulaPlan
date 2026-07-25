

## Base URL:`/api/v1`

---

**1. Vendor Directory**

**GET `/vendors**`

* **Description:** Retrieves a list of all vendors. Can accept query parameters for filtering (e.g., `?category=Photography&location=Colombo`).
* **Request Payload:** None
* **Response Payload (200 OK):**

```json
[
  {
    "vendorId": 1,
    "categoryId": 2,
    "businessName": "Studio Elegance",
    "districtLocation": "Colombo",
    "contactPhone": "0771122334",
    "startingPrice": 150000.00
  }
]

```

**GET `/vendors/{vendorId}**`

* **Description:** Retrieves the full profile of a specific vendor.
* **Request Payload:** None
* **Response Payload (200 OK):**

```json
{
  "vendorId": 1,
  "categoryId": 2,
  "businessName": "Studio Elegance",
  "description": "Premium wedding photography and videography.",
  "districtLocation": "Colombo",
  "contactPhone": "0771122334",
  "contactEmail": "info@studioelegance.lk",
  "startingPrice": 150000.00
}

```

---

#### **2. Budget Tracker**

**GET `/budget/items**`

* **Description:** Retrieves all budget items for the authenticated user's wedding.
* **Request Payload:** None
* **Response Payload (200 OK):**

```json
[
  {
    "budgetId": 101,
    "itemName": "Photography Package",
    "category": "Photography",
    "estimatedCost": 150000.00,
    "actualCost": 150000.00,
    "depositPaid": 50000.00,
    "status": "Deposit Paid"
  }
]

```

**POST `/budget/items**`

* **Description:** Adds a new expense item to the budget tracker.
* **Request Payload:**

```json
{
  "itemName": "Photography Package",
  "category": "Photography",
  "estimatedCost": 150000.00,
  "depositPaid": 50000.00,
  "status": "Deposit Paid"
}

```

* **Response Payload (201 Created):**

```json
{
  "budgetId": 101,
  "message": "Budget item created successfully"
}

```

---

#### **3. Guest List & RSVP Manager**

**GET `/guests**`

* **Description:** Retrieves the full guest list for the authenticated user.
* **Request Payload:** None
* **Response Payload (200 OK):**

```json
[
  {
    "guestId": "550e8400-e29b-41d4-a716-446655440000",
    "guestName": "Kamal Perera",
    "contactNumber": "0779988776",
    "sideOfFamily": "Bride",
    "rsvpStatus": "Pending",
    "whatsappStatus": "Not Sent",
    "plusOnes": 1,
    "mealPreference": "Veg"
  }
]

```

**POST `/guests**`

* **Description:** Adds a new guest to the database and generates their unique UUID.
* **Request Payload:**

```json
{
  "guestName": "Kamal Perera",
  "contactNumber": "0779988776",
  "sideOfFamily": "Bride",
  "plusOnes": 1,
  "mealPreference": "Veg"
}

```

* **Response Payload (201 Created):**

```json
{
  "guestId": "550e8400-e29b-41d4-a716-446655440000",
  "message": "Guest added successfully",
  "rsvpStatus": "Pending",
  "whatsappStatus": "Not Sent"
}

```

**PUT `/guests/{guestId}/rsvp**`

* **Description:** Updates the RSVP status of a specific guest (usually called when the guest clicks their WhatsApp link).
* **Request Payload:**

```json
{
  "rsvpStatus": "Attending"
}

```

* **Response Payload (200 OK):**

```json
{
  "guestId": "550e8400-e29b-41d4-a716-446655440000",
  "message": "RSVP updated to Attending"
}

