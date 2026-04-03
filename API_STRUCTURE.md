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

## 🌐 Multilingual Support

All API responses now support **3 languages**:
- 🇬🇧 **English** (EN) - Default
- 🇮🇳 **Hindi** (HI)
- 🇮🇳 **Marathi** (MR)

### Translation Fields Pattern
Every translatable field has 3 versions:
- `{field}` - English (default)
- `{field}_hi` - Hindi
- `{field}_mr` - Marathi

### Example:
```json
{
  "title": "Riyansh Amrit Juice",
  "title_hi": "रियांश अमृत जूस",
  "title_mr": "रियांश अमृत जूस",
  "description_en": "Boosts immunity and energy...",
  "description_hi": "रोगप्रतिकारक शक्ति और ऊर्जा बढ़ाता है...",
  "description_mr": "रोगप्रतिकारक शक्ती आणि ऊर्जा वाढवते...",
  "benefits": ["Immunity boost", "Energy increase"],
  "benefits_hi": ["इम्यूनिटी बूस्ट", "एनर्जी बढ़ाना"],
  "benefits_mr": ["रोगप्रतिकारक शक्ती वाढ", "ऊर्जा वाढ"]
}
```

### Translated Fields Available:
| Field Category | Fields |
|----------------|--------|
| **Basic Info** | title, category, sub_category |
| **Content** | description, trigger, short_description, what_is_it, works_for |
| **Health** | diseases_treated, symptoms_relief, target_conditions, body_parts_affected, health_benefits |
| **Usage** | treatment_duration, when_to_expect_results, who_can_benefit, who_should_use, who_should_not_use, precautions, side_effects, warnings |
| **Product Details** | benefits, ingredients, composition, package_contents, storage_instructions, shelf_life |
| **Marketing** | tags, certifications, seo_title, seo_description |
| **Support** | availability, return_policy, delivery_time, effectiveness |
| **FAQ** | faq (question, answer) |

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
    
    // Basic Info with Translations
    "title": "Riyansh Amrit Juice",
    "title_hi": "रियांश अमृत जूस",
    "title_mr": "रियांश अमृत जूस",
    "category": "Health Care",
    "category_hi": "स्वास्थ्य देखभाल",
    "category_mr": "आरोग्य सेवा",
    "sub_category": "Immunity Booster / Full Body Wellness",
    "sub_category_hi": "इम्यूनिटी बूस्टर / फुल बॉडी वेलनेस",
    "sub_category_mr": "रोगप्रतिकारक शक्ती वाढवणे / पूर्ण शरीर निरोगीपणा",
    
    // Images
    "thumbnail": "https://example.com/image.jpg",
    "gallery_images": ["..."],
    
    // Pricing
    "price": 1500,
    "original_price": 1850,
    "discount_price": 1500,
    "discount_percent": 19,
    
    // Content with Translations
    "trigger": "42 Herbs se bana Full Body Power Juice! 💪🔥",
    "trigger_hi": "42 जड़ी-बूटियों से बना फुल बॉडी पावर जूस! 💪🔥",
    "trigger_mr": "42 औषधी वनस्पतींपासून बनवलेला पूर्ण शरीर पावर रस! 💪🔥",
    "short_description": "42 Herbs se bana Full Body Power Juice! Immunity boost karata...",
    "short_description_hi": "42 जड़ी-बूटियों से बना फुल बॉडी पावर जूस! इम्यूनिटी बढ़ाता है...",
    "short_description_mr": "42 औषधी वनस्पतींपासून बनवलेला पूर्ण शरीर पावर रस! रोगप्रतिकारक शक्ती वाढवतो...",
    
    // Descriptions with Translations
    "description_en": "Unlock the power of 42 Ayurvedic herbs with Riyansh Amrit Juice!...",
    "description_hi": "42 आयुर्वेदिक जड़ी-बूटियों की शक्ति प्राप्त करें! यह रस इम्यूनिटी बढ़ाता है...",
    "description_mr": "42 आयुर्वेदिक औषधी वनस्पतींचे सामर्थ्य अनलॉक करा! हे रस शरीराची रोगप्रतिकारक शक्ती वाढवते...",
    
    // Disease-Focused Fields with Translations
    "what_is_it": "Ek powerful Ayurvedic health juice jo 42 natural herbs se bana hai...",
    "what_is_it_hi": "एक शक्तिशाली आयुर्वेदिक हेल्थ जूस जो 42 नेचुरल जड़ी-बूटियों से बना है...",
    "what_is_it_mr": "एक शक्तिशाली आयुर्वेदिक हेल्थ रस जो 42 नैसर्गिक औषधी वनस्पतींपासून बनवलेला आहे...",
    "diseases_treated": ["Low Immunity", "Body Detoxification", "Poor Digestion"],
    "diseases_treated_hi": ["कम इम्यूनिटी", "बॉडी डिटॉक्सिफिकेशन", "खराब पाचन"],
    "diseases_treated_mr": ["कमी रोगप्रतिकारक शक्ती", "शरीर डिटॉक्स", "खराब पचन"],
    "symptoms_relief": ["Thakan aur kamzori", "Bar bar bimar padna", "Skin infection"],
    "symptoms_relief_hi": ["थकान और कमजोरी", "बार बार बीमार पड़ना", "स्किन इंफेक्शन"],
    "symptoms_relief_mr": ["थकवा आणि अशक्तता", "वारंवार आजार पडणे", "त्वचा इंफेक्शन"],
    "works_for": "Immunity boosting, body detox, digestion improvement...",
    "works_for_hi": "इम्यूनिटी बूस्टिंग, बॉडी डिटॉक्स, पाचन सुधार...",
    "works_for_mr": "रोगप्रतिकारक शक्ती वाढ, शरीर डिटॉक्स, पचन सुधार...",
    "target_conditions": ["Immunity disorders", "Digestive issues", "Chronic fatigue"],
    "target_conditions_hi": ["इम्यूनिटी डिसऑर्डर", "पाचन समस्याएं", "क्रोनिक थकान"],
    "target_conditions_mr": ["रोगप्रतिकारक समस्या", "पचन समस्या", "क्रोनिक थकवा"],
    "health_benefits": "Ye juice aapki body ki natural defense system ko strong karta hai...",
    "health_benefits_hi": "यह जूस आपकी बॉडी की नेचुरल डिफेंस सिस्टम को स्ट्रॉंग करता है...",
    "health_benefits_mr": "हे रस तुमच्या शरीराच्या नैसर्गिक संरक्षण प्रणालीला मजबूत करतो...",
    "body_parts_affected": ["Immune System", "Full Body", "Digestive System"],
    "body_parts_affected_hi": ["इम्यून सिस्टम", "पूरी बॉडी", "पाचन तंत्र"],
    "body_parts_affected_mr": ["रोगप्रतिकारक प्रणाली", "पूर्ण शरीर", "पचन प्रणाली"],
    "treatment_duration": "Regular use for 2-3 months recommended",
    "treatment_duration_hi": "2-3 महीने नियमित उपयोग की सिफारिश",
    "treatment_duration_mr": "2-3 महिने नियमित वापराची शिफारस",
    "when_to_expect_results": "2-4 weeks mein relief start, 2-3 months for full benefits",
    "when_to_expect_results_hi": "2-4 हफ्तों में राहत शुरू, पूरी तरह 2-3 महीने में",
    "when_to_expect_results_mr": "2-4 आठवड्यांत आराम सुरू, पूर्ण फायदे 2-3 महिन्यात",
    
    // Product Details with Translations
    "benefits": ["Immunity boost karata", "Full body detox support", "Digestion improve hota"],
    "benefits_hi": ["इम्यूनिटी बूस्ट करता है", "फुल बॉडी डिटॉक्स सपोर्ट", "पाचन सुधारता है"],
    "benefits_mr": ["रोगप्रतिकारक शक्ती वाढवते", "पूर्ण शरीर डिटॉक्स सपोर्ट", "पचन सुधारते"],
    "ingredients": ["Amla", "Ashwagandha", "Giloy", "Tulsi", "Neem"],
    "composition": "Contains Amla, Ashwagandha, Giloy, Tulsi, Neem and other herbs",
    "composition_hi": "इसमें आंवला, अश्वगंधा, गिलोय, तुलसी, नीम और अन्य जड़ी-बूटियां हैं",
    "composition_mr": "यामध्ये आवळा, अश्वगंधा, गुळवेल, तुळशी, नीम आणि इतर औषधी वनस्पती आहेत",
    "weight": "500ml",
    "shelf_life": "24 months",
    "shelf_life_hi": "24 महीने",
    "shelf_life_mr": "24 महिने",
    
    // Usage & Safety with Translations
    "who_should_use": "Adults above 18 years, people seeking Health Care solutions",
    "who_should_use_hi": "18 साल से ऊपर के वयस्क, स्वास्थ्य समाधान चाहने वाले",
    "who_should_use_mr": "18 वर्षांवरील प्रौढ, आरोग्य सेवा हवी असलेले लोक",
    "who_should_not_use": "Pregnant/lactating women without doctor advice, children below 5 years",
    "who_should_not_use_hi": "गर्भवती/स्तनपान कराने वाली महिलाएं बिना डॉक्टर की सलाह के, 5 साल से कम बच्चे",
    "who_should_not_use_mr": "डॉक्टरांच्या सल्ल्याशिवाय गर्भवती/स्तनदान करणाऱ्या महिला, 5 वर्षांखालील मुले",
    "precautions": "Consult doctor if under medication. Not a substitute for medical treatment.",
    "precautions_hi": "दवाइयों पर हों तो डॉक्टर से सलाह करें। मेडिकल इलाज का विकल्प नहीं।",
    "precautions_mr": "औषधी असल्यास डॉक्टरांचा सल्ला घ्या. वैद्यकीय उपचाराचे पर्याय नाही.",
    "side_effects": "No known side effects. 100% natural formulation.",
    "side_effects_hi": "कोई साइड इफेक्ट नहीं। 100% नेचुरल फॉर्मूलेशन।",
    "side_effects_mr": "कोणतेही दुष्परिणाम नाहीत. 100% नैसर्गिक फॉर्म्युलेशन.",
    
    // Package with Translations
    "package_contents": "1 Juice of Riyansh Amrit Juice (500ml) + User Guide",
    "package_contents_hi": "1 रियांश अमृत जूस (500ml) + यूजर गाइड",
    "package_contents_mr": "1 रियांश अमृत रस (500ml) + वापर मार्गदर्शिका",
    "storage_instructions": "Cool and dry place, away from direct sunlight",
    "storage_instructions_hi": "ठंडी और सूखी जगह, सीधी धूप से दूर",
    "storage_instructions_mr": "थंड आणि कोरडी जागा, थेट सूर्यप्रकाशापासून दूर",
    
    // Marketing with Translations
    "tags": ["#ImmunityBooster", "#FullBodyWellness", "#EnergyBoost"],
    "tags_hi": ["#इम्यूनिटीबूस्टर", "#फुलबॉडीवेलनेस", "#एनर्जीबूस्ट"],
    "tags_mr": ["#रोगप्रतिकारकशक्तीवाढवणारे", "#पूर्णशरीरनिरोगीपणा", "#ऊर्जावाढ"],
    "certifications": ["AYUSH Certified", "GMP Certified", "ISO 9001:2015"],
    "seo_title": "Riyansh Amrit Juice - Buy Online at Best Price | Riyansh Ayurveda",
    "seo_description": "Buy Riyansh Amrit Juice at 19% OFF...",
    
    // Support with Translations
    "availability": "In Stock",
    "availability_hi": "स्टॉक में",
    "availability_mr": "स्टॉकमध्ये",
    "return_policy": "7 Days Easy Return",
    "return_policy_hi": "7 दिन आसान रिटर्न",
    "return_policy_mr": "7 दिवस सोपे परत करणे",
    "delivery_time": "2-5 Business Days",
    "delivery_time_hi": "2-5 व्यावसायिक दिन",
    "delivery_time_mr": "2-5 व्यावसायिक दिवस",
    
    // Stock & Rating
    "stock": 999,
    "in_stock": true,
    "rating": 0,
    "reviews_count": 0,
    "created_at": "2026-03-31T11:59:50.504Z",
    "updated_at": "2026-04-02T11:12:18.955Z"
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

### 9. 📦 Bundles (with Translations)

**Endpoint:** `GET /api/bundles`

**Description:** Returns all product bundles with complete details and translations.

**Use Case:** Bundle offers page, combo deals display.

**Example Request:**
```bash
GET /api/bundles
```

**Example Response:**
```json
{
  "success": true,
  "timestamp": "2024-01-01T12:00:00.000Z",
  "bundles": [
    {
      "id": "bundle_immunity_pack",
      "title": "🔥 Immunity Power Pack",
      "title_hi": "🔥 इम्यूनिटी पावर पैक",
      "title_mr": "🔥 रोगप्रतिकारक शक्ती पावर पॅक",
      "description": "Immunity boost karne ke liye best combo! Amrit Juice + Amrit Capsule",
      "description_hi": "इम्यूनिटी बूस्ट करने के लिए बेस्ट कॉम्बो! अमृत जूस + अमृत कैप्सूल",
      "description_mr": "रोगप्रतिकारक शक्ती वाढवण्यासाठी सर्वोत्तम कॉम्बो! अमृत रस + अमृत कॅप्सूल",
      "products": ["prod_1774958390504", "prod_1774960680020"],
      "original_price": 3850,
      "bundle_price": 2999,
      "savings": 851,
      "savings_percent": 22,
      "tagline": "Double Immunity Power! 💪",
      "tagline_hi": "डबल इम्यूनिटी पावर! 💪",
      "tagline_mr": "दुप्पट रोगप्रतिकारक शक्ती! 💪",
      "best_for": ["Low Immunity", "Frequent Illness", "General Weakness"],
      "best_for_hi": ["कम इम्यूनिटी", "बार बार बीमार", "सामान्य कमजोरी"],
      "best_for_mr": ["कमी रोगप्रतिकारक शक्ती", "वारंवार आजार", "सामान्य अशक्तता"],
      "recommended_duration": "3 months",
      "recommended_duration_hi": "3 महीने",
      "recommended_duration_mr": "3 महिने"
    }
  ]
}
```

---

### 10. 📊 Comparisons (with Translations)

**Endpoint:** `GET /api/comparisons`

**Description:** Returns product comparisons with translated criteria and features.

**Use Case:** Product comparison page, decision help.

**Example Request:**
```bash
GET /api/comparisons
```

**Example Response:**
```json
{
  "success": true,
  "timestamp": "2024-01-01T12:00:00.000Z",
  "comparisons": [
    {
      "id": "compare_immunity",
      "title": "Immunity Boosters Comparison",
      "title_hi": "इम्यूनिटी बूस्टर तुलना",
      "title_mr": "रोगप्रतिकारक शक्ती वाढवणारे तुलना",
      "products": ["prod_1774958390504", "prod_1774960680020"],
      "criteria": [
        {
          "feature": "Form",
          "feature_hi": "रूप",
          "feature_mr": "स्वरूप",
          "prod_1774958390504": "Juice (Liquid)",
          "prod_1774958390504_hi": "जूस (तरल)",
          "prod_1774958390504_mr": "रस (द्रव)",
          "prod_1774960680020": "Capsule",
          "prod_1774960680020_hi": "कैप्सूल",
          "prod_1774960680020_mr": "कॅप्सूल"
        }
      ],
      "winner": "Depends on lifestyle - Juice for home, Capsules for travel",
      "winner_hi": "लाइफस्टाइल पर निर्भर - घर के लिए जूस, यात्रा के लिए कैप्सूल",
      "winner_mr": "जीवनशैलीवर अवलंबून - घरासाठी रस, प्रवासासाठी कॅप्सूल"
    }
  ]
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

**Last Updated:** April 2026  
**API Version:** 3.0.0 (Multilingual Edition)
