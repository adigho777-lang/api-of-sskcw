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

// Format product for detail view
export function formatProductDetail(p: any) {
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
    description_en: p.description_en || p.description,
    description_mr: p.description_mr,
    benefits: p.benefits || [],
    tags: p.tags || [],
    stock: p.stock || 999,
    in_stock: (p.stock || 999) > 0,
    rating: p.rating || 0,
    reviews_count: p.reviews_count || 0,
    created_at: p.created_at
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
