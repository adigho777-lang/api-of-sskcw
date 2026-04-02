// 🔥 ORDERS API - Mock Success Version (Vercel Compatible)
// This version returns success without saving to filesystem (Vercel is read-only)
import type { NextApiRequest, NextApiResponse } from 'next';

// In-memory storage for orders (resets on each deploy)
const orders: any[] = [];

function generateOrderId(): string {
  return `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET - Return all orders
  if (req.method === 'GET') {
    console.log('📥 GET /api/orders - Returning', orders.length, 'orders');
    return res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      count: orders.length,
      orders
    });
  }
  
  // POST - Create new order
  if (req.method === 'POST') {
    try {
      console.log('📥 POST /api/orders - Creating order');
      console.log('📦 Request body:', req.body);
      
      // Check if body exists
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Request body is empty',
          message: 'Please provide order details'
        });
      }
      
      const { name, phone, email, address, product_id, product_title, quantity, total_amount, notes } = req.body;
      
      // Validate required fields
      if (!name || !phone || !product_id) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields',
          required: ['name', 'phone', 'product_id'],
          received: { name, phone, product_id }
        });
      }
      
      // Create order object
      const newOrder = {
        id: generateOrderId(),
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
      
      // Save to in-memory array
      orders.push(newOrder);
      
      console.log('✅ Order created:', newOrder.id);
      console.log(`📊 Total orders: ${orders.length}`);
      
      return res.status(201).json({
        success: true,
        timestamp: new Date().toISOString(),
        message: 'Order created successfully',
        order: newOrder
      });
      
    } catch (error: any) {
      console.error('❌ Error creating order:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to create order',
        message: error.message
      });
    }
  }
  
  return res.status(405).json({ success: false, error: 'Method not allowed' });
}
