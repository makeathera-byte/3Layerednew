-- Add unique constraint to prevent duplicate contact submissions until admin deletes them
ALTER TABLE contact_submissions
ADD CONSTRAINT contact_submissions_email_unique UNIQUE (email);