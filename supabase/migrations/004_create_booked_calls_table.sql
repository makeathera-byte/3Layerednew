-- Create booked_calls table
CREATE TABLE IF NOT EXISTS booked_calls (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    status TEXT DEFAULT 'new' CHECK (
        status IN (
            'new',
            'contacted',
            'scheduled',
            'completed',
            'cancelled'
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
CREATE INDEX IF NOT EXISTS idx_booked_calls_email ON booked_calls (email);

CREATE INDEX IF NOT EXISTS idx_booked_calls_status ON booked_calls (status);

CREATE INDEX IF NOT EXISTS idx_booked_calls_created_at ON booked_calls (created_at DESC);

-- Enable Row Level Security
ALTER TABLE booked_calls ENABLE ROW LEVEL SECURITY;

-- Create policy for service role (full access)
CREATE POLICY "Service role has full access to booked_calls" ON booked_calls FOR ALL TO service_role USING (true)
WITH
    CHECK (true);

-- Trigger to auto-update updated_at
CREATE TRIGGER update_booked_calls_updated_at
  BEFORE UPDATE ON booked_calls
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();