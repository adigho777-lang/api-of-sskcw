// 🔥 PRODUCT DETAIL API (Pages Router)
import type { NextApiRequest, NextApiResponse } from 'next';
import { readData, formatProductDetail } from '@/lib/utils';

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

  const { id } = req.query;
  
  const products: any[] = await readData('products.json');
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Product not found',
      message: `No product found with ID: ${id}`
    });
  }
  
  res.status(200).json({
    success: true,
    timestamp: new Date().toISOString(),
    product: formatProductDetail(product)
  });
}
