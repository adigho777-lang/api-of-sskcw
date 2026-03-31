// 🔥 ADVANCED MIDDLEWARE - SSKCW API
import { NextRequest, NextResponse } from 'next/server';

// Request logging
export function logRequest(req: NextRequest) {
  const timestamp = new Date().toISOString();
  const ip = req.ip || 'unknown';
  console.log(`[${timestamp}] ${req.method} ${req.nextUrl.pathname} - IP: ${ip}`);
}

// Rate limiting (simple in-memory)
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 100; // requests per minute

export function checkRateLimit(req: NextRequest): boolean {
  const ip = req.ip || 'unknown';
  const now = Date.now();
  
  const record = requestCounts.get(ip);
  
  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + 60000 });
    return true;
  }
  
  if (record.count >= RATE_LIMIT) {
    return false;
  }
  
  record.count++;
  return true;
}

// CORS headers
export function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400'
  };
}

// Security headers
export function securityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Cache-Control': 'public, max-age=300'
  };
}

// Combined headers
export function getApiHeaders() {
  return {
    ...corsHeaders(),
    ...securityHeaders(),
    'Content-Type': 'application/json'
  };
}

// Error responses
export function methodNotAllowed() {
  return NextResponse.json(
    { success: false, error: { code: 405, message: 'Method not allowed' } },
    { status: 405, headers: getApiHeaders() }
  );
}

export function rateLimitExceeded() {
  return NextResponse.json(
    { success: false, error: { code: 429, message: 'Rate limit exceeded. Try again later.' } },
    { status: 429, headers: getApiHeaders() }
  );
}

export function notFound(resource: string) {
  return NextResponse.json(
    { success: false, error: { code: 404, message: `${resource} not found` } },
    { status: 404, headers: getApiHeaders() }
  );
}

export function badRequest(message: string, details?: any) {
  return NextResponse.json(
    { success: false, error: { code: 400, message, details } },
    { status: 400, headers: getApiHeaders() }
  );
}

export function serverError(message: string = 'Internal server error') {
  return NextResponse.json(
    { success: false, error: { code: 500, message } },
    { status: 500, headers: getApiHeaders() }
  );
}
