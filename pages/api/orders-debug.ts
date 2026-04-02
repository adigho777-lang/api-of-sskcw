// 🔥 ORDERS API (Pages Router) - With Debug Logging
import type { NextApiRequest, NextApiResponse } from 'next';
import { readData, writeData, generateId, validateFields } from '@/lib/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      console.log('📥 GET /api/orders - Fetching orders');
      const orders = await readData('orders.json');
      console.log(`✅ Found ${orders.length} orders`);
      
      return res.status(200).json({
        success: true,
        timestamp: new Date().toISOString(),
        count: orders.length,
        orders
      });
    } catch (error: any) {
      console.error('❌ GET Error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch orders',
        details: error.message
      });
    }
  }
  
  if (req.method === 'POST') {
    try {
      console.log('📥 POST /api/orders - Creating new order');
      console.log('📦 Request body:', JSON.stringify(req.body, null, 2));
      
      // Check if body exists
      if (!req.body || Object.keys(req.body).length === 0) {
        console.error('❌ Empty request body');
        return res.status(400).json({
          success: false,
          error: 'Request body is empty',
          message: 'Please provide order details in the request body'
        });
      }
      
      const { name, phone, email, address, product_id, product_title, quantity, total_amount, notes } = req.body;
      
      // Validation
      console.log('🔍 Validating required fields...');
      const { valid, missing } = validateFields(req.body, ['name', 'phone', 'product_id']);
      if (!valid) {
        console.error('❌ Validation failed. Missing:', missing);
        return res.status(400).json({
          success: false,
          error: 'Missing required fields',
          required: ['name', 'phone', 'product_id'],
          missing,
          received: req.body
        });
      }
      
      console.log('✅ Validation passed');
      console.log('💾 Reading existing orders...');
      
      let orders: any[];
      try {
        orders = await readData('orders.json');
        console.log(`📊 Found ${orders.length} existing orders`);
      } catch (readError: any) {
        console.log('ℹ️ No existing orders file, starting fresh');
        orders = [];
      }
      
      const newOrder = {
        id: generateId('order'),
        name: name?.trim(),
        phone: phone?.trim(),
        email: email?.trim() || null,
        address: address?.trim() || null,
        product_id: product_id?.trim(),
        product_title: product_title?.trim() || null,
        quantity: parseInt(quantity) || 1,
        total_amount: parseFloat(total_amount) || 0,
        status: 'pending',
        notes: notes?.trim() || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      console.log('📝 New order object:', JSON.stringify(newOrder, null, 2));
      
      orders.push(newOrder);
      
      console.log('💾 Saving orders to file...');
      await writeData('orders.json', orders);
      console.log('✅ Order saved successfully');
      
      return res.status(201).json({
        success: true,
        timestamp: new Date().toISOString(),
        message: 'Order created successfully',
        order: newOrder
      });
      
    } catch (error: any) {
      console.error('❌ POST Error:', error);
      console.error('❌ Error stack:', error.stack);
      
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  }
  
  return res.status(405).json({ success: false, error: 'Method not allowed' });
}
