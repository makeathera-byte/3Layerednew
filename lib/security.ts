// Input validation and sanitization utilities

export function sanitizeInput(input: string): string {
    if (!input) return '';

    // Remove potentially dangerous characters
    return input
        .replace(/[<>]/g, '') // Remove angle brackets (XSS prevention)
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+=/gi, '') // Remove event handlers
        .trim()
        .slice(0, 1000); // Limit length
}

export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
}

export function validatePhone(phone: string): boolean {
    // Remove all non-digits
    const digits = phone.replace(/\D/g, '');
    // Check if it's 10 digits (Indian format)
    return digits.length === 10 && /^[6-9]\d{9}$/.test(digits);
}

export function validatePincode(pincode: string): boolean {
    // Indian pincode validation (6 digits)
    return /^\d{6}$/.test(pincode);
}

export function validateOrderAmount(amount: number): boolean {
    // Amount should be positive and reasonable (₹1 to ₹10,00,000)
    return amount >= 1 && amount <= 1000000 && Number.isFinite(amount);
}

export function sanitizeAddress(address: any): any {
    if (!address || typeof address !== 'object') return null;

    return {
        address: sanitizeInput(address.address || ''),
        apartment: sanitizeInput(address.apartment || ''),
        city: sanitizeInput(address.city || ''),
        state: sanitizeInput(address.state || ''),
        pincode: sanitizeInput(address.pincode || ''),
        country: sanitizeInput(address.country || 'India'),
    };
}

export function validateRazorpaySignature(orderId: string, paymentId: string, signature: string): boolean {
    // Basic validation - actual verification done server-side
    return !!(orderId && paymentId && signature &&
        orderId.length > 0 &&
        paymentId.length > 0 &&
        signature.length === 64); // SHA256 hash length
}

// SQL Injection prevention - parameterized queries
export function escapeSQLString(str: string): string {
    if (!str) return '';
    return str.replace(/'/g, "''"); // Double single quotes
}

// Prevent path traversal attacks
export function sanitizeFilePath(path: string): string {
    return path.replace(/\.\./g, '').replace(/[\/\\]/g, '');
}
