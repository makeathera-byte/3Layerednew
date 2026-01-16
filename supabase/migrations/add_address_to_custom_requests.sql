-- Add address fields to custom_requests table
ALTER TABLE custom_requests ADD COLUMN IF NOT EXISTS address TEXT;

ALTER TABLE custom_requests ADD COLUMN IF NOT EXISTS city TEXT;

ALTER TABLE custom_requests ADD COLUMN IF NOT EXISTS state TEXT;

ALTER TABLE custom_requests ADD COLUMN IF NOT EXISTS pincode TEXT;

ALTER TABLE custom_requests ADD COLUMN IF NOT EXISTS country TEXT;