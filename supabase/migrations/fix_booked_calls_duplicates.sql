-- Add unique constraint to prevent duplicate bookings until admin deletes them
-- This prevents users from booking multiple calls with the same email
ALTER TABLE booked_calls
ADD CONSTRAINT booked_calls_email_unique UNIQUE (email);