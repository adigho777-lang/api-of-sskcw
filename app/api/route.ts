// 🔥 ROOT API - SSKCW PRO API
import { NextResponse } from 'next/server';
import { readData } from '@/lib/utils';
import { logRequest, getApiHeaders } from '@/lib/middleware';

export async function GET(request: Request) {
  logRequest(request as any);
  
  const products = await readData('products.json');
  const orders = await readData('orders.json');
  const leads = await readData('leads.json');
  
  const categories = [...new Set(products.map((p: any) => p.category).filter(Boolean))];
  
  const response = {
    success: true,
    message: '🔥 SSKCW PRO API - Next.js Edition',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    stats: {
      total_products: products.length,
      total_categories: categories.length,
      total_orders: orders.length,
      total_leads: leads.length
    },
    endpoints: {
      products: {
        list: 'GET /api/products',
        detail: 'GET /api/products/:id',
        shop: 'GET /api/products/shop',
        create: 'POST /api/products'
      },
      categories: 'GET /api/categories',
      stats: 'GET /api/stats',
      orders: 'POST /api/orders',
      leads: 'POST /api/leads'
    },
    features: [
      'Full-text search',
      'Advanced filtering',
      'Dynamic sorting',
      'Smart pagination',
      'Rate limiting',
      'Security headers'
    ],
    documentation: 'https://github.com/adigho777-lang/api-of-sskcw#readme'
  };
  
  return NextResponse.json(response, { headers: getApiHeaders() });
}
