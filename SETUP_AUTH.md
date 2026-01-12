# Environment Variables Setup Guide

## Supabase Configuration

To enable Google authentication, you need to configure Supabase:

1. **Get your Supabase credentials:**
   - Go to https://app.supabase.com
   - Select your project
   - Go to Settings > API
   - Copy your Project URL and anon/public key

2. **Create a `.env.local` file in the project root:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **Enable Google OAuth:**
   - In Supabase Dashboard, go to Authentication > Providers
   - Enable Google provider
   - Add your Google OAuth credentials (see Google setup below)

## Google OAuth Setup

1. **Create a Google Cloud Project:**
   - Go to https://console.cloud.google.com
   - Create a new project or select existing
   
2. **Enable Google OAuth:**
   - Go to APIs & Services > Credentials
   - Create OAuth 2.0 Client ID
   - Application type: Web application
   
3. **Configure redirect URLs:**
   - Authorized redirect URIs:
     - `https://YOUR_SUPABASE_URL/auth/v1/callback`
     - `http://localhost:3000/account/dashboard` (for local testing)

4. **Add credentials to Supabase:**
   - Copy Client ID and Client Secret
   - Add them in Supabase Authentication > Providers > Google

## Testing

After configuration:
- Run `npm run dev`
- Visit http://localhost:3000/account
- Click "Continue with Google"
- Sign in with your Google account
