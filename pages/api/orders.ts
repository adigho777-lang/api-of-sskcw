// 🔥 ORDERS API (Pages Router)
import type { NextApiRequest, NextApiResponse } from 'next';
import { readData, writeData, generateId, validateFields } from '@/lib/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const orders = await readData('orders.json');
    return res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      count: orders.length,
      orders
    });
  }
  
  if (req.method === 'POST') {
    const { name, phone, email, address, product_id, product_title, quantity, total_amount, notes } = req.body;
    
    // Validation
    const { valid, missing } = validateFields(req.body, ['name', 'phone', 'product_id']);
    if (!valid) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        required: ['name', 'phone', 'product_id'],
        missing
      });
    }
    
    const orders = await readData('orders.json');
    
    const newOrder = {
      id: generateId('order'),
      name,
      phone,
      email: email || null,
      address: address || null,
      product_id,
      product_title: product_title || null,
      quantity: parseInt(quantity) || 1,
      total_amount: parseFloat(total_amount) || 0,
      status: 'pending',
      notes: notes || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    orders.push(newOrder);
    await writeData('orders.json', orders);
    
    return res.status(201).json({
      success: true,
      timestamp: new Date().toISOString(),
      message: 'Order created successfully',
      order: newOrder
    });
  }
  
  return res.status(405).json({ success: false, error: 'Method not allowed' });
}
