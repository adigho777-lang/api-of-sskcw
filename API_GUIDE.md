# 🔥 SSKCW API DOCUMENTATION - Complete Guide

## 📋 Kaunsa API Kya Deta Hai (API Endpoints Overview)

| API Endpoint | Method | Kya Milta Hai | Kaise Use Karein |
|--------------|--------|---------------|------------------|
| `/api/products` | GET | **Saare Products** ki list with filters | `fetch('/api/products')` |
| `/api/products?id=prod_123` | GET | **Single Product** ka poora detail | `fetch('/api/products?id=prod_123')` |
| `/api/categories` | GET | **Saari Categories** with product counts | `fetch('/api/categories')` |
| `/api/shop` | GET | **Full product details** with sorting | `fetch('/api/shop')` |
| `/api/orders` | POST | **Order Create** karna | `POST` with order data |
| `/api/orders/debug` | GET | **Orders Check** karna | `fetch('/api/orders/debug')` |

---

## 🔍 DETAILED API USAGE

### 1. 📦 `/api/products` - Sabse Important API

**Kya Milta Hai:**
- Saare 18 products ki list
- Search, filter, sort options
- Pagination support

**Query Parameters:**
```
?search=amrit           # Search by name/tag
?category=Health%20Care # Filter by category
?min_price=500          # Minimum price
?max_price=2000         # Maximum price
?has_discount=true      # Discount wale products
?in_stock=true          # Stock mein jo hain
?page=1&limit=10        # Pagination
?sort=price&order=asc   # Sorting (price/title/discount)
```

**Example Usage:**
```javascript
// Basic usage
fetch('https://your-api.vercel.app/api/products')
  .then(r => r.json())
  .then(data => console.log(data.products));

// With search
fetch('https://your-api.vercel.app/api/products?search=diabetes')
  .then(r => r.json())
  .then(data => console.log(data.products));

// Filter by disease (frontend mein)
const diabetesProducts = data.products.filter(p => 
  p.diseases_treated.includes("Type 2 Diabetes")
);
```

**Response Format:**
```json
{
  "success": true,
  "meta": {
    "total_products": 18,
    "returned_count": 5,
    "page": 1,
    "limit": 10
  },
  "products": [
    {
      "id": "prod_1774958390504",
      "title": "Riyansh Amrit Juice",
      "price": 1850,
      "discount_price": 1500,
      "category": "Health Care",
      "diseases_treated": ["Low Immunity", "Detox"],
      "symptoms_relief": ["Thakan", "Weakness"]
    }
  ]
}
```

---

### 2. 🏷️ `/api/categories` - Categories Ka Data

**Kya Milta Hai:**
- Saari categories ki list
- Har category mein kitne products hain
- Sub-categories bhi

**Example:**
```javascript
fetch('https://your-api.vercel.app/api/categories')
  .then(r => r.json())
  .then(data => {
    data.categories.forEach(cat => {
      console.log(`${cat.name}: ${cat.product_count} products`);
    });
  });
```

**Response:**
```json
{
  "success": true,
  "total_categories": 3,
  "total_subcategories": 14,
  "categories": [
    {
      "name": "Health Care",
      "product_count": 14,
      "subcategories": ["Immunity", "Diabetes", "Joint Care"]
    },
    {
      "name": "Hair Care",
      "product_count": 1,
      "subcategories": ["Hair Oil"]
    }
  ]
}
```

---

### 3. 🛒 `/api/shop` - Full Product Details

**Kya Milta Hai:**
- Products with complete details
- Sorting options
- Full disease data included

**Query Parameters:**
```
?sort=price&order=asc    # Price ke hisaab se sort
?sort=title&order=asc   # Name ke hisaab se sort
```

**Example:**
```javascript
// Sabse saste products pehle
fetch('https://your-api.vercel.app/api/shop?sort=price&order=asc')
  .then(r => r.json())
  .then(data => console.log(data.products));
```

---

### 4. 📝 `/api/orders` - Order Create Karna

**Method:** POST

**Kya Milta Hai:** Order create hone ka confirmation

**Request Body:**
```json
{
  "name": "Rahul Sharma",
  "phone": "9876543210",
  "email": "rahul@example.com",
  "product_id": "prod_1774958390504",
  "quantity": 2,
  "total_amount": 3000,
  "address": "123 Main St, Mumbai",
  "payment_method": "COD"
}
```

**Example:**
```javascript
fetch('https://your-api.vercel.app/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "Rahul Sharma",
    phone: "9876543210",
    product_id: "prod_1774958390504",
    quantity: 2,
    total_amount: 3000
  })
})
.then(r => r.json())
.then(data => console.log(data.order));
```

---

### 5. 🔎 `/api/orders/debug` - Orders Check Karna

**Kya Milta Hai:** Saare orders ki list

**Example:**
```javascript
fetch('https://your-api.vercel.app/api/orders/debug')
  .then(r => r.json())
  .then(data => console.log(data.orders));
```

---

## 📊 DISEASE-FOCUSED FILTERING

### By Disease:
```javascript
// Diabetes ke products
fetch('/api/products')
  .then(r => r.json())
  .then(data => {
    const diabetesProducts = data.products.filter(p => 
      p.diseases_treated.includes("Type 2 Diabetes")
    );
  });

// Joint pain ke products
const jointProducts = data.products.filter(p => 
  p.diseases_treated.some(d => d.includes("Joint"))
);
```

### By Symptom:
```javascript
// Hair fall ke liye
const hairProducts = data.products.filter(p => 
  p.symptoms_relief.some(s => s.includes("Hair fall"))
);
```

### By Body Part:
```javascript
// Joints ke liye
const jointCare = data.products.filter(p => 
  p.body_parts_affected.includes("Joints")
);
```

---

## 📁 DATA FILES KA LOCATION

```
nextjs-api/
├── data/
│   ├── products.json      # 18 products with disease data
│   ├── bundles.json       # Combo offers (10 bundles)
│   └── comparisons.json   # Product comparisons
├── scripts/
│   ├── enhance-products.js      # Add extra fields
│   └── disease-focus-update.js # Add disease data
└── pages/api/
    ├── products.ts       # /api/products endpoint
    ├── categories.ts     # /api/categories endpoint
    ├── shop.ts           # /api/shop endpoint
    └── orders.ts         # /api/orders endpoint
```

---

## 🚀 DEPLOYMENT

**Vercel pe deploy karna:**
```bash
cd nextjs-api
npm i -g vercel
vercel --prod
```

**Ya GitHub se connect karo:**
1. Vercel dashboard pe jao
2. New Project
3. GitHub repo connect karo: `adigho777-lang/api-of-sskcw`
4. Deploy!

---

## 💡 USE CASES

### 1. E-commerce Website:
```javascript
// Products display karna
fetch('/api/products?category=Health%20Care')
  .then(r => r.json())
  .then(data => displayProducts(data.products));
```

### 2. Disease-based Search:
```javascript
// User "diabetes" search kare
fetch('/api/products')
  .then(r => r.json())
  .then(data => {
    const results = data.products.filter(p => 
      p.diseases_treated.some(d => 
        d.toLowerCase().includes('diabetes')
      )
    );
    displayResults(results);
  });
```

### 3. Product Comparison:
```javascript
// Compare immunity products
fetch('/api/shop')
  .then(r => r.json())
  .then(data => {
    const immunityProducts = data.products.filter(p => 
      p.diseases_treated.includes("Low Immunity")
    );
    showComparison(immunityProducts);
  });
```

### 4. Order Placement:
```javascript
// Order create karna
const orderData = {
  name: customerName,
  phone: customerPhone,
  product_id: selectedProduct.id,
  quantity: qty,
  total_amount: qty * selectedProduct.discount_price
};

fetch('/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(orderData)
});
```

---

## 🎯 QUICK REFERENCE

| Kaam Karna Hai | API Endpoint |
|----------------|--------------|
| Saare products dekhne | `GET /api/products` |
| Search karna | `GET /api/products?search=keyword` |
| Category filter | `GET /api/products?category=Health%20Care` |
| Price filter | `GET /api/products?min_price=500&max_price=2000` |
| Sort karna | `GET /api/shop?sort=price&order=asc` |
| Order karna | `POST /api/orders` |
| Categories dekhna | `GET /api/categories` |
| Orders check karna | `GET /api/orders/debug` |

---

## 🔗 BASE URL

**Local:** `http://localhost:3000`

**Production:** `https://your-app.vercel.app`

---

**Created with ❤️ for SSKCW**
