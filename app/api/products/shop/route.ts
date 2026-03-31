// 🔥 SHOP / OFFERS API - Full Product Details
import { NextRequest, NextResponse } from 'next/server';
import { readData, formatProductDetail } from '@/lib/utils';
import { logRequest, getApiHeaders } from '@/lib/middleware';

export async function GET(request: NextRequest) {
  logRequest(request);
  
  const { searchParams } = new URL(request.url);
  
  let products: any[] = await readData('products.json');
  const totalCount = products.length;
  
  // Filters
  const search = searchParams.get('search');
  if (search) {
    const term = search.toLowerCase();
    products = products.filter(p =>
      p.title?.toLowerCase().includes(term) ||
      p.description_en?.toLowerCase().includes(term)
    );
  }
  
  const category = searchParams.get('category');
  if (category) {
    products = products.filter(p =>
      p.category?.toLowerCase() === category.toLowerCase()
    );
  }
  
  const subCategory = searchParams.get('sub_category');
  if (subCategory) {
    products = products.filter(p =>
      p.sub_category?.toLowerCase() === subCategory.toLowerCase()
    );
  }
  
  if (searchParams.get('has_discount') === 'true') {
    products = products.filter(p => p.discount_price && p.discount_price < p.price);
  }
  
  // Sorting
  const sortField = searchParams.get('sort') || 'created_at';
  const sortOrder = searchParams.get('order') === 'asc' ? 1 : -1;
  
  products.sort((a, b) => {
    let aVal = a[sortField] || a.created_at;
    let bVal = b[sortField] || b.created_at;
    
    if (sortField === 'price') {
      aVal = a.discount_price || a.price;
      bVal = b.discount_price || b.price;
    }
    
    if (aVal < bVal) return -1 * sortOrder;
    if (aVal > bVal) return 1 * sortOrder;
    return 0;
  });
  
  // Pagination
  const page = parseInt(searchParams.get('page') || '1');
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : null;
  const filteredCount = products.length;
  
  let paginatedProducts = products;
  if (limit) {
    const startIndex = (page - 1) * limit;
    paginatedProducts = products.slice(startIndex, startIndex + limit);
  }
  
  const meta: any = {
    total_products: totalCount,
    filtered_count: filteredCount,
    returned_count: paginatedProducts.length
  };
  
  if (limit) {
    meta.pagination = {
      current_page: page,
      per_page: limit,
      total_pages: Math.ceil(filteredCount / limit)
    };
  }
  
  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    meta,
    products: paginatedProducts.map(formatProductDetail)
  }, { headers: getApiHeaders() });
}
