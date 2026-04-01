// 🔥 ROOT API - SSKCW PRO API (Pages Router)
import type { NextApiRequest, NextApiResponse } from 'next';
import { readData } from '@/lib/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const products = await readData('products.json');
  const orders = await readData('orders.json');
  const leads = await readData('leads.json');
  
  const categories = Array.from(new Set(products.map((p: any) => p.category).filter(Boolean)));
  
  res.status(200).json({
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
  });
}
