// 🔥 ORDERS API
import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData, generateId, validateFields } from '@/lib/utils';
import { logRequest, getApiHeaders, badRequest } from '@/lib/middleware';

export async function GET(request: NextRequest) {
  logRequest(request);
  
  const orders = await readData('orders.json');
  
  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    count: orders.length,
    orders
  }, { headers: getApiHeaders() });
}

export async function POST(request: NextRequest) {
  logRequest(request);
  
  try {
    const body = await request.json();
    
    // Validation
    const { valid, missing } = validateFields(body, ['name', 'phone', 'product_id']);
    if (!valid) {
      return badRequest('Missing required fields', { required: ['name', 'phone', 'product_id'], missing });
    }
    
    const orders = await readData('orders.json');
    
    const newOrder = {
      id: generateId('order'),
      name: body.name,
      phone: body.phone,
      email: body.email || null,
      address: body.address || null,
      product_id: body.product_id,
      product_title: body.product_title || null,
      quantity: parseInt(body.quantity) || 1,
      total_amount: parseFloat(body.total_amount) || 0,
      status: 'pending',
      notes: body.notes || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    orders.push(newOrder);
    await writeData('orders.json', orders);
    
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      message: 'Order created successfully',
      order: newOrder
    }, { status: 201, headers: getApiHeaders() });
  } catch (error) {
    return badRequest('Invalid JSON body');
  }
}
