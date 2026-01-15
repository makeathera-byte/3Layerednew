-- Enable Row Level Security on orders table
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Service role has full access" ON orders;

DROP POLICY IF EXISTS "No public access" ON orders;

-- Policy: Allow service role to do anything (for API routes)
CREATE POLICY "Service role has full access" ON orders FOR ALL TO service_role USING (true)
WITH
    CHECK (true);

-- Policy: Deny all public access (security default)
CREATE POLICY "No public access" ON orders FOR ALL TO anon USING (false);

-- Optional: If you add user authentication later, add this policy
-- CREATE POLICY "Users can read own orders"
-- ON orders
-- FOR SELECT
-- TO authenticated
-- USING (customer_email = auth.jwt() ->> 'email');