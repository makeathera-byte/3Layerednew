import { NextResponse } from 'next/server';

interface RetryOptions {
    maxRetries: number;
    delayMs: number;
    backoff?: boolean;
}

export async function withRetry<T>(
    operation: () => Promise<T>,
    options: RetryOptions = { maxRetries: 3, delayMs: 1000, backoff: true }
): Promise<T> {
    let lastError: any;

    for (let attempt = 0; attempt <= options.maxRetries; attempt++) {
        try {
            return await operation();
        } catch (error) {
            lastError = error;

            if (attempt < options.maxRetries) {
                const delay = options.backoff
                    ? options.delayMs * Math.pow(2, attempt)
                    : options.delayMs;

                console.log(`Retry attempt ${attempt + 1}/${options.maxRetries} after ${delay}ms`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }

    throw lastError;
}

export function handleAPIError(error: any, context: string) {
    console.error(`${context} error:`, error);

    // Check for specific error types
    if (error.code === 'PGRST301' || error.code === '23505') {
        // Duplicate key error
        return NextResponse.json(
            { error: 'Duplicate entry. Please try again.' },
            { status: 409 }
        );
    }

    if (error.code === '23503') {
        // Foreign key violation
        return NextResponse.json(
            { error: 'Invalid reference. Please check your data.' },
            { status: 400 }
        );
    }

    if (error.message?.includes('timeout') || error.code === 'PGRST504') {
        // Database timeout
        return NextResponse.json(
            { error: 'Request timeout. Please try again.' },
            { status: 504 }
        );
    }

    // Generic error
    return NextResponse.json(
        { error: 'An unexpected error occurred. Please try again.' },
        { status: 500 }
    );
}
