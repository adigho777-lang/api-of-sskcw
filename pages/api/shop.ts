// 🔥 SHOP / OFFERS API - Full Product Details (Pages Router)
// Moved to /api/shop to avoid conflict with [id] dynamic route
import type { NextApiRequest, NextApiResponse } from 'next';
import { readData, formatProductDetail } from '@/lib/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { search, category, sub_category, has_discount, sort, order, page, limit } = req.query;
  
  let products: any[] = await readData('products.json');
  const totalCount = products.length;
  
  // Filters
  if (search) {
    const term = (search as string).toLowerCase();
    products = products.filter(p =>
      p.title?.toLowerCase().includes(term) ||
      p.description_en?.toLowerCase().includes(term)
    );
  }
  
  if (category) {
    products = products.filter(p =>
      p.category?.toLowerCase() === (category as string).toLowerCase()
    );
  }
  
  if (sub_category) {
    products = products.filter(p =>
      p.sub_category?.toLowerCase() === (sub_category as string).toLowerCase()
    );
  }
  
  if (has_discount === 'true') {
    products = products.filter(p => p.discount_price && p.discount_price < p.price);
  }
  
  // Sorting
  const sortField = (sort as string) || 'created_at';
  const sortOrder = order === 'asc' ? 1 : -1;
  
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
  const pageNum = parseInt((page as string) || '1');
  const limitNum = limit ? parseInt(limit as string) : null;
  const filteredCount = products.length;
  
  let paginatedProducts = products;
  if (limitNum) {
    const startIndex = (pageNum - 1) * limitNum;
    paginatedProducts = products.slice(startIndex, startIndex + limitNum);
  }
  
  const meta: any = {
    total_products: totalCount,
    filtered_count: filteredCount,
    returned_count: paginatedProducts.length
  };
  
  if (limitNum) {
    meta.pagination = {
      current_page: pageNum,
      per_page: limitNum,
      total_pages: Math.ceil(filteredCount / limitNum)
    };
  }
  
  res.status(200).json({
    success: true,
    timestamp: new Date().toISOString(),
    meta,
    products: paginatedProducts.map(formatProductDetail)
  });
}
