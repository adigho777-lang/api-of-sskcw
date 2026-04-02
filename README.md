# 🌿 SSKCW Ayurvedic Products API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![API Status](https://img.shields.io/badge/API-Active-brightgreen.svg)]()
[![Products](https://img.shields.io/badge/Products-18-blue.svg)](https://github.com/adigho777-lang/api-of-sskcw)
[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red.svg)]()

> **Complete Ayurvedic Product Database with Disease-Focused Information**

A comprehensive JSON-based product catalog for SSKCW (Shree Sai Kripa Care World) Ayurvedic products. This repository contains detailed product information optimized for e-commerce websites, mobile apps, and healthcare applications.

---

## 🚀 Features

### ✨ Product Information
- **18 Ayurvedic Products** with complete details
- **Disease-Focused Approach** - Each product lists diseases it treats
- **Symptom Relief** - Detailed symptoms that get relieved  
- **Body Parts Affected** - Which body systems benefit
- **Health Benefits** - Comprehensive benefit explanations
- **Full-Text Search** - Search across title, description, tags, benefits
- **Advanced Filtering** - Category, sub-category, price range, stock, discount
- **Dynamic Sorting** - Sort by price, title, discount, date
- **Smart Pagination** - Optional limit with has_next/has_prev flags

---

## 📊 Data Structure

```json
{
  "id": "unique_product_id",
  "title": "Product Name",
  "category": "Health Care",
  "sub_category": "Immunity Booster / Full Body Wellness",
  "price": 1850,
  "discount_price": 1500,
  "discount_percent": 19,
  "diseases_treated": [
    "Low Immunity",
    "Body Detoxification", 
    "Poor Digestion"
  ],
  "symptoms_relief": [
    "Thakan aur kamzori",
    "Bar bar bimar padna"
  ],
  "body_parts_affected": [
    "Immune System",
    "Full Body"
  ],
  "what_is_it": "Product description",
  "works_for": "How it works",
  "health_benefits": "Detailed benefits",
  "ingredients": ["Amla", "Ashwagandha", "Giloy"],
  "certifications": [
    "AYUSH Certified",
    "GMP Certified",
    "ISO 9001:2015"
  ]
}
```

## 📦 Products Included

### Health Care Products
| Product | Diseases Treated | Key Benefits |
|---------|-----------------|--------------|
| **Amrit Juice** | Low Immunity, Detox, Poor Digestion | 42 Herbs Power |
| **Diabo-G** | Diabetes, High Blood Sugar | Natural Sugar Control |
| **Artho-G** | Arthritis, Joint Pain, Knee Pain | Surgery Alternative |
| **Power Booster** | Fatigue, Low Energy, Weakness | Double Energy |
| **Power Booster Plus** | Extreme Weakness | Advanced Formula |
| **Amrit Capsule** | Low Immunity, General Weakness | Travel Friendly |
| **Pileorhoids** | Piles, Hemorrhoids, Fissures | No Surgery Needed |
| **Lady Life Care** | PCOS, Hormonal Issues | Women's Special |
| **Anti Addiction** | Alcohol, Smoking, Tobacco | De-addiction Support |
| **Ortho-G Oil** | Joint Pain, Muscle Pain | Fast Relief |
| **Alkaline Drop** | Acidity, pH Imbalance | Body Balance |
| **Acidity Care** | Gas, Acidity, Indigestion | Instant Relief |
| **Eye Care Drop** | Eye Strain, Dry Eyes | Cooling Effect |
| **Ear Drop** | Ear Problems | Daily Care |

### Personal Care Products
| Product | Diseases Treated | Key Benefits |
|---------|-----------------|--------------|
| **18 Herbs Hair Oil** | Hair Fall, Dandruff | 18 Natural Herbs |
| **Neem Tulsi Soap** | Acne, Skin Infections | Germ Protection |
| **Rose Milk Soap** | Dry Skin, Dull Skin | Moisturizing |
| **3 in 1 Face Wash** | Pimples, Blackheads | Clean + Scrub + Glow |

---

## 🎯 Key Highlights

### Disease-Focused Data
Each product includes:
- ✅ **What is it?** - Simple product explanation
- ✅ **Diseases Treated** - 6-10 specific diseases
- ✅ **Symptoms Relief** - Detailed symptom list
- ✅ **How it Works** - Working mechanism
- ✅ **Target Conditions** - Medical conditions
- ✅ **Body Parts** - Affected body systems
- ✅ **Results Timeline** - When to expect results

### Quality Certifications
All products include:
- 🏆 AYUSH Certified
- 🏆 GMP Certified
- 🏆 ISO 9001:2015
- 🏆 FSSAI Approved
- 🏆 100% Natural
- 🏆 No Side Effects

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

## � API Usage Examples

### Get All Products
```javascript
fetch('http://localhost:3000/api/products')
  .then(response => response.json())
  .then(data => {
    console.log(data.products);
  });
```

### Get Products by Disease
```javascript
// Filter by disease
const diabetesProducts = products.filter(p => 
  p.diseases_treated.includes("Type 2 Diabetes")
);
```

### Get Products by Symptom
```javascript
// Filter by symptom
const hairFallProducts = products.filter(p => 
  p.symptoms_relief.some(s => s.includes("Hair"))
);
```

### Get Product Details
```javascript
function getProductDetails(productId) {
  return products.find(p => p.id === productId);
}

// Usage
const amritJuice = getProductDetails("prod_1774958390504");
console.log(amritJuice.diseases_treated);
console.log(amritJuice.symptoms_relief);
```

## 📊 Data Statistics

- 📦 **Total Products**: 18
- 🏥 **Disease Categories**: 14+
- 🌿 **Unique Herbs**: 50+
- 🎯 **Symptoms Covered**: 100+
- 💊 **Medical Conditions**: 60+
- ✅ **Certifications**: 6 per product

---

## 📁 Project Structure

```
api-of-sskcw/
├── data/
│   └── products.json          # Product data with disease info
├── pages/api/
│   ├── products.ts            # Products listing
│   ├── categories.ts          # Categories
│   ├── shop.ts                # Shop endpoint
│   └── orders.ts              # Orders
├── lib/
│   └── utils.ts               # Helper functions
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

## � Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repo to Vercel for automatic deployments.

---

## �📝 License

MIT License - feel free to use for your projects!

---

## 🤝 Support

For issues and feature requests, please open an issue on GitHub.

<p align="center">
  <b>🌿 Natural Healing, Modern Approach 🌿</b><br>
  <i>Made with ❤️ for SSKCW</i>
</p>
