-- Create custom_requests table
CREATE TABLE IF NOT EXISTS custom_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    project_description TEXT NOT NULL,
    reference_images JSONB,
    budget_range TEXT,
    timeline TEXT,
    status TEXT DEFAULT 'new' CHECK (
        status IN (
            'new',
            'reviewing',
            'quoted',
            'accepted',
            'rejected',
            'completed'
        )
    ),
    admin_notes TEXT,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_custom_requests_email ON custom_requests (email);

CREATE INDEX IF NOT EXISTS idx_custom_requests_status ON custom_requests (status);

CREATE INDEX IF NOT EXISTS idx_custom_requests_created_at ON custom_requests (created_at DESC);

-- Enable Row Level Security
ALTER TABLE custom_requests ENABLE ROW LEVEL SECURITY;

-- Create policy for service role (full access)
CREATE POLICY "Service role has full access to custom_requests" ON custom_requests FOR ALL TO service_role USING (true)
WITH
    CHECK (true);

-- Trigger to auto-update updated_at
CREATE TRIGGER update_custom_requests_updated_at
  BEFORE UPDATE ON custom_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();