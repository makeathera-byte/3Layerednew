-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread' CHECK (
        status IN (
            'unread',
            'read',
            'replied',
            'resolved'
        )
    ),
    admin_notes TEXT,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        read_at TIMESTAMP
    WITH
        TIME ZONE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions (email);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions (status);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions (created_at DESC);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for service role (full access)
CREATE POLICY "Service role has full access to contact_submissions" ON contact_submissions FOR ALL TO service_role USING (true)
WITH
    CHECK (true);