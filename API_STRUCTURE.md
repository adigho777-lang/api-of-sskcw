# 🔥 SSKCW API Structure Documentation

Complete guide to all API endpoints, their parameters, and response formats.

---

## 📍 Base URL

**Production:** `https://sskcw-api.vercel.app/api`
**Local:** `http://localhost:3000/api`

---

## 🚀 API Endpoints Overview

| Endpoint | Method | Description | Use Case |
|----------|--------|-------------|----------|
| `/` | GET | API Info & Health Check | Check if API is running |
| `/products` | GET | List all products with filters | Product listing page |
| `/products/:id` | GET | Single product details | Product detail page |
| `/shop` | GET | Products with full details | Shop/Offers page |
| `/categories` | GET | All categories with stats | Category filter sidebar |
| `/stats` | GET | API statistics & analytics | Admin dashboard |
| `/orders` | POST | Create new order | Checkout process |
| `/leads` | POST | Create new lead | Contact form |

---

## 📋 Detailed Endpoint Documentation

### 1. 🏠 Root API - Health Check

**Endpoint:** `GET /api`

**Description:** Returns API status, version, available endpoints, and basic stats.

**Use Case:** Check if API is running and get endpoint information.

**Example Request:**
```bash
curl https://sskcw-api.vercel.app/api
```

**Example Response:**
```json
{
  "success": true,
  "message": "🔥 SSKCW PRO API - Next.js Edition",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "version": "2.0.0",
  "stats": {
    "total_products": 18,
    "total_categories": 5,
    "total_orders": 0,
    "total_leads": 0
  },
  "endpoints": {
    "products": {
      "list": "GET /api/products",
      "detail": "GET /api/products/:id",
      "shop": "GET /api/shop"
    },
    "categories": "GET /api/categories",
    "stats": "GET /api/stats",
    "orders": "POST /api/orders",
    "leads": "POST /api/leads"
  },
  "features": [
    "Full-text search",
    "Advanced filtering",
    "Dynamic sorting",
    "Smart pagination",
    "Rate limiting",
    "Security headers"
  ]
}
```

---

### 2. 📦 Products Listing

**Endpoint:** `GET /api/products`

**Description:** Returns list of products with basic info. Supports search, filtering, sorting, and pagination.

**Use Case:** Product listing page, search results, category pages.

**Query Parameters:**

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `search` | string | Search in title, description, tags, benefits | `?search=amrit` |
| `category` | string | Filter by category | `?category=Health%20Care` |
| `sub_category` | string | Filter by sub-category | `?sub_category=Immunity%20Booster` |
| `min_price` | number | Minimum price filter | `?min_price=500` |
| `max_price` | number | Maximum price filter | `?max_price=2000` |
| `in_stock` | boolean | Only show in-stock items | `?in_stock=true` |
| `has_discount` | boolean | Only show discounted items | `?has_discount=true` |
| `sort` | string | Sort field: `price`, `title`, `discount`, `created_at` | `?sort=price` |
| `order` | string | Sort order: `asc`, `desc` | `?order=asc` |
| `page` | number | Page number for pagination | `?page=1` |
| `limit` | number | Items per page | `?limit=10` |

**Example Requests:**
```bash
# All products
GET /api/products

# Search products
GET /api/products?search=amrit

# Filter by category with price range
GET /api/products?category=Health%20Care&min_price=500&max_price=2000

# Sort by price ascending, paginated
GET /api/products?sort=price&order=asc&page=1&limit=5

# Discounted products only
GET /api/products?has_discount=true
```

**Example Response:**
```json
{
  "success": true,
  "timestamp": "2024-01-01T12:00:00.000Z",
  "meta": {
    "total_products": 18,
    "filtered_count": 5,
    "returned_count": 5,
    "filters_applied": ["category", "has_discount"],
    "pagination": {
      "current_page": 1,
      "per_page": 10,
      "total_pages": 1,
      "has_next": false,
      "has_prev": false
    }
  },
  "products": [
    {
      "product_id": "prod_1774958390504",
      "title": "Riyansh Amrit Juice",
      "thumbnail": "https://example.com/image.jpg",
      "price": 1500,
      "original_price": 1850,
      "discount_price": 1500,
      "discount_percent": 19,
      "category": "Health Care",
      "sub_category": "Immunity Booster / Full Body Wellness",
      "trigger": "Har bimari ka ek hi solution – Natural Ayurvedic Amrit Juice!",
      "in_stock": true,
      "rating": 0,
      "reviews_count": 0
    }
  ]
}
```

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `product_id` | string | Unique product ID |
| `title` | string | Product name |
| `thumbnail` | string | Product image URL |
| `price` | number | Current selling price (discount_price if available) |
| `original_price` | number | Original MRP |
| `discount_price` | number | Discounted price (null if no discount) |
| `discount_percent` | number | Discount percentage calculated |
| `category` | string | Main category |
| `sub_category` | string | Sub-category |
| `trigger` | string | Marketing tagline |
| `in_stock` | boolean | Stock availability |
| `rating` | number | Product rating |
| `reviews_count` | number | Number of reviews |

---

### 3. 🔍 Single Product Detail

**Endpoint:** `GET /api/products/:id`

**Description:** Returns complete details of a single product.

**Use Case:** Product detail page, product modal.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Product ID (e.g., `prod_1774958390504`) |

**Example Request:**
```bash
GET /api/products/prod_1774958390504
```

**Example Response:**
```json
{
  "success": true,
  "timestamp": "2024-01-01T12:00:00.000Z",
  "product": {
    "product_id": "prod_1774958390504",
    "title": "Riyansh Amrit Juice",
    "thumbnail": "https://example.com/image.jpg",
    "price": 1500,
    "original_price": 1850,
    "discount_price": 1500,
    "discount_percent": 19,
    "category": "Health Care",
    "sub_category": "Immunity Booster / Full Body Wellness",
    "trigger": "Har bimari ka ek hi solution – Natural Ayurvedic Amrit Juice!",
    "description_en": "Riyansh Amrit Juice is a 100% Ayurvedic herbal health drink...",
    "description_mr": "Riyansh Amrit Juice हे 42 औषधी वनस्पतींपासून बनवलेले...",
    "benefits": [
      "Immunity boost",
      "Digestion improve",
      "Body detox",
      "Energy level"
    ],
    "tags": ["#ImmunityBooster", "#FullBodyWellness"],
    "stock": 999,
    "in_stock": true,
    "rating": 0,
    "reviews_count": 0,
    "created_at": "2026-03-31T11:59:50.504Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Product not found",
  "message": "No product found with ID: invalid_id"
}
```

---

### 4. 🛒 Shop / Offers (Full Product Details)

**Endpoint:** `GET /api/shop`

**Description:** Returns products with **complete details** (same as product detail). Supports all the same filters as `/products`.

**Use Case:** Shop page, offers page, product showcase.

**Query Parameters:**
Same as `/api/products` - supports search, filter, sort, pagination.

**Example Request:**
```bash
GET /api/shop?has_discount=true&limit=5
```

**Example Response:**
```json
{
  "success": true,
  "timestamp": "2024-01-01T12:00:00.000Z",
  "meta": {
    "total_products": 18,
    "filtered_count": 8,
    "returned_count": 5,
    "pagination": {
      "current_page": 1,
      "per_page": 5,
      "total_pages": 2
    }
  },
  "products": [
    {
      "product_id": "prod_1774958390504",
      "title": "Riyansh Amrit Juice",
      "thumbnail": "...",
      "price": 1500,
      "original_price": 1850,
      "discount_price": 1500,
      "discount_percent": 19,
      "category": "Health Care",
      "sub_category": "Immunity Booster",
      "trigger": "...",
      "description_en": "...",
      "description_mr": "...",
      "benefits": [...],
      "tags": [...],
      "stock": 999,
      "in_stock": true,
      "rating": 0,
      "reviews_count": 0,
      "created_at": "2026-03-31T11:59:50.504Z"
    }
  ]
}
```

**Difference from `/products`:**
- `/products` → Basic fields (lightweight, for listings)
- `/shop` → Full fields (complete data, for shop display)

---

### 5. 📁 Categories

**Endpoint:** `GET /api/categories`

**Description:** Returns all categories with product counts, price ranges, and sub-categories.

**Use Case:** Category filter sidebar, category navigation.

**Example Request:**
```bash
GET /api/categories
```

**Example Response:**
```json
{
  "success": true,
  "timestamp": "2024-01-01T12:00:00.000Z",
  "meta": {
    "total_categories": 5,
    "total_sub_categories": 12
  },
  "categories": [
    {
      "name": "Health Care",
      "product_count": 8,
      "min_price": 800,
      "max_price": 2000,
      "sub_categories": [
        "Immunity Booster",
        "Diabetes Care",
        "Weight Management"
      ]
    }
  ],
  "sub_categories": [
    "Immunity Booster",
    "Diabetes Care",
    "Weight Management",
    "Skin Care"
  ]
}
```

---

### 6. 📊 Statistics & Analytics

**Endpoint:** `GET /api/stats`

**Description:** Returns comprehensive API and business statistics.

**Use Case:** Admin dashboard, analytics, reporting.

**Example Request:**
```bash
GET /api/stats
```

**Example Response:**
```json
{
  "success": true,
  "timestamp": "2024-01-01T12:00:00.000Z",
  "stats": {
    "products": {
      "total": 18,
      "with_discount": 8,
      "in_stock": 18,
      "avg_price": 1400,
      "price_ranges": {
        "under_500": 2,
        "500_to_1000": 5,
        "1000_to_2000": 8,
        "above_2000": 3
      },
      "category_distribution": {
        "Health Care": 8,
        "Personal Care": 5,
        "Food & Nutrition": 5
      }
    },
    "orders": {
      "total": 15,
      "pending": 3,
      "completed": 10,
      "cancelled": 2,
      "total_revenue": 25000
    },
    "leads": {
      "total": 25
    }
  }
}
```

---

### 7. 🛒 Create Order

**Endpoint:** `POST /api/orders`

**Description:** Creates a new order in the system.

**Use Case:** Checkout process, order placement.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | Customer name |
| `phone` | string | ✅ | Customer phone |
| `product_id` | string | ✅ | Product to order |
| `email` | string | ❌ | Customer email |
| `address` | string | ❌ | Delivery address |
| `product_title` | string | ❌ | Product name (for reference) |
| `quantity` | number | ❌ | Quantity (default: 1) |
| `total_amount` | number | ❌ | Order total |
| `notes` | string | ❌ | Additional notes |

**Example Request:**
```bash
POST /api/orders
Content-Type: application/json

{
  "name": "Rahul Sharma",
  "phone": "9876543210",
  "email": "rahul@example.com",
  "address": "Mumbai, Maharashtra",
  "product_id": "prod_1774958390504",
  "product_title": "Riyansh Amrit Juice",
  "quantity": 2,
  "total_amount": 3000,
  "notes": "Deliver before 6 PM"
}
```

**Example Response (201):**
```json
{
  "success": true,
  "timestamp": "2024-01-01T12:00:00.000Z",
  "message": "Order created successfully",
  "order": {
    "id": "order_1234567890",
    "name": "Rahul Sharma",
    "phone": "9876543210",
    "email": "rahul@example.com",
    "address": "Mumbai, Maharashtra",
    "product_id": "prod_1774958390504",
    "product_title": "Riyansh Amrit Juice",
    "quantity": 2,
    "total_amount": 3000,
    "status": "pending",
    "notes": "Deliver before 6 PM",
    "created_at": "2024-01-01T12:00:00.000Z",
    "updated_at": "2024-01-01T12:00:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Missing required fields",
  "required": ["name", "phone", "product_id"],
  "missing": ["email"]
}
```

---

### 8. 📞 Create Lead

**Endpoint:** `POST /api/leads`

**Description:** Creates a new lead/customer inquiry.

**Use Case:** Contact form, inquiry form, callback request.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | Lead name |
| `phone` | string | ✅ | Lead phone |
| `email` | string | ❌ | Lead email |
| `goal` | string | ❌ | Customer goal/interest |
| `message` | string | ❌ | Additional message |
| `source` | string | ❌ | Lead source (default: "api") |

**Example Request:**
```bash
POST /api/leads
Content-Type: application/json

{
  "name": "Priya Patel",
  "phone": "9876543211",
  "email": "priya@example.com",
  "goal": "Weight Loss",
  "message": "Looking for weight management products",
  "source": "website"
}
```

**Example Response (201):**
```json
{
  "success": true,
  "timestamp": "2024-01-01T12:00:00.000Z",
  "message": "Lead created successfully",
  "lead": {
    "id": "lead_1234567890",
    "name": "Priya Patel",
    "phone": "9876543211",
    "email": "priya@example.com",
    "goal": "Weight Loss",
    "message": "Looking for weight management products",
    "source": "website",
    "created_at": "2024-01-01T12:00:00.000Z"
  }
}
```

---

## 🎯 Common Use Cases

### Use Case 1: Product Listing Page
```
GET /api/products?page=1&limit=12
GET /api/categories (for sidebar filters)
```

### Use Case 2: Search Results
```
GET /api/products?search=amrit&sort=price&order=asc
```

### Use Case 3: Category Page
```
GET /api/products?category=Health%20Care&page=1&limit=10
GET /api/categories (to show sub-categories)
```

### Use Case 4: Product Detail Page
```
GET /api/products/prod_1774958390504 (full details)
GET /api/products?category=Health%20Care&limit=4 (related products)
```

### Use Case 5: Shop/Offers Page
```
GET /api/shop?has_discount=true&limit=20
```

### Use Case 6: Checkout
```
POST /api/orders (create order)
```

### Use Case 7: Contact Form
```
POST /api/leads (create lead)
```

---

## 🔐 Security & Rate Limiting

- **Rate Limit:** 100 requests per minute per IP
- **CORS:** Enabled for all origins
- **Security Headers:** X-Content-Type-Options, X-Frame-Options, X-XSS-Protection

---

## 📞 Support

For issues or questions:
- GitHub: https://github.com/adigho777-lang/api-of-sskcw
- API Base: https://sskcw-api.vercel.app/api

---

**Last Updated:** April 2024  
**API Version:** 2.0.0
