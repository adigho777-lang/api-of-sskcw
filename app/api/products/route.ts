// 🔥 PRODUCTS API - Advanced Listing with Filters
import { NextRequest, NextResponse } from 'next/server';
import { readData, formatProductList } from '@/lib/utils';
import { logRequest, getApiHeaders, methodNotAllowed } from '@/lib/middleware';

export async function GET(request: NextRequest) {
  logRequest(request);
  
  const { searchParams } = new URL(request.url);
  
  let products: any[] = await readData('products.json');
  const totalCount = products.length;
  
  // ========== ADVANCED FILTERS ==========
  
  // 1. Search (title, description, tags, benefits)
  const search = searchParams.get('search');
  if (search) {
    const term = search.toLowerCase();
    products = products.filter(p =>
      p.title?.toLowerCase().includes(term) ||
      p.description_en?.toLowerCase().includes(term) ||
      p.description_mr?.toLowerCase().includes(term) ||
      p.tags?.some((tag: string) => tag.toLowerCase().includes(term)) ||
      p.benefits?.some((b: string) => b.toLowerCase().includes(term))
    );
  }
  
  // 2. Category filter
  const category = searchParams.get('category');
  if (category) {
    products = products.filter(p =>
      p.category?.toLowerCase() === category.toLowerCase()
    );
  }
  
  // 3. Sub-category filter
  const subCategory = searchParams.get('sub_category');
  if (subCategory) {
    products = products.filter(p =>
      p.sub_category?.toLowerCase() === subCategory.toLowerCase()
    );
  }
  
  // 4. Price range
  const minPrice = searchParams.get('min_price');
  const maxPrice = searchParams.get('max_price');
  if (minPrice) {
    products = products.filter(p => (p.discount_price || p.price) >= parseFloat(minPrice));
  }
  if (maxPrice) {
    products = products.filter(p => (p.discount_price || p.price) <= parseFloat(maxPrice));
  }
  
  // 5. Stock filter
  if (searchParams.get('in_stock') === 'true') {
    products = products.filter(p => (p.stock || 999) > 0);
  }
  
  // 6. Discount filter
  if (searchParams.get('has_discount') === 'true') {
    products = products.filter(p => p.discount_price && p.discount_price < p.price);
  }
  
  // ========== SORTING ==========
  const sortField = searchParams.get('sort') || 'created_at';
  const sortOrder = searchParams.get('order') === 'asc' ? 1 : -1;
  
  products.sort((a, b) => {
    let aVal: any, bVal: any;
    
    switch(sortField) {
      case 'price':
        aVal = a.discount_price || a.price;
        bVal = b.discount_price || b.price;
        break;
      case 'title':
        aVal = a.title?.toLowerCase();
        bVal = b.title?.toLowerCase();
        break;
      case 'discount':
        aVal = a.discount_price ? (a.price - a.discount_price) / a.price : 0;
        bVal = b.discount_price ? (b.price - b.discount_price) / b.price : 0;
        break;
      default:
        aVal = a.created_at;
        bVal = b.created_at;
    }
    
    if (aVal < bVal) return -1 * sortOrder;
    if (aVal > bVal) return 1 * sortOrder;
    return 0;
  });
  
  // ========== PAGINATION ==========
  const page = parseInt(searchParams.get('page') || '1');
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : null;
  const filteredCount = products.length;
  
  let paginatedProducts = products;
  if (limit) {
    const startIndex = (page - 1) * limit;
    paginatedProducts = products.slice(startIndex, startIndex + limit);
  }
  
  // ========== RESPONSE ==========
  const meta: any = {
    total_products: totalCount,
    filtered_count: filteredCount,
    returned_count: paginatedProducts.length,
    filters_applied: Array.from(searchParams.keys()).filter(k => 
      !['page', 'limit', 'sort', 'order'].includes(k)
    )
  };
  
  if (limit) {
    meta.pagination = {
      current_page: page,
      per_page: limit,
      total_pages: Math.ceil(filteredCount / limit),
      has_next: page < Math.ceil(filteredCount / limit),
      has_prev: page > 1
    };
  }
  
  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    meta,
    products: paginatedProducts.map(formatProductList)
  }, { headers: getApiHeaders() });
}

export async function POST() {
  return methodNotAllowed();
}
