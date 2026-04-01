// 🔥 LEADS API (Pages Router)
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
    const leads = await readData('leads.json');
    return res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      count: leads.length,
      leads
    });
  }
  
  if (req.method === 'POST') {
    const { name, phone, email, goal, message, source } = req.body;
    
    // Validation
    const { valid, missing } = validateFields(req.body, ['name', 'phone']);
    if (!valid) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        required: ['name', 'phone'],
        missing
      });
    }
    
    const leads = await readData('leads.json');
    
    const newLead = {
      id: generateId('lead'),
      name,
      phone,
      email: email || null,
      goal: goal || null,
      message: message || null,
      source: source || 'api',
      created_at: new Date().toISOString()
    };
    
    leads.push(newLead);
    await writeData('leads.json', leads);
    
    return res.status(201).json({
      success: true,
      timestamp: new Date().toISOString(),
      message: 'Lead created successfully',
      lead: newLead
    });
  }
  
  return res.status(405).json({ success: false, error: 'Method not allowed' });
}
