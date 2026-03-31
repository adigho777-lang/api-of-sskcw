// 🔥 PRODUCT DETAIL API
import { NextRequest, NextResponse } from 'next/server';
import { readData, formatProductDetail } from '@/lib/utils';
import { logRequest, getApiHeaders, notFound } from '@/lib/middleware';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  logRequest(request);
  
  const products: any[] = await readData('products.json');
  const product = products.find(p => p.id === params.id);
  
  if (!product) {
    return notFound('Product');
  }
  
  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    product: formatProductDetail(product)
  }, { headers: getApiHeaders() });
}
