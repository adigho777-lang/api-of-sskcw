// 🔥 AI ENHANCE & SAVE API - Full Product Update
// POST /api/ai-enhance-and-save
// Enhances product with AI and saves back to products database
import type { NextApiRequest, NextApiResponse } from 'next';
import { readData, writeData } from '@/lib/utils';

// Mock AI enhancement (replace with OpenAI API)
async function enhanceProductWithAI(title: string, description: string) {
  const words = title.toLowerCase().split(' ');
  const category = words[0] || 'product';
  
  return {
    description_en: `Discover the amazing ${title} - a premium quality product designed to enhance your daily wellness routine. Crafted with carefully selected natural ingredients, this ${category} offers exceptional benefits for your health and well-being.`,
    description_mr: `अद्भुत ${title} शोधा - आपल्या दैनंदिन wellness रुटीन मध्ये सुधारणा करण्यासाठी डिझाइन केलेला प्रीमियम गुणवत्ता उत्पादन.`,
    benefits: [
      `Boosts overall ${category} health naturally`,
      `Supports immune system function`,
      `Enhances energy levels and vitality`,
      `Promotes better digestion and metabolism`,
      `Rich in essential vitamins and minerals`,
      `100% natural and safe for daily use`,
      `Clinically tested for maximum efficacy`
    ],
    tags: [
      category,
      'natural',
      'organic',
      'wellness',
      'health',
      'ayurveda',
      'supplement',
      'daily-care',
      'immunity',
      'energy'
    ]
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

  try {
    const { product_id, title, description } = req.body;
    
    if (!product_id || !title || !description) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        required: ['product_id', 'title', 'description']
      });
    }
    
    console.log(`🤖 Enhancing & saving product: ${product_id}`);
    
    // Enhance with AI
    const enhanced = await enhanceProductWithAI(title, description);
    
    // Read products
    let products = await readData('products.json');
    const productIndex = products.findIndex((p: any) => p.id === product_id);
    
    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
        product_id
      });
    }
    
    // Update product with enhanced content
    products[productIndex] = {
      ...products[productIndex],
      description_en: enhanced.description_en,
      description_mr: enhanced.description_mr,
      benefits: enhanced.benefits,
      tags: enhanced.tags,
      ai_enhanced: true,
      enhanced_at: new Date().toISOString()
    };
    
    // Save (Note: Vercel is read-only, this only works locally)
    await writeData('products.json', products);
    
    return res.status(200).json({
      success: true,
      message: 'Product enhanced and saved',
      product: products[productIndex]
    });
    
  } catch (error: any) {
    console.error('❌ Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to enhance and save product',
      message: error.message
    });
  }
}
