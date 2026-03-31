# 🔥 SSKCW PRO API - Next.js Edition

**Professional REST API for SSKCW Products, Orders & Leads Management**

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://typescriptlang.org)
[![API](https://img.shields.io/badge/API-REST-green)](https://github.com/adigho777-lang/api-of-sskcw)

---

## 🚀 Features

### Core Features
- ✅ **Full-Text Search** - Search across title, description, tags, benefits
- ✅ **Advanced Filtering** - Category, sub-category, price range, stock, discount
- ✅ **Dynamic Sorting** - Sort by price, title, discount, date
- ✅ **Smart Pagination** - Optional limit with has_next/has_prev flags
- ✅ **Rate Limiting** - 100 requests per minute per IP
- ✅ **Security Headers** - X-Content-Type-Options, X-Frame-Options, CORS
- ✅ **Request Logging** - All requests logged with timestamp & IP

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api` | GET | API Info & Stats |
| `/api/products` | GET | List all products with filters |
| `/api/products/:id` | GET | Single product details |
| `/api/products/shop` | GET | Products with full details |
| `/api/categories` | GET | All categories with stats |
| `/api/stats` | GET | API statistics & analytics |
| `/api/orders` | POST | Create new order |
| `/api/leads` | POST | Create new lead |

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/adigho777-lang/api-of-sskcw.git
cd api-of-sskcw

# Install dependencies
npm install

# Run development server
npm run dev
```

Server will start at `http://localhost:3000`

---

## 🔥 Usage Examples

### 1. Get All Products
```bash
curl http://localhost:3000/api/products
```

### 2. Search Products
```bash
curl "http://localhost:3000/api/products?search=amrit"
```

### 3. Filter by Category
```bash
curl "http://localhost:3000/api/products?category=Health%20Care"
```

### 4. Price Range Filter
```bash
curl "http://localhost:3000/api/products?min_price=500&max_price=2000"
```

### 5. Sort Products
```bash
curl "http://localhost:3000/api/products?sort=price&order=asc"
```

### 6. Pagination
```bash
curl "http://localhost:3000/api/products?page=1&limit=10"
```

### 7. Combined Filters
```bash
curl "http://localhost:3000/api/products?category=Health%20Care&has_discount=true&sort=price&order=asc"
```

### 8. Create Order
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rahul Sharma",
    "phone": "9876543210",
    "product_id": "prod_123",
    "quantity": 2,
    "total_amount": 3000
  }'
```

---

## 📊 Response Format

### Success Response
```json
{
  "success": true,
  "timestamp": "2024-01-01T12:00:00.000Z",
  "meta": {
    "total_products": 18,
    "filtered_count": 5,
    "returned_count": 5
  },
  "products": [...]
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": 404,
    "message": "Product not found"
  },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

---

## 🚀 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repo to Vercel for automatic deployments.

---

## 📁 Project Structure

```
api-of-sskcw/
├── app/
│   └── api/
│       ├── route.ts           # Root API info
│       ├── products/
│       │   ├── route.ts       # Products listing
│       │   ├── [id]/
│       │   │   └── route.ts   # Single product
│       │   └── shop/
│       │       └── route.ts   # Shop with full details
│       ├── categories/
│       │   └── route.ts       # Categories
│       ├── stats/
│       │   └── route.ts       # API statistics
│       ├── orders/
│       │   └── route.ts       # Orders
│       └── leads/
│           └── route.ts       # Leads
├── lib/
│   ├── utils.ts               # Helper functions
│   └── middleware.ts          # Middleware utilities
├── data/
│   └── products.json          # Product data
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔐 Security Features

- CORS enabled for all origins
- Security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection)
- Rate limiting (100 req/min per IP)
- Input validation on all POST endpoints
- Error handling with safe error messages

---

## 📝 License

MIT License - feel free to use for your projects!

---

## 🤝 Support

For issues and feature requests, please open an issue on GitHub.

**Built with ❤️ by SSKCW Team**
