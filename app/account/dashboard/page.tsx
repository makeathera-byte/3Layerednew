'use client';

import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { SlideProvider } from '@/contexts/SlideContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { User, Package, MapPin, Settings, LogOut, Mail, Phone } from 'lucide-react';

export default function DashboardPage() {
    const { user, loading, signOut } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/account');
        }
    }, [user, loading, router]);

    const handleSignOut = async () => {
        await signOut();
        router.push('/');
    };

    if (loading) {
        return (
            <SlideProvider>
                <Navbar />
                <main className="min-h-screen bg-gray-50 pt-24 pb-16 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading...</p>
                    </div>
                </main>
            </SlideProvider>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <SlideProvider>
            <Navbar />
            <main className="min-h-screen bg-gray-50 pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">My Account</h1>
                        <p className="text-xl text-gray-600">
                            Welcome back, {user.email?.split('@')[0]}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Profile Card */}
                        <div className="lg:col-span-1">
                            <div className="bg-white border border-gray-200 p-8">
                                <div className="flex flex-col items-center text-center mb-6">
                                    <div className="w-24 h-24 bg-black text-white rounded-full flex items-center justify-center text-3xl font-bold mb-4">
                                        {user.email?.[0].toUpperCase()}
                                    </div>
                                    <h2 className="font-serif text-2xl font-bold mb-2">
                                        {user.user_metadata?.full_name || user.email?.split('@')[0]}
                                    </h2>
                                    <p className="text-gray-600 text-sm break-all">{user.email}</p>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <Mail className="w-4 h-4" />
                                        <span>{user.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <Package className="w-4 h-4" />
                                        <span>0 Active Orders</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleSignOut}
                                    className="w-full bg-black text-white py-3 px-6 font-medium hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Sign Out
                                </button>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Order History */}
                            <div className="bg-white border border-gray-200 p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <Package className="w-6 h-6" />
                                    <h2 className="font-serif text-3xl font-bold">Order History</h2>
                                </div>
                                <div className="text-center py-12">
                                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-600 mb-6">You haven't placed any orders yet</p>
                                    <a
                                        href="/custom-print"
                                        className="inline-block bg-black text-white px-8 py-3 hover:bg-gray-900 transition-colors"
                                    >
                                        Request Custom Print
                                    </a>
                                </div>
                            </div>

                            {/* Saved Addresses */}
                            <div className="bg-white border border-gray-200 p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <MapPin className="w-6 h-6" />
                                    <h2 className="font-serif text-3xl font-bold">Saved Addresses</h2>
                                </div>
                                <div className="text-center py-12">
                                    <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-600 mb-6">No saved addresses</p>
                                    <button className="inline-block border-2 border-black text-black px-8 py-3 hover:bg-black hover:text-white transition-colors">
                                        Add Address
                                    </button>
                                </div>
                            </div>

                            {/* Account Settings */}
                            <div className="bg-white border border-gray-200 p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <Settings className="w-6 h-6" />
                                    <h2 className="font-serif text-3xl font-bold">Account Settings</h2>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 border border-gray-200 hover:border-black transition-colors">
                                        <div>
                                            <h3 className="font-medium mb-1">Email Notifications</h3>
                                            <p className="text-sm text-gray-600">Manage your email preferences</p>
                                        </div>
                                        <button className="text-sm text-black hover:underline">Edit</button>
                                    </div>
                                    <div className="flex items-center justify-between p-4 border border-gray-200 hover:border-black transition-colors">
                                        <div>
                                            <h3 className="font-medium mb-1">Password</h3>
                                            <p className="text-sm text-gray-600">Change your password</p>
                                        </div>
                                        <button className="text-sm text-black hover:underline">Edit</button>
                                    </div>
                                    <div className="flex items-center justify-between p-4 border border-gray-200 hover:border-black transition-colors">
                                        <div>
                                            <h3 className="font-medium mb-1">Delete Account</h3>
                                            <p className="text-sm text-gray-600">Permanently delete your account</p>
                                        </div>
                                        <button className="text-sm text-red-600 hover:underline">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </SlideProvider>
    );
}
