// 🔥 AI PRODUCT GENERATE API - Full AI Integration (FREE STACK)
// POST /api/ai-product-generate
// Uses: DuckDuckGo (free search) + OpenRouter (free AI)
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// 🔍 FREE SEARCH: DuckDuckGo Instant Answer API
async function searchProductInfo(query: string): Promise<string> {
  try {
    console.log(`🔍 Searching DuckDuckGo for: ${query}`);
    
    const encodedQuery = encodeURIComponent(query + ' health benefits uses');
    const url = `https://api.duckduckgo.com/?q=${encodedQuery}&format=json&no_html=1&skip_disambig=1`;
    
    const response = await axios.get(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    });
    
    const data = response.data;
    
    // Extract useful information
    let info = '';
    
    if (data.Abstract) {
      info += data.Abstract + ' ';
    }
    
    if (data.AbstractText) {
      info += data.AbstractText + ' ';
    }
    
    if (data.RelatedTopics && Array.isArray(data.RelatedTopics)) {
      data.RelatedTopics.slice(0, 3).forEach((topic: any) => {
        if (topic.Text) info += topic.Text + ' ';
      });
    }
    
    // Fallback if no results
    if (!info.trim()) {
      info = `${query} is a popular health and wellness product known for its natural ingredients and beneficial properties.`;
    }
    
    console.log(`✅ Search found ${info.length} chars of info`);
    return info.trim();
    
  } catch (error: any) {
    console.error('❌ Search error:', error.message);
    // Return fallback info
    return `${query} is a premium natural health product with multiple benefits for overall wellness.`;
  }
}

// 🤖 FREE AI: OpenRouter (GPT-3.5-turbo - FREE TIER)
async function enhanceWithAI(searchData: string, productName: string): Promise<any> {
  try {
    console.log('🤖 Enhancing with OpenRouter AI...');
    
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || 'sk-or-v1-demo-key';
    
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a professional product description expert. Create compelling content for health and wellness products.'
          },
          {
            role: 'user',
            content: `Based on this information about "${productName}":

${searchData}

Create a complete product profile in this exact JSON format:
{
  "description_en": "Compelling English description (150-200 words)",
  "description_mr": "Marathi description (100-150 words)",
  "benefits": ["benefit 1", "benefit 2", "benefit 3", "benefit 4", "benefit 5", "benefit 6", "benefit 7"],
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "tag8", "tag9", "tag10"],
  "category": "main category",
  "sub_category": "sub category"
}

Make benefits actionable and specific. Tags should be SEO-friendly keywords. Respond ONLY with the JSON.`
          }
        ],
        max_tokens: 1500,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://sskcw-api.vercel.app',
          'X-Title': 'SSKCW Product Generator'
        },
        timeout: 30000
      }
    );
    
    const aiContent = response.data.choices[0].message.content;
    console.log('✅ AI enhancement complete');
    
    // Parse JSON from AI response
    try {
      // Extract JSON if wrapped in code blocks
      const jsonMatch = aiContent.match(/```json\n?([\s\S]*?)\n?```/) || 
                        aiContent.match(/```\n?([\s\S]*?)\n?```/) ||
                        [null, aiContent];
      
      const jsonStr = jsonMatch[1] || aiContent;
      const parsed = JSON.parse(jsonStr.trim());
      
      return {
        ...parsed,
        ai_model: 'openai/gpt-3.5-turbo',
        ai_provider: 'openrouter'
      };
    } catch (parseError) {
      console.error('❌ JSON parse error, returning raw content');
      return {
        description_en: aiContent,
        description_mr: '',
        benefits: [],
        tags: [],
        category: 'wellness',
        sub_category: 'general',
        ai_model: 'openai/gpt-3.5-turbo',
        ai_provider: 'openrouter',
        raw_content: aiContent
      };
    }
    
  } catch (error: any) {
    console.error('❌ AI enhancement error:', error.message);
    
    // Return fallback/mock data
    return {
      description_en: `Discover ${productName} - a premium natural product designed to support your health and wellness journey. Crafted with care using traditional knowledge and modern science.`,
      description_mr: `${productName} - तुमच्या आरोग्यासाठी एक उत्कृष्ट नैसर्गिक उत्पादन. पारंपारिक ज्ञान आणि आधुनिक शास्त्राचा वापर करून तयार केलेले.`,
      benefits: [
        'Supports overall health and wellness',
        'Boosts natural immunity',
        'Enhances energy and vitality',
        'Promotes better digestion',
        'Rich in natural nutrients',
        'Safe for daily consumption',
        'Clinically tested formula'
      ],
      tags: [
        'natural',
        'organic',
        'wellness',
        'health',
        'ayurveda',
        'supplement',
        'immunity',
        'energy',
        'daily-care',
        'holistic'
      ],
      category: 'wellness',
      sub_category: 'general',
      ai_model: 'fallback-mock',
      ai_provider: 'local'
    };
  }
}

// Main API Handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

  try {
    const { productName, useSearch = true, useAI = true } = req.body;
    
    if (!productName) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: productName'
      });
    }
    
    console.log(`🚀 Generating AI product: ${productName}`);
    const startTime = Date.now();
    
    // Step 1: Search
    let searchData = '';
    if (useSearch) {
      searchData = await searchProductInfo(productName);
    }
    
    // Step 2: AI Enhance
    let enhancedData: any = {};
    if (useAI) {
      enhancedData = await enhanceWithAI(searchData, productName);
    }
    
    // Step 3: Build final product
    const finalProduct = {
      id: `prod_ai_${Date.now()}`,
      title: productName,
      ...enhancedData,
      search_data_used: searchData.substring(0, 200) + '...',
      ai_generated: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const duration = Date.now() - startTime;
    console.log(`✅ Product generated in ${duration}ms`);
    
    return res.status(200).json({
      success: true,
      message: 'Product generated successfully',
      processing_time_ms: duration,
      product: finalProduct
    });
    
  } catch (error: any) {
    console.error('❌ API Error:', error);
    return res.status(500).json({
      success: false,
      error: 'AI generation failed',
      message: error.message
    });
  }
}
