import { NextRequest, NextResponse } from 'next/server';

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT = {
    MAX_REQUESTS: 10, // Max requests per window
    WINDOW_MS: 60000, // 1 minute window
};

export function rateLimit(identifier: string): boolean {
    const now = Date.now();
    const userLimit = rateLimitMap.get(identifier);

    if (!userLimit || now > userLimit.resetTime) {
        // Reset or create new limit
        rateLimitMap.set(identifier, {
            count: 1,
            resetTime: now + RATE_LIMIT.WINDOW_MS,
        });
        return true;
    }

    if (userLimit.count >= RATE_LIMIT.MAX_REQUESTS) {
        return false; // Rate limit exceeded
    }

    userLimit.count++;
    return true;
}

export function getRateLimitHeaders(identifier: string) {
    const userLimit = rateLimitMap.get(identifier);
    if (!userLimit) return {};

    return {
        'X-RateLimit-Limit': RATE_LIMIT.MAX_REQUESTS.toString(),
        'X-RateLimit-Remaining': Math.max(0, RATE_LIMIT.MAX_REQUESTS - userLimit.count).toString(),
        'X-RateLimit-Reset': new Date(userLimit.resetTime).toISOString(),
    };
}

// Cleanup old entries periodically
setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateLimitMap.entries()) {
        if (now > value.resetTime) {
            rateLimitMap.delete(key);
        }
    }
}, RATE_LIMIT.WINDOW_MS);
