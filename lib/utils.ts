// 🔥 PROFESSIONAL API UTILITIES - SSKCW
import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure data directory exists
export async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Directory already exists
  }
}

// Read JSON file
export async function readData<T>(filename: string): Promise<T[]> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Write JSON file
export async function writeData<T>(filename: string, data: T[]): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// Generate unique ID
export function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Format product for listing
export function formatProductList(p: any) {
  return {
    product_id: p.id,
    title: p.title,
    thumbnail: p.image,
    price: p.discount_price || p.price,
    original_price: p.price,
    discount_price: p.discount_price,
    discount_percent: p.discount_price ? Math.round(((p.price - p.discount_price) / p.price) * 100) : 0,
    category: p.category,
    sub_category: p.sub_category,
    trigger: p.trigger,
    in_stock: (p.stock || 999) > 0,
    rating: p.rating || 0,
    reviews_count: p.reviews_count || 0
  };
}

// Format product for detail view - FULL DETAILS with disease-focused data
export function formatProductDetail(p: any) {
  return {
    // Basic Info
    product_id: p.id,
    title: p.title,
    category: p.category,
    sub_category: p.sub_category,
    
    // Images
    thumbnail: p.image,
    gallery_images: p.gallery_images || [p.image],
    
    // Pricing
    price: p.discount_price || p.price,
    original_price: p.price,
    discount_price: p.discount_price,
    discount_percent: p.discount_price ? Math.round(((p.price - p.discount_price) / p.price) * 100) : 0,
    
    // Content
    trigger: p.trigger,
    short_description: p.short_description,
    description_en: p.description_en || p.description,
    description_mr: p.description_mr,
    
    // Disease-Focused Fields (NEW)
    what_is_it: p.what_is_it,
    diseases_treated: p.diseases_treated || [],
    symptoms_relief: p.symptoms_relief || [],
    works_for: p.works_for,
    target_conditions: p.target_conditions || [],
    health_benefits: p.health_benefits,
    body_parts_affected: p.body_parts_affected || [],
    treatment_duration: p.treatment_duration,
    when_to_expect_results: p.when_to_expect_results,
    who_can_benefit: p.who_can_benefit,
    
    // Product Details
    benefits: p.benefits || [],
    ingredients: p.ingredients || [],
    composition: p.composition,
    weight: p.weight,
    shelf_life: p.shelf_life,
    
    // Certifications
    certifications: p.certifications || [],
    
    // Usage & Safety (without how_to_use as requested)
    who_should_use: p.who_should_use,
    who_should_not_use: p.who_should_not_use,
    precautions: p.precautions,
    side_effects: p.side_effects,
    
    // Package
    package_contents: p.package_contents,
    storage_instructions: p.storage_instructions,
    
    // SEO
    seo_title: p.seo_title,
    seo_description: p.seo_description,
    seo_keywords: p.seo_keywords,
    
    // Tags & Categories
    tags: p.tags || [],
    
    // Stock
    stock: p.stock || 999,
    in_stock: (p.stock || 999) > 0,
    availability: p.availability || "In Stock",
    
    // Ratings
    rating: p.rating || 0,
    reviews_count: p.reviews_count || 0,
    customer_reviews: p.customer_reviews || [],
    
    // Status Flags
    is_bestseller: p.is_bestseller || false,
    is_featured: p.is_featured || false,
    is_new_arrival: p.is_new_arrival || false,
    is_trending: p.is_trending || false,
    
    // Delivery
    free_shipping: p.free_shipping || false,
    cash_on_delivery: p.cash_on_delivery || true,
    return_policy: p.return_policy,
    delivery_time: p.delivery_time,
    
    // Timestamps
    created_at: p.created_at,
    updated_at: p.updated_at
  };
}

// Create success response
export function successResponse<T>(data: T, meta?: any) {
  return {
    success: true,
    timestamp: new Date().toISOString(),
    ...(meta && { meta }),
    data
  };
}

// Create error response
export function errorResponse(message: string, code: number = 500, details?: any) {
  return {
    success: false,
    error: {
      code,
      message,
      ...(details && { details })
    },
    timestamp: new Date().toISOString()
  };
}

// Validate required fields
export function validateFields(body: any, required: string[]): { valid: boolean; missing: string[] } {
  const missing = required.filter(field => !body[field]);
  return { valid: missing.length === 0, missing };
}
