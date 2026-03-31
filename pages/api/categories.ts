// 🔥 CATEGORIES API (Pages Router)
import type { NextApiRequest, NextApiResponse } from 'next';
import { readData } from '@/lib/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const products: any[] = await readData('products.json');
  
  // Get unique categories with stats
  const categoryMap = new Map();
  products.forEach(p => {
    if (p.category) {
      if (!categoryMap.has(p.category)) {
        categoryMap.set(p.category, { count: 0, products: [] });
      }
      categoryMap.get(p.category).count++;
      categoryMap.get(p.category).products.push(p);
    }
  });
  
  const categories = Array.from(categoryMap.entries()).map(([name, data]: [string, any]) => ({
    name,
    product_count: data.count,
    min_price: Math.min(...data.products.map((p: any) => p.discount_price || p.price)),
    max_price: Math.max(...data.products.map((p: any) => p.discount_price || p.price)),
    sub_categories: Array.from(new Set(data.products.map((p: any) => p.sub_category).filter(Boolean)))
  }));
  
  const subCategories = Array.from(new Set(products.map((p: any) => p.sub_category).filter(Boolean)));
  
  res.status(200).json({
    success: true,
    timestamp: new Date().toISOString(),
    meta: {
      total_categories: categories.length,
      total_sub_categories: subCategories.length
    },
    categories,
    sub_categories: subCategories
  });
}
