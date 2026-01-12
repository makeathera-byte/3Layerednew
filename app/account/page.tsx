'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { SlideProvider } from '@/contexts/SlideContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function AccountPage() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { user, signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
    const router = useRouter();

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            router.push('/account/dashboard');
        }
    }, [user, router]);

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (isSignUp && password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        const { error: authError } = isSignUp
            ? await signUpWithEmail(email, password)
            : await signInWithEmail(email, password);

        if (authError) {
            setError(authError.message);
            setLoading(false);
        } else {
            if (isSignUp) {
                setError('Check your email for verification link');
            }
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError('');
        setLoading(true);
        await signInWithGoogle();
    };

    return (
        <SlideProvider>
            <Navbar />
            <main className="min-h-screen bg-gray-50 pt-24 pb-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Side - Branding */}
                        <div className="hidden lg:block">
                            <div className="h-full flex flex-col justify-center space-y-10 py-12">
                                {/* Logo/Brand Name */}
                                <div className="border-b-2 border-black pb-8">
                                    <h1 className="font-serif text-7xl font-bold text-black mb-3 tracking-tight">
                                        3 LAYERED
                                    </h1>
                                    <p className="text-base uppercase tracking-widest text-gray-500">
                                        Premium 3D Printing Services
                                    </p>
                                </div>

                                {/* Brand Story */}
                                <div className="space-y-6">
                                    <h2 className="font-serif text-3xl font-bold text-black leading-tight">
                                        Precision Meets Innovation
                                    </h2>
                                    <p className="text-gray-700 leading-relaxed text-lg">
                                        We transform ideas into reality through cutting-edge 3D printing technology.
                                        From intricate miniature temples to custom industrial parts, every project
                                        receives our signature attention to detail and craftsmanship.
                                    </p>
                                </div>

                                {/* Features with Icons */}
                                <div className="space-y-6">
                                    <div className="flex items-start gap-5 group">
                                        <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                                            ✓
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-black mb-2 text-lg">Museum-Quality Precision</h3>
                                            <p className="text-gray-600">Industry-leading accuracy for every print</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-5 group">
                                        <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                                            ✓
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-black mb-2 text-lg">Custom Solutions</h3>
                                            <p className="text-gray-600">Tailored to your unique requirements</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-5 group">
                                        <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                                            ✓
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-black mb-2 text-lg">Expert Consultation</h3>
                                            <p className="text-gray-600">Professional guidance from design to delivery</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Quote */}
                                <div className="border-t-2 border-black pt-8">
                                    <p className="text-lg italic text-gray-700 font-light">
                                        "Excellence in every layer, precision in every detail."
                                    </p>
                                </div>
                            </div>
                        </div>


                        {/* Right Side - Auth Form */}
                        <div className="bg-white border border-gray-200 p-8 md:p-12">
                            <div className="text-center mb-8">
                                <h2 className="font-serif text-4xl font-bold mb-3">
                                    {isSignUp ? 'Create Account' : 'Welcome Back'}
                                </h2>
                                <p className="text-gray-600">
                                    {isSignUp
                                        ? 'Sign up to start your 3D printing journey'
                                        : 'Sign in to your account'}
                                </p>
                            </div>

                            {/* Google Sign In */}
                            <button
                                onClick={handleGoogleSignIn}
                                disabled={loading}
                                className="w-full border-2 border-gray-300 px-6 py-4 text-lg font-medium hover:border-black hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-3 mb-8 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg className="w-6 h-6" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                Continue with Google
                            </button>

                            {/* Divider */}
                            <div className="relative mb-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="bg-white px-4 text-sm text-gray-500">Or continue with email</span>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Email/Password Form */}
                            <form onSubmit={handleEmailAuth} className="space-y-6">
                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full border-2 border-gray-200 px-4 py-3 pl-12 focus:border-black focus:outline-none transition-colors"
                                            placeholder="you@example.com"
                                        />
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            id="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full border-2 border-gray-200 px-4 py-3 pl-12 focus:border-black focus:outline-none transition-colors"
                                            placeholder="••••••••"
                                        />
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    </div>
                                </div>

                                {/* Confirm Password (Sign Up Only) */}
                                {isSignUp && (
                                    <div>
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="password"
                                                id="confirmPassword"
                                                required
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="w-full border-2 border-gray-200 px-4 py-3 pl-12 focus:border-black focus:outline-none transition-colors"
                                                placeholder="••••••••"
                                            />
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        </div>
                                    </div>
                                )}

                                {/* Forgot Password (Sign In Only) */}
                                {!isSignUp && (
                                    <div className="text-right">
                                        <a href="#" className="text-sm text-gray-600 hover:text-black hover:underline">
                                            Forgot password?
                                        </a>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-black text-white py-4 px-6 text-lg font-medium hover:bg-gray-900 transition-colors duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>Please wait...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Toggle Sign Up/Sign In */}
                            <div className="mt-8 text-center">
                                <p className="text-gray-600">
                                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                                    <button
                                        onClick={() => {
                                            setIsSignUp(!isSignUp);
                                            setError('');
                                        }}
                                        className="font-medium text-black hover:underline"
                                    >
                                        {isSignUp ? 'Sign In' : 'Sign Up'}
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </SlideProvider>
    );
}
