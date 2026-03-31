// 🔥 LEADS API
import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData, generateId, validateFields } from '@/lib/utils';
import { logRequest, getApiHeaders, badRequest } from '@/lib/middleware';

export async function GET(request: NextRequest) {
  logRequest(request);
  
  const leads = await readData('leads.json');
  
  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    count: leads.length,
    leads
  }, { headers: getApiHeaders() });
}

export async function POST(request: NextRequest) {
  logRequest(request);
  
  try {
    const body = await request.json();
    
    // Validation
    const { valid, missing } = validateFields(body, ['name', 'phone']);
    if (!valid) {
      return badRequest('Missing required fields', { required: ['name', 'phone'], missing });
    }
    
    const leads = await readData('leads.json');
    
    const newLead = {
      id: generateId('lead'),
      name: body.name,
      phone: body.phone,
      email: body.email || null,
      goal: body.goal || null,
      message: body.message || null,
      source: body.source || 'api',
      created_at: new Date().toISOString()
    };
    
    leads.push(newLead);
    await writeData('leads.json', leads);
    
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      message: 'Lead created successfully',
      lead: newLead
    }, { status: 201, headers: getApiHeaders() });
  } catch (error) {
    return badRequest('Invalid JSON body');
  }
}
