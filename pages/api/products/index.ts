// 🔥 PRODUCTS API - Advanced Listing with Filters (Pages Router)
import type { NextApiRequest, NextApiResponse } from 'next';
import { readData, formatProductList } from '@/lib/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { search, category, sub_category, min_price, max_price, in_stock, has_discount, sort, order, page, limit } = req.query;
  
  let products: any[] = await readData('products.json');
  const totalCount = products.length;
  
  // Search (title, description, tags, benefits)
  if (search) {
    const term = (search as string).toLowerCase();
    products = products.filter(p =>
      p.title?.toLowerCase().includes(term) ||
      p.description_en?.toLowerCase().includes(term) ||
      p.description_mr?.toLowerCase().includes(term) ||
      p.tags?.some((tag: string) => tag.toLowerCase().includes(term)) ||
      p.benefits?.some((b: string) => b.toLowerCase().includes(term))
    );
  }
  
  // Category filter
  if (category) {
    products = products.filter(p =>
      p.category?.toLowerCase() === (category as string).toLowerCase()
    );
  }
  
  // Sub-category filter
  if (sub_category) {
    products = products.filter(p =>
      p.sub_category?.toLowerCase() === (sub_category as string).toLowerCase()
    );
  }
  
  // Price range
  if (min_price) {
    products = products.filter(p => (p.discount_price || p.price) >= parseFloat(min_price as string));
  }
  if (max_price) {
    products = products.filter(p => (p.discount_price || p.price) <= parseFloat(max_price as string));
  }
  
  // Stock filter
  if (in_stock === 'true') {
    products = products.filter(p => (p.stock || 999) > 0);
  }
  
  // Discount filter
  if (has_discount === 'true') {
    products = products.filter(p => p.discount_price && p.discount_price < p.price);
  }
  
  // Sorting
  const sortField = (sort as string) || 'created_at';
  const sortOrder = order === 'asc' ? 1 : -1;
  
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
  
  // Pagination
  const pageNum = parseInt((page as string) || '1');
  const limitNum = limit ? parseInt(limit as string) : null;
  const filteredCount = products.length;
  
  let paginatedProducts = products;
  if (limitNum) {
    const startIndex = (pageNum - 1) * limitNum;
    paginatedProducts = products.slice(startIndex, startIndex + limitNum);
  }
  
  // Response
  const meta: any = {
    total_products: totalCount,
    filtered_count: filteredCount,
    returned_count: paginatedProducts.length,
    filters_applied: Object.keys(req.query).filter(k => !['page', 'limit', 'sort', 'order'].includes(k))
  };
  
  if (limitNum) {
    meta.pagination = {
      current_page: pageNum,
      per_page: limitNum,
      total_pages: Math.ceil(filteredCount / limitNum),
      has_next: pageNum < Math.ceil(filteredCount / limitNum),
      has_prev: pageNum > 1
    };
  }
  
  res.status(200).json({
    success: true,
    timestamp: new Date().toISOString(),
    meta,
    products: paginatedProducts.map(formatProductList)
  });
}
