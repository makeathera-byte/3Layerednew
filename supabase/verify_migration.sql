-- Verification query - Check if columns exist
SELECT column_name, data_type
FROM information_schema.columns
WHERE
    table_name = 'orders'
    AND column_name IN (
        'payment_method',
        'notes',
        'razorpay_order_id',
        'razorpay_payment_id',
        'razorpay_signature'
    );

-- If columns don't exist, run this:
-- ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'cod';
-- ALTER TABLE orders ADD COLUMN IF NOT EXISTS notes TEXT;
-- ALTER TABLE orders ADD COLUMN IF NOT EXISTS razorpay_order_id TEXT;
-- ALTER TABLE orders ADD COLUMN IF NOT EXISTS razorpay_payment_id TEXT;
-- ALTER TABLE orders ADD COLUMN IF NOT EXISTS razorpay_signature TEXT;