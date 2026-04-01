// 🔥 STATS API (Pages Router)
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

  const [products, orders, leads] = await Promise.all([
    readData('products.json'),
    readData('orders.json'),
    readData('leads.json')
  ]);
  
  const totalRevenue = (orders as any[]).reduce((sum, o) => sum + (o.total_amount || 0), 0);
  const avgPrice = products.length > 0
    ? (products as any[]).reduce((sum, p) => sum + (p.discount_price || p.price), 0) / products.length
    : 0;
  
  // Price ranges
  const priceRanges = {
    under_500: (products as any[]).filter(p => (p.discount_price || p.price) < 500).length,
    '500_to_1000': (products as any[]).filter(p => {
      const price = p.discount_price || p.price;
      return price >= 500 && price < 1000;
    }).length,
    '1000_to_2000': (products as any[]).filter(p => {
      const price = p.discount_price || p.price;
      return price >= 1000 && price < 2000;
    }).length,
    above_2000: (products as any[]).filter(p => (p.discount_price || p.price) >= 2000).length
  };
  
  // Category distribution
  const categoryDistribution: any = {};
  (products as any[]).forEach(p => {
    if (p.category) {
      categoryDistribution[p.category] = (categoryDistribution[p.category] || 0) + 1;
    }
  });
  
  res.status(200).json({
    success: true,
    timestamp: new Date().toISOString(),
    stats: {
      products: {
        total: products.length,
        with_discount: (products as any[]).filter(p => p.discount_price && p.discount_price < p.price).length,
        in_stock: (products as any[]).filter(p => (p.stock || 999) > 0).length,
        avg_price: Math.round(avgPrice),
        price_ranges: priceRanges,
        category_distribution: categoryDistribution
      },
      orders: {
        total: orders.length,
        pending: (orders as any[]).filter(o => o.status === 'pending').length,
        completed: (orders as any[]).filter(o => o.status === 'completed').length,
        cancelled: (orders as any[]).filter(o => o.status === 'cancelled').length,
        total_revenue: totalRevenue
      },
      leads: {
        total: leads.length
      }
    }
  });
}
