-- Add unique constraint to order_number to prevent duplicates (idempotent)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'orders_order_number_unique'
    ) THEN
        ALTER TABLE orders ADD CONSTRAINT orders_order_number_unique UNIQUE (order_number);
    END IF;
END $$;

-- Add indexes for faster lookups (already idempotent with IF NOT EXISTS)
CREATE INDEX IF NOT EXISTS idx_orders_razorpay_payment_id ON orders (razorpay_payment_id);

CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders (payment_status);