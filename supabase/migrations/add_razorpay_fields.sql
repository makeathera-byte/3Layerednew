-- Database migration for Razorpay integration
-- Run this SQL in Supabase SQL Editor

-- Add payment-related columns to orders table
ALTER TABLE orders
ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'cod';

ALTER TABLE orders ADD COLUMN IF NOT EXISTS notes TEXT;

ALTER TABLE orders ADD COLUMN IF NOT EXISTS razorpay_order_id TEXT;

ALTER TABLE orders ADD COLUMN IF NOT EXISTS razorpay_payment_id TEXT;

ALTER TABLE orders ADD COLUMN IF NOT EXISTS razorpay_signature TEXT;

-- payment_status column should already exist from previous setup
-- If not, uncomment the line below:
-- ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending';

-- Add comment to document the columns
COMMENT ON COLUMN orders.payment_method IS 'Payment method: cod or online';

COMMENT ON COLUMN orders.payment_status IS 'Payment status: pending, completed, or failed';

COMMENT ON COLUMN orders.razorpay_order_id IS 'Razorpay order ID for online payments';

COMMENT ON COLUMN orders.razorpay_payment_id IS 'Razorpay payment ID after successful payment';

COMMENT ON COLUMN orders.razorpay_signature IS 'Razorpay signature for payment verification';